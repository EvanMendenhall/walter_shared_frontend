import assert from 'node:assert/strict'
import { existsSync, mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'

const candidates = [
  process.env.WALTER_BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].filter(Boolean)
const executablePath = candidates.find((candidate) => existsSync(candidate))
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) })
const origin = process.env.WALTER_BASE_URL || 'http://localhost:3000'
const saveScreenshots = process.env.WALTER_SCREENSHOTS === '1'
if (saveScreenshots) mkdirSync('test-artifacts', { recursive: true })

try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
    const errors = []
    const unexpectedWrites = []
    const requestUrls = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('request', (request) => {
      requestUrls.push(request.url())
      if (!['GET', 'HEAD'].includes(request.method())) unexpectedWrites.push(`${request.method()} ${request.url()}`)
    })
    const response = await page.goto(origin, { waitUntil: 'networkidle' })
    assert.equal(response?.status(), 200, 'Home must be public')
    const frame = page.frameLocator('iframe[title="Walter website"]')
    await frame.locator('#landing').waitFor({ state: 'visible' })
    assert.equal(await page.getByText('Sign in').count(), 0, 'Public home must not prompt for sign-in')
    if (saveScreenshots) await page.screenshot({ path: `test-artifacts/landing-${viewport.width}.png` })
    await frame.locator('button:visible').filter({ hasText: 'Get Walter' }).first().click()
    assert.equal(await frame.locator('#order').isVisible(), true, 'Get Walter must open Your details')
    assert.equal(await page.getByText('Sign in').count(), 0, 'Get Walter must not prompt for sign-in')
    if (saveScreenshots) await page.screenshot({ path: `test-artifacts/details-${viewport.width}.png` })
    await frame.locator('#order input[name="email"]').fill('example@example.com')
    await frame.locator('#order button:visible').filter({ hasText: 'Continue to calendar' }).click({ timeout: 5000 })
    assert.equal(await frame.locator('#setup').isVisible(), true, 'Setup must be public')
    await frame.locator('#setup button:visible').filter({ hasText: 'Preview calendar connection' }).click()
    await frame.locator('button:visible').filter({ hasText: 'Simulate connection' }).click()
    assert.equal(await frame.locator('#ready').isVisible(), true, 'Ready must be public')
    if (saveScreenshots) await page.screenshot({ path: `test-artifacts/ready-${viewport.width}.png` })
    await frame.locator('button:visible').filter({ hasText: 'Help' }).first().click()
    assert.equal(await frame.locator('#support').isVisible(), true, 'Support must be public')
    if (saveScreenshots) await page.screenshot({ path: `test-artifacts/support-${viewport.width}.png` })
    assert.deepEqual(unexpectedWrites, [], 'Preview flow must not submit visitor details')
    assert.equal(requestUrls.some((url) => /example(?:%40|@)example\.com/i.test(url)), false, 'Preview email must not enter a request URL')

    await page.getByRole('link', { name: 'Plans' }).click()
    await page.waitForURL('**/plans')
    assert.equal(new URL(page.url()).pathname, '/plans')
    assert.match(await page.locator('body').innerText(), /Checkout is being prepared/)
    if (saveScreenshots) await page.screenshot({ path: `test-artifacts/plans-${viewport.width}.png` })
    assert.equal(await page.locator('button:enabled').filter({ hasText: 'Checkout' }).count(), 0)
    const returned = await page.goto(`${origin}/plans/returned`, { waitUntil: 'networkidle' })
    assert.equal(returned?.status(), 200, 'Return information page must be public')
    assert.match(await page.locator('body').innerText(), /not proof of an active subscription/)
    const checkout = await page.request.post(`${origin}/api/checkout`, { data: { plan: 'monthly' } })
    assert.equal(checkout.status(), 503, 'Checkout must stay disabled')
    const rawExperience = await page.request.get(`${origin}/walter-experience.html`)
    assert.equal(rawExperience.status(), 200, 'Approved Walter experience must stay publicly available')
    const admin = await page.request.get(`${origin}/admin`)
    assert.equal(admin.status(), 404, 'Walter must not expose the private console')
    assert.deepEqual(errors, [], 'Browser must have no uncaught errors')
    console.log(`PASS ${viewport.width}x${viewport.height}: public flow, Plans, return, checkout gate, private route`)
    await page.close()
  }
} finally {
  await browser.close()
}

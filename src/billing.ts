/**
 * Checkout is disabled. A Stripe price id is not a checkout link,
 * and this static site does not create a Checkout Session.
 */
export const checkoutAvailable = false

export function billingNotice(): string | null {
  const billing = new URLSearchParams(window.location.search).get('billing')
  if (!billing || checkoutAvailable) return null
  return 'Checkout is not available yet. No charge was made.'
}

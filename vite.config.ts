import { copyFileSync, unlinkSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Connect, Plugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const experienceFile = resolve('public/walter-experience.html')

const staticRoutes: Record<string, string> = {
  '/': '/walter-experience.html',
  '/index.html': '/walter-experience.html',
  '/plans': '/plans/index.html',
  '/plans/': '/plans/index.html',
  '/plans/returned': '/plans/returned/index.html',
  '/plans/returned/': '/plans/returned/index.html',
  '/sign-in': '/sign-in/index.html',
  '/sign-in/': '/sign-in/index.html',
  '/sign-up': '/sign-up/index.html',
  '/sign-up/': '/sign-up/index.html',
}

function rewriteStaticRoutes(req: Connect.IncomingMessage) {
  const [path, query] = (req.url ?? '').split('?')
  const target = staticRoutes[path]
  if (!target) return
  req.url = query ? `${target}?${query}` : target
}

function experienceHome(): Plugin {
  return {
    name: 'experience-home',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteStaticRoutes(req)
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split('?')[0]
        if (path === '/' || path === '/index.html') {
          next()
          return
        }
        rewriteStaticRoutes(req)
        next()
      })
    },
    closeBundle() {
      copyFileSync(experienceFile, resolve('dist/index.html'))
      unlinkSync(resolve('dist/walter-experience.html'))
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), experienceHome()],
  build: {
    rollupOptions: {
      input: {
        plans: resolve('plans/index.html'),
        returned: resolve('plans/returned/index.html'),
        signIn: resolve('sign-in/index.html'),
        signUp: resolve('sign-up/index.html'),
      },
    },
  },
})

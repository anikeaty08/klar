import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev only: serve POST /api/contact from api/contact.js (with the keys in .env.local),
// so the contact form works end to end on localhost. Production uses the host's functions.
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      for (const [k, v] of Object.entries(loadEnv('development', process.cwd(), ''))) process.env[k] ??= v
      server.middlewares.use('/api/contact', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        req.body = raw
        const reply = {
          status(code) {
            res.statusCode = code
            return reply
          },
          json(data) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
            return reply
          },
          setHeader: (k, v) => res.setHeader(k, v),
        }
        try {
          const { default: handler } = await server.ssrLoadModule('/api/contact.js')
          await handler(req, reply)
        } catch (err) {
          server.config.logger.error(`dev /api/contact failed: ${err?.message}`)
          reply.status(500).json({ ok: false, error: 'dev_api_error' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApi()],
})

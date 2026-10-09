import { createReadStream, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

import contact from './api/contact.js'

const ROOT = fileURLToPath(new URL('.', import.meta.url))
const DIST = resolve(ROOT, 'dist')
const INDEX = resolve(DIST, 'index.html')
const PORT = Number.parseInt(process.env.PORT || '3000', 10)
const MAX_BODY_BYTES = 32 * 1024

const TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

function responseAdapter(res) {
  return {
    status(code) {
      res.statusCode = code
      return this
    },
    json(body) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(body))
      return this
    },
    setHeader(name, value) {
      res.setHeader(name, value)
    },
  }
}

async function readBody(req) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) throw new Error('payload_too_large')
    chunks.push(chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

async function handleContact(req, res) {
  try {
    req.body = await readBody(req)
    await contact(req, responseAdapter(res))
  } catch (error) {
    if (error.message === 'payload_too_large') {
      responseAdapter(res).status(413).json({ ok: false, error: 'payload_too_large' })
      return
    }
    console.error('contact: unhandled request error', error)
    responseAdapter(res).status(500).json({ ok: false, error: 'server_error' })
  }
}

async function serveFile(res, file) {
  const info = await stat(file)
  if (!info.isFile()) return false
  res.statusCode = 200
  res.setHeader('Content-Type', TYPES[extname(file).toLowerCase()] || 'application/octet-stream')
  res.setHeader('Cache-Control', file === INDEX ? 'no-cache' : 'public, max-age=31536000, immutable')
  createReadStream(file).pipe(res)
  return true
}

const server = createServer(async (req, res) => {
  const method = req.method || 'GET'
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

  if (url.pathname === '/api/contact') {
    if (method !== 'POST') {
      res.setHeader('Allow', 'POST')
      responseAdapter(res).status(405).json({ ok: false, error: 'method_not_allowed' })
      return
    }
    await handleContact(req, res)
    return
  }

  if (method !== 'GET' && method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD, POST')
    res.statusCode = 405
    res.end()
    return
  }

  // Static assets are served directly. Client-side routes receive the Vite entry
  // point so /contact, /de/contact, etc. work on a direct page load.
  const requested = resolve(DIST, `.${decodeURIComponent(url.pathname)}`)
  const isInsideDist = requested === DIST || requested.startsWith(`${DIST}${sep}`)
  try {
    if (isInsideDist && existsSync(requested) && (await serveFile(res, requested))) return
    if (existsSync(INDEX)) {
      if (method === 'HEAD') {
        res.statusCode = 200
        res.setHeader('Content-Type', TYPES['.html'])
        res.end()
      } else await serveFile(res, INDEX)
      return
    }
  } catch (error) {
    console.error('static: unable to serve request', error)
  }

  responseAdapter(res).status(503).json({ ok: false, error: 'app_not_built' })
})

server.listen(PORT, '0.0.0.0', () => console.log(`KlarDataLabs listening on port ${PORT}`))

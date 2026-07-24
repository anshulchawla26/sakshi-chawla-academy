import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'sakshi_chawla_academy')
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Cache-Control', 'no-store, must-revalidate')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// --- Simple in-memory rate limiter (per process) ---
// Sufficient for a single-instance deployment. Swap for Redis/Upstash if you
// horizontally scale.
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 8 // 8 enquiries / minute / IP
const _rlBucket = new Map()
function rateLimit(ip) {
  const now = Date.now()
  const rec = _rlBucket.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }
  if (now > rec.resetAt) {
    rec.count = 0
    rec.resetAt = now + RATE_LIMIT_WINDOW_MS
  }
  rec.count += 1
  _rlBucket.set(ip, rec)
  // Occasional cleanup to prevent unbounded memory growth
  if (_rlBucket.size > 5000) {
    for (const [k, v] of _rlBucket) if (v.resetAt < now) _rlBucket.delete(k)
  }
  return { limited: rec.count > RATE_LIMIT_MAX, remaining: Math.max(0, RATE_LIMIT_MAX - rec.count), resetAt: rec.resetAt }
}

function getIp(request) {
  const xff = request.headers.get('x-forwarded-for') || ''
  const ip = xff.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
  return ip
}

// --- Input validation & sanitisation ---
// Strip control chars & normalise whitespace, cap length.
function sanitize(v, maxLen) {
  if (v == null) return ''
  const s = String(v).replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim()
  return s.slice(0, maxLen)
}
function isValidPhone(v) { return /^[+\d][\d\s\-().]{4,19}$/.test(String(v || '').trim()) }
function isValidEmail(v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()) }

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Sakshi Chawla Academy API', ok: true }))
    }

    // Simple health check
    if (route === '/health' && method === 'GET') {
      return handleCORS(NextResponse.json({ ok: true, ts: Date.now() }))
    }

    // POST /api/enquiry — save contact/enquiry form submissions
    if (route === '/enquiry' && method === 'POST') {
      const ip = getIp(request)
      const rl = rateLimit(ip)
      if (rl.limited) {
        return handleCORS(
          NextResponse.json({ error: 'Too many enquiries. Please try again in a minute.' }, { status: 429 })
        )
      }

      let body = {}
      try { body = await request.json() } catch (e) { body = {} }

      const name = sanitize(body?.name, 100)
      const phone = sanitize(body?.phone, 20)
      const email = sanitize(body?.email, 120)
      const studentClass = sanitize(body?.studentClass, 60)
      const message = sanitize(body?.message, 2000)

      if (!name || name.length < 2) {
        return handleCORS(NextResponse.json({ error: 'Please provide a valid name.' }, { status: 400 }))
      }
      if (!isValidPhone(phone)) {
        return handleCORS(NextResponse.json({ error: 'Please provide a valid phone number.' }, { status: 400 }))
      }
      if (!isValidEmail(email)) {
        return handleCORS(NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 }))
      }

      // Basic honeypot / bot detection
      if (typeof body?.website === 'string' && body.website.length > 0) {
        // Silently accept for bots so they think they succeeded
        return handleCORS(NextResponse.json({ ok: true, id: uuidv4() }))
      }

      const doc = {
        id: uuidv4(),
        name,
        phone,
        email,
        studentClass,
        message,
        userAgent: sanitize(request.headers.get('user-agent') || '', 250),
        ip,
        createdAt: new Date(),
      }
      await db.collection('enquiries').insertOne(doc)
      const res = NextResponse.json({ ok: true, id: doc.id })
      res.headers.set('X-RateLimit-Remaining', String(rl.remaining))
      return handleCORS(res)
    }

    // GET /api/enquiries — list enquiries (admin) — protected by token
    if (route === '/enquiries' && method === 'GET') {
      const token = request.headers.get('x-admin-token') || new URL(request.url).searchParams.get('token')
      if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
        return handleCORS(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const list = await db.collection('enquiries').find({}).sort({ createdAt: -1 }).limit(500).toArray()
      const cleaned = list.map(({ _id, ip, userAgent, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleaned))
    }

    // Legacy status routes preserved
    if (route === '/status' && method === 'POST') {
      let body = {}
      try { body = await request.json() } catch (e) { body = {} }
      if (!body.client_name) {
        return handleCORS(NextResponse.json({ error: 'client_name is required' }, { status: 400 }))
      }
      const statusObj = { id: uuidv4(), client_name: sanitize(body.client_name, 100), timestamp: new Date() }
      await db.collection('status_checks').insertOne(statusObj)
      return handleCORS(NextResponse.json(statusObj))
    }
    if (route === '/status' && method === 'GET') {
      const statusChecks = await db.collection('status_checks').find({}).limit(1000).toArray()
      return handleCORS(NextResponse.json(statusChecks.map(({ _id, ...rest }) => rest)))
    }

    return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute

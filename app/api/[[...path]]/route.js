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
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Sakshi Chawla Academy API' }))
    }

    // POST /api/enquiry — save contact/enquiry form submissions
    if (route === '/enquiry' && method === 'POST') {
      let body = {}
      try { body = await request.json() } catch (e) { body = {} }
      const { name, phone, email, studentClass, message } = body || {}
      if (!name || !phone) {
        return handleCORS(
          NextResponse.json({ error: 'Name and phone are required' }, { status: 400 })
        )
      }
      const doc = {
        id: uuidv4(),
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : '',
        studentClass: studentClass || '',
        message: message || '',
        createdAt: new Date(),
      }
      await db.collection('enquiries').insertOne(doc)
      return handleCORS(NextResponse.json({ ok: true, id: doc.id }))
    }

    // GET /api/enquiries — list enquiries (admin)
    if (route === '/enquiries' && method === 'GET') {
      const list = await db.collection('enquiries').find({}).sort({ createdAt: -1 }).limit(500).toArray()
      const cleaned = list.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleaned))
    }

    // Legacy status routes preserved
    if (route === '/status' && method === 'POST') {
      const body = await request.json()
      if (!body.client_name) {
        return handleCORS(NextResponse.json({ error: 'client_name is required' }, { status: 400 }))
      }
      const statusObj = { id: uuidv4(), client_name: body.client_name, timestamp: new Date() }
      await db.collection('status_checks').insertOne(statusObj)
      return handleCORS(NextResponse.json(statusObj))
    }
    if (route === '/status' && method === 'GET') {
      const statusChecks = await db.collection('status_checks').find({}).limit(1000).toArray()
      return handleCORS(NextResponse.json(statusChecks.map(({ _id, ...rest }) => rest)))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read db.json
const dbPath = path.join(__dirname, '..', 'db.json');
let db = {};

try {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
} catch (e) {
  console.error('Error reading db.json:', e);
}

// CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default function handler(req, res) {
  // Add CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.replace('/api', '');
  const parts = pathname.split('/').filter(Boolean);
  const resource = parts[0];
  const id = parts[1];

  // GET requests
  if (req.method === 'GET') {
    if (!resource) {
      res.status(200).json({ message: 'API Server' });
      return;
    }

    // Get all resources or specific resource by id
    const data = db[resource] || [];
    if (id) {
      const item = data.find((item) => item.id === parseInt(id));
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: 'Not found' });
      }
    } else {
      res.status(200).json(data);
    }
    return;
  }

  // POST requests
  if (req.method === 'POST') {
    if (!resource || !db[resource]) {
      res.status(400).json({ error: 'Invalid resource' });
      return;
    }
    const newItem = {
      id: Math.max(...db[resource].map((item) => item.id || 0)) + 1,
      ...req.body,
    };
    db[resource].push(newItem);
    res.status(201).json(newItem);
    return;
  }

  // PATCH/PUT requests
  if (req.method === 'PATCH' || req.method === 'PUT') {
    if (!resource || !id || !db[resource]) {
      res.status(400).json({ error: 'Invalid resource' });
      return;
    }
    const index = db[resource].findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      db[resource][index] = { ...db[resource][index], ...req.body };
      res.status(200).json(db[resource][index]);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
    return;
  }

  // DELETE requests
  if (req.method === 'DELETE') {
    if (!resource || !id || !db[resource]) {
      res.status(400).json({ error: 'Invalid resource' });
      return;
    }
    const index = db[resource].findIndex((item) => item.id === parseInt(id));
    if (index !== -1) {
      db[resource].splice(index, 1);
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Not found' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}

import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '..', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

export default (req, res) => {
  const server = jsonServer.create();
  server.use(middlewares);
  server.use(router);
  return server(req, res);
};

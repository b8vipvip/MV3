import fs from 'node:fs/promises';
import process from 'node:process';
import pg from 'pg';

const url = process.env.CN2_DATABASE_URL;
if (!url) {
  console.error('CN2_DATABASE_URL is required.');
  process.exit(1);
}

const sql = await fs.readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
const client = new pg.Client({
  connectionString: url,
  ssl: process.env.CN2_DATABASE_SSL === '1' ? { rejectUnauthorized: true } : undefined,
});
await client.connect();
try {
  await client.query(sql);
  console.log('CN2 database schema initialized.');
} finally {
  await client.end();
}

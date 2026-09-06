import { Pool, type QueryResultRow } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var __cn2Pool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.CN2_DATABASE_URL;
  if (!connectionString) throw new Error('CN2_DATABASE_URL is not configured');
  return new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    ssl: process.env.CN2_DATABASE_SSL === '1' ? { rejectUnauthorized: true } : undefined,
  });
}

export function db() {
  if (!global.__cn2Pool) global.__cn2Pool = createPool();
  return global.__cn2Pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, values: unknown[] = []) {
  return db().query<T>(text, values);
}

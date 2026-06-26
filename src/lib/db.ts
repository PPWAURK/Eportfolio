import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'contacts.db');

let db: Database.Database | null = null;

export function initDb(): void {
  // Ensure data directory exists
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Initialize database connection
  db = new Database(DB_PATH);

  // Create contacts table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export function saveContact(name: string, email: string, message: string): number {
  if (!db) {
    initDb();
  }

  const stmt = db!.prepare(`
    INSERT INTO contacts (name, email, message)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(name, email, message);
  return result.lastInsertRowid as number;
}

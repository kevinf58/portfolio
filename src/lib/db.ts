import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const dbPath = path.join(dbDir, "database.db");
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS journal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL,
    markdown TEXT NOT NULL,
    tags TEXT,
    category TEXT
  );

    CREATE TABLE IF NOT EXISTS project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    date TEXT NOT NULL,
    markdown TEXT NOT NULL,
    tags TEXT,
    category TEXT,
    imagePreviewUUID TEXT
  );
`);

export default db;

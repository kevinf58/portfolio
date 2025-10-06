import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const dbPath = path.join(dbDir, "database.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS journals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    markdown TEXT NOT NULL,
    tags TEXT,
    category TEXT
  );
`);

export default db;

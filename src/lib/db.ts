import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const dbPath = path.join(dbDir, "database.db");
const db = new Database(dbPath);

db.exec("PRAGMA foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS journal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    createdat TEXT NOT NULL,
    updatedat TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('daily', 'learning', 'development', 'recruiting', 'trading')),
    visibility TEXT CHECK(visibility IN ('public', 'private')) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE,
    createdat TEXT NOT NULL,
    updatedat TEXT NOT NULL,
    content TEXT NOT NULL,
    imagePreview TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS journal_tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    journal_id INTEGER NOT NULL,
    tag TEXT NOT NULL CHECK(LENGTH(tag) <= 16),
    UNIQUE(journal_id, tag),
    FOREIGN KEY(journal_id) REFERENCES journal(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS project_tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    tag TEXT NOT NULL CHECK(LENGTH(tag) <= 16),
    UNIQUE(project_id, tag),
    FOREIGN KEY(project_id) REFERENCES project(id) ON DELETE CASCADE
  );
`);

export default db;

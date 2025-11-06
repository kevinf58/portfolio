import db from "./db";
import { Journal, Document } from "@/types/api/Document.type";

export function getAllJournals(): Journal[] {
  const statement = db.prepare("SELECT * FROM journals ORDER BY date DESC");

  const rawRows = statement.all() as Array<Omit<Journal, "date" | "tags"> & { date: string; tags: string }>;

  const rows: Journal[] = rawRows.map((row) => ({
    ...row,
    date: new Date(row.date),
    tags: JSON.parse(row.tags || "[]"),
  }));

  return rows;
}

export function addJournal(journal: Document) {
  const stmt = db.prepare("INSERT INTO journals (title, date, tags, markdown) VALUES (?, ?, ?, ?)");
  const date = typeof journal.date === "string" ? new Date(journal.date) : journal.date;

  const info = stmt.run(journal.title, date.toISOString(), JSON.stringify(journal.tags), journal.markdown);

  return { ...journal, id: info.lastInsertRowid };
}

export function deleteJournal(id: number) {
  const stmt = db.prepare("DELETE FROM journals WHERE id = ?");
  stmt.run(id);
  return { success: true };
}

export function getJournal(id: number): Journal {
  const statement = db.prepare("SELECT * FROM journals WHERE id = ?");

  const rawRow = statement.get(id) as Omit<Journal, "date" | "tags"> & { date: string; tags: string };
  const journal = {
    ...rawRow,
    date: new Date(rawRow.date),
    tags: JSON.parse(rawRow.tags || "[]"),
  };

  return journal;
}

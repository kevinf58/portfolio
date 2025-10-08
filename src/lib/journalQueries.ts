import db from "./db";
import { JournalType, RawJournalType } from "@/types/api/Journal.type";

export function getAllJournals(): JournalType[] {
  const statement = db.prepare("SELECT * FROM journals ORDER BY date DESC");

  const rawRows = statement.all() as Array<Omit<JournalType, "date" | "tags"> & { date: string; tags: string }>;

  const rows: JournalType[] = rawRows.map((row) => ({
    ...row,
    date: new Date(row.date),
    tags: JSON.parse(row.tags || "[]"),
  }));

  return rows;
}

export function addJournal(journal: RawJournalType) {
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

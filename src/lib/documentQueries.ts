import db from "./db";
import { Document, DocumentType } from "@/types/Document.type";

export function getDocuments(documentType: DocumentType): Document[] {
  const statement = db.prepare(`SELECT * FROM ${documentType} ORDER BY date DESC`);

  const rawRows = statement.all() as Array<Document>;

  const rows: Document[] = rawRows.map((row) => ({
    ...row,
    date: row.date,
    tags: typeof row.tags === "string" ? JSON.parse(row.tags) : row.tags,
    type: documentType,
  }));

  return rows;
}

export function addDocument(document: Document) {
  const date = typeof document.date === "string" ? new Date(document.date) : document.date;

  if (document.type === "project") {
    const stmt = db.prepare(
      `INSERT INTO project (title, date, tags, markdown, imagePreviewLink)
       VALUES (?, ?, ?, ?, ?)`,
    );
    const info = stmt.run(
      document.title,
      date.toISOString(),
      JSON.stringify(document.tags),
      document.markdown,
      document.imagePreviewLink,
    );
    return { ...document, id: info.lastInsertRowid };
  } else {
    const stmt = db.prepare(
      `INSERT INTO journal (title, date, tags, markdown, category)
       VALUES (?, ?, ?, ?, ?)`,
    );
    const info = stmt.run(
      document.title,
      date.toISOString(),
      JSON.stringify(document.tags),
      document.markdown,
      document.category,
    );
    return { ...document, id: info.lastInsertRowid };
  }
}

export function deleteDocument(id: number, documentType: DocumentType) {
  const stmt = db.prepare(`DELETE FROM ${documentType} WHERE id = ?`);
  stmt.run(id);
  return { success: true };
}

export function getDocument(id: number, documentType: DocumentType): Document {
  const statement = db.prepare(`SELECT * FROM ${documentType} WHERE id = ?`);

  const rawRow = statement.get(id) as Omit<Document, "date" | "tags"> & { date: string; tags: string };
  const document = {
    ...rawRow,
    date: rawRow.date,
    tags: JSON.parse(rawRow.tags || "[]"),
  };

  return document;
}

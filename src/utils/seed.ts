import db from "../lib/db";

// sample data
const journals = [
  {
    title: "First Journal Entry",
    createdAt: "2025-01-01T10:00:00.000Z",
    updatedAt: "2025-01-01T10:00:00.000Z",
    content: "Today I started working on my personal journaling app. The goal is to keep things simple and fast.",
    tags: ["personal", "thoughts", "app"],
    category: "trading",
  },
  {
    title: "Learning SQLite",
    createdAt: "2025-01-05T14:30:00.000Z",
    updatedAt: "2025-01-05T14:30:00.000Z",
    content: "I spent some time learning how SQLite works with better-sqlite3. It feels lightweight and perfect for small projects.",
    tags: ["sqlite", "learning", "backend"],
    category: "learning",
  },
  {
    title: "Reflection",
    createdAt: "2025-01-12T20:15:00.000Z",
    updatedAt: "2025-01-12T20:15:00.000Z",
    content: "This week was productive. I managed to add tagging and categories to my journal entries.",
    tags: ["reflection", "weekly", "progress"],
    category: "daily",
  },
];

const projects = [
  {
    title: "Personal Journal App",
    createdAt: "2025-01-02T09:00:00.000Z",
    updatedAt: "2025-01-02T09:00:00.000Z",
    content: "A minimal journaling application built with Node.js and SQLite. Focused on speed and offline usage.",
    tags: ["nodejs", "sqlite", "personal"],
    imagePreview: "https://raw.githubusercontent.com/kevinf58/portfolio-images/main/images/115563bd-ddff-4817-ae3b-9831fe78ea81.png",
  },
  {
    title: "Portfolio Website",
    createdAt: "2025-01-08T16:45:00.000Z",
    updatedAt: "2025-01-08T16:45:00.000Z",
    content: "My personal portfolio showcasing projects, skills, and contact information.",
    tags: ["portfolio", "frontend", "design"],
    imagePreview: "https://raw.githubusercontent.com/kevinf58/portfolio-images/main/images/a3e2a786-f302-4dc3-ab58-2d2dceaf3537.png",
  },
  {
    title: "Task Tracker",
    createdAt: "2025-01-15T11:20:00.000Z",
    updatedAt: "2025-01-15T11:20:00.000Z",
    content: "A simple task tracking tool with projects, deadlines, and progress tracking.",
    tags: ["productivity", "tasks", "tool"],
    imagePreview: "https://raw.githubusercontent.com/kevinf58/portfolio-images/main/images/83212d61-0ec5-4e19-9791-9e81cb25941d.png",
  },
];

// statements
const insertJournal = db.prepare(`
  INSERT OR IGNORE INTO journal
  (title, createdat, updatedat, content, category)
  VALUES (?, ?, ?, ?, ?)
`);

const insertJournalTag = db.prepare(`
  INSERT OR IGNORE INTO journal_tag (journal_id, tag)
  VALUES (?, ?)
`);

const insertProject = db.prepare(`
  INSERT OR IGNORE INTO project
  (title, createdat, updatedat, content, imagePreview)
  VALUES (?, ?, ?, ?, ?)
`);

const insertProjectTag = db.prepare(`
  INSERT OR IGNORE INTO project_tag (project_id, tag)
  VALUES (?, ?)
`);

// insertions
for (const j of journals) {
  const result = insertJournal.run(j.title, j.createdAt, j.updatedAt, j.content, j.category);
  const journalId = result.lastInsertRowid;
  for (const tag of j.tags) {
    insertJournalTag.run(journalId, tag);
  }
}

for (const p of projects) {
  const result = insertProject.run(p.title, p.createdAt, p.updatedAt, p.content, p.imagePreview);
  const projectId = result.lastInsertRowid;
  for (const tag of p.tags) {
    insertProjectTag.run(projectId, tag);
  }
}

console.log("✅ Database seeded successfully");

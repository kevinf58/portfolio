import db from "@/lib/db";
import { ApiResponse } from "@/types/api/api.type";
import { CreateDocumentPayload } from "@/types/api/apiServices.type";
import { DOCUMENT_TYPE, Document } from "@/types/Document.type";
import {
  DOCUMENT_CONTENT_MIN_LENGTH,
  DOCUMENT_TITLE_MAX_LENGTH,
  DOCUMENT_TITLE_MIN_LENGTH,
  DOCUMENTS_LOADED_LIMIT,
} from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let message: string = "";
    let stmt = null;

    const document: CreateDocumentPayload = await req.json();

    // error handling
    if (document.title.length < DOCUMENT_TITLE_MIN_LENGTH) {
      message = "Title too short";
    } else if (document.title.length > DOCUMENT_TITLE_MAX_LENGTH) {
      message = "Title too long";
    } else if (document.content.length < DOCUMENT_CONTENT_MIN_LENGTH) {
      message = `Please add sufficient content to make this a ${document.type}`;
    } else if (document.type === DOCUMENT_TYPE.JOURNAL && !document.category) {
      message = "No journal category selected";
    } else if (document.type === DOCUMENT_TYPE.PROJECT && !document.imagePreview) {
      message = "No project image preview provided";
    }
    if (message) return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 400, message } });

    // create document
    if (document.type === DOCUMENT_TYPE.JOURNAL) {
      stmt = db.prepare(
        `INSERT INTO journal (title, createdAt, tags, content, category)
       VALUES (?, ?, ?, ?, ?)`
      );
      stmt.run(
        document.title,
        new Date(document.createdAt).toISOString(),
        JSON.stringify(document.tags),
        document.content,
        document.category
      );

      message = "Journal added successfully";
    } else {
      stmt = db.prepare(
        `INSERT INTO project (title, createdAt, updatedAt, tags, content, imagePreview)
       VALUES (?, ?, ?, ?, ?, ?)`
      );
      stmt.run(
        document.title,
        new Date(document.createdAt).toISOString(),
        new Date(document.createdAt).toISOString(),
        JSON.stringify(document.tags),
        document.content,
        document.imagePreview
      );

      message = "Project added successfully";
    }

    return NextResponse.json<ApiResponse<null>>({ success: true, data: null, info: { code: 201, message } });
  } catch (err) {
    console.log(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const type = req.nextUrl.pathname.split("/").pop();

    const limit = Number(req.nextUrl.searchParams.get("limit")) || DOCUMENTS_LOADED_LIMIT;
    const offset = Number(req.nextUrl.searchParams.get("offset")) || 0;

    const countStmt =
      type === DOCUMENT_TYPE.JOURNAL
        ? db.prepare(`SELECT COUNT(*) as total FROM journal`)
        : db.prepare(`SELECT COUNT(*) as total FROM project`);

    const { total } = countStmt.get() as { total: number };

    // error and sql injection handling
    if (!Object.values(DOCUMENT_TYPE).includes(type as (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE])) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid document type" } });
    }

    let stmt = null;
    if (type === DOCUMENT_TYPE.JOURNAL) {
      stmt = db.prepare(`
        SELECT j.id, j.title, j.createdat AS createdAt, j.updatedat AS updatedAt, j.content, j.category, 'journal' AS type,
        GROUP_CONCAT(t.tag) AS tags
        FROM journal j
        LEFT JOIN journal_tag t ON j.id = t.journal_id
        GROUP BY j.id
        ORDER BY j.createdat DESC
        LIMIT ? OFFSET ?
      `);
    } else {
      stmt = db.prepare(`
        SELECT p.id, p.title, p.createdat AS createdAt, p.updatedat AS updatedAt, p.content, p.imagePreview, 'project' AS type,
        GROUP_CONCAT(t.tag) AS tags
        FROM project p
        LEFT JOIN project_tag t ON p.id = t.project_id
        GROUP BY p.id
        ORDER BY p.createdat DESC
        LIMIT ? OFFSET ?
      `);
    }
    const rows = stmt.all(limit, offset) as Array<Document>;
    const data: Document[] = rows.map((row) => ({
      ...row,
      tags: row.tags ? (row.tags as unknown as string).split(",") : [],
    }));

    return NextResponse.json<ApiResponse<Document[]>>({
      success: true,
      data,
      meta: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total,
      },
      info: { code: 200, message: data.length === 0 ? `No ${data}s exist!` : "Documents fetched successfully" },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

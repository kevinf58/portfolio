import db from "@/lib/db";
import { ApiResponse } from "@/types/api/api.type";
import { CreateDocumentPayload } from "@/types/Document.type";
import { DOCUMENT_TYPE, Document, DocumentType } from "@/types/Document.type";
import { DOCUMENT_CONTENT_MIN_LENGTH, DOCUMENT_TITLE_MAX_LENGTH, DOCUMENT_TITLE_MIN_LENGTH, DOCUMENTS_LOADED_LIMIT } from "@/lib/constants";
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
    if (!Object.values(DOCUMENT_TYPE).includes(type as DocumentType)) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid document type" } });
    }

    const stmt = db.prepare(`
        SELECT d.id, d.title, d.createdat AS createdAt, d.updatedat AS updatedAt, d.content, ${
          type === DOCUMENT_TYPE.JOURNAL ? "d.category" : "NULL AS category"
        }, '${type}' AS type, ${type === DOCUMENT_TYPE.PROJECT ? "d.imagePreview" : "NULL AS imagePreview"}, '${type}' AS type,
        GROUP_CONCAT(t.tag) AS tags
        FROM ${type} d
        LEFT JOIN ${type}_tag t ON d.id = t.${type}_id
        GROUP BY d.id
        ORDER BY d.createdat DESC
        LIMIT ? OFFSET ?
      `);
    const res = stmt.all(limit, offset) as Array<Document>;

    // check for if stmt returned >= 1 row
    if (res.length === 0) {
      return NextResponse.json({ success: false, info: { code: 404, message: "No documents exist" } });
    }

    const data: Document[] = res.map((row) => ({
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
      info: { code: 200, message: "Documents fetched successfully" },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

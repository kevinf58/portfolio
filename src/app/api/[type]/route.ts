import db from "@/lib/db";
import { ApiResponse } from "@/types/api/Api.type";
import { DocumentPayload } from "@/types/Document.type";
import { DOCUMENT_TYPE, Document, DocumentType } from "@/types/Document.type";
import { DOCUMENT_CONTENT_MIN_LENGTH, DOCUMENT_TITLE_MAX_LENGTH, DOCUMENT_TITLE_MIN_LENGTH, DOCUMENTS_LOADED_LIMIT } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { JournalCategory } from "@/types/Journal.type";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let message: string = "";
    let stmt = null;

    const document: DocumentPayload = await req.json();

    // auth check
    const isAuthorized = await getServerSession(authOptions);
    if (!isAuthorized) {
      return NextResponse.json({ success: false, info: { code: 401, message: "Unauthorized" } });
    }

    // error handling
    if (document.title.length < DOCUMENT_TITLE_MIN_LENGTH) {
      message = "Title too short";
    } else if (document.title.length > DOCUMENT_TITLE_MAX_LENGTH) {
      message = "Title too long";
    } else if (document.content.length < DOCUMENT_CONTENT_MIN_LENGTH) {
      message = `Please add sufficient content to make this a ${document.type}`;
    } else if (document.type === DOCUMENT_TYPE.PROJECT && !document.imagePreview) {
      message = "No project image preview provided";
    }
    if (message) {
      return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 400, message } });
    }

    // titles of the same type of document need to be unique, so do a check for this
    stmt = db.prepare(`SELECT 1 FROM ${document.type} WHERE title = ?`);
    const res = stmt.get(document.title);
    if (res) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        info: {
          code: 409,
          message: `A ${
            document.type.charAt(0).toUpperCase() + document.type.slice(1)
          } with this title already exists. Please think of another`,
        },
      });
    }

    if (document.type === DOCUMENT_TYPE.JOURNAL) {
      // create document
      stmt = db.prepare(`INSERT INTO journal (title, createdAt, updatedAt, content, category, visibility) VALUES (?, ?, ?, ?, ?, ?)`);
      const res = stmt.run(
        document.title,
        new Date(document.createdAt).toISOString(),
        new Date(document.createdAt).toISOString(),
        document.content,
        document.category,
        document.visibility,
      );
      const journalID = res.lastInsertRowid;

      // iterate tags into the journal tag table
      stmt = db.prepare(`INSERT INTO journal_tag (journal_id, tag) VALUES (?, ?)`);
      for (const tag of document.tags) {
        stmt.run(journalID, tag);
      }

      message = "Journal created successfully";
    } else if (document.type === DOCUMENT_TYPE.PROJECT) {
      stmt = db.prepare(`INSERT INTO project (title, createdAt, updatedAt, content, imagePreview) VALUES (?, ?, ?, ?, ?)`);
      const res = stmt.run(
        document.title,
        new Date(document.createdAt).toISOString(),
        new Date(document.createdAt).toISOString(),
        document.content,
        document.imagePreview,
      );
      const projectID = res.lastInsertRowid;

      // iterate tags into the project tag table
      stmt = db.prepare(`INSERT INTO project_tag (project_id, tag) VALUES (?, ?)`);
      for (const tag of document.tags) {
        stmt.run(projectID, tag);
      }

      message = "Project created successfully";
    }

    return NextResponse.json<ApiResponse<null>>({ success: true, data: null, info: { code: 201, message } });
  } catch (err) {
    console.error(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const type = req.nextUrl.pathname.split("/").pop();

    // pagination params
    const limit = Number(req.nextUrl.searchParams.get("limit")) || DOCUMENTS_LOADED_LIMIT;
    const offset = Number(req.nextUrl.searchParams.get("offset")) || 0;
    // optional journal category param
    const category: JournalCategory = (req.nextUrl.searchParams.get("category") as JournalCategory) || undefined;

    // constructing conditional WHERE clause
    const isAuthorized = await getServerSession(authOptions);
    const conditions: string[] = [];
    const params: string[] = [];

    // visibility condition
    if (type === DOCUMENT_TYPE.JOURNAL && !isAuthorized) {
      conditions.push("d.visibility = ?");
      params.push("public");
    }
    // category condition
    if (category !== undefined) {
      conditions.push("d.category = ?");
      params.push(category);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countStmt =
      type === DOCUMENT_TYPE.JOURNAL
        ? db.prepare(`SELECT COUNT(*) as total FROM journal d ${whereClause}`)
        : db.prepare(`SELECT COUNT(*) as total FROM project`);

    const { total } = countStmt.get(...params) as { total: number };

    // error and sql injection handling
    if (!Object.values(DOCUMENT_TYPE).includes(type as DocumentType)) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid document type" } });
    }

    const stmt = db.prepare(`
        SELECT d.id, d.title, d.createdat AS createdAt, d.updatedat AS updatedAt, d.content, ${
          type === DOCUMENT_TYPE.JOURNAL ? "d.category, d.visibility" : "NULL AS category, NULL as visibility"
        }, ${type === DOCUMENT_TYPE.PROJECT ? "d.imagePreview" : "NULL AS imagePreview"}, '${type}' AS type,
        GROUP_CONCAT(t.tag) AS tags
        FROM ${type} d
        LEFT JOIN ${type}_tag t ON d.id = t.${type}_id
        ${whereClause}
        GROUP BY d.id
        ORDER BY d.createdat DESC
        LIMIT ? OFFSET ?
      `);
    const res = stmt.all(...params, limit, offset) as Array<Document>;

    // check for if stmt returned >= 1 row
    if (res.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        meta: { limit, offset, total, hasMore: false },
        info: { code: 200, message: "No documents exist" },
      });
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
    console.error(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

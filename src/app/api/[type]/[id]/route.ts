import { ApiResponse } from "@/types/api/api.type";
import { NextRequest, NextResponse } from "next/server";
import { Document, DOCUMENT_TYPE } from "@/types/Document.type";
import db from "@/lib/db";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const [, , type, id] = req.nextUrl.pathname.split("/");

    // check for if type is of type DOCUMENT_TYPE
    if (!Object.values(DOCUMENT_TYPE).includes(type as (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE])) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid document type" } });
    }

    let stmt = null;
    if (type === DOCUMENT_TYPE.JOURNAL) {
      stmt = db.prepare(`
        SELECT j.id, j.title, j.content, j.createdat AS createdAt, j.updatedat AS updatedAt, j.category, 'journal' AS type,
        GROUP_CONCAT(t.tag) AS tags
        FROM journal j
        LEFT JOIN journal_tag t ON t.journal_id = j.id
        WHERE j.id = ?
        GROUP BY j.id;
      `);
    } else {
      stmt = db.prepare(`
        SELECT p.id, p.title, p.content, p.createdat AS createdAt, p.updatedat AS updatedAt, p.imagePreview, 'project' AS type,
        GROUP_CONCAT(t.tag) AS tags
        FROM project p
        LEFT JOIN project_tag t ON t.project_id = p.id
        WHERE p.id = ?
        GROUP BY p.id;
      `);
    }

    const res = stmt.get(id) as Document;

    // check for if stmt returned a row
    if (!res) {
      return NextResponse.json({ success: false, info: { code: 404, message: "Document not found" } });
    }

    const data: Document = { ...res, tags: res.tags ? (res.tags as unknown as string).split(",") : [] };

    return NextResponse.json<ApiResponse<Document>>({
      success: true,
      data,
      info: { code: 200, message: "Document fetched successfully" },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

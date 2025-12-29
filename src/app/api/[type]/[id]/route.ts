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

    const stmt = db.prepare(`
        SELECT d.id, d.title, d.content, d.createdat AS createdAt, d.updatedat AS updatedAt, ${
          type === "journal" ? "d.category" : "NULL AS category"
        }, '${type}' AS type, ${type === "project" ? "d.imagePreview" : "NULL AS imagePreview"},
        GROUP_CONCAT(t.tag) AS tags
        FROM ${type} d
        LEFT JOIN ${type}_tag t ON t.${type}_id = d.id
        WHERE d.id = ?
        GROUP BY d.id;
      `);
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

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const [, , type, id] = req.nextUrl.pathname.split("/");

    // check for if type is of type DOCUMENT_TYPE
    if (!Object.values(DOCUMENT_TYPE).includes(type as (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE])) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid document type" } });
    }

    const stmt = db.prepare(`DELETE FROM ${type} WHERE id = ?`);
    const res = stmt.run(id);

    if (!res.changes) {
      return NextResponse.json({ success: false, info: { code: 404, message: "Document not found" } });
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      data: null,
      info: { code: 200, message: "Document deleted successfully" },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

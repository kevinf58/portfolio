import { ApiResponse } from "@/types/api/Api.type";
import { NextRequest, NextResponse } from "next/server";
import { Document, DOCUMENT_TYPE, DocumentType } from "@/types/Document.type";
import db from "@/lib/db";
import { applyPatch, Operation, validate } from "fast-json-patch";
import { getLocalDate } from "@/utils/dateUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const [, , type, id] = req.nextUrl.pathname.split("/");

    // check for if type is of type DOCUMENT_TYPE
    if (!Object.values(DOCUMENT_TYPE).includes(type as DocumentType)) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid document type" } });
    }

    const stmt = db.prepare(`
        SELECT d.id, d.title, d.content, d.createdat AS createdAt, d.updatedat AS updatedAt, ${
          type === DOCUMENT_TYPE.JOURNAL ? "d.category" : "NULL AS category"
        }, '${type}' AS type, ${type === DOCUMENT_TYPE.PROJECT ? "d.imagePreview" : "NULL AS imagePreview"},
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
    const session = getServerSession(authOptions);
    const [, , type, id] = req.nextUrl.pathname.split("/");

    // auth check
    if (!session) {
      return NextResponse.json({ success: false, info: { code: 401, message: "Unauthorized" } });
    }

    // check for if type is of type DOCUMENT_TYPE
    if (!Object.values(DOCUMENT_TYPE).includes(type as DocumentType)) {
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

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const session = getServerSession(authOptions);
    const [, , type, id] = req.nextUrl.pathname.split("/");
    const diff: Operation[] = await req.json();

    // auth check
    if (!session) {
      return NextResponse.json({ success: false, info: { code: 401, message: "Unauthorized" } });
    }

    // check for if type is of type DOCUMENT_TYPE and validating patch data
    const validationError = validate(diff);
    if (!Object.values(DOCUMENT_TYPE).includes(type as DocumentType)) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid document type" } });
    } else if (!Array.isArray(diff)) {
      return NextResponse.json({ success: false, info: { code: 400, message: "Invalid patch data" } });
    } else if (validationError) {
      return NextResponse.json({ success: false, info: { code: 400, message: validationError.message } });
    }

    // blacklist the changing of other attributes through this query
    const ATTRIBUTE_BLACKLIST: Record<string, Set<string>> = {
      journal: new Set(["/id", "createdAt", "/type"]),
      project: new Set(["/id", "createdAt", "/type"]),
    };

    // tags are a part of a separate table, so handle them separately
    const tagOperations = diff.filter((op) => op.path.startsWith("/tags"));
    const mainOperations = diff.filter((op) => !op.path.startsWith("/tags"));

    for (const op of mainOperations) {
      if (ATTRIBUTE_BLACKLIST[type].has(op.path)) {
        return NextResponse.json({ success: false, info: { code: 403, message: `Path ${op.path} is not editable` } });
      }
    }

    // check if entry exists
    const stmt = db.prepare(`SELECT * FROM ${type} WHERE id = ?`);
    const res = stmt.get(id) as Document;
    if (!res) {
      return NextResponse.json({ success: false, info: { code: 404, message: "Document not found" } });
    }

    // building the set clause for the update stmt
    const patched = applyPatch(res, mainOperations, true).newDocument;
    patched.updatedAt = new Date(getLocalDate()).toISOString();

    console.log(patched.updatedAt);
    const cols = Object.keys(patched);
    const vals = Object.values(patched);
    const clause = cols.map((col) => `${col} = ?`).join(", ");

    db.prepare(`UPDATE ${type} SET ${clause} WHERE id = ?`).run(...vals, id);

    // handle tag updates
    if (tagOperations.length > 0) {
      const stmt = db.prepare(`SELECT id, tag FROM ${type}_tag WHERE ${type}_id = ? ORDER BY id`);
      const res = stmt.all(id) as { id: number; tag: string }[];

      const tags = db.prepare(`SELECT id, tag FROM ${type}_tag WHERE ${type}_id = ? ORDER BY id ASC`).all(id);

      for (const patch of tagOperations) {
        const index = parseInt(patch.path.split("/").pop()!);
        switch (patch.op) {
          case "replace": {
            const tagId = res[index].id;
            db.prepare(`UPDATE ${type}_tag SET tag = ? WHERE id = ?`).run(patch.value, tagId);
            res[index].tag = patch.value;
            break;
          }
          case "add": {
            const addTagResult = db.prepare(`INSERT INTO ${type}_tag (${type}_id, tag) VALUES (?, ?)`).run(id, patch.value);
            res.splice(index, 0, { id: Number(addTagResult.lastInsertRowid), tag: patch.value });
            break;
          }
          case "remove": {
            const tagId = res[index].id;
            db.prepare(`DELETE FROM ${type}_tag WHERE id = ?`).run(tagId);
            tags.splice(index, 1);
            break;
          }
        }
      }
    }

    return NextResponse.json<ApiResponse<null>>({
      success: true,
      data: null,
      info: { code: 200, message: "Document Edited successfully" },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}

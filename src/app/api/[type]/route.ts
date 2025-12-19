import { NextRequest, NextResponse } from "next/server";
import { addDocument, getDocumentsPage } from "@/lib/documentQueries";
import { DocumentType } from "@/types/Document.type";
import { Document } from "@/types/Document.type";
import { DocumentCollectionParams } from "@/types/api/Api.type";
import { DOCUMENTS_PER_LOAD } from "@/utils/constants";

export async function GET(request: NextRequest, { params }: DocumentCollectionParams) {
  const { searchParams } = new URL(request.url);
  const { type } = await params;

  const offset = Number(searchParams.get("offset") ?? 0);
  const limit = Number(searchParams.get("limit") ?? DOCUMENTS_PER_LOAD);

  const { documents, hasMore } = getDocumentsPage(type as DocumentType, offset, limit);
  return NextResponse.json({ documents, hasMore });
}

export async function POST(request: NextRequest) {
  try {
    const document: Document = await request.json();

    if (typeof document.title !== "string" || document.title.trim().length < 6) {
      return NextResponse.json({ error: "Title too short" }, { status: 400 });
    }

    if (document.type === "project" && !document.imagePreviewLink) {
      return NextResponse.json({ error: "Please add a project preview image!" }, { status: 400 });
    }

    if (document.type === "journal" && !document.category) {
      return NextResponse.json({ error: "Please select a journal category!" }, { status: 400 });
    }

    if (typeof document.markdown !== "string" || document.markdown.length < 200) {
      return NextResponse.json({ error: "Please add sufficient text to your document!" }, { status: 400 });
    }

    if (document.type !== "journal" && document.type !== "project") {
      return NextResponse.json({ error: "Invalid document type" }, { status: 400 });
    }

    const newDocument: Document = {
      title: document.title.trim(),
      markdown: document.markdown,
      tags: Array.isArray(document.tags) ? document.tags : [],
      type: document.type,
      date: document.date,
      ...(document.type === "project" && document.imagePreviewLink
        ? { imagePreviewLink: document.imagePreviewLink }
        : {}),
      ...(document.type === "journal" && document.category ? { category: document.category } : {}),
    };

    const created = await addDocument(newDocument);

    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof Error) {
      if (
        ("code" in err && err.code === "SQLITE_CONSTRAINT_UNIQUE") ||
        err.message.includes("UNIQUE constraint failed")
      ) {
        return NextResponse.json({ error: "A document with this title already exists." }, { status: 409 });
      }
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

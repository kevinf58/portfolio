import { NextRequest, NextResponse } from "next/server";
import { addDocument, getDocuments } from "@/lib/documentQueries";
import { DocumentType } from "@/types/api/Document.type";
import { Document } from "@/types/api/Document.type";
import { getLocalDate } from "@/utils/dateUtils";

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const journals = getDocuments(type as DocumentType);
  return NextResponse.json(journals, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const document: Document = await request.json();

    if (typeof document.title !== "string" || document.title.trim().length < 6) {
      return NextResponse.json({ error: "Title too short" }, { status: 400 });
    }

    if (typeof document.markdown !== "string" || document.markdown.length < 200) {
      return NextResponse.json({ error: "Please add sufficient text to your journal!" }, { status: 400 });
    }

    if (document.type !== "journal" && document.type !== "project") {
      return NextResponse.json({ error: "Invalid document type" }, { status: 400 });
    }

    const newDocument: Document = {
      title: document.title.trim(),
      markdown: document.markdown,
      tags: Array.isArray(document.tags) ? document.tags : [],
      type: document.type,
      date: getLocalDate(),
      ...(document.type === "project" && document.imagePreviewLink
        ? { imagePreviewLink: document.imagePreviewLink }
        : {}),
    };

    const created = await addDocument(newDocument);

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: "Failed to add document" }, { status: 500 });
  }
}

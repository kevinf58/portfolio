import { NextRequest, NextResponse } from "next/server";
import { addDocument, getDocuments } from "@/lib/documentQueries";
import { DocumentType } from "@/types/api/Document.type";
import { Document } from "@/types/api/Document.type";

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const journals = getDocuments(type as DocumentType);
  return NextResponse.json(journals, { status: 200 });
}

export async function POST(request: NextRequest) {
  const document: Document = await request.json();

  try {
    const newJournal = addDocument(document);
    return NextResponse.json(newJournal, { status: 201 });
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return NextResponse.json({ error: `A ${document.type} with this title already exists` }, { status: 409 });
      }
    }

    return NextResponse.json({ error: "Failed to add journal" }, { status: 500 });
  }
}

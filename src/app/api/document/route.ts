import { NextRequest, NextResponse } from "next/server";
import { getDocuments, addDocument } from "@/lib/documentQueries";
import { Document } from "@/types/api/Document.type";
import { DocumentType } from "@/types/api/Document.type";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as DocumentType;
  const documents = getDocuments(type);

  return NextResponse.json(documents, { status: 200 });
}

export async function POST(request: Request) {
  const body: Document = await request.json();

  try {
    const newDocument = addDocument(body);
    return NextResponse.json(newDocument, { status: 201 });
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return NextResponse.json({ error: `A ${body.type} with this title already exists` }, { status: 409 });
      }
    }

    return NextResponse.json({ error: `Failed to add body.type` }, { status: 500 });
  }
}

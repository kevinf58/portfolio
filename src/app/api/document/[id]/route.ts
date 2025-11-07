import { NextRequest, NextResponse } from "next/server";
import { deleteDocument, getDocument } from "@/lib/documentQueries";
import { DocumentType } from "@/types/api/Document.type";

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const type = searchParams.get("type") as DocumentType;

  const segments = url.pathname.split("/").filter(Boolean);
  const id = segments.at(-1);
  const documentID = Number(id);

  if (!id || isNaN(documentID)) {
    return NextResponse.json({ message: `Invalid ${type} ID` }, { status: 400 });
  }

  try {
    await deleteDocument(documentID, type);

    return NextResponse.json({ message: `${type} ${id} deleted` }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean);
  const type = segments.at(-2) as DocumentType;

  const id = segments.at(-1);
  const documentID = Number(id);

  if (!id || isNaN(documentID)) {
    return NextResponse.json({ error: `Invalid ${type} ID` }, { status: 400 });
  }

  const document = await getDocument(documentID, type);
  if (!document) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  return NextResponse.json(document, { status: 200 });
}

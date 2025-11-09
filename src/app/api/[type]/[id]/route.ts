import { NextRequest, NextResponse } from "next/server";
import { deleteDocument, getDocument } from "@/lib/documentQueries";
import { DocumentType } from "@/types/api/Document.type";

export async function GET(request: NextRequest, ctx: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await ctx.params;
  const documentID = Number(id);
  if (!id || Number.isNaN(documentID)) {
    return NextResponse.json({ error: `Invalid ${type} ID` }, { status: 400 });
  }
  const document = await getDocument(documentID, type as DocumentType);
  if (!document) return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  return NextResponse.json(document, { status: 200 });
}
export async function DELETE(request: NextRequest, ctx: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await ctx.params;
  const documentID = Number(id);
  if (!id || Number.isNaN(documentID)) {
    return NextResponse.json({ message: `Invalid ${type} ID` }, { status: 400 });
  }
  try {
    await deleteDocument(documentID, type as DocumentType);
    return NextResponse.json({ message: `${type} ${id} deleted` }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { deleteJournal } from "@/lib/journalQueries";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  const id = Number(idParam);

  if (!idParam) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  try {
    await deleteJournal(id);
    return NextResponse.json({ message: `Journal ${id} deleted` }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

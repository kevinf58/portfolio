import { NextRequest, NextResponse } from "next/server";
import { deleteJournal, getJournal } from "@/lib/journalQueries";
import { Params } from "next/dist/server/request/params";

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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const journalId = Number(id);

  if (!id || isNaN(journalId)) {
    return NextResponse.json({ error: "Invalid journal ID" }, { status: 400 });
  }

  const journal = await getJournal(journalId);
  if (!journal) {
    return NextResponse.json({ error: "Journal not found" }, { status: 404 });
  }

  return NextResponse.json(journal, { status: 200 });
}

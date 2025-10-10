import { NextResponse } from "next/server";
import { getAllJournals, addJournal } from "@/lib/journalQueries";
import { RawJournalType } from "@/types/api/Journal.type";

export async function GET() {
  const journals = getAllJournals();
  return NextResponse.json(journals, { status: 200 });
}

export async function POST(request: Request) {
  const body: RawJournalType = await request.json();

  try {
    const newJournal = addJournal(body);
    return NextResponse.json(newJournal, { status: 201 });
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return NextResponse.json({ error: "A journal with this title already exists" }, { status: 409 });
      }
    }

    return NextResponse.json({ error: "Failed to add journal" }, { status: 500 });
  }
}

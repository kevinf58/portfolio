import { NextResponse } from "next/server";
import { getAllJournals, addJournal } from "@/lib/journalQueries";
import { JournalType } from "@/types/api/Journal.type";

export async function GET() {
  const journals = getAllJournals();
  return NextResponse.json(journals, { status: 200 });
}

export async function POST(request: Request) {
  const body: JournalType = await request.json();
  const newJournal = addJournal(body);
  return NextResponse.json(newJournal, { status: 201 });
}

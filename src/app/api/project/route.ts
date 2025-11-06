import { getAllJournals } from "@/lib/journalQueries";
import { NextResponse } from "next/server";

export async function GET() {
  const journals = getAllJournals();
  return NextResponse.json(journals, { status: 200 });
}

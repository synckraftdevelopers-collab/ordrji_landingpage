import { NextRequest, NextResponse } from "next/server";
import { readTable, Author } from "@/utils/db";

// GET - List authors
export async function GET(req: NextRequest) {
  const authors = readTable<Author>("authors");
  return NextResponse.json(authors);
}

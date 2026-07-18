import { NextResponse } from "next/server";
import { readTable, Author } from "@/utils/db";

// GET - List authors
export async function GET() {
  const authors = readTable<Author>("authors");
  return NextResponse.json(authors);
}

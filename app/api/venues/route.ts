import { NextResponse } from "next/server";
import { listVenues } from "@/lib/data";

export function GET() {
  return NextResponse.json({ items: listVenues() });
}

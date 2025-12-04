import { NextResponse } from "next/server";
import { computeAggregates, getVenue } from "@/lib/data";

export function GET(_: Request, { params }: { params: { id: string } }) {
  const venue = getVenue(params.id);
  if (!venue) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const agg = computeAggregates(venue.id);
  return NextResponse.json({ venue, aggregates: agg });
}

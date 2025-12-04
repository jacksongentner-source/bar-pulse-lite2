export type Rating = {
  id: string;
  venueId: string;
  scores: {
    vibe: number;
    idStrictness: number;
    crowdAge: number;
    music: number;
    dressCode: number;
  };
  comment?: string;
  createdAt: string;
};

export type Venue = {
  id: string;
  name: string;
  type: "BAR" | "CLUB" | "SMOKESHOP" | "GAS" | "OTHER";
  city: string;
  state: string;
  lat?: number;
  lng?: number;
};

// Sample Boise data
export const venues: Venue[] = [
  { id: "hannahs", name: "Humpin’ Hannah’s", type: "BAR", city: "Boise", state: "ID", lat: 43.6154, lng: -116.2039 },
  { id: "balcony", name: "The Balcony Club", type: "CLUB", city: "Boise", state: "ID", lat: 43.6165, lng: -116.2030 },
  { id: "pengillys", name: "Pengilly’s Saloon", type: "BAR", city: "Boise", state: "ID" },
  { id: "presspony", name: "Press & Pony", type: "BAR", city: "Boise", state: "ID" },
];

export const ratings = [
  { id: "r1", venueId: "hannahs", scores: { vibe: 4.4, idStrictness: 4.6, crowdAge: 2.4, music: 4.6, dressCode: 2.1 }, comment: "DJ was on point; bouncers checking hard.", createdAt: new Date().toISOString() },
  { id: "r2", venueId: "balcony", scores: { vibe: 4.6, idStrictness: 4.2, crowdAge: 2.2, music: 4.8, dressCode: 2.3 }, comment: "Great music, younger crowd.", createdAt: new Date().toISOString() },
  { id: "r3", venueId: "pengillys", scores: { vibe: 3.9, idStrictness: 4.0, crowdAge: 3.6, music: 3.7, dressCode: 2.7 }, createdAt: new Date().toISOString() },
];

export function computeAggregates(venueId: string) {
  const rs = ratings.filter(r => r.venueId === venueId);
  if (rs.length === 0) return null;
  const avg = {
    vibe: rs.reduce((a, b) => a + b.scores.vibe, 0) / rs.length,
    idStrictness: rs.reduce((a, b) => a + b.scores.idStrictness, 0) / rs.length,
    crowdAge: rs.reduce((a, b) => a + b.scores.crowdAge, 0) / rs.length,
    music: rs.reduce((a, b) => a + b.scores.music, 0) / rs.length,
    dressCode: rs.reduce((a, b) => a + b.scores.dressCode, 0) / rs.length,
  };
  const badges: string[] = [];
  if (avg.idStrictness >= 4.2) badges.push("ID: Strict");
  if (avg.crowdAge <= 2.0) badges.push("Younger crowd");
  if (avg.crowdAge >= 4.0) badges.push("Older crowd");
  if (avg.music >= 4.2) badges.push("Music: Fire");
  if (avg.dressCode <= 2.0) badges.push("Dress: Casual");
  if (avg.dressCode >= 4.0) badges.push("Dress: Formal");
  return { avg, count: rs.length, badges, recent: rs.slice(0, 5) };
}

export function listVenues() {
  return venues.map(v => {
    const agg = computeAggregates(v.id);
    return {
      id: v.id,
      name: v.name,
      type: v.type,
      city: v.city,
      state: v.state,
      avg: { vibe: agg?.avg.vibe ?? 0 },
      badges: agg?.badges ?? [],
    }
  });
}

export function getVenue(id: string) {
  return venues.find(v => v.id === id);
}

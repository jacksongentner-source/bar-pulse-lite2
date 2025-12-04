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

export type BusyTime = {
  day: string;
  startTime: string;
  endTime: string;
  crowdLevel: "dead" | "slow" | "moderate" | "busy" | "packed";
};

export type Venue = {
  id: string;
  name: string;
  type: "BAR" | "CLUB" | "SMOKESHOP" | "GAS" | "OTHER";
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  minAge?: number;
  busyTimes?: BusyTime[];
  amenities?: string[];
};

// Sample Boise data
export const venues: Venue[] = [
  { 
    id: "hannahs", 
    name: "Humpin' Hannah's", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6154, 
    lng: -116.2039,
    minAge: 21,
    amenities: ["DJ", "Dance Floor", "Pool Tables", "Mechanical Bull"],
    busyTimes: [
      { day: "Monday", startTime: "22:00", endTime: "01:00", crowdLevel: "moderate" },
      { day: "Friday", startTime: "21:00", endTime: "02:00", crowdLevel: "packed" },
      { day: "Saturday", startTime: "20:00", endTime: "03:00", crowdLevel: "packed" },
      { day: "Sunday", startTime: "19:00", endTime: "23:00", crowdLevel: "busy" },
    ]
  },
  { 
    id: "balcony", 
    name: "The Balcony Club", 
    type: "CLUB", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6165, 
    lng: -116.2030,
    minAge: 21,
    amenities: ["DJ", "Dance Floor", "Rooftop"],
    busyTimes: [
      { day: "Wednesday", startTime: "22:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Thursday", startTime: "22:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Friday", startTime: "21:00", endTime: "03:00", crowdLevel: "packed" },
      { day: "Saturday", startTime: "21:00", endTime: "03:00", crowdLevel: "packed" },
    ]
  },
  { 
    id: "pengillys", 
    name: "Pengilly's Saloon", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6140, 
    lng: -116.2035,
    minAge: 21,
    amenities: ["Pool Tables", "Pull Tabs", "Jukebox"],
    busyTimes: [
      { day: "Monday", startTime: "17:00", endTime: "22:00", crowdLevel: "moderate" },
      { day: "Friday", startTime: "17:00", endTime: "01:00", crowdLevel: "busy" },
      { day: "Saturday", startTime: "18:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Sunday", startTime: "16:00", endTime: "23:00", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "presspony", 
    name: "Press & Pony", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6155, 
    lng: -116.2045,
    minAge: 21,
    amenities: ["Craft Cocktails", "Jukebox"],
    busyTimes: [
      { day: "Tuesday", startTime: "17:00", endTime: "22:00", crowdLevel: "slow" },
      { day: "Thursday", startTime: "17:00", endTime: "23:00", crowdLevel: "moderate" },
      { day: "Friday", startTime: "17:00", endTime: "01:00", crowdLevel: "busy" },
      { day: "Saturday", startTime: "18:00", endTime: "02:00", crowdLevel: "busy" },
    ]
  },
  { 
    id: "dirtylittleroddys", 
    name: "Dirty Little Roddy's", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6170, 
    lng: -116.2015,
    minAge: 21,
    amenities: ["Mechanical Bull", "DJ", "Dance Floor"],
    busyTimes: [
      { day: "Wednesday", startTime: "21:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Friday", startTime: "20:00", endTime: "02:00", crowdLevel: "packed" },
      { day: "Saturday", startTime: "19:00", endTime: "03:00", crowdLevel: "packed" },
      { day: "Sunday", startTime: "18:00", endTime: "23:00", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "sudstavern", 
    name: "Suds Tavern", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6142, 
    lng: -116.2028,
    minAge: 21,
    amenities: ["Pool Tables", "Sports Screens", "Jukebox"],
    busyTimes: [
      { day: "Monday", startTime: "16:00", endTime: "20:00", crowdLevel: "dead" },
      { day: "Thursday", startTime: "16:00", endTime: "23:00", crowdLevel: "busy" },
      { day: "Saturday", startTime: "16:00", endTime: "02:00", crowdLevel: "packed" },
      { day: "Sunday", startTime: "14:00", endTime: "22:00", crowdLevel: "busy" },
    ]
  },
  { 
    id: "mulligans", 
    name: "Mulligans", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6148, 
    lng: -116.2040,
    minAge: 21,
    amenities: ["Pool Tables", "Sports Screens", "Drive Bar"],
    busyTimes: [
      { day: "Thursday", startTime: "20:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Friday", startTime: "19:00", endTime: "02:00", crowdLevel: "packed" },
      { day: "Saturday", startTime: "19:00", endTime: "03:00", crowdLevel: "packed" },
      { day: "Sunday", startTime: "17:00", endTime: "23:00", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "thieves", 
    name: "Thick As Thieves", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6160, 
    lng: -116.2020,
    minAge: 25,
    amenities: ["Craft Cocktails", "Pool Tables"],
    busyTimes: [
      { day: "Wednesday", startTime: "18:00", endTime: "23:00", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "18:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Friday", startTime: "17:00", endTime: "02:00", crowdLevel: "packed" },
      { day: "Saturday", startTime: "17:00", endTime: "03:00", crowdLevel: "packed" },
    ]
  },
  { 
    id: "tomgraineys", 
    name: "Tom Grainey's", 
    type: "CLUB", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6158, 
    lng: -116.2032,
    minAge: 21,
    amenities: ["DJ", "Dance Floor", "Live Music", "Multiple Rooms"],
    busyTimes: [
      { day: "Thursday", startTime: "21:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Friday", startTime: "20:00", endTime: "03:00", crowdLevel: "packed" },
      { day: "Saturday", startTime: "20:00", endTime: "03:00", crowdLevel: "packed" },
      { day: "Sunday", startTime: "19:00", endTime: "23:00", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "theshed", 
    name: "The Shed", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6145, 
    lng: -116.2025,
    minAge: 21,
    amenities: ["Pool Tables", "Sports Screens", "Jukebox"],
    busyTimes: [
      { day: "Monday", startTime: "16:00", endTime: "22:00", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "16:00", endTime: "02:00", crowdLevel: "busy" },
      { day: "Friday", startTime: "15:00", endTime: "02:00", crowdLevel: "packed" },
      { day: "Saturday", startTime: "15:00", endTime: "03:00", crowdLevel: "packed" },
    ]
  },
];

export const ratings = [
  { id: "r1", venueId: "hannahs", scores: { vibe: 4.4, idStrictness: 4.6, crowdAge: 2.4, music: 4.6, dressCode: 2.1 }, comment: "DJ was on point; bouncers checking hard.", createdAt: new Date().toISOString() },
  { id: "r2", venueId: "balcony", scores: { vibe: 4.6, idStrictness: 4.2, crowdAge: 2.2, music: 4.8, dressCode: 2.3 }, comment: "Great music, younger crowd.", createdAt: new Date().toISOString() },
  { id: "r3", venueId: "pengillys", scores: { vibe: 3.9, idStrictness: 4.0, crowdAge: 3.6, music: 3.7, dressCode: 2.7 }, createdAt: new Date().toISOString() },
  { id: "r4", venueId: "presspony", scores: { vibe: 4.1, idStrictness: 3.9, crowdAge: 2.8, music: 3.8, dressCode: 3.2 }, comment: "Great craft cocktails!", createdAt: new Date().toISOString() },
  { id: "r5", venueId: "dirtylittleroddys", scores: { vibe: 4.5, idStrictness: 3.8, crowdAge: 2.5, music: 4.4, dressCode: 1.9 }, comment: "Mechanical bull is wild!", createdAt: new Date().toISOString() },
  { id: "r6", venueId: "sudstavern", scores: { vibe: 3.8, idStrictness: 3.5, crowdAge: 2.3, music: 3.5, dressCode: 1.8 }, comment: "Game day madness!", createdAt: new Date().toISOString() },
  { id: "r7", venueId: "mulligans", scores: { vibe: 3.9, idStrictness: 3.7, crowdAge: 2.4, music: 3.6, dressCode: 2.0 }, comment: "Good pregame spot", createdAt: new Date().toISOString() },
  { id: "r8", venueId: "thieves", scores: { vibe: 4.3, idStrictness: 4.0, crowdAge: 2.5, music: 4.2, dressCode: 3.4 }, comment: "Trendy downtown vibe", createdAt: new Date().toISOString() },
  { id: "r9", venueId: "tomgraineys", scores: { vibe: 4.4, idStrictness: 4.1, crowdAge: 2.6, music: 4.5, dressCode: 2.8 }, comment: "Main St. legend!", createdAt: new Date().toISOString() },
  { id: "r10", venueId: "theshed", scores: { vibe: 3.9, idStrictness: 3.6, crowdAge: 2.4, music: 3.7, dressCode: 1.9 }, comment: "College crowd heaven", createdAt: new Date().toISOString() },
  { id: "r11", venueId: "hannahs", scores: { vibe: 4.5, idStrictness: 4.5, crowdAge: 2.3, music: 4.7, dressCode: 2.0 }, comment: "Live band energy is unmatched", createdAt: new Date().toISOString() },
  { id: "r12", venueId: "balcony", scores: { vibe: 4.7, idStrictness: 4.3, crowdAge: 2.1, music: 4.9, dressCode: 2.4 }, comment: "LGBTQ friendly, great music", createdAt: new Date().toISOString() },
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

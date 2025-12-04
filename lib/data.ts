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
  description?: string;
  busyTimes?: BusyTime[];
  amenities?: string[];
};

// Helper function to convert 24-hour to 12-hour format
function to12Hour(time: string): string {
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours);
  const minute = minutes;
  const period = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute}${period}`;
}

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
    description: "Wild country vibes with live DJ energy. Mechanical bull, dance floor, and high-energy crowd. Known for insane bachelor/bachelorette parties and live entertainment.",
    amenities: ["DJ", "Dance Floor", "Pool Tables", "Mechanical Bull"],
    busyTimes: [
      { day: "Monday", startTime: "10:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "8:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "7:00PM", endTime: "11:00PM", crowdLevel: "busy" },
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
    description: "LGBTQ-friendly rooftop club with amazing music and younger crowd. Great views, stellar DJ, and an accepting atmosphere. Perfect for a night of dancing and vibing.",
    amenities: ["DJ", "Dance Floor", "Rooftop"],
    busyTimes: [
      { day: "Wednesday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Thursday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "9:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "9:00PM", endTime: "3:00AM", crowdLevel: "packed" },
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
    description: "Classic dive bar with old-school charm. Pool tables, jukebox, and a mix of regulars and newcomers. Laid-back atmosphere perfect for casual drinks and games.",
    amenities: ["Pool Tables", "Pull Tabs", "Jukebox"],
    busyTimes: [
      { day: "Monday", startTime: "5:00PM", endTime: "10:00PM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "6:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
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
    description: "Craft cocktail paradise in downtown. Mixologists know their craft, elegant vibe, and quality drinks. Great for date nights or sophisticated evening out.",
    amenities: ["Craft Cocktails", "Jukebox"],
    busyTimes: [
      { day: "Tuesday", startTime: "5:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Thursday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "6:00PM", endTime: "2:00AM", crowdLevel: "busy" },
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
    description: "Country and western at its wildest. Mechanical bull action, dancin' til dawn, and a raucous good time. Serious nightlife energy with top-tier entertainment.",
    amenities: ["Mechanical Bull", "DJ", "Dance Floor"],
    busyTimes: [
      { day: "Wednesday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "8:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "7:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "6:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
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
    description: "Sports bar central. Multiple screens, game day madness, and a crowd that lives for the plays. Perfect spot for watching your team with fellow fans.",
    amenities: ["Pool Tables", "Sports Screens", "Jukebox"],
    busyTimes: [
      { day: "Monday", startTime: "4:00PM", endTime: "8:00PM", crowdLevel: "dead" },
      { day: "Thursday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "4:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "2:00PM", endTime: "10:00PM", crowdLevel: "busy" },
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
    description: "Pregame headquarters with drive-through style vibe. Pool, screens, and a rotating crowd. Great for getting the night started before heading elsewhere.",
    amenities: ["Pool Tables", "Sports Screens", "Drive Bar"],
    busyTimes: [
      { day: "Thursday", startTime: "8:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "7:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "7:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
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
    description: "Upscale downtown gem for the mature crowd. Craft cocktails, sophisticated vibe, and refined tastes. 25+ required—for those seeking a classier scene.",
    amenities: ["Craft Cocktails", "Pool Tables"],
    busyTimes: [
      { day: "Wednesday", startTime: "6:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "6:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "5:00PM", endTime: "3:00AM", crowdLevel: "packed" },
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
    description: "Main Street legend with multiple rooms and serious DJ energy. Top-tier dance floor, live music events, and packed dance halls. The place to be on weekends.",
    amenities: ["DJ", "Dance Floor", "Live Music", "Multiple Rooms"],
    busyTimes: [
      { day: "Thursday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "8:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "8:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "7:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
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
    description: "College crowd favorite with pool, screens, and no-frills fun. Casual vibe, affordable drinks, and always packed when games are on. Student paradise.",
    amenities: ["Pool Tables", "Sports Screens", "Jukebox"],
    busyTimes: [
      { day: "Monday", startTime: "4:00PM", endTime: "10:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "4:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "3:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "3:00PM", endTime: "3:00AM", crowdLevel: "packed" },
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
      description: v.description,
      avg: { vibe: agg?.avg.vibe ?? 0 },
      badges: agg?.badges ?? [],
    }
  });
}

export function getVenue(id: string) {
  return venues.find(v => v.id === id);
}

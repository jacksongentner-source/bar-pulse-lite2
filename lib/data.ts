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
  // Top Trending Venues (Shown at top)
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
      { day: "Tuesday", startTime: "9:00PM", endTime: "12:00AM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "10:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "9:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "8:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "7:00PM", endTime: "11:00PM", crowdLevel: "busy" },
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
      { day: "Monday", startTime: "8:00PM", endTime: "12:00AM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "8:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Wednesday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Thursday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "8:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "8:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "7:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
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
      { day: "Monday", startTime: "9:00PM", endTime: "1:00AM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "9:00PM", endTime: "12:00AM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Thursday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "9:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "9:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "8:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
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
      { day: "Monday", startTime: "9:00PM", endTime: "12:00AM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "9:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Wednesday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Thursday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "8:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "7:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "6:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
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
      { day: "Monday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Wednesday", startTime: "6:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "6:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "5:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "5:00PM", endTime: "10:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "bittercreek", 
    name: "Bittercreek Alehouse", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6162, 
    lng: -116.2022,
    minAge: 21,
    description: "Beer paradise with over 50 craft beers on tap. Laid-back vibe for serious hopheads. Great for beer enthusiasts and casual hangouts.",
    amenities: ["Craft Beer", "Outdoor Patio"],
    busyTimes: [
      { day: "Monday", startTime: "4:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "4:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "4:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "4:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "1:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "1:00PM", endTime: "10:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "neurolux", 
    name: "Neurolux", 
    type: "CLUB", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6159, 
    lng: -116.2031,
    minAge: 21,
    description: "Unique music venue and bar with live shows and DJ sets. Eclectic vibe with great energy. Known for showcasing local and touring artists.",
    amenities: ["Live Music", "DJ", "Unique Atmosphere"],
    busyTimes: [
      { day: "Monday", startTime: "9:00PM", endTime: "1:00AM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "9:00PM", endTime: "1:00AM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "9:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "9:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "9:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "9:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "amsterdam", 
    name: "Amsterdam Lounge", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6161, 
    lng: -116.2033,
    minAge: 21,
    description: "Intimate lounge with European vibes. Upscale cocktails and cozy atmosphere. Perfect for sophisticated conversations and quality drinks.",
    amenities: ["Craft Cocktails", "Lounge Seating"],
    busyTimes: [
      { day: "Monday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "5:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "5:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
    ]
  },

  // All Other Venues
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
      { day: "Tuesday", startTime: "5:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "5:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
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
      { day: "Monday", startTime: "5:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "6:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "5:00PM", endTime: "10:00PM", crowdLevel: "slow" },
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
      { day: "Tuesday", startTime: "4:00PM", endTime: "8:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "4:00PM", endTime: "10:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "busy" },
      { day: "Friday", startTime: "4:00PM", endTime: "12:00AM", crowdLevel: "busy" },
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
      { day: "Monday", startTime: "4:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "4:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "8:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "7:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "7:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
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
      { day: "Tuesday", startTime: "4:00PM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "4:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "3:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "3:00PM", endTime: "3:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "3:00PM", endTime: "10:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "strangelove", 
    name: "STRANGELOVE", 
    type: "CLUB", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6163, 
    lng: -116.2024,
    minAge: 21,
    description: "Trendy nightclub with high energy and unique decor. Great for dancing and socializing. Known for themed nights and special events.",
    amenities: ["DJ", "Dance Floor", "Themed Events"],
    busyTimes: [
      { day: "Monday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "10:00PM", endTime: "3:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "10:00PM", endTime: "4:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "10:00PM", endTime: "4:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "10:00PM", endTime: "2:00AM", crowdLevel: "slow" },
    ]
  },
  { 
    id: "cactus", 
    name: "Cactus Bar", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6164, 
    lng: -116.2026,
    minAge: 21,
    description: "Western-themed bar with local character. Friendly crowd and good drink specials. Great for a casual night out with friends.",
    amenities: ["DJ", "Pool Tables", "Outdoor Patio"],
    busyTimes: [
      { day: "Monday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "6:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "6:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "broadway", 
    name: "Broadway Bar", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6166, 
    lng: -116.2028,
    minAge: 21,
    description: "Downtown hotspot with live music and great atmosphere. Mixed crowd with good vibes. Perfect for catching a show and having a good time.",
    amenities: ["Live Music", "DJ", "Full Bar"],
    busyTimes: [
      { day: "Monday", startTime: "6:00PM", endTime: "12:00AM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "6:00PM", endTime: "12:00AM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "6:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "6:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "6:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "6:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "6:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "sillybirch", 
    name: "The Silly Birch", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6167, 
    lng: -116.2029,
    minAge: 21,
    description: "Fun, quirky bar with character. Good drinks and unique atmosphere. Known for its fun crowd and eclectic vibe.",
    amenities: ["Full Bar", "Games", "Jukebox"],
    busyTimes: [
      { day: "Monday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "5:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "5:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "whiskey", 
    name: "Whiskey Bar", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6168, 
    lng: -116.2030,
    minAge: 21,
    description: "Premium whiskey selection with knowledgeable bartenders. Upscale but welcoming. Perfect for whiskey lovers and connoisseurs.",
    amenities: ["Premium Whiskey", "Craft Cocktails"],
    busyTimes: [
      { day: "Monday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "5:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "5:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
    ]
  },
  { 
    id: "reef", 
    name: "The Reef", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6169, 
    lng: -116.2031,
    minAge: 21,
    description: "Tropical-themed bar with beach vibes. Fun atmosphere and creative drinks. Great for escaping the cold with warm tropical energy.",
    amenities: ["Tropical Drinks", "DJ", "Outdoor Patio"],
    busyTimes: [
      { day: "Monday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "6:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "6:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "spacebar", 
    name: "Spacebar Arcade", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6170, 
    lng: -116.2032,
    minAge: 21,
    description: "Arcade games galore with craft beer and fun vibes. Nostalgia meets modern nightlife. Perfect for gaming enthusiasts and casual hangouts.",
    amenities: ["Arcade Games", "Craft Beer", "Retro Vibes"],
    busyTimes: [
      { day: "Monday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Tuesday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Wednesday", startTime: "4:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "4:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Friday", startTime: "3:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Saturday", startTime: "3:00PM", endTime: "2:00AM", crowdLevel: "packed" },
      { day: "Sunday", startTime: "3:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "10thstreet", 
    name: "10th Street Station", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6171, 
    lng: -116.2033,
    minAge: 21,
    description: "Train-themed bar with unique decor. Great for meeting friends and good atmosphere. Popular gathering spot on the bricks.",
    amenities: ["Full Bar", "Outdoor Seating", "Unique Atmosphere"],
    busyTimes: [
      { day: "Monday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "4:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "4:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "4:00PM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "4:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "4:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "matador", 
    name: "The Matador", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6172, 
    lng: -116.2034,
    minAge: 21,
    description: "Spanish-themed bar with Latin flair. Good food and drink specials. Lively atmosphere with Latin music and energy.",
    amenities: ["Latin Music", "Food", "Full Bar"],
    busyTimes: [
      { day: "Monday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Tuesday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "5:00PM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "6:00PM", endTime: "1:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "5:00PM", endTime: "2:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "5:00PM", endTime: "11:00PM", crowdLevel: "moderate" },
    ]
  },
  { 
    id: "hydeparkpub", 
    name: "Hyde Park Pub & Grill", 
    type: "BAR", 
    city: "Boise", 
    state: "ID", 
    lat: 43.6173, 
    lng: -116.2035,
    minAge: 21,
    description: "Neighborhood pub with solid food and drinks. Friendly locals and welcoming atmosphere. Great for catching games and casual hangouts.",
    amenities: ["Sports Screens", "Food", "Pool Tables"],
    busyTimes: [
      { day: "Monday", startTime: "11:00AM", endTime: "10:00PM", crowdLevel: "moderate" },
      { day: "Tuesday", startTime: "11:00AM", endTime: "10:00PM", crowdLevel: "slow" },
      { day: "Wednesday", startTime: "11:00AM", endTime: "11:00PM", crowdLevel: "moderate" },
      { day: "Thursday", startTime: "11:00AM", endTime: "12:00AM", crowdLevel: "moderate" },
      { day: "Friday", startTime: "11:00AM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Saturday", startTime: "9:00AM", endTime: "1:00AM", crowdLevel: "busy" },
      { day: "Sunday", startTime: "9:00AM", endTime: "10:00PM", crowdLevel: "moderate" },
    ]
  },
];

export const ratings = [
  { id: "r1", venueId: "hannahs", scores: { vibe: 4.4, idStrictness: 4.6, crowdAge: 2.4, music: 4.6, dressCode: 2.1 }, comment: "DJ was on point; bouncers checking hard.", createdAt: new Date().toISOString() },
  { id: "r2", venueId: "tomgraineys", scores: { vibe: 4.6, idStrictness: 4.2, crowdAge: 2.2, music: 4.8, dressCode: 2.3 }, comment: "Main St. legend! Best dance floor.", createdAt: new Date().toISOString() },
  { id: "r3", venueId: "balcony", scores: { vibe: 4.7, idStrictness: 4.3, crowdAge: 2.1, music: 4.9, dressCode: 2.4 }, comment: "LGBTQ friendly, great music", createdAt: new Date().toISOString() },
  { id: "r4", venueId: "dirtylittleroddys", scores: { vibe: 4.5, idStrictness: 3.8, crowdAge: 2.5, music: 4.4, dressCode: 1.9 }, comment: "Mechanical bull is wild!", createdAt: new Date().toISOString() },
  { id: "r5", venueId: "thieves", scores: { vibe: 4.3, idStrictness: 4.0, crowdAge: 2.5, music: 4.2, dressCode: 3.4 }, comment: "Trendy downtown vibe", createdAt: new Date().toISOString() },
  { id: "r6", venueId: "bittercreek", scores: { vibe: 4.2, idStrictness: 3.5, crowdAge: 3.0, music: 3.2, dressCode: 2.0 }, comment: "Amazing beer selection!", createdAt: new Date().toISOString() },
  { id: "r7", venueId: "neurolux", scores: { vibe: 4.4, idStrictness: 3.8, crowdAge: 2.3, music: 4.6, dressCode: 2.5 }, comment: "Unique vibe, great shows", createdAt: new Date().toISOString() },
  { id: "r8", venueId: "amsterdam", scores: { vibe: 4.0, idStrictness: 3.9, crowdAge: 3.2, music: 3.5, dressCode: 3.3 }, comment: "Classy cocktails", createdAt: new Date().toISOString() },
  { id: "r9", venueId: "pengillys", scores: { vibe: 3.9, idStrictness: 4.0, crowdAge: 3.6, music: 3.7, dressCode: 2.7 }, comment: "Classic dive bar feels", createdAt: new Date().toISOString() },
  { id: "r10", venueId: "presspony", scores: { vibe: 4.1, idStrictness: 3.9, crowdAge: 2.8, music: 3.8, dressCode: 3.2 }, comment: "Great craft cocktails!", createdAt: new Date().toISOString() },
  { id: "r11", venueId: "sudstavern", scores: { vibe: 3.8, idStrictness: 3.5, crowdAge: 2.3, music: 3.5, dressCode: 1.8 }, comment: "Game day madness!", createdAt: new Date().toISOString() },
  { id: "r12", venueId: "mulligans", scores: { vibe: 3.9, idStrictness: 3.7, crowdAge: 2.4, music: 3.6, dressCode: 2.0 }, comment: "Good pregame spot", createdAt: new Date().toISOString() },
  { id: "r13", venueId: "theshed", scores: { vibe: 3.9, idStrictness: 3.6, crowdAge: 2.4, music: 3.7, dressCode: 1.9 }, comment: "College crowd heaven", createdAt: new Date().toISOString() },
  { id: "r14", venueId: "strangelove", scores: { vibe: 4.3, idStrictness: 3.9, crowdAge: 2.1, music: 4.5, dressCode: 2.8 }, comment: "High energy nights", createdAt: new Date().toISOString() },
  { id: "r15", venueId: "spacebar", scores: { vibe: 4.1, idStrictness: 3.4, crowdAge: 2.7, music: 3.9, dressCode: 1.7 }, comment: "So much fun!", createdAt: new Date().toISOString() },
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

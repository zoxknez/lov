export const navItems = [
  { href: "#estate", label: "Estate" },
  { href: "#game", label: "Game" },
  { href: "#experiences", label: "Experiences" },
  { href: "#guides", label: "Guides" },
  { href: "#contact", label: "Contact" }
];

export const metrics = [
  { value: "46,000+", label: "private alpine hectares" },
  { value: "1,300+", label: "guided trophy programs" },
  { value: "82%", label: "repeat guest rebook rate" },
  { value: "24/7", label: "concierge field support" }
];

export const trustBadges = [
  "Licensed NZ operation",
  "Insured field protocols",
  "International client desk",
  "Private lodge concierge",
  "1:1 guide model"
];

export const estateHighlights = [
  {
    title: "Kaimanawa high-country ridges",
    description: "Long-range visibility and controlled access lines for precision stalks.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-7"
  },
  {
    title: "Native beech forest corridors",
    description: "Silent transition zones mapped by wind and thermal behavior.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-5"
  },
  {
    title: "River basin movement lanes",
    description: "Natural game routes supported by year-round monitoring.",
    image: "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-6"
  },
  {
    title: "Dawn and dusk thermal windows",
    description: "Ethical, high-confidence opportunities in stable conditions.",
    image: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?auto=format&fit=crop&w=1600&q=80",
    span: "md:col-span-6"
  }
];

export const gameSpecies = [
  {
    title: "Red Stag",
    detail: "Signature New Zealand trophy class arranged around the strongest rut windows and guest expectations.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1300&q=80",
    trophyBand: "360 - 410+ SCI",
    primeSeason: "March - April",
    shotRange: "180m - 320m",
    terrain: "Alpine ridges / basin edges",
    difficulty: "Advanced",
    successRate: 88
  },
  {
    title: "Fallow Buck",
    detail: "Selective trophy management with calmer, curated windows for guests who value precision and pacing.",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1300&q=80",
    trophyBand: "175 - 210 SCI",
    primeSeason: "April - May",
    shotRange: "120m - 260m",
    terrain: "Mixed forest transition lanes",
    difficulty: "Intermediate",
    successRate: 84
  },
  {
    title: "Wild Boar",
    detail: "A more dynamic program style balanced by strong safety discipline and tight guide coordination.",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1300&q=80",
    trophyBand: "Elite tusk class",
    primeSeason: "Year-round",
    shotRange: "70m - 190m",
    terrain: "Forest edge / creek routes",
    difficulty: "Intermediate+",
    successRate: 79
  }
];

export const trophyItems = [
  {
    title: "410+ Red Stag",
    season: "Autumn Peak Rut",
    note: "Archived from a dawn ridge approach after a two-day weather hold and careful timing reset.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80",
    score: "SCI 410+",
    distanceM: 236,
    wind: "4 km/h SW",
    caliber: ".300 Win Mag",
    guide: "Mason Clarke",
    confidence: 96
  },
  {
    title: "Highland Fallow",
    season: "Late Winter",
    note: "Recorded from a low-signature access route where the day rewarded patience more than speed.",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1600&q=80",
    score: "SCI 198",
    distanceM: 212,
    wind: "7 km/h E",
    caliber: ".308",
    guide: "Reid Kavanagh",
    confidence: 93
  },
  {
    title: "Boar Multi-Day",
    season: "All Season",
    note: "Drawn from a mixed-terrain program where logistics and pacing mattered as much as the final moment.",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1600&q=80",
    score: "Elite Class",
    distanceM: 148,
    wind: "11 km/h SE",
    caliber: ".30-06",
    guide: "Noah Bennett",
    confidence: 91
  }
];

export const mapZones = [
  {
    id: "north-ridge",
    title: "North Ridge",
    text: "Primary glassing corridor with high dawn movement.",
    x: 22,
    y: 26,
    elevationM: 1220,
    shotWindow: "06:00 - 07:30",
    density: "High",
    dominantSpecies: "Red Stag",
    risk: "Medium"
  },
  {
    id: "basin-line",
    title: "Basin Line",
    text: "Natural crossing lane around river basins.",
    x: 53,
    y: 58,
    elevationM: 910,
    shotWindow: "17:45 - 19:15",
    density: "Medium",
    dominantSpecies: "Fallow Buck",
    risk: "Low"
  },
  {
    id: "southern-forest",
    title: "Southern Forest",
    text: "Silent transition route for close-approach stalks.",
    x: 72,
    y: 38,
    elevationM: 760,
    shotWindow: "05:45 - 07:00",
    density: "Medium-High",
    dominantSpecies: "Wild Boar",
    risk: "Low"
  }
];

export const availabilitySlots = [
  { month: "April 2026", status: "Limited", spots: 3 },
  { month: "May 2026", status: "Open", spots: 6 },
  { month: "June 2026", status: "Open", spots: 5 },
  { month: "July 2026", status: "Waitlist", spots: 0 }
];

export const experiences = [
  {
    title: "Heli Access and Scenic Flights",
    text: "Private arrival or scenic lift options that add drama without disturbing the itinerary rhythm.",
    icon: "Aerial",
    duration: "45-90 min",
    group: "2-5 guests",
    cadence: "Sunrise / Sunset windows",
    level: "Ultra-premium"
  },
  {
    title: "Lodge Gastronomy Program",
    text: "Chef-led seasonal dining that gives the evenings the same sense of care as the field program.",
    icon: "Cuisine",
    duration: "Evening service",
    group: "Private table",
    cadence: "Daily",
    level: "Luxury"
  },
  {
    title: "Alpine Fishing Sessions",
    text: "Quiet guided sessions on remote water for guests who want a softer contrast to the main program.",
    icon: "Fishing",
    duration: "Half-day / Full-day",
    group: "1-3 guests",
    cadence: "Weather-tuned",
    level: "Premium"
  },
  {
    title: "Private Family Adventure Days",
    text: "Horseback routes, estate touring, and curated outdoor days designed for companions and families.",
    icon: "Family",
    duration: "Full-day",
    group: "Family capsule",
    cadence: "Flexible",
    level: "Premium+"
  }
];

export const guideStories = [
  {
    name: "Mason Clarke",
    role: "Lead Trophy Director",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=900&q=80",
    story: "Known for shaping strong red stag days around patience, weather discipline, and guest calm rather than rushed decisions.",
    years: 17,
    trophies: 240,
    successRate: 94,
    safetyScore: "A+",
    specialization: "High-score Red Stag",
    languages: "English / German"
  },
  {
    name: "Reid Kavanagh",
    role: "Field Strategy Specialist",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    story: "Favored for wind-reading, quiet access, and keeping pressured days tactically clean without feeling tense.",
    years: 14,
    trophies: 188,
    successRate: 91,
    safetyScore: "A",
    specialization: "Wind and terrain tactics",
    languages: "English / French"
  },
  {
    name: "Noah Bennett",
    role: "Safety and Expedition Lead",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
    story: "Coordinates logistics, communications, and contingency planning so guest confidence stays high from start to finish.",
    years: 16,
    trophies: 203,
    successRate: 92,
    safetyScore: "A+",
    specialization: "Safety and extraction logistics",
    languages: "English / Spanish"
  }
];

export const rotatingNotes = [
  "Autumn peak-rut capsules now open for 2027 premium allocations.",
  "Dual-guide signature package now includes drone scouting overlays.",
  "New ultra-premium lodge wing now live for private group bookings."
];

export const commandCenterZones = [
  {
    id: "kaimanawa-core",
    name: "Kaimanawa Core Basin",
    region: "Central North Island, NZ",
    timezone: "Pacific/Auckland",
    coordinates: "39.04S, 175.88E",
    elevationM: 1140,
    temperatureC: 9,
    feelsLikeC: 6,
    windKmh: 19,
    windDir: "SW",
    humidity: 72,
    visibilityKm: 17,
    pressureHpa: 1018,
    moonPhase: "Waxing Gibbous",
    sunrise: "06:41",
    sunset: "19:52",
    shotWindow: "06:05 - 07:40 / 18:20 - 19:35",
    riskLevel: "Controlled",
    recommendation: "Ridge approach 2B is preferred once thermal layers settle after 06:10.",
    species: [
      { name: "Red Stag", activity: 84, status: "Strong dawn movement" },
      { name: "Fallow Buck", activity: 62, status: "Moderate crossing pattern" },
      { name: "Wild Boar", activity: 55, status: "Forest-edge activity" }
    ]
  },
  {
    id: "ruahine-ridge",
    name: "Ruahine Alpine Sector",
    region: "Hawke's Bay - Manawatu, NZ",
    timezone: "Pacific/Auckland",
    coordinates: "39.80S, 176.05E",
    elevationM: 1315,
    temperatureC: 6,
    feelsLikeC: 2,
    windKmh: 27,
    windDir: "W",
    humidity: 65,
    visibilityKm: 22,
    pressureHpa: 1021,
    moonPhase: "Waxing Gibbous",
    sunrise: "06:38",
    sunset: "19:50",
    shotWindow: "06:00 - 07:25 / 18:10 - 19:25",
    riskLevel: "Wind-sensitive",
    recommendation: "Corridor North-3 becomes the cleaner option if crosswind rises above 30 km/h.",
    species: [
      { name: "Red Stag", activity: 73, status: "Ridge transit pattern" },
      { name: "Chamois", activity: 58, status: "Higher face visibility" },
      { name: "Wild Boar", activity: 49, status: "Lower ravine sign" }
    ]
  },
  {
    id: "taupo-forest",
    name: "Taupo Forest Fringe",
    region: "Waikato, NZ",
    timezone: "Pacific/Auckland",
    coordinates: "38.82S, 176.23E",
    elevationM: 790,
    temperatureC: 12,
    feelsLikeC: 11,
    windKmh: 12,
    windDir: "SE",
    humidity: 79,
    visibilityKm: 12,
    pressureHpa: 1016,
    moonPhase: "Waxing Gibbous",
    sunrise: "06:36",
    sunset: "19:48",
    shotWindow: "05:55 - 07:20 / 18:05 - 19:20",
    riskLevel: "Low",
    recommendation: "Forest edge line C offers the most composed close-range setup under these conditions.",
    species: [
      { name: "Sika Deer", activity: 81, status: "Strong dawn feed" },
      { name: "Red Stag", activity: 64, status: "Mixed corridor pattern" },
      { name: "Wild Boar", activity: 59, status: "Creek route activity" }
    ]
  }
];

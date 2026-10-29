/* =====================================================================
   DATA — edit here.
   Adding a new group departure = copy the Blossom object in DEPARTURES and
   change its details. It appears on the homepage and gets its own page at
   /tours/<slug>. The first one with featured:true is shown large.
   ===================================================================== */
var M = "/media/img/";
var BOOK_EMAIL = "info@exploria.pk";

var DEPARTURES = [
  {
    id: "blossom-2027",
    slug: "spring-blossom-tour-2027",
    featured: true,
    status: "Booking open",
    season: "Spring 2027",
    title: "Pakistan Spring Blossom Tour",
    region: "Hunza & Skardu",
    tagline: "Come for the blossoms. Leave with Pakistan in your heart.",
    summary: "Ten days through the blossom-filled valleys, fruit orchards and viewpoints of Skardu and Hunza, with a Hunza Bazam night of folk music and a traditional dinner.",
    start: "2027-04-02", end: "2027-04-11",
    dates: "2 – 11 April 2027", duration: "10 days / 9 nights",
    group: "4–8 guests", price: "USD 1,900", priceNote: "per person, twin sharing",
    deposit: "USD 380", single: "USD 400",
    route: ["Islamabad", "Skardu", "Shigar", "Hunza", "Attabad", "Naltar", "Gilgit", "Islamabad"],
    images: [
      { src: M + "blossom-rakaposhi.jpg", alt: "Apricot blossom in front of Rakaposhi, Hunza" },
      { src: M + "blossom-passu.jpg", alt: "Orchards in bloom below the Passu Cones" },
      { src: M + "blossom-village.jpg", alt: "Apple blossom in a Hunza village" },
      { src: M + "blossom-branch.jpg", alt: "Blossoming branches against snow peaks" },
      { src: M + "attabad.jpg", alt: "Attabad Lake in the Hunza valley" },
      { src: M + "passu-bridge.jpg", alt: "The Passu suspension bridge over the Hunza River" },
      { src: M + "hunza-blossom.webp", alt: "Apricot blossom across the Hunza valley" }
    ],
    highlights: [
      ["Blossom season in Hunza", "Apricot, cherry and apple orchards in flower below Rakaposhi and the Passu Cones."],
      ["A Hunza Bazam night", "Folk music, cultural performances and a traditional Hunzai dinner by the fire."],
      ["Forts of the Karakoram", "Shigar, Baltit and Altit forts, and the old Altit settlement."],
      ["Lakes and a cold desert", "Attabad, Borith and Kachura lakes, and a jeep safari over the Cold Desert dunes."],
      ["Mountain flights", "Fly into Skardu and out of Gilgit, with a road transfer included if a flight is cancelled."],
      ["Small group, local hosts", "4 to 8 guests with a team born in Hunza, so village homes open their doors."]
    ],
    /* map stops: lon/lat for the route map on the tour page */
    stops: {
      islamabad: { name: "Islamabad", lon: 73.05, lat: 33.7 },
      skardu: { name: "Skardu & Shigar", lon: 75.63, lat: 35.3 },
      hunza: { name: "Karimabad, Hunza", lon: 74.66, lat: 36.32 },
      attabad: { name: "Attabad & Passu", lon: 74.85, lat: 36.45 },
      gilgit: { name: "Naltar & Gilgit", lon: 74.31, lat: 35.92 }
    },
    stopOrder: ["islamabad", "skardu", "hunza", "attabad", "gilgit", "islamabad"],
    info: [
      ["Where you'll stay", "Nine nights in handpicked 3-star hotels and resorts chosen for location, comfort and hospitality. Rooms are twin sharing; a private room is USD 400 extra."],
      ["Domestic flights", "Islamabad–Skardu and Gilgit–Islamabad flights are included. If one is cancelled, we arrange the road journey at no extra charge where it's safe and feasible."],
      ["About the blossom", "We chose these dates from seasonal research to give the best chance of blossom. Flowering depends on weather and altitude, so it can't be guaranteed, but our local team will adjust the route to find the best orchards."],
      ["Booking & payment", "A 20% deposit (USD 380 per person) secures your place. The balance is due at least 20 days before the tour. The deposit is non-refundable in cash but can be kept as travel credit for one fiscal year."]
    ],
    days: [
      { s: "islamabad", t: "Arrival in Islamabad", d: "Friday, 2 April 2027", p: ["Our guide meets you at Islamabad International Airport.", "Transfer to the hotel, settle in and rest.", "Help with local SIM cards and currency exchange.", "Overnight in Islamabad."] },
      { s: "skardu", t: "Fly to Skardu & explore Shigar Valley", d: "Saturday, 3 April 2027", p: ["Morning flight from Islamabad to Skardu, subject to weather.", "Jeep safari across the dunes of the Cold Desert.", "Explore historic Shigar Fort and the architecture of Baltistan.", "Overnight in Skardu."] },
      { s: "skardu", t: "Skardu & Kachura Valley", d: "Sunday, 4 April 2027", p: ["Manthal Buddha Rock and Sadpara Lake.", "Upper Kachura Lake, Shangrila Lake and Soq Valley.", "Spring scenery and blossoms; optional boating and ziplining at Upper Kachura.", "Overnight in Skardu."] },
      { s: "hunza", t: "Scenic road to Hunza", d: "Monday, 5 April 2027", p: ["Drive the mountain roads of Gilgit-Baltistan along the Indus.", "Evening in Karimabad's lanes, shops and cafés.", "Overnight near Karimabad."] },
      { s: "hunza", t: "Central Hunza & Bazam night", d: "Tuesday, 6 April 2027", p: ["Baltit Fort, Altit Fort and the Altit old settlement.", "Sunset over Hunza from Duikar.", "A Hunza Bazam night: folk music, cultural performances and a traditional Hunzai dinner, with a bonfire where safe.", "Overnight in Hunza."] },
      { s: "attabad", t: "Attabad Lake, Passu Cones & Borith Lake", d: "Wednesday, 7 April 2027", p: ["Group boating on turquoise Attabad Lake.", "Optional hike to Baskochi Meadows.", "Hussaini Suspension Bridge, with optional zipline.", "Borith Lake and the Passu Cones; orchards of Gojal in bloom.", "Overnight near Attabad Lake."] },
      { s: "attabad", t: "Hunza blossom & traditional villages", d: "Thursday, 8 April 2027", p: ["Blossom landscapes of Upper Hunza.", "Khyber and other villages, chosen by where the trees are flowering.", "Village lanes, local families and photography.", "Overnight near Attabad Lake."] },
      { s: "gilgit", t: "Naltar Valley & Gilgit", d: "Friday, 9 April 2027", p: ["Forests and mountain scenery of Naltar Valley.", "Evening drive to Gilgit.", "Overnight in Gilgit."] },
      { s: "islamabad", t: "Fly to Islamabad & the capital", d: "Saturday, 10 April 2027", p: ["Flight from Gilgit to Islamabad, subject to weather.", "Faisal Mosque, Saidpur Village, Pakistan Monument and Lok Virsa Museum.", "Farewell dinner with views over Islamabad."] },
      { s: "islamabad", t: "Departure", d: "Sunday, 11 April 2027", p: ["Transfer to Islamabad International Airport for your flight home."] }
    ],
    included: [
      "Domestic flights Islamabad–Skardu and Gilgit–Islamabad",
      "9 nights in handpicked 3-star hotels and resorts, twin sharing",
      "All breakfasts and lunches",
      "Hunzai dinner at the Bazam night and farewell dinner in Islamabad",
      "Private transport, English-speaking guide and driver, fuel, parking and tolls",
      "Cold Desert jeep safari and group boating at Attabad Lake",
      "Optional boating, kayaking, ziplining and the Baskochi hike, when available",
      "Road transfer at no extra cost if a domestic flight is cancelled"
    ],
    excluded: [
      "Entry tickets to forts, museums and attractions",
      "Dinners other than the two listed",
      "Personal expenses: laundry, drinks, snacks, shopping",
      "Tips for guide and driver"
    ],
    faq: [
      { q: "Is blossom guaranteed?", a: "We chose these dates from seasonal research to give the best chance of blossom. Flowering depends on temperature and altitude, so timing can't be guaranteed, but our local team will adapt the route to find the best orchards." },
      { q: "Can solo travellers join?", a: "Yes. A USD 400 single supplement applies for a private room, or ask us about twin-share arrangements." },
      { q: "Is it suitable for children or older travellers?", a: "We don't recommend this departure for young children. It suits fit, active older travellers comfortable with long drives and uneven ground." },
      { q: "What is the luggage allowance on domestic flights?", a: "Usually 20 kg checked plus 7 kg cabin baggage. Extra luggage can be stored in Islamabad for a fee." },
      { q: "What is the cancellation policy?", a: "The 20% deposit is non-refundable in cash but can be kept as travel credit for up to one fiscal year, subject to availability." }
    ]
  }
];

/* Upcoming slots — shown as teasers until the itinerary is ready. */
var COMING = [
  { season: "Autumn 2027", title: "Hunza & Skardu in autumn gold", line: "Poplars, apricot orchards and clear October skies.", img: M + "hunza-autumn.jpg" },
  { season: "Summer 2027", title: "K2 Base Camp group trek", line: "Up the Baltoro Glacier to Concordia and K2.", img: M + "k2-concordia.jpg" }
];

var TOURS = [
  { kind: "mountain", label: "Group departure", group: true, title: "Spring Blossom Tour 2027", where: "hunza skardu", line: "Hunza and Skardu in blossom season, 2–11 April 2027, with a Bazam folk night.", days: "10 days", price: "USD 1,900", img: M + "blossom-passu.jpg", url: "/tours/spring-blossom-tour-2027" },
  { kind: "trek", label: "Trek", title: "K2 Base Camp Trek", where: "skardu", line: "Askole, the Baltoro Glacier and Concordia, ringed by four 8,000 m peaks.", days: "21 days", img: M + "tours/k2-base-camp.jpg", url: "https://www.exploria.pk/tour/k2-base-camp-trek-pakistan/" },
  { kind: "trek", label: "Trek", title: "K2 Base Camp & Gondogoro La", where: "skardu", line: "The classic K2 trek, returning over a 5,585 m pass to Hushe.", days: "20 days", img: M + "mitre-peak.jpg", url: "https://www.exploria.pk/tour/k2-base-camp-trek-gondogoro-la-pakistan/" },
  { kind: "trek", label: "Trek", title: "Snow Lake & Hispar La", where: "skardu hunza", line: "One of the longest glacier journeys outside the polar regions.", days: "21 days", img: M + "tours/snow-lake.jpg", url: "https://www.exploria.pk/tour/snow-lake-hiper-la-trek/" },
  { kind: "trek", label: "Trek", title: "Patundas Trek", where: "hunza", line: "High meadows above Passu with views across the Batura glacier.", days: "9 days", img: M + "tours/patundas.jpg", url: "https://www.exploria.pk/tour/patundas-trek-pakistan/" },
  { kind: "trek", label: "Trek", title: "Rakaposhi Base Camp", where: "hunza", line: "A short, steep walk from Minapin to the foot of Rakaposhi.", days: "2 days", img: M + "tours/rakaposhi.jpg", url: "https://www.exploria.pk/tour/rakaposhi-base-camp-trek/" },
  { kind: "trek", label: "Adventure", title: "Cycling the Karakoram Highway", where: "hunza", line: "Ride the KKH through Hunza towards the Khunjerab Pass.", days: "16 days", img: M + "tours/cycling.jpg", url: "https://www.exploria.pk/tour/cycling-adventure-on-the-karakoram-highway/" },
  { kind: "mountain", label: "Tour", title: "Autumn in Hunza", where: "hunza", line: "Golden poplars, forts and orchards at harvest time.", days: "7 days", img: M + "tours/hunza-autumn.jpg", url: "https://www.exploria.pk/tour/hunza-autumn-tour/" },
  { kind: "mountain", label: "Tour", title: "Hindu Kush Overland", where: "hunza chitral", line: "Hunza, Chitral and the Kalash valleys by road.", days: "15 days", img: M + "tours/hindu-kush.jpg", url: "https://www.exploria.pk/tour/hindu-kush-tour-northern-pakistan/" },
  { kind: "mountain", label: "Tour", title: "Pakistan Odyssey", where: "punjab sindh hunza skardu", line: "From Cholistan's forts to the high Karakoram in one journey.", days: "20 days", img: M + "tours/odyssey.jpg", url: "https://www.exploria.pk/tour/pakistan-odyssey-the-complete-20-day-expedition/" },
  { kind: "culture", label: "Festival", title: "Shandur Polo Festival", where: "chitral hunza", line: "Polo on the world's highest polo ground, plus Hunza and Chitral.", days: "10 days", img: M + "tours/shandur.jpg", url: "https://www.exploria.pk/tour/shandur-polo-festival-pakistan/" },
  { kind: "culture", label: "Festival", title: "Kalash Chilam Joshi Festival", where: "chitral", line: "The Kalash spring festival of dance, song and milk-sharing.", days: "9 days", img: M + "chilam-joshi.jpg", url: "https://www.exploria.pk/tour/tour-kalash-valley-pakistan-chilam-joshi-festival-special/" },
  { kind: "culture", label: "Culture", title: "Indus Valley & Gandhara", where: "sindh punjab", line: "Mohenjo-daro, Taxila, Takht-i-Bahi and Makli.", days: "14 days", img: M + "tours/indus.jpg", url: "https://www.exploria.pk/tour/indus-valley-civilization-tour/" },
  { kind: "culture", label: "Pilgrimage", title: "Sikh Pilgrimage: Kartarpur & Nankana Sahib", where: "punjab", line: "The gurdwaras of Punjab with a local guide.", days: "9 days", img: M + "tours/sikh.jpg", url: "https://www.exploria.pk/tour/sikh-pilgrimage-kartarpur-sahib-tour-pakistan/" },
  { kind: "day", label: "Day tour", title: "Lahore Full-Day Guided Tour", where: "punjab", line: "Lahore Fort, Badshahi Mosque and the Walled City.", days: "1 day", img: M + "tours/lahore-day.webp", url: "https://www.exploria.pk/tour/lahore-full-day-sightseeing-guided-tour/" },
  { kind: "day", label: "Day tour", title: "Lahore Night Food Tour", where: "punjab", line: "Food streets, chai and the old city after dark.", days: "Evening", img: M + "food-street.webp", url: "https://www.exploria.pk/tour/lahores-complete-night-food-tour-local-culinary-experience/" },
  { kind: "day", label: "Day tour", title: "Taxila from Islamabad", where: "punjab", line: "Gandhara monasteries and the Taxila Museum.", days: "1 day", img: M + "taxila.jpg", url: "https://www.exploria.pk/tour/1-day-trip-from-islamabad/" }
];
var WHERE = [["any", "Anywhere in Pakistan"], ["hunza", "Hunza & Nagar"], ["skardu", "Skardu, K2 & Baltistan"], ["chitral", "Chitral & Kalash"], ["punjab", "Lahore, Islamabad & Punjab"], ["sindh", "Sindh & the Indus"]];
var FILTERS = [["all", "All"], ["group", "Group departures"], ["trek", "Treks & adventure"], ["mountain", "Mountain tours"], ["culture", "Culture & festivals"], ["day", "Day tours"], ["saved", "Saved ♥"]];

var PLACES = [
  { id: "k2", name: "K2 & Concordia", reg: "Karakoram · Baltistan", lon: 76.51, lat: 35.88, alt: "8,611 m", season: "June – August", img: M + "k2-concordia.jpg", txt: "The second-highest mountain on Earth, reached on foot up the Baltoro Glacier. At Concordia you stand among four 8,000 m peaks.", link: "#tours", filter: "trek" },
  { id: "hunza", side: "l", name: "Hunza Valley", reg: "Karakoram · Gilgit-Baltistan", lon: 74.66, lat: 36.32, alt: "2,500 m", season: "April – October", img: M + "attabad.jpg", txt: "Old forts above apricot orchards, Attabad Lake and the Passu Cones. The heart of our Spring Blossom Tour.", link: "#departures" },
  { id: "skardu", name: "Skardu & Shigar", reg: "Baltistan", lon: 75.63, lat: 35.3, alt: "2,228 m", season: "April – October", img: M + "deosai.jpg", txt: "Gateway to K2, with the Cold Desert dunes, Shigar Fort, Kachura lakes and the Deosai Plateau nearby.", link: "#tours", filter: "mountain" },
  { id: "fairy", side: "l", name: "Fairy Meadows", reg: "Himalaya · Diamer", lon: 74.58, lat: 35.39, alt: "3,300 m", season: "June – September", img: M + "fairy-meadows.jpg", txt: "Pine meadows facing the north face of Nanga Parbat, reached by jeep and a short trek.", link: "#tours", filter: "trek" },
  { id: "kalash", side: "l", name: "Chitral & Kalash", reg: "Hindu Kush · Khyber Pakhtunkhwa", lon: 71.7, lat: 35.7, alt: "1,500 m", season: "May – October", img: M + "kalash-houses.jpg", txt: "The Kalash valleys keep their own faith and festivals, below the Hindu Kush and Tirich Mir.", link: "#tours", filter: "culture" },
  { id: "islamabad", name: "Islamabad & Taxila", reg: "Capital Territory · Punjab", lon: 73.05, lat: 33.7, alt: "540 m", season: "October – April", img: M + "faisal-mosque.jpg", txt: "A green capital below the Margalla Hills, an hour from the Gandhara ruins of Taxila.", link: "#tours", filter: "day" },
  { id: "lahore", name: "Lahore", reg: "Punjab", lon: 74.35, lat: 31.55, alt: "217 m", season: "October – March", img: M + "badshahi-dusk.jpg", txt: "Mughal forts and mosques, the Walled City and the busiest food streets in the country.", link: "#tours", filter: "culture" },
  { id: "derawar", name: "Derawar & Cholistan", reg: "Desert · Bahawalpur", lon: 71.33, lat: 28.77, alt: "110 m", season: "November – February", img: M + "derawar-fort.jpg", txt: "Forty bastions rise out of the Cholistan desert at Derawar Fort.", link: "#tours", filter: "mountain" },
  { id: "mohenjo", name: "Mohenjo-daro", reg: "Indus Valley · Sindh", lon: 68.14, lat: 27.33, alt: "50 m", season: "November – February", img: M + "mohenjo-daro.jpg", txt: "One of the world's earliest planned cities, built about 4,500 years ago.", link: "#tours", filter: "culture" },
  { id: "karachi", name: "Karachi & Makli", reg: "Coast · Sindh", lon: 67.0, lat: 24.86, alt: "0 m", season: "November – February", img: M + "makli.jpg", txt: "Pakistan's biggest city, an hour from the carved tombs of Makli necropolis.", link: "#tours", filter: "day" },
  { id: "hingol", side: "l", name: "Hingol & the Makran Coast", reg: "Coast · Balochistan", lon: 65.5, lat: 25.5, alt: "0 – 1,500 m", season: "November – March", img: M + "hingol.jpg", txt: "Wind-carved cliffs and empty beaches along the coastal highway to Gwadar.", link: "#enquire" }
];

var BORDER = [[74.6,37.05],[75.2,36.95],[75.9,36.6],[76.2,36.2],[76.9,35.85],[77.8,35.5],[76.8,35.05],[76.0,34.9],[75.3,34.6],[74.6,34.5],[74.0,34.0],[73.9,33.4],[74.3,33.0],[74.65,32.5],[74.6,31.9],[74.55,31.45],[74.6,31.1],[74.0,30.6],[73.4,29.95],[73.0,29.3],[72.4,28.5],[71.9,27.95],[70.6,27.75],[69.6,27.2],[69.9,26.6],[70.15,26.2],[70.1,25.7],[70.6,25.4],[71.1,24.7],[70.9,24.3],[69.6,24.25],[68.8,24.3],[68.6,23.8],[67.6,23.9],[67.3,24.6],[66.9,24.85],[66.6,25.4],[66.1,25.45],[65.3,25.35],[64.6,25.2],[63.5,25.25],[62.3,25.15],[61.6,25.2],[61.85,26.2],[62.3,26.4],[63.2,26.65],[63.3,27.2],[62.8,27.3],[62.8,28.25],[61.9,28.55],[61.5,29.0],[60.9,29.85],[62.4,29.4],[63.6,29.5],[64.3,29.55],[66.3,29.85],[66.4,30.4],[66.45,30.95],[67.6,31.5],[68.6,31.75],[69.3,31.95],[69.5,32.6],[70.0,33.1],[70.3,33.4],[69.9,33.95],[71.1,34.1],[71.1,34.5],[71.5,34.95],[71.6,35.4],[71.5,35.8],[71.8,36.4],[72.6,36.8],[73.6,36.9],[74.1,36.85]];

var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var MOUNT = [0,0,0,1,1,2,2,2,2,1,0,0];
var CITY  = [2,2,1,0,0,0,0,0,0,1,2,2];
var MONTH_NOTES = [
  ["January", "Cities at their best: cool, sunny days in Lahore and Sindh. Snow closes the high mountain roads.", "#tours", "culture"],
  ["February", "Clear winter light for Mohenjo-daro, Makli and Lahore's old city. The north is quiet and white.", "#tours", "culture"],
  ["March", "The plains warm up and the first blossom appears in the lower valleys of Gilgit-Baltistan.", "#departures", null],
  ["April", "Blossom season in Hunza and Skardu. Our Spring Blossom Tour departs on 2 April 2027.", "#departures", null],
  ["May", "Chilam Joshi in the Kalash valleys, and the Karakoram Highway fully opens towards Khunjerab.", "#tours", "culture"],
  ["June", "Trekking season begins: K2 Base Camp, Fairy Meadows and the high meadows above Hunza.", "#tours", "trek"],
  ["July", "Shandur Polo Festival, Deosai in flower and the best of the high treks.", "#tours", "trek"],
  ["August", "Peak season for glaciers and base camps. The plains are hot and humid.", "#tours", "trek"],
  ["September", "Clear skies after the monsoon and the last of the big treks.", "#tours", "trek"],
  ["October", "Autumn gold in the poplars of Hunza and Skardu, and cities start to cool.", "#tours", "mountain"],
  ["November", "Back to the plains: heritage tours, food streets and desert forts.", "#tours", "culture"],
  ["December", "Lahore's winter food season, and snow scenery in Swat and Murree.", "#tours", "day"]
];

var FLOW = {
  adventure: { title: "Adventure", q: "How far do you want to push?", options: [
    { id: "gentle", img: M + "hunza-autumn.jpg", num: "01", label: "Gentle", line: "Valley road trips and jeep safaris, a proper bed every night.",
      result: { img: M + "fairy-meadows.jpg", alt: "A hiker looks out at Nanga Parbat from Fairy Meadows", title: "Valleys by road", text: "Hunza, Skardu and Fairy Meadows along the Karakoram Highway, with short walks out to glaciers and viewpoints.", season: "April – October", cta: "See mountain tours", filter: "mountain" } },
    { id: "trekker", img: M + "patundas.jpg", num: "02", label: "Trekker", line: "Multi-day treks to base camps and high meadows.",
      result: { img: M + "rakaposhi.jpg", alt: "A trekker at Rakaposhi Base Camp", title: "Base camp treks", text: "Walk to the foot of the giants: Nanga Parbat from Fairy Meadows, Rakaposhi from Minapin, and the glaciers around Passu.", season: "June – September", cta: "See treks", filter: "trek" } },
    { id: "expedition", img: M + "snow-lake.jpg", num: "03", label: "Expedition", line: "Glacier crossings and high passes, for the fit and determined.",
      result: { img: M + "mitre-peak.jpg", alt: "Mitre Peak above the glacier at Concordia", title: "Glaciers & high passes", text: "Up the Baltoro Glacier to Concordia and K2 Base Camp, and over the Gondogoro La. Plan on two to three weeks.", season: "June – August", cta: "See expeditions", filter: "trek" } }
  ]},
  culture: { title: "Culture", q: "Which story draws you in?", options: [
    { id: "mughal", img: M + "badshahi-day.jpg", num: "01", label: "Mughal & Sikh Punjab", line: "Lahore Fort, the Badshahi Mosque and the gurdwaras.",
      result: { img: M + "badshahi-dusk.jpg", alt: "The Badshahi Mosque at dusk", title: "Mughal & Sikh Punjab", text: "Lahore Fort, the Badshahi Mosque and the Shalimar Gardens, the food streets of the Walled City, and the gurdwaras of Nankana Sahib and Kartarpur.", season: "October – March", cta: "See culture tours", filter: "culture" } },
    { id: "ancient", img: M + "mohenjo-daro.jpg", num: "02", label: "Ancient civilisations", line: "Mohenjo-daro, Taxila and the world of Gandhara.",
      result: { img: M + "makli.jpg", alt: "Carved stone tombs at Makli", title: "Ancient civilisations", text: "Mohenjo-daro on the Indus, the Buddhist monasteries of Taxila and Takht-i-Bahi, and the carved tombs of Makli.", season: "November – February", cta: "See heritage tours", filter: "culture" } },
    { id: "living", img: M + "sehwan-shrine.jpg", num: "03", label: "Living traditions", line: "Sufi shrines, bazaars, food and festivals.",
      result: { img: M + "chilam-joshi.jpg", alt: "Kalash women dancing at the Chilam Joshi festival", title: "Shrines, bazaars & festivals", text: "Qawwali at Sufi shrines, the blue-tiled tombs of Multan, the old bazaars and food streets of Lahore and Peshawar, and the spring festival of the Kalash valleys.", season: "October – May", cta: "See festival tours", filter: "culture" } }
  ]},
  both: { title: "A bit of both", q: "How much time do you have?", options: [
    { id: "short", img: M + "wazir-khan.jpg", num: "01", label: "7 – 10 days", line: "Blossom valleys, or Lahore's highlights and a flight north.",
      result: { img: M + "blossom-rakaposhi.jpg", alt: "Apricot blossom in front of Rakaposhi", title: "Spring Blossom Tour 2027", text: "Our 10-day small-group departure through Skardu and Hunza in blossom season, with a Bazam night of Hunza folk music and a day in Islamabad.", season: "2 – 11 April 2027", cta: "See the departure", href: "#departures" } },
    { id: "mid", img: M + "hunza-biking.jpg", num: "02", label: "About two weeks", line: "Punjab, Islamabad and the Karakoram Highway.",
      result: { img: M + "attabad.jpg", alt: "Attabad Lake in the Hunza valley", title: "The grand road north", text: "Lahore and Islamabad, then the length of the Karakoram Highway to Hunza and the Khunjerab Pass.", season: "May, September – October", cta: "See mountain tours", filter: "mountain" } },
    { id: "long", img: M + "derawar-fort.jpg", num: "03", label: "Three weeks or more", line: "From the Indus to the high valleys.",
      result: { img: M + "deosai.jpg", alt: "The Deosai Plateau", title: "Coast to mountains", text: "From the Indus ruins of Sindh, through Punjab, to the high valleys of Gilgit-Baltistan.", season: "Late September – October", cta: "See long journeys", filter: "mountain" } }
  ]}
};
var INTENTS = [
  { id: "adventure", img: M + "k2-concordia.jpg", num: "01", label: "Adventure", line: "Peaks, glaciers and high trails." },
  { id: "culture", img: M + "badshahi-arch.jpg", num: "02", label: "Culture", line: "Mughal cities, ancient ruins and Sufi shrines." },
  { id: "both", img: M + "hunza-blossom.webp", num: "03", label: "A bit of both", line: "From Lahore's lanes to Hunza's valleys." }
];

/* ===================================================================== */

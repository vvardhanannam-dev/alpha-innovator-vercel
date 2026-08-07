"use client";

import { useEffect, useMemo, useState } from "react";

type View =
  | "Discover"
  | "Budget"
  | "Itinerary"
  | "Packing"
  | "Weather"
  | "Safety"
  | "AI Assistant"
  | "Currency";

const nav: { label: View; icon: string }[] = [
  { label: "Discover", icon: "◎" },
  { label: "Budget", icon: "▣" },
  { label: "Itinerary", icon: "▦" },
  { label: "Packing", icon: "☑" },
  { label: "Weather", icon: "☁" },
  { label: "Safety", icon: "♢" },
  { label: "AI Assistant", icon: "✦" },
  { label: "Currency", icon: "$" },
];

const destinations = [
  [
    "Jaipur",
    "Rajasthan, India",
    "Heritage",
    "31°C",
    "4.8",
    "91",
    "Pink City palaces and vibrant bazaars",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Goa",
    "India",
    "Beach",
    "29°C",
    "4.7",
    "88",
    "Golden beaches and Portuguese streets",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Kerala",
    "India",
    "Nature",
    "27°C",
    "4.9",
    "94",
    "Backwaters, tea gardens and green hills",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Varanasi",
    "Uttar Pradesh, India",
    "Spiritual",
    "30°C",
    "4.6",
    "86",
    "Sunrise rituals along the sacred Ganga",
    "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Manali",
    "Himachal Pradesh, India",
    "Adventure",
    "14°C",
    "4.8",
    "90",
    "Himalayan valleys and mountain trails",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Agra",
    "Uttar Pradesh, India",
    "Iconic",
    "32°C",
    "4.8",
    "92",
    "The timeless Taj Mahal at sunrise",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Kyoto",
    "Japan",
    "International",
    "22°C",
    "4.9",
    "96",
    "Temples and bamboo groves",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Dubai",
    "UAE",
    "International",
    "34°C",
    "4.7",
    "90",
    "Modern skylines and desert adventures",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  ],
  [
    "Bali",
    "Indonesia",
    "International",
    "26°C",
    "4.7",
    "89",
    "Rice terraces and island culture",
    "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=900&q=80",
  ],
];

const indiaCities: Record<
  string,
  { state: string; x: number; y: number; highlights: string[] }
> = {
  Hyderabad: {
    state: "Telangana",
    x: 0,
    y: 0,
    highlights: ["Charminar", "Golconda Fort", "Hussain Sagar"],
  },
  Visakhapatnam: {
    state: "Andhra Pradesh",
    x: 505,
    y: 70,
    highlights: ["RK Beach", "Kailasagiri", "Araku Valley"],
  },
  Vijayawada: {
    state: "Andhra Pradesh",
    x: 270,
    y: 35,
    highlights: ["Kanaka Durga Temple", "Bhavani Island", "Undavalli Caves"],
  },
  Chennai: {
    state: "Tamil Nadu",
    x: 520,
    y: 520,
    highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Mylapore"],
  },
  Bengaluru: {
    state: "Karnataka",
    x: 100,
    y: 500,
    highlights: ["Lalbagh", "Bangalore Palace", "Cubbon Park"],
  },
  Mumbai: {
    state: "Maharashtra",
    x: -430,
    y: 140,
    highlights: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
  },
  Pune: {
    state: "Maharashtra",
    x: -310,
    y: 190,
    highlights: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad Fort"],
  },
  Delhi: {
    state: "Delhi",
    x: -210,
    y: -900,
    highlights: ["India Gate", "Red Fort", "Qutub Minar"],
  },
  Jaipur: {
    state: "Rajasthan",
    x: -390,
    y: -730,
    highlights: ["Amber Fort", "City Palace", "Hawa Mahal"],
  },
  Kolkata: {
    state: "West Bengal",
    x: 860,
    y: -430,
    highlights: ["Victoria Memorial", "Howrah Bridge", "Park Street"],
  },
  Goa: {
    state: "Goa",
    x: -350,
    y: 430,
    highlights: ["Baga Beach", "Old Goa", "Fontainhas"],
  },
  Kochi: {
    state: "Kerala",
    x: -10,
    y: 850,
    highlights: ["Fort Kochi", "Mattancherry Palace", "Marine Drive"],
  },
  Varanasi: {
    state: "Uttar Pradesh",
    x: 500,
    y: -620,
    highlights: ["Dashashwamedh Ghat", "Sarnath", "Ganga Aarti"],
  },
  Ahmedabad: {
    state: "Gujarat",
    x: -600,
    y: -250,
    highlights: ["Sabarmati Ashram", "Adalaj Stepwell", "Riverfront"],
  },
};
const cityNames = Object.keys(indiaCities);
const distanceKm = (a: string, b: string) => {
  if (a === b) return 0;
  const A = indiaCities[a],
    B = indiaCities[b];
  if (!A || !B) return 0;
  return Math.max(60, Math.round(Math.hypot(A.x - B.x, A.y - B.y) * 1.25));
};

const initialPacking = [
  [
    "Documents",
    "Passport & copies",
    "Travel insurance",
    "Flight tickets (printed)",
  ],
  [
    "Electronics",
    "Adapter & charger",
    "Camera & spare battery",
    "Portable Wi-Fi / SIM",
  ],
  ["Clothing", "Walking shoes", "Rain jacket", "Layers for cool evenings"],
  ["Health", "First aid kit", "Prescription medicines", "Sunscreen SPF 50+"],
];

function Discover({ onPlan, search }: { onPlan: () => void; search: string }) {
  const term = search.trim().toLowerCase();
  const filtered = term
    ? destinations.filter((d) => `${d[0]} ${d[1]}`.toLowerCase().includes(term))
    : destinations;
  const cityMatch = cityNames.find(
    (c) => `${c} ${indiaCities[c].state}`.toLowerCase().includes(term),
  );
  return (
    <>
      <PageTitle
        title="Explore India & Beyond"
        sub="India-first destinations plus international favourites with safety ratings and highlights"
      />
      <div className="destination-grid">
        {filtered.map((d, i) => (
          <article
            className="destination-card reveal"
            style={{ animationDelay: `${i * 70}ms` }}
            key={d[0]}
          >
            <div
              className="destination-img"
              style={{
                backgroundImage: `linear-gradient(0deg,rgba(3,15,29,.95),transparent 68%),url('${d[7]}')`,
              }}
            >
              <span className="tag">{d[2]}</span>
              <span className="temp">{d[3]}</span>
              <div>
                <h3>{d[0]}</h3>
                <small>{d[1]}</small>
              </div>
            </div>
            <div className="card-body">
              <div className="rating">
                ★★★★★ <span>{d[4]}</span>
              </div>
              <em>“{d[6]}”</em>
              <div className="score-row">
                <span>Safety Score</span>
                <b>Excellent</b>
              </div>
              <div className="score">
                <i style={{ width: `${d[5]}%` }} />
              </div>
              <div className="score-number">{d[5]}</div>
              <button onClick={onPlan}>Plan This Trip</button>
            </div>
          </article>
        ))}
      </div>
      {term && filtered.length === 0 && cityMatch && (
        <div className="panel search-place-result">
          <span>◎</span><div><h3>{cityMatch}, {indiaCities[cityMatch].state}</h3><p>Popular places: {indiaCities[cityMatch].highlights.join(", ")}</p></div>
          <button onClick={onPlan}>Create itinerary</button>
        </div>
      )}
      {term && filtered.length === 0 && !cityMatch && <div className="panel no-results">No matching city or state found. Try Hyderabad, Goa, Jaipur, Kerala, Delhi or Mumbai.</div>}
      <h2 className="section-heading">Why Alpha Innovator is Different</h2>
      <div className="feature-grid">
        {[
          [
            "♢",
            "Women-First Safety",
            "Route ratings, verified safe zones & community-sourced risk data",
          ],
          [
            "✦",
            "AI Trip Intelligence",
            "Personalized itineraries that adapt to your pace, budget & style",
          ],
          [
            "⚠",
            "Live Scam Radar",
            "Real-time scam alerts sourced from traveler reports & local authorities",
          ],
          [
            "▢",
            "Discreet SOS System",
            "Whisper Code & one-tap SOS alert your emergency contacts silently",
          ],
        ].map((x) => (
          <div className="feature-card" key={x[1]}>
            <span>{x[0]}</span>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Budget() {
  const [from, setFrom] = useState("Hyderabad");
  const [to, setTo] = useState("Goa");
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(3);
  const [mode, setMode] = useState("Train");
  const [tier, setTier] = useState("Comfort");
  const km = distanceKm(from, to);
  const rates: Record<string, number> = { Bus: 1.8, Train: 1.25, Flight: 5.8 };
  const tierMultiplier: Record<string, number> = {
    Economic: 0.92,
    Comfort: 1,
    Luxury: 1.12,
  };
  const same = from === to;
  const transport = same
    ? 0
    : Math.round(
        tierMultiplier[tier] *
          (km * rates[mode] * people +
            (mode === "Flight" ? 2200 * people : 350 * people)),
      );
  const stay = same ? 0 : Math.round(days * people * 1800 * tierMultiplier[tier]);
  const food = same ? 0 : Math.round(days * people * 900 * tierMultiplier[tier]);
  const cost = transport + stay + food;
  return (
    <>
      <PageTitle
        title="India Trip Cost & Distance Estimator"
        sub="Compare bus, train and flight costs between major Indian cities"
      />
      <div className="panel budget-panel">
        <div className="route-line">
          <span>●</span>
          <i />
          <span>●</span>
          <b>{km.toLocaleString("en-IN")} km distance</b>
        </div>
        <div className="two-col">
          <div className="field">
            <label>Starting city / state</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {cityNames.map((c) => (
                <option key={c} value={c}>
                  {c}, {indiaCities[c].state}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Ending city / state</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {cityNames.map((c) => (
                <option key={c} value={c}>
                  {c}, {indiaCities[c].state}
                </option>
              ))}
            </select>
          </div>
        </div>
        {same && (
          <div className="same-route">
            Starting and ending cities are the same — distance and estimated
            cost are ₹0.
          </div>
        )}
        <div className="transport-tabs">
          {["Bus", "Train", "Flight"].map((m, i) => (
            <button
              className={mode === m ? "active" : ""}
              onClick={() => setMode(m)}
              key={m}
            >
              {["🚌", "🚆", "✈️"][i]} {m}
              <small>
                ₹
                {(same
                  ? 0
                  : Math.round(
                      (km * rates[m] + (m === "Flight" ? 2200 : 350)) *
                        tierMultiplier[tier],
                    )
                ).toLocaleString("en-IN")}
                /person
              </small>
            </button>
          ))}
        </div>
        <div className="budget-tier-block">
          <label>Travel experience</label>
          <div className="budget-tiers">
            {["Economic", "Comfort", "Luxury"].map((option) => (
              <button
                key={option}
                className={tier === option ? "active" : ""}
                onClick={() => setTier(option)}
              >
                <b>{option}</b>
                <small>{option === "Economic" ? "Save about 8%" : option === "Comfort" ? "Balanced price" : "About 12% extra"}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="two-col">
          <div className="field">
            <label>Travelers</label>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(e) => setPeople(+e.target.value)}
            />
          </div>
          <div className="field">
            <label>Trip duration (days)</label>
            <input
              type="number"
              min="1"
              value={days}
              onChange={(e) => setDays(+e.target.value)}
            />
          </div>
        </div>
        <div className="cost-breakdown">
          <span>
            {mode} travel <b>₹{transport.toLocaleString("en-IN")}</b>
          </span>
          <span>
            Stay <b>₹{stay.toLocaleString("en-IN")}</b>
          </span>
          <span>
            Food & local travel <b>₹{food.toLocaleString("en-IN")}</b>
          </span>
        </div>
        <div className="estimate">
          <small>ESTIMATED INDIA TRIP TOTAL</small>
          <strong>₹{cost.toLocaleString("en-IN")}</strong>
          <p>
            {from} → {to} · {km} km · {mode} · {tier} · indicative estimate
          </p>
        </div>
      </div>
    </>
  );
}

function Itinerary() {
  const [from, setFrom] = useState("Hyderabad");
  const [to, setTo] = useState("Jaipur");
  const [count, setCount] = useState(3);
  const [generated, setGenerated] = useState(true);
  const info = indiaCities[to] || indiaCities.Jaipur;
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const h = info.highlights;
        return [
          `Day ${i + 1}`,
          i === 0
            ? `Arrive from ${from} and check in`
            : `Breakfast and local market walk`,
          h[i % h.length],
          i === count - 1
            ? "Sunset viewpoint and departure preparation"
            : `${h[(i + 1) % h.length]} and regional dinner`,
        ];
      }),
    [from, to, count, info],
  );
  return (
    <>
      <PageTitle
        title="Automatic India Itinerary Generator"
        sub="Enter your route and Alpha Innovator instantly creates a practical day-by-day plan"
      />
      <div className="panel itinerary-form">
        <div className="three-col">
          <div className="field">
            <label>Starting city</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {cityNames.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Destination</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {cityNames.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Days</label>
            <input
              type="number"
              min="1"
              max="7"
              value={count}
              onChange={(e) =>
                setCount(Math.min(7, Math.max(1, +e.target.value)))
              }
            />
          </div>
        </div>
        <button
          className="generate"
          onClick={() => {
            setGenerated(false);
            setTimeout(() => setGenerated(true), 250);
          }}
        >
          ✦ Generate My Itinerary
        </button>
      </div>
      {generated ? (
        <div className="stack auto-itinerary">
          {items.map((d, i) => (
            <div className="panel itinerary-card" key={i}>
              <header>
                <div>
                  <small>
                    DAY {i + 1} · {to.toUpperCase()}
                  </small>
                  <h3>{d[0]}</h3>
                </div>
                <span>3 activities</span>
              </header>
              <ol>
                {d.slice(1).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
              <button className="text-button">＋ Add activity</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="ai-generating">✦ Building your India trip...</div>
      )}
    </>
  );
}

function Packing() {
  const [checked, setChecked] = useState<string[]>([
    "Adapter & charger",
    "Walking shoes",
    "First aid kit",
  ]);
  const [custom, setCustom] = useState<string[]>([]);
  const [item, setItem] = useState("");
  const base = initialPacking.flatMap((g) => g.slice(1));
  const all = [...base, ...custom];
  function add() {
    const v = item.trim();
    if (v && !all.includes(v)) {
      setCustom((c) => [...c, v]);
      setItem("");
    }
  }
  function rename(entry: string) {
    const next = window.prompt("Rename this packing item", entry)?.trim();
    if (!next || next === entry || all.includes(next)) return;
    setCustom((items) => items.map((value) => value === entry ? next : value));
    setChecked((items) => items.map((value) => value === entry ? next : value));
  }
  return (
    <>
      <PageTitle
        title="Packing Checklist"
        sub={`India trip · ${checked.length}/${all.length} packed`}
      />
      <div className="progress">
        <i
          style={{
            width: `${all.length ? (checked.length / all.length) * 100 : 0}%`,
          }}
        />
      </div>
      <div className="stack">
        {initialPacking.map((group) => (
          <div className="panel checklist" key={group[0]}>
            <h4>{group[0]}</h4>
            {group.slice(1).map((entry) => (
              <label
                key={entry}
                className={checked.includes(entry) ? "done" : ""}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(entry)}
                  onChange={() =>
                    setChecked((c) =>
                      c.includes(entry)
                        ? c.filter((x) => x !== entry)
                        : [...c, entry],
                    )
                  }
                />
                <span>✓</span>
                {entry}
              </label>
            ))}
          </div>
        ))}
        <div className="panel checklist custom-items-panel">
          <h4>Other</h4>
          {custom.length === 0 && (
            <p className="empty-items">
              Add any extra item below. New items will appear here with Edit and Delete controls.
            </p>
          )}
          {custom.map((entry) => (
            <label
              key={entry}
              className={checked.includes(entry) ? "done" : ""}
            >
              <input
                type="checkbox"
                checked={checked.includes(entry)}
                onChange={() =>
                  setChecked((c) =>
                    c.includes(entry)
                      ? c.filter((x) => x !== entry)
                      : [...c, entry],
                  )
                }
              />
              <span>✓</span>
              <span className="custom-item-name">{entry}</span>
              <button
                type="button"
                className="rename-item"
                onClick={(e) => {
                  e.preventDefault();
                  rename(entry);
                }}
                aria-label={`Rename ${entry}`}
              >
                Edit
              </button>
              <button
                type="button"
                className="remove-item"
                onClick={(e) => {
                  e.preventDefault();
                  setCustom((c) => c.filter((x) => x !== entry));
                  setChecked((c) => c.filter((x) => x !== entry));
                }}
                aria-label={`Delete ${entry}`}
              >
                Delete
              </button>
            </label>
          ))}
        </div>
        <div className="packing-add">
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Type a new packing item..."
          />
          <button onClick={add}>＋ Add Item</button>
        </div>
      </div>
    </>
  );
}

function Weather() {
  return (
    <>
      <PageTitle
        title="Weather Forecast"
        sub="Hyderabad, India — 7-day outlook"
      />
      <div className="weather-now">
        <div>
          <small>Now · India Standard Time</small>
          <strong>29°</strong>
          <h3>Partly Sunny</h3>
          <p>Feels like 31°C</p>
        </div>
        <div className="sun">
          ☀<small>💧 48%　≋ 14 km/h</small>
        </div>
      </div>
      <div className="panel forecast">
        <h3>7-Day Forecast</h3>
        <div>
          {[
            ["Today", "☀", "29°"],
            ["Sat", "☁", "30°"],
            ["Sun", "◌", "28°"],
            ["Mon", "☀", "31°"],
            ["Tue", "≋", "27°"],
            ["Wed", "☀", "30°"],
            ["Thu", "☁", "28°"],
          ].map((x, i) => (
            <article className={i === 0 ? "active" : ""} key={x[0]}>
              <small>{x[0]}</small>
              <b>{x[1]}</b>
              <strong>{x[2]}</strong>
              <span>22°</span>
            </article>
          ))}
        </div>
      </div>
      <p className="tip">
        ⚠️ <b>India packing tip:</b> Carry water, sunscreen, light cotton
        clothes and a compact umbrella.
      </p>
    </>
  );
}

const safetyDB = [
  {
    place: "Delhi",
    score: 82,
    scams: [
      ["Unofficial taxi overcharging near stations", "High"],
      ["Fake tour-guide packages around monuments", "Medium"],
      ["Distraction pickpocketing in crowded markets", "Medium"],
    ],
    safe: [
      [
        "India Gate–Kartavya Path",
        "Strong lighting, patrols and families until late evening",
      ],
      [
        "Connaught Place inner circle",
        "Use busy blocks and verified app cabs after 10 PM",
      ],
    ],
  },
  {
    place: "Goa",
    score: 88,
    scams: [
      ["Rental vehicle damage-deposit dispute", "High"],
      ["Unofficial beach activity pricing", "Medium"],
      ["Overpriced taxi without agreed fare", "Medium"],
    ],
    safe: [
      ["Panaji riverfront", "Busy, well-lit promenade with tourist police"],
      [
        "Fontainhas heritage walk",
        "Best during daylight; stay on marked lanes",
      ],
    ],
  },
  {
    place: "Jaipur",
    score: 90,
    scams: [
      ["Gemstone commission shop detour", "Medium"],
      ["Closed monument redirect by fake guide", "High"],
      ["Unmetered auto-rickshaw fare", "Medium"],
    ],
    safe: [
      [
        "Amber Fort main visitor route",
        "Security checks and high daytime footfall",
      ],
      [
        "City Palace–Jantar Mantar zone",
        "Walkable tourist zone; use main entrances",
      ],
    ],
  },
  {
    place: "Hyderabad",
    score: 91,
    scams: [
      ["Fake pearl quality claims near tourist markets", "Medium"],
      ["Unofficial parking fee collection", "Low"],
      ["Auto fare switching at arrival points", "Medium"],
    ],
    safe: [
      ["Tank Bund–Necklace Road", "Popular evening route with police presence"],
      ["Durgam Cheruvu promenade", "Well-lit; use designated transport points"],
    ],
  },
  {
    place: "Mumbai",
    score: 87,
    scams: [
      ["Tourist photo or bird-feed pressure selling", "Low"],
      ["Fake train ticket assistance", "High"],
      ["Inflated short taxi fare", "Medium"],
    ],
    safe: [
      ["Marine Drive promenade", "High footfall and regular police patrols"],
      ["Bandra Bandstand", "Best before 10 PM; remain in busy areas"],
    ],
  },
  {
    place: "Varanasi",
    score: 84,
    scams: [
      ["Boat price changed mid-ride", "High"],
      ["Forced donation requests", "Medium"],
      ["Unofficial ritual package selling", "Medium"],
    ],
    safe: [
      [
        "Dashashwamedh Ghat main approach",
        "Use signed lanes and official police help points",
      ],
      ["Assi Ghat promenade", "Busy at sunrise and early evening"],
    ],
  },
];
function Safety() {
  const [query, setQuery] = useState("Jaipur");
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRotation((r) => r + 1), 5000);
    return () => clearInterval(t);
  }, []);
  const data =
    safetyDB.find((x) => x.place.toLowerCase() === query.toLowerCase()) ||
    safetyDB[rotation % safetyDB.length];
  return (
    <>
      <PageTitle
        title="India Safety Center"
        sub="Searchable place-based scam alerts and women-first safe route guidance"
      />
      <div className="safety-search">
        <span>⌕</span>
        <input
          list="safe-places"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Delhi, Goa, Jaipur..."
        />
        <datalist id="safe-places">
          {safetyDB.map((x) => (
            <option key={x.place} value={x.place} />
          ))}
        </datalist>
        <button
          onClick={() => {
            const exact = safetyDB.find((x) =>
              x.place.toLowerCase().includes(query.toLowerCase()),
            );
            if (exact) setQuery(exact.place);
          }}
        >
          Search
        </button>
      </div>
      <div className="live-note">
        <i /> Alerts refresh automatically every 5 seconds when no exact place
        is selected
      </div>
      <div className="panel safety-rating">
        <b>{data.score >= 90 ? "A" : "B+"}</b>
        <div>
          <small>Overall Safety Rating — {data.place}</small>
          <h2>
            {data.score >= 90 ? "Excellent" : "Very Good"} · {data.score}/100
          </h2>
          <p>
            India-focused guidance based on predefined traveler safety
            information
          </p>
        </div>
      </div>
      <h2 className="section-heading small">
        ⚠ Active Scam Alerts in {data.place}
      </h2>
      {data.scams.map((x) => (
        <div className="alert alert-refresh" key={`${data.place}${x[0]}`}>
          <div>
            <b>{x[0]}</b>
            <p>
              Use verified services, confirm prices first and contact 112 if you
              feel unsafe.
            </p>
          </div>
          <span>{x[1]}</span>
        </div>
      ))}
      <h2 className="section-heading small">
        ⌁ Safer Places & Women-First Routes
      </h2>
      {data.safe.map((x, i) => (
        <div className="safe-route" key={x[0]}>
          <div>
            <b>{x[0]}</b>
            <small>
              Best time: {i ? "Before 9 PM" : "Daylight to early evening"}
            </small>
            <p>{x[1]}</p>
          </div>
          <span>Safer choice</span>
        </div>
      ))}
    </>
  );
}

function Assistant() {
  const [messages, setMessages] = useState([
    "Namaste! I’m your India AI Travel Assistant. Ask a full question about trains, buses, flights, budgets, food, weather, safety or destinations.",
  ]);
  const [input, setInput] = useState("");
  const reply = (q: string) => {
    const s = q.toLowerCase();
    const city = cityNames.find((c) => s.includes(c.toLowerCase()));
    if (s.includes("train") || s.includes("rail"))
      return `For ${city || "Indian"} train travel: book through official IRCTC channels, compare Sleeper/3A/2A classes, arrive 30–45 minutes early, carry the passenger ID used for booking, and check live PNR/platform status before departure.`;
    if (s.includes("bus"))
      return `For ${city || "this"} route, prefer state RTC or highly rated private operators, choose tracked AC sleeper/seater services, confirm the boarding point, and avoid isolated pickup locations late at night.`;
    if (s.includes("flight") || s.includes("airport"))
      return `For a domestic flight${city ? ` to ${city}` : ""}, reach the airport about 2 hours early, carry government photo ID, check baggage limits, and compare the final fare after seat and convenience charges.`;
    if (s.includes("food") || s.includes("eat"))
      return city
        ? `${city} has excellent regional food. Choose busy, well-reviewed restaurants, ask for the local speciality, drink sealed water, and avoid food that has been standing uncovered.`
        : "Try regional favourites such as Hyderabadi biryani, Jaipur dal baati churma, Goa fish curry, Kerala appam and Delhi chaat at busy, well-reviewed places.";
    if (s.includes("safe") || s.includes("woman") || s.includes("scam"))
      return `For ${city || "your destination"}, check the Safety Center alerts, share your trip details, use verified transport, avoid isolated areas after dark, and call India emergency number 112 if needed.`;
    if (s.includes("budget") || s.includes("cost") || s.includes("price"))
      return "Open Budget to select exact start and end cities. Alpha Innovator calculates route distance and compares bus, train and flight estimates; choosing the same city correctly returns ₹0.";
    if (s.includes("weather") || s.includes("rain"))
      return "Check Weather before departure and pack for the region and season. For most Indian trips, carry water, sunscreen, light layers and a compact umbrella.";
    if (s.includes("hello") || s.includes("hi ") || s === "hi")
      return "Namaste! Tell me your starting city, destination, number of days and whether you prefer bus, train or flight.";
    return `I understood your question${city ? ` about ${city}` : ""}. For the most useful answer, include your starting city, destination, dates, travelers and preferred transport. I can then guide you on route, estimated cost, safety and itinerary.`;
  };
  function send() {
    if (!input.trim()) return;
    const q = input.trim();
    setMessages((m) => [...m, q, reply(q)]);
    setInput("");
  }
  return (
    <div className="assistant-scene">
      <div className="ai-orbit">
        <i />
        <i />
        <i />
      </div>
      <PageTitle
        title="AI Travel Assistant"
        sub="Question-aware India travel help for trains, buses, flights, safety, food and budgets"
      />
      <div className="chips">
        {[
          "Train from Hyderabad to Goa",
          "Is Jaipur safe for women?",
          "Best food in Mumbai?",
          "Flight travel tips",
        ].map((x) => (
          <button onClick={() => setInput(x)} key={x}>
            {x}
          </button>
        ))}
      </div>
      <div className="panel chat">
        {messages.map((m, i) => (
          <div className={i % 2 ? "user" : "bot"} key={i}>
            {m}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask a detailed India travel question..."
        />
        <button onClick={send}>➤</button>
      </div>
    </div>
  );
}

function Currency() {
  const [amount, setAmount] = useState(300);
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("THB");
  const inrPerUnit: Record<string, number> = {
    INR: 1,
    USD: 83.5,
    EUR: 90.8,
    GBP: 106.2,
    THB: 2.38,
    JPY: 0.56,
    AUD: 55.1,
    CAD: 61.4,
    SGD: 62.2,
    AED: 22.73,
    NPR: 0.625,
    LKR: 0.276,
  };
  const result = (amount * inrPerUnit[from]) / inrPerUnit[to];
  const swap = () => {
    setFrom(to);
    setTo(from);
  };
  return (
    <>
      <PageTitle
        title="Multi-Currency Converter"
        sub="Convert in both directions between INR, USD, EUR, THB and more"
      />
      <div className="panel currency">
        <div className="field">
          <label>Amount</label>
          <input
            className="amount"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
          />
        </div>
        <div className="currency-selects">
          <div className="field">
            <label>From currency</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {Object.keys(inrPerUnit).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <button className="swap" onClick={swap} aria-label="Swap currencies">
            ⇄
          </button>
          <div className="field">
            <label>To currency</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {Object.keys(inrPerUnit).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="conversion">
          <small>
            {amount.toLocaleString()} {from} =
          </small>
          <strong>
            {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </strong>
          <b>{to}</b>
        </div>
        <h4>REFERENCE VALUES</h4>
        {["USD", "EUR", "GBP", "THB", "JPY", "AED", "SGD"].map((k) => (
          <div className="rate" key={k}>
            <b>{k}</b>
            <span>
              1 {k} ≈ <strong>₹{inrPerUnit[k]}</strong>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function PageTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="page-title reveal">
      <h1>{title}</h1>
      <p>{sub}</p>
    </div>
  );
}

type SpeechEvent = { results: { 0: { 0: { transcript: string } } } };
type SpeechRecognizer = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  onresult: (event: SpeechEvent) => void;
  onerror: () => void;
};

function EmergencyModal({ close, savedSecret, setSavedSecret }: { close: () => void; savedSecret: string; setSavedSecret: (value: string) => void }) {
  const [code, setCode] = useState("");
  const [newSecret, setNewSecret] = useState(savedSecret);
  const [countdown, setCountdown] = useState(3);
  const [location, setLocation] = useState("Location permission pending");
  const [status, setStatus] = useState<"ready" | "listening" | "activating" | "activated">(
    "ready",
  );
  const activate = (spoken = code) => {
    if (spoken.trim().toLowerCase() === savedSecret.trim().toLowerCase()) {
      setStatus("activating");
      setCountdown(3);
      navigator.geolocation?.getCurrentPosition(
        (position) => setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`),
        () => setLocation("Location unavailable — enable browser permission"),
        { enableHighAccuracy: true, timeout: 5000 },
      );
      let remaining = 3;
      const timer = window.setInterval(() => {
        remaining -= 1;
        setCountdown(remaining);
        if (remaining <= 0) {
          window.clearInterval(timer);
          setStatus("activated");
        }
      }, 1000);
    }
  };
  const listen = () => {
    const SpeechRecognition = (
      window as unknown as {
        webkitSpeechRecognition?: new () => SpeechRecognizer;
        SpeechRecognition?: new () => SpeechRecognizer;
      }
    ).SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: new () => SpeechRecognizer;
        }
      ).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCode("Voice recognition is unavailable — type Alpha Safe");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setCode(spoken);
      activate(spoken);
    };
    recognition.onerror = () => setStatus("ready");
    setStatus("listening");
    recognition.start();
  };
  return (
    <div className="emergency-overlay" role="dialog" aria-modal="true">
      <div className={`emergency-modal ${status}`}>
        <button className="emergency-close" onClick={close} aria-label="Close">
          ×
        </button>
        <div className="emergency-icon">SOS</div>
        <h2>{status === "activated" ? "Emergency Alert Activated" : status === "activating" ? `Activating in ${countdown}…` : "Emergency SOS"}</h2>
        {status === "activated" ? (
          <>
            <div className="sending-pulse"><i /><i /><i /></div>
            <p>Emergency message activated. Last shared location: <b>{location}</b></p>
            <strong className="demo-warning">Demo mode: connect an SMS/WhatsApp service and add trusted contacts for real message delivery.</strong>
            <div className="emergency-numbers"><a href="tel:112"><b>112</b><span>National Emergency</span></a><a href="tel:100"><b>100</b><span>Police Station</span></a><a href="tel:108"><b>108</b><span>Ambulance / Hospital</span></a></div>
          </>
        ) : status === "activating" ? (
          <>
            <div className="activation-countdown">{countdown}</div>
            <p>Sharing your last available location and preparing the emergency alert. Please wait three seconds.</p>
          </>
        ) : (
          <>
            <p>Speak or type your secret whisper code to silently activate the danger alert.</p>
            <div className="secret-setup"><label>Your Secret Whisper Code</label><div><input value={newSecret} onChange={(e) => setNewSecret(e.target.value)} placeholder="Create secret code"/><button onClick={() => newSecret.trim() && setSavedSecret(newSecret.trim())}>Save Code</button></div><small>Saved code: {savedSecret}</small></div>
            <div className="secret-code">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter your saved secret code" onKeyDown={(e) => e.key === "Enter" && activate()} />
              <button onClick={listen}>{status === "listening" ? "Listening…" : "🎙 Speak Code"}</button>
            </div>
            <button className="activate-sos" onClick={() => activate()}>Activate with Code</button>
            <div className="emergency-numbers compact"><a href="tel:100"><b>100</b><span>Police</span></a><a href="tel:108"><b>108</b><span>Hospital</span></a></div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("Discover");
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(true);
  const [flash, setFlash] = useState(false);
  const savedSecret = "Alpha Safe";
  const [whisperEnabled, setWhisperEnabled] = useState(false);
  const [whisperOpen, setWhisperOpen] = useState(false);
  const [whisperCode, setWhisperCode] = useState("");
  const [whisperError, setWhisperError] = useState("");
  const [sosActivated, setSosActivated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const content = useMemo(
    () =>
      ({
        Discover: <Discover onPlan={() => setView("Itinerary")} search={searchQuery} />,
        Budget: <Budget />,
        Itinerary: <Itinerary />,
        Packing: <Packing />,
        Weather: <Weather />,
        Safety: <Safety />,
        "AI Assistant": <Assistant />,
        Currency: <Currency />,
      })[view],
    [view, searchQuery],
  );
  function switchTheme() {
    setFlash(true);
    setDark(!dark);
    setTimeout(() => setFlash(false), 1250);
  }
  function activateCompactSOS() {
    setSosActivated(true);
    setWhisperOpen(false);
    window.setTimeout(() => setSosActivated(false), 7000);
  }
  function sendWhisper() {
    if (!whisperEnabled) {
      setWhisperError("Tick the box beside Whisper Code first");
      return;
    }
    if (whisperCode.trim().toLowerCase() === savedSecret.toLowerCase()) {
      setWhisperError("");
      setWhisperCode("");
      activateCompactSOS();
    } else {
      setWhisperError("Incorrect secret code");
    }
  }
  return (
    <main
      className={`${dark ? "app" : "app light"}${flash ? " theme-shifting" : ""}`}
    >
      <div className="theme-wave" />
      <header className="topbar">
        <button className="hamburger" onClick={() => setMenu(!menu)}>
          ☰
        </button>
        <div className="brand">
          <span className="brand-logo"><img src="/assets/alpha-phoenix.png" alt="Alpha Innovator phoenix logo" /></span>
          <div>
            <b>Alpha Innovator.</b>
            <small>TRIP PLANNER</small>
          </div>
        </div>
        <div className="search destination-search">
          ⌕ <input list="india-destinations" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") setView("Discover"); }} placeholder="Search Indian cities or states..." />
          <datalist id="india-destinations">{cityNames.map((city) => <option key={city} value={city}>{indiaCities[city].state}</option>)}</datalist>
          {searchQuery && <button onClick={() => setSearchQuery("")} aria-label="Clear search">×</button>}
        </div>
        <button
          className="theme"
          onClick={switchTheme}
          aria-label="Toggle theme"
        >
          <span className={`mode-art ${dark ? "night" : "day"}`}><i /><b /></span>
        </button>
        <div className="weather-pill">
          ☀️ <b>29°C</b>
          <small>HYDERABAD</small>
        </div>
        <div className="whisper-wrap">
          <button className="whisper" onClick={() => setWhisperOpen((open) => !open)}>▢ Whisper</button>
          {whisperOpen && <div className="whisper-popover">
            <label className="whisper-title-check">
              <input type="checkbox" checked={whisperEnabled} onChange={(e) => { setWhisperEnabled(e.target.checked); setWhisperError(""); }} />
              <i>✓</i>
              <strong>Whisper Code</strong>
            </label>
            <p>Enter your discreet distress code. This silently alerts your emergency contact.</p>
            <div className="whisper-send-row">
              <input disabled={!whisperEnabled} value={whisperCode} onChange={(e) => setWhisperCode(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendWhisper()} placeholder={whisperEnabled ? "Enter code..." : "Tick box to enable"}/>
              <button disabled={!whisperEnabled} onClick={sendWhisper}>Send</button>
            </div>
            {whisperError && <small>{whisperError}</small>}
          </div>}
        </div>
        {sosActivated && <div className="sos-toast"><b>SOS Activated</b><span>Alerting emergency contacts & nearest embassy</span><small>Police 100 · Ambulance 108</small></div>}
        <button className="sos" onClick={activateCompactSOS}>SOS</button>
      </header>
      <aside className={menu ? "sidebar open" : "sidebar"}>
        <span className="nav-label">INDIA TRAVEL</span>
        {nav.map((n) => (
          <button
            className={view === n.label ? "active" : ""}
            onClick={() => {
              setView(n.label);
              setMenu(false);
            }}
            key={n.label}
          >
            <i>{n.icon}</i>
            {n.label}
          </button>
        ))}
        <div className="trip-card">
          <small>CURRENT TRIP</small>
          <b>Hyderabad → Jaipur</b>
          <span>
            3 days · 2 travelers
            <br />
            India domestic trip
          </span>
          <p>
            Budget <strong>₹28,600</strong>
          </p>
        </div>
      </aside>
      {menu && (
        <button
          className="backdrop"
          onClick={() => setMenu(false)}
          aria-label="Close menu"
        />
      )}
      <section className="content" key={view}>
        {content}
      </section>
      <button className="floating-sos" onClick={activateCompactSOS}>
        SOS
      </button>
    </main>
  );
}

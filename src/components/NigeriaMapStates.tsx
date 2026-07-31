"use client";

import { useState, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const STATE_CENTROIDS: Record<string, [number, number]> = {
  sokoto: [5.2476, 13.0601], kebbi: [4.1999, 11.4942], zamfara: [6.6644, 12.1222],
  katsina: [7.6006, 12.9855], kano: [8.5202, 11.9964], jigawa: [9.9621, 12.228],
  yobe: [11.7487, 12.2939], borno: [13.151, 11.8333], bauchi: [10.1911, 10.3158],
  gombe: [11.1673, 10.2897], niger: [6.5414, 9.9309], kaduna: [7.4383, 10.5105],
  adamawa: [12.4098, 9.3265], taraba: [10.774, 7.8702], plateau: [9.8965, 9.2182],
  nasarawa: [8.5202, 8.4998], fct: [7.3986, 9.0765], benue: [8.7404, 7.3369],
  kogi: [6.6726, 7.7337], kwara: [4.5418, 8.9669], oyo: [3.5908, 7.843],
  osun: [4.5624, 7.5629], ogun: [3.35, 6.9098], lagos: [3.3792, 6.5244],
  ekiti: [5.2198, 7.6322], ondo: [5.1479, 6.9149], edo: [5.6257, 6.5438],
  delta: [5.8987, 5.5324], anambra: [6.937, 6.2209], enugu: [7.5464, 6.5244],
  ebonyi: [8.0137, 6.2649], imo: [7.026, 5.4922], abia: [7.5248, 5.4527],
  crossriver: [8.3417, 5.8702], rivers: [6.9208, 4.8581], bayelsa: [6.0699, 4.7719],
  akwaibom: [7.8537, 5.0377],
};

const STATE_DISPLAY_NAMES: Record<string, string> = {
  sokoto: "Sokoto", kebbi: "Kebbi", zamfara: "Zamfara", katsina: "Katsina", kano: "Kano",
  jigawa: "Jigawa", yobe: "Yobe", borno: "Borno", bauchi: "Bauchi", gombe: "Gombe",
  niger: "Niger", kaduna: "Kaduna", adamawa: "Adamawa", taraba: "Taraba", plateau: "Plateau",
  nasarawa: "Nasarawa", fct: "FCT", benue: "Benue", kogi: "Kogi", kwara: "Kwara",
  oyo: "Oyo", osun: "Osun", ogun: "Ogun", lagos: "Lagos", ekiti: "Ekiti",
  ondo: "Ondo", edo: "Edo", delta: "Delta", anambra: "Anambra", enugu: "Enugu",
  ebonyi: "Ebonyi", imo: "Imo", abia: "Abia", crossriver: "Cross River", rivers: "Rivers",
  bayelsa: "Bayelsa", akwaibom: "Akwa Ibom",
};

const STATE_FUNDING_MAP: Record<string, number> = {
  // 25–49% funded tier
  lagos: 49, rivers: 47, fct: 45, "federal capital territory": 45,
  oyo: 43, delta: 41, edo: 40, enugu: 38, ogun: 37, kano: 36,
  kaduna: 35, anambra: 34, imo: 33, osun: 32, abia: 31,
  plateau: 30, "cross river": 29, crossriver: 29,
  "akwa ibom": 28, akwaibom: 28, kwara: 28,
  benue: 27, ekiti: 26, ondo: 25,
  // 0% — not yet funded
  adamawa: 0, bauchi: 0, bayelsa: 0, borno: 0,
  ebonyi: 0, gombe: 0, jigawa: 0, katsina: 0,
  kebbi: 0, kogi: 0, nasarawa: 0, niger: 0,
  sokoto: 0, taraba: 0, yobe: 0, zamfara: 0,
};

// Amounts = percentage × ₦35,000,000 target per state
const STATE_AMOUNTS_MAP: Record<string, string> = {
  lagos: "₦17,150,000", rivers: "₦16,450,000", fct: "₦15,750,000",
  oyo: "₦15,050,000", delta: "₦14,350,000", edo: "₦14,000,000",
  enugu: "₦13,300,000", ogun: "₦12,950,000", kano: "₦12,600,000",
  kaduna: "₦12,250,000", anambra: "₦11,900,000", imo: "₦11,550,000",
  osun: "₦11,200,000", abia: "₦10,850,000", plateau: "₦10,500,000",
  "cross river": "₦10,150,000", crossriver: "₦10,150,000",
  "akwa ibom": "₦9,800,000", akwaibom: "₦9,800,000",
  kwara: "₦9,800,000", benue: "₦9,450,000", ekiti: "₦9,100,000",
  ondo: "₦8,750,000",
  // 0% states
  adamawa: "₦0", bauchi: "₦0", bayelsa: "₦0", borno: "₦0",
  ebonyi: "₦0", gombe: "₦0", jigawa: "₦0", katsina: "₦0",
  kebbi: "₦0", kogi: "₦0", nasarawa: "₦0", niger: "₦0",
  sokoto: "₦0", taraba: "₦0", yobe: "₦0", zamfara: "₦0",
};

function getStateColor(pct: number): string {
  if (pct <= 0)   return "#E0E0E0";
  if (pct >= 100) return "#0B6B3A";
  if (pct >= 75)  return "#2E7D32";
  if (pct >= 50)  return "#4CAF50";
  if (pct >= 25)  return "#FFC107";
  return "#FF9800";
}

function getFundingLabel(pct: number): string {
  if (pct <= 0)   return "Not Funded";
  if (pct >= 100) return "Fully Funded";
  if (pct >= 75)  return "75% – 99%";
  if (pct >= 50)  return "50% – 74%";
  if (pct >= 25)  return "25% – 49%";
  return "Below 25%";
}

function toStateId(rawName: string): string {
  return rawName
    .toLowerCase()
    .replace(/\bstate\b/gi, "")
    .replace(/federal capital territory/gi, "fct")
    .trim();
}

interface HoverInfo { stateId: string; displayName: string; pct: number; x: number; y: number; }
interface Props {
  selectedState: string;
  onSelectState: (state: string) => void;
  setTooltipContent: (content: string) => void;
}

export default function NigeriaMapStates({ selectedState, onSelectState, setTooltipContent }: Props) {
  const [geoData, setGeoData] = useState<any>(null);
  const [hovered, setHovered] = useState<HoverInfo | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/maps/nigeria-states-geo.json").then((r) => r.json()).then(setGeoData).catch(console.error);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || !hovered) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setHovered((prev) => prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
  };

  if (!geoData) {
    return <div className="w-full h-[420px] animate-pulse rounded-2xl bg-gradient-to-br from-[#e8f5ee] to-[#d4ede0] dark:from-[#111f14] dark:to-[#162b1a]" />;
  }

  return (
    <div ref={wrapperRef} className="relative w-full select-none" onMouseMove={handleMouseMove}>
      {/* Hover popup */}
      {hovered && (
        <div
          className="pointer-events-none absolute z-30 w-52 rounded-2xl border border-white/10 bg-[#0d1b12]/95 p-3.5 shadow-2xl backdrop-blur-sm"
          style={{
            left: hovered.x + 16,
            top: hovered.y - 12,
            transform: hovered.x > (wrapperRef.current?.offsetWidth ?? 600) - 220 ? "translateX(-110%)" : undefined,
          }}
        >
          <p className="mb-2 text-[13px] font-bold text-white">{hovered.displayName}</p>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="rounded-lg px-2 py-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: getStateColor(hovered.pct) }}>
              {getFundingLabel(hovered.pct)}
            </span>
            <span className="text-sm font-black text-white">{hovered.pct}%</span>
          </div>
          <div className="mb-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full transition-all" style={{ width: `${hovered.pct}%`, backgroundColor: getStateColor(hovered.pct) }} />
          </div>
          {STATE_AMOUNTS_MAP[hovered.stateId] && (
            <p className="text-[11px] text-white/60">
              Raised: <span className="font-bold text-white">{STATE_AMOUNTS_MAP[hovered.stateId]}</span>
            </p>
          )}
        </div>
      )}

      {/* Map — no ZoomableGroup so no zoom controls, fits naturally */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 2200, center: [8.6753, 9.082] }}
        width={600}
        height={520}
        className="w-full h-auto"
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const rawName: string = geo.properties.NAME_1 || geo.properties.name || "";
              const stateId = toStateId(rawName);
              const displayName = stateId === "fct" ? "Federal Capital Territory" : rawName;
              const pct = STATE_FUNDING_MAP[stateId] ?? 0;
              const fill = getStateColor(pct);

              const selNorm = selectedState
                .toLowerCase().replace(/\bstate\b/gi, "")
                .replace(/federal capital territory/gi, "fct")
                .replace(/abuja fct/gi, "fct").trim();
              const isSelected = stateId === selNorm;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    const rect = wrapperRef.current?.getBoundingClientRect();
                    setHovered({
                      stateId, displayName, pct,
                      x: rect ? (e as any).clientX - rect.left : 0,
                      y: rect ? (e as any).clientY - rect.top : 0,
                    });
                    setTooltipContent("");
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    const name = stateId === "fct" ? "Abuja FCT" : rawName;
                    onSelectState(name);
                  }}
                  style={{
                    default: {
                      fill, stroke: isSelected ? "#0B6B3A" : "#FFFFFF",
                      strokeWidth: isSelected ? 2.5 : 1.0,
                      outline: "none",
                    } as React.CSSProperties,
                    hover: {
                      fill, stroke: "#FFFFFF", strokeWidth: 2,
                      outline: "none", cursor: "pointer",
                      transform: "scale(1.05)",
                      transformBox: "fill-box", transformOrigin: "center",
                    } as React.CSSProperties,
                    pressed: {
                      fill, stroke: "#FFFFFF", strokeWidth: 2, outline: "none",
                    } as React.CSSProperties,
                  }}
                />
              );
            })
          }
        </Geographies>

        {Object.entries(STATE_CENTROIDS).map(([key, coords]) => {
          const label = STATE_DISPLAY_NAMES[key] ?? key;
          const selNorm = selectedState.toLowerCase().replace(/\bstate\b/gi, "")
            .replace(/federal capital territory/gi, "fct").replace(/abuja fct/gi, "fct").trim();
          const sel = key === selNorm;
          const pct = STATE_FUNDING_MAP[key] ?? 0;
          const textColor = pct === 0 ? "#555" : "#fff";
          return (
            <Marker
              key={key}
              coordinates={coords}
              onClick={() => {
                const name = key === "fct" ? "Abuja FCT" : `${key.charAt(0).toUpperCase() + key.slice(1)}`;
                onSelectState(name);
              }}
            >
              <text
                textAnchor="middle"
                alignmentBaseline="middle"
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: sel ? "10px" : "8.5px",
                  fontWeight: sel ? "700" : "400",
                  fill: textColor,
                  pointerEvents: "none",
                }}
              >
                {label}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}

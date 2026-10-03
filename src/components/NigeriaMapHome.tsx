"use client";

import { useState, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { POLLING_UNITS, REPORTERS_PER_UNIT, formatCount } from "@/lib/eyewitness-coverage";
import { formatCoveragePercentage, type ReporterCoverage } from "@/lib/reporter-coverage";

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

// Legend-matched color scale — identical to NigeriaMapStates
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

export interface StateMapData {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

interface HoverInfo {
  stateId: string;
  displayName: string;
  pct: number;
  x: number;
  y: number;
}

interface Props {
  selectedStateId: string;
  onSelectState: (state: StateMapData) => void;
  mode?: "funding" | "reporters";
  reporterCoverage?: ReporterCoverage | null;
}

export default function NigeriaMapHome({ selectedStateId, onSelectState, mode = "funding", reporterCoverage }: Props) {
  const [geoData, setGeoData] = useState<any>(null);
  const [hovered, setHovered] = useState<HoverInfo | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/maps/nigeria-states-geo.json")
      .then((r) => r.json())
      .then(setGeoData)
      .catch(console.error);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current || !hovered) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setHovered((prev) =>
      prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null
    );
  };

  if (!geoData) {
    return (
      <div className="h-[460px] w-full animate-pulse rounded-2xl bg-gradient-to-br from-[#e8f5ee] to-[#d4ede0]" />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="relative w-full select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Rich hover popup */}
      {hovered && (
        <div
          className="pointer-events-none absolute z-30 w-48 rounded-xl border border-white/20 bg-[#0d1b12]/95 p-3 shadow-xl backdrop-blur-sm"
          style={{
            left: hovered.x + 14,
            top: hovered.y - 10,
            transform:
              hovered.x > (wrapperRef.current?.offsetWidth ?? 600) - 210
                ? "translateX(-110%)"
                : undefined,
          }}
        >
          <p className="mb-1.5 text-xs font-semibold text-white">{hovered.displayName}</p>
          {mode === "reporters" ? (
            <div className="space-y-1 text-[11px] text-white/75">
              <p>Polling units: <strong className="text-white">{formatCount(POLLING_UNITS[hovered.stateId] ?? 0)}</strong></p>
              <p>Reporters needed: <strong className="text-white">{formatCount((POLLING_UNITS[hovered.stateId] ?? 0) * REPORTERS_PER_UNIT)}</strong></p>
              <p>Completed profiles: <strong className="text-white">{reporterCoverage ? formatCount(reporterCoverage.states[hovered.stateId].registered) : "Unavailable"}</strong></p>
              <p>Target filled: <strong className="text-white">{reporterCoverage ? formatCoveragePercentage(reporterCoverage.states[hovered.stateId].percentage) : "—"}</strong></p>
            </div>
          ) : (
          <>
          <div className="mb-2 flex items-center justify-between">
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-white"
              style={{ backgroundColor: getStateColor(hovered.pct) }}
            >
              {getFundingLabel(hovered.pct)}
            </span>
            <span className="text-xs font-bold text-white">{hovered.pct}%</span>
          </div>
          {/* Progress bar */}
          <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full"
              style={{ width: `${hovered.pct}%`, backgroundColor: getStateColor(hovered.pct) }}
            />
          </div>
          {STATE_AMOUNTS_MAP[hovered.stateId] && (
            <p className="text-[10px] text-white/70">
              Raised:{" "}
              <span className="font-semibold text-white">
                {STATE_AMOUNTS_MAP[hovered.stateId]}
              </span>
            </p>
          )}
          </>
          )}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 2420, center: [8.4, 8.7] }}
        width={600}
        height={540}
        className="h-auto w-full"
      >
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const rawName: string = geo.properties.NAME_1 || geo.properties.name || "";
              const stateId = rawName
                .toLowerCase()
                .replace(/\bstate\b/gi, "")
                .replace(/federal capital territory/gi, "fct")
                .replace(/nassarawa/gi, "nasarawa")
                .replace(/\s/g, "")
                .trim();
              if (mode === "reporters" && !POLLING_UNITS[stateId]) return null;
              const displayName = stateId === "fct" ? "Federal Capital Territory" : rawName;
              const pct = mode === "reporters" ? reporterCoverage?.states[stateId]?.percentage ?? 0 : STATE_FUNDING_MAP[stateId] ?? 0;
              const selected = isSelected(stateId, selectedStateId);
              const fill = mode === "reporters" && !reporterCoverage ? "#176845" : getStateColor(pct);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    const rect = wrapperRef.current?.getBoundingClientRect();
                    setHovered({
                      stateId,
                      displayName,
                      pct,
                      x: rect ? (e as any).clientX - rect.left : 0,
                      y: rect ? (e as any).clientY - rect.top : 0,
                    });
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() =>
                    onSelectState({
                      id: stateId,
                      name: displayName,
                      percentage: pct,
                      color: fill,
                    })
                  }
                  style={{
                    default: {
                      fill,
                      stroke: selected ? "#0B6B3A" : "#FFFFFF",
                      strokeWidth: selected ? 2.5 : 1.0,
                      outline: "none",
                      transition: "transform 150ms ease",
                      transform: "scale(1)",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    } as React.CSSProperties,
                    hover: {
                      fill,
                      stroke: "#FFFFFF",
                      strokeWidth: 2,
                      outline: "none",
                      cursor: "pointer",
                      transform: "scale(1.08)",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transition: "transform 150ms ease",
                    } as React.CSSProperties,
                    pressed: {
                      fill,
                      stroke: "#FFFFFF",
                      strokeWidth: 2,
                      outline: "none",
                      transform: "scale(1.05)",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    } as React.CSSProperties,
                  }}
                />
              );
            })
          }
        </Geographies>

        {Object.entries(STATE_CENTROIDS).map(([key, coords]) => {
          const label = STATE_DISPLAY_NAMES[key] ?? key;
          const sel = isSelected(key, selectedStateId);
           const pct = mode === "reporters" ? reporterCoverage?.states[key]?.percentage ?? 0 : STATE_FUNDING_MAP[key] ?? 0;
          // Dark text on unfunded (light gray) states for readability
           const textColor = (mode === "reporters" && !reporterCoverage) || pct !== 0 ? "#FFFFFF" : "#555555";
          return (
            <Marker
              key={key}
              coordinates={coords}
              onClick={() => {
                const name =
                  key === "fct"
                    ? "Federal Capital Territory"
                    : `${key.charAt(0).toUpperCase() + key.slice(1)} State`;
                onSelectState({ id: key, name, percentage: pct, color: mode === "reporters" && !reporterCoverage ? "#176845" : getStateColor(pct) });
              }}
            >
              <text
                textAnchor="middle"
                alignmentBaseline="middle"
                style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: sel ? "10px" : "8.5px",
                  fontWeight: "400",
                  letterSpacing: "0.02em",
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

function isSelected(stateId: string, selectedId: string): boolean {
  return stateId === selectedId.toLowerCase().replace(/\bstate\b/gi, "").trim();
}

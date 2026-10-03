const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(file, imports = {}) {
  const filename = path.resolve(file);
  const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
  });
  const module = new Module(filename);
  module.filename = filename;
  module.paths = Module._nodeModulePaths(path.dirname(filename));
  const requireModule = module.require.bind(module);
  module.require = (name) => Object.hasOwn(imports, name) ? imports[name] : requireModule(name);
  module._compile(result.outputText, filename);
  return module.exports;
}

const targets = load("src/lib/eyewitness-coverage.ts");
const coverageHelpers = load("src/lib/reporter-coverage.ts", { "./eyewitness-coverage": targets });
const registrationHelpers = load("src/lib/recent-eyewitness-registrations.ts", { "./eyewitness-coverage": targets });
const { eyewitnessHeroStats } = load("src/lib/eyewitness-hero-stats.ts", {
  "./eyewitness-coverage": targets,
  "./reporter-coverage": coverageHelpers,
});
function fixture(counts = { abia: 5, lagos: 12, fct: 2, oyo: 109 }) {
  const totalRegistered = Object.values(counts).reduce((sum, count) => sum + count, 0);
  return {
    totalRegistered,
    percentage: totalRegistered / targets.NATIONAL_REPORTERS_REQUIRED * 100,
    fetchedAt: new Date().toISOString(),
    states: Object.fromEntries(Object.keys(targets.POLLING_UNITS).map((id) => [id, {
      registered: counts[id] ?? 0,
      percentage: (counts[id] ?? 0) / (targets.POLLING_UNITS[id] * targets.REPORTERS_PER_UNIT) * 100,
    }])),
  };
}
const values = (data) => Object.fromEntries(eyewitnessHeroStats(data).map(({ id, value }) => [id, value]));

test("five Hero stats derive reporter totals, state presence, shortfalls and precision from coverage", () => {
  assert.deepEqual(values(fixture()), {
    profiles: "128", states: "4 / 37", needed: "884,102", filled: "0.0145%", pollingUnits: "176,846",
  });
  assert.equal(eyewitnessHeroStats(fixture()).length, 5);
});

test("zero profiles are valid, while absent coverage leaves live stats unknown", () => {
  assert.deepEqual(values(fixture({})), {
    profiles: "0", states: "0 / 37", needed: "884,230", filled: "0%", pollingUnits: "176,846",
  });
  assert.deepEqual(values(null), {
    profiles: "—", states: "—", needed: "—", filled: "—", pollingUnits: "176,846",
  });
});

test("surplus profiles in one state do not erase another state's staffing shortfall", () => {
  const lagosTarget = targets.POLLING_UNITS.lagos * targets.REPORTERS_PER_UNIT;
  const result = values(fixture({ lagos: lagosTarget + 10 }));
  assert.equal(result.needed, targets.formatCount(targets.NATIONAL_REPORTERS_REQUIRED - lagosTarget));
  assert.equal(result.states, "1 / 37");
});

const { EyewitnessRegistrationTicker } = load("src/components/EyewitnessRegistrationTicker.tsx", {
  "@/lib/recent-eyewitness-registrations": registrationHelpers,
});
const { ActiveCitizensHeroSection } = load(
  "src/screens/Asif/sections/ActiveCitizensHeroSection/ActiveCitizensHeroSection.tsx",
  {
    "next/image": ({ priority, fill, ...props }) => React.createElement("img", props),
    "@/components/EyewitnessRegistrationTicker": { EyewitnessRegistrationTicker },
    "@/hooks/useRecentEyewitnessRegistrations": {
      useRecentEyewitnessRegistrations: () => ({ feed: null, status: "unavailable", retry: () => {} }),
    },
  },
);
let hookState = { coverage: fixture(), error: false, loading: false, retry: () => {} };
const imports = {
  "@/lib/registration": load("src/lib/registration.ts"),
  "@/hooks/useReporterCoverage": { useReporterCoverage: () => hookState },
  "@/lib/eyewitness-hero-stats": { eyewitnessHeroStats },
  "./sections/ActiveCitizensHeroSection/ActiveCitizensHeroSection": { ActiveCitizensHeroSection },
};
for (const name of [
  "AwardOverviewSection", "DemocracyImpactMetricsSection", "MainNavigationSection",
  "ParticipationStepsSection", "PartnersSection", "ReportVerificationSection",
  "ReportingAndPrizesSection", "SiteFooterSection", "EyewitnessCoverageSection",
]) {
  imports[`./sections/${name}/${name}`] = { [name]: () => null };
}
const { Asif } = load("src/screens/Asif/Asif.tsx", imports);

test("Home renders real reporter Hero stats even while the registration ticker is unavailable", () => {
  hookState = { coverage: fixture(), error: false, loading: false, retry: () => {} };
  const html = renderToStaticMarkup(React.createElement(Asif));
  for (const stat of eyewitnessHeroStats(hookState.coverage)) {
    assert.ok(html.includes(stat.label.replace(/&/g, "&amp;")));
    assert.ok(html.includes(stat.value));
    assert.ok(html.includes(stat.hint.replace(/'/g, "&#x27;")), "Definitions must be accessible");
  }
  assert.match(html, /Stats refresh every minute/);
  assert.match(html, /<a href="https:\/\/www\.ngelectionpolls\.org\/signup"[^>]*>/);
  assert.match(html, /Register to Participate/);
  assert.match(html, /registrations are unavailable/);
  assert.doesNotMatch(html, /Raised Till Date|Registered Citizens|Verified Reporters|Days To Election/);
});

test("Home Hero stats distinguish loading and API errors, retain fixed target, and expose retry", () => {
  hookState = { coverage: null, error: false, loading: true, retry: () => {} };
  const loading = renderToStaticMarkup(React.createElement(Asif));
  assert.match(loading, /Loading live eyewitness reporter statistics/);
  assert.match(loading, /176,846/);
  hookState = { coverage: null, error: true, loading: false, retry: () => {} };
  const failed = renderToStaticMarkup(React.createElement(Asif));
  assert.match(failed, /Live reporter statistics are unavailable—not zero/);
  assert.match(failed, /role="alert"/);
  assert.match(failed, /Try again/);
  assert.match(failed, /176,846/);
  assert.doesNotMatch(failed, /884,102|0\.0145%/);
});
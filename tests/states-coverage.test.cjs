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
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const module = new Module(filename);
  module.filename = filename;
  module.paths = Module._nodeModulePaths(path.dirname(filename));
  const requireModule = module.require.bind(module);
  module.require = (name) => Object.hasOwn(imports, name) ? imports[name] : requireModule(name);
  module._compile(output, filename);
  return module.exports;
}

const targets = load("src/lib/eyewitness-coverage.ts");
const helpers = load("src/lib/reporter-coverage.ts", { "./eyewitness-coverage": targets });
const liveFixture = {
  totalRegistered: 14,
  percentage: helpers.reporterPercentage(14, targets.NATIONAL_REPORTERS_REQUIRED),
  fetchedAt: "2026-10-03T12:00:00Z",
  states: Object.fromEntries(Object.keys(targets.POLLING_UNITS).map((id) => {
    const registered = id === "lagos" ? 12 : id === "fct" ? 2 : 0;
    return [id, {
      registered,
      percentage: helpers.reporterPercentage(registered, targets.POLLING_UNITS[id] * targets.REPORTERS_PER_UNIT),
    }];
  })),
};
let hookState = { coverage: liveFixture, error: false, loading: false, retry: () => {} };
const passthrough = ({ children }) => React.createElement(React.Fragment, null, children);
const link = ({ children, href, ...props }) => React.createElement("a", { href, ...props }, children);
const dynamic = () => (props) => React.createElement("div", {
  "data-map-state": props.selectedStateId,
  "data-map-mode": props.mode,
  "data-map-count": props.reporterCoverage?.states[props.selectedStateId].registered ?? "unavailable",
});
const { EyewitnessCoverageSection } = load(
  "src/screens/Asif/sections/EyewitnessCoverageSection/EyewitnessCoverageSection.tsx",
  {
    "next/dynamic": dynamic,
    "next/link": link,
    "@/components/AnimateIn": { AnimateIn: passthrough },
    "@/hooks/useReporterCoverage": { useReporterCoverage: () => hookState },
    "@/lib/reporter-coverage": helpers,
    "@/lib/eyewitness-coverage": targets,
  },
);
const { default: StatePage } = load("app/states/page.tsx", {
  "@/lib/registration": load("src/lib/registration.ts"),
  "next/link": link,
  "next/image": ({ priority, ...props }) => React.createElement("img", props),
  "@/screens/Asif/PageLayout": { PageLayout: passthrough },
  "@/components/AnimateIn": { AnimateIn: passthrough },
  "@/screens/Asif/sections/EyewitnessCoverageSection/EyewitnessCoverageSection": { EyewitnessCoverageSection },
});

const { EyewitnessReporterMap } = load("src/components/EyewitnessReporterMap.tsx", {
  "next/dynamic": dynamic,
  "@/hooks/useReporterCoverage": { useReporterCoverage: () => hookState },
  "@/lib/reporter-coverage": helpers,
  "@/lib/eyewitness-coverage": targets,
});
const { default: AwardPage } = load("app/the-award/page.tsx", {
  "@/lib/registration": load("src/lib/registration.ts"),
  "next/link": link,
  "next/image": ({ priority, fill, ...props }) => React.createElement("img", props),
  "@/screens/Asif/PageLayout": { PageLayout: passthrough },
  "@/components/AnimateIn": { AnimateIn: passthrough },
  "@/components/EyewitnessReporterMap": { EyewitnessReporterMap },
});

test("The Award map uses the same live counts for all 36 states and FCT, not funding", () => {
  hookState = { coverage: liveFixture, error: false, loading: false, retry: () => {} };
  const html = renderToStaticMarkup(React.createElement(AwardPage));
  assert.match(html, /data-map-state="lagos"/);
  assert.match(html, /data-map-mode="reporters"/);
  assert.match(html, /data-map-count="12"/);
  assert.match(html, /12 registered eyewitness reporters/);
  assert.equal((html.match(/<option /g) || []).length, 37);
  for (const [id, state] of Object.entries(liveFixture.states)) {
    assert.ok(html.includes(`${targets.STATE_NAMES[id]} — ${targets.formatCount(state.registered)} reporters`), id);
  }
  assert.match(html, /completed eyewitness profiles with matched coverage locations/);
  assert.match(html, /Updates every minute/);
  assert.doesNotMatch(html, /live funding/);
});

test("The Award map distinguishes loading, unavailable counts, and legitimate zero profiles", () => {
  hookState = { coverage: null, error: false, loading: true, retry: () => {} };
  const loading = renderToStaticMarkup(React.createElement(AwardPage));
  assert.match(loading, /Loading live eyewitness reporter counts/);
  assert.match(loading, /data-map-count="unavailable"/);
  assert.doesNotMatch(loading, /0 registered eyewitness reporters/);

  hookState = { coverage: null, error: true, loading: false, retry: () => {} };
  const error = renderToStaticMarkup(React.createElement(AwardPage));
  assert.match(error, /role="alert"/);
  assert.match(error, /unavailable—not zero/);
  assert.match(error, /Try again/);
  assert.doesNotMatch(error, /0 registered eyewitness reporters/);

  hookState = { coverage: {
    ...liveFixture, totalRegistered: 0, percentage: 0,
    states: Object.fromEntries(Object.keys(targets.POLLING_UNITS).map((id) => [id, { registered: 0, percentage: 0 }])),
  }, error: false, loading: false, retry: () => {} };
  const zero = renderToStaticMarkup(React.createElement(AwardPage));
  assert.match(zero, /data-map-count="0"/);
  assert.match(zero, /0 registered eyewitness reporters/);
  assert.match(zero, /0% of the reporter target filled/);
  assert.doesNotMatch(zero, /Unavailable|Loading live|role="alert"/);
});

test("The Award dropdown and map clicks update the same selected state's live count", () => {
  hookState = { coverage: liveFixture, error: false, loading: false, retry: () => {} };
  let selected = "lagos";
  const { EyewitnessReporterMap: InteractiveMap } = load("src/components/EyewitnessReporterMap.tsx", {
    react: { ...React, useState: () => [selected, (value) => { selected = value; }] },
    "next/dynamic": dynamic,
    "@/hooks/useReporterCoverage": { useReporterCoverage: () => hookState },
    "@/lib/reporter-coverage": helpers,
    "@/lib/eyewitness-coverage": targets,
  });
  function find(node, predicate) {
    if (!React.isValidElement(node)) return null;
    if (predicate(node)) return node;
    for (const child of React.Children.toArray(node.props.children)) {
      const found = find(child, predicate);
      if (found) return found;
    }
    return null;
  }
  const dropdown = find(InteractiveMap(), (node) => node.type === "select");
  dropdown.props.onChange({ target: { value: "fct" } });
  let html = renderToStaticMarkup(React.createElement(InteractiveMap));
  assert.match(html, /data-map-state="fct"/);
  assert.match(html, /2 registered eyewitness reporters/);

  const map = find(InteractiveMap(), (node) => typeof node.props.onSelectState === "function");
  map.props.onSelectState({ id: "abia" });
  html = renderToStaticMarkup(React.createElement(InteractiveMap));
  assert.match(html, /data-map-state="abia"/);
  assert.match(html, /0 registered eyewitness reporters/);
});

test("Explore States renders the shared live coverage section, with FCT selected", () => {
  hookState = { coverage: liveFixture, error: false, loading: false, retry: () => {} };
  const html = renderToStaticMarkup(React.createElement(StatePage));
  assert.match(html, /id="explore-states"/);
  assert.match(html, /id="explore-states-coverage-heading"[^>]*>Explore States</);
  assert.match(html, /data-map-state="fct"/);
  assert.match(html, /data-map-mode="reporters"/);
  assert.match(html, /data-map-count="2"/);
  assert.match(html, /14,110/);
  assert.match(html, /0\.0142%/);
  assert.equal((html.match(/<option /g) || []).length, 37);
  assert.equal((html.match(/<th scope="row"/g) || []).length, 37);
  assert.match(html, /Checks automatically every minute/);
  assert.match(html, /Only eyewitness accounts with completed biodata/);
  assert.doesNotMatch(html, /Gross Total Fund Raised|Top Funded States|Recent Donations Across States|Funding Legend/);
  assert.match(html, /Together Across/);
  assert.match(html, /Every State\. Every Voice/);
});

test("Home defaults remain unchanged, including Lagos selection", () => {
  const html = renderToStaticMarkup(React.createElement(EyewitnessCoverageSection));
  assert.match(html, /id="state"/);
  assert.match(html, />Eyewitness Reporter Coverage</);
  assert.match(html, /data-map-state="lagos"/);
  assert.match(html, /data-map-count="12"/);
});

test("Explore States distinguishes loading and failures from zero registrations", () => {
  hookState = { coverage: null, error: false, loading: true, retry: () => {} };
  const loading = renderToStaticMarkup(React.createElement(StatePage));
  assert.match(loading, /Loading live coverage/);
  assert.match(loading, /data-map-count="unavailable"/);
  hookState = { coverage: null, error: true, loading: false, retry: () => {} };
  const failed = renderToStaticMarkup(React.createElement(StatePage));
  assert.match(failed, /role="alert"/);
  assert.match(failed, /not zero registrations/);
  assert.match(failed, /Try again/);
  assert.match(failed, /data-map-count="unavailable"/);
  assert.doesNotMatch(failed, /0\.0142%/);
});
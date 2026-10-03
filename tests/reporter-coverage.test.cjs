const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Load focused TypeScript modules using the project's existing compiler.
function load(file, imports = {}) {
  const filename = path.resolve(file);
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
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
const coverage = load("src/lib/reporter-coverage.ts", { "./eyewitness-coverage": targets });

function fixture() {
  return {
    level: "national",
    scope: { reportersRegistered: 2, reportersNeeded: targets.NATIONAL_REPORTERS_REQUIRED },
    children: Object.keys(targets.POLLING_UNITS).map((id) => ({
      name: targets.STATE_NAMES[id], pus: targets.POLLING_UNITS[id],
      reportersNeeded: targets.POLLING_UNITS[id] * targets.REPORTERS_PER_UNIT,
      reportersRegistered: id === "lagos" ? 2 : 0,
    })),
  };
}

test("normalizes all 37 states and reconciles national counts", () => {
  const result = coverage.parseReporterCoverage(fixture(), "2026-10-03T12:00:00Z");
  assert.equal(Object.keys(result.states).length, 37);
  assert.equal(result.totalRegistered, 2);
  assert.equal(result.states.lagos.registered, 2);
  assert.equal(result.states.borno.registered, 0);
  assert.equal(result.percentage, 2 / 884230 * 100);
});

test("zero is valid data, not missing data", () => {
  const input = fixture();
  input.children.forEach((state) => state.reportersRegistered = 0);
  input.scope.reportersRegistered = 0;
  assert.equal(coverage.parseReporterCoverage(input).totalRegistered, 0);
  assert.equal(coverage.formatCoveragePercentage(0), "0%");
});

test("normalizes multiword states, Nasarawa alias, and FCT", () => {
  const input = fixture();
  input.children.find((state) => state.name === "Nasarawa").name = "Nassarawa State";
  input.children.find((state) => state.name === "FCT").name = "Federal Capital Territory";
  const result = coverage.parseReporterCoverage(input);
  for (const id of ["nasarawa", "fct", "crossriver", "akwaibom"]) assert.ok(result.states[id]);
});

test("rejects missing, duplicate, unknown states and inconsistent totals", () => {
  const missing = fixture(); missing.children.pop();
  assert.throws(() => coverage.parseReporterCoverage(missing));
  const duplicate = fixture(); duplicate.children[1] = duplicate.children[0];
  assert.throws(() => coverage.parseReporterCoverage(duplicate));
  const unknown = fixture(); unknown.children[0].name = "Unknown State";
  assert.throws(() => coverage.parseReporterCoverage(unknown));
  const totals = fixture(); totals.scope.reportersRegistered = 99;
  assert.throws(() => coverage.parseReporterCoverage(totals));
});

test("rejects invalid counts and target mismatches instead of substituting zero", () => {
  for (const invalid of [-1, 0.5, "2", null, Number.MAX_SAFE_INTEGER + 1]) {
    const input = fixture(); input.children[0].reportersRegistered = invalid;
    assert.throws(() => coverage.parseReporterCoverage(input));
  }
  const input = fixture(); input.children[0].reportersNeeded++;
  assert.throws(() => coverage.parseReporterCoverage(input));
});

test("projects aggregate fields only and retains precision for small percentages", () => {
  const input = fixture();
  input.children[0].email = "not-a-real-account@example.invalid";
  input.privateRecords = [{ fullName: "Test fixture only" }];
  const result = coverage.parseReporterCoverage(input);
  assert.deepEqual(Object.keys(result).sort(), ["fetchedAt", "percentage", "states", "totalRegistered"]);
  assert.deepEqual(Object.keys(result.states.abia).sort(), ["percentage", "registered"]);
  assert.equal(coverage.formatCoveragePercentage(128 / 884230 * 100), "0.0145%");
  assert.equal(coverage.reporterPercentage(12, 10), 120);
});

test("API fetches the fixed HTTPS source and returns only validated aggregates", async () => {
  const original = global.fetch;
  const route = load("app/api/reporter-coverage/route.ts", { "@/lib/reporter-coverage": coverage });
  try {
    global.fetch = async (url, options) => {
      assert.equal(url, coverage.REPORTER_COVERAGE_SOURCE);
      assert.equal(options.cache, "no-store");
      assert.ok(options.signal instanceof AbortSignal);
      return Response.json(fixture());
    };
    const response = await route.GET();
    assert.equal(response.status, 200);
    assert.equal((await response.json()).totalRegistered, 2);
    assert.equal(response.headers.get("cache-control"), "no-store");
  } finally {
    global.fetch = original;
  }
});

test("API reports HTTP, schema, timeout, and network failures as unavailable, not zero", async () => {
  const original = global.fetch;
  const route = load("app/api/reporter-coverage/route.ts", { "@/lib/reporter-coverage": coverage });
  try {
    for (const failing of [
      async () => new Response("Upstream unavailable", { status: 500 }),
      async () => Response.json({ children: [] }),
      async () => { throw new DOMException("Timed out", "TimeoutError"); },
      async () => { throw new Error("Network failed"); },
    ]) {
      global.fetch = failing;
      const response = await route.GET();
      assert.equal(response.status, 503);
      const body = await response.json();
      assert.equal(typeof body.error, "string");
      assert.equal(body.totalRegistered, undefined);
    }
  } finally {
    global.fetch = original;
  }
});
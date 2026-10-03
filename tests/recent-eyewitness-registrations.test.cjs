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
    fileName: filename.endsWith(".txt") ? filename.slice(0, -4) : filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
    reportDiagnostics: true,
  });
  assert.equal(result.diagnostics?.length ?? 0, 0, "Prepared code must transpile");
  const module = new Module(filename);
  module.filename = filename;
  module.paths = Module._nodeModulePaths(path.dirname(filename));
  const requireModule = module.require.bind(module);
  module.require = (name) => Object.hasOwn(imports, name) ? imports[name] : requireModule(name);
  module._compile(result.outputText, filename);
  return module.exports;
}
const targets = load("src/lib/eyewitness-coverage.ts");
const helpers = load("src/lib/recent-eyewitness-registrations.ts", { "./eyewitness-coverage": targets });
const now = Date.now();
const fixture = () => ({
  schemaVersion: 1,
  registrations: [
    { firstName: "Test", lastInitial: "A", state: "Lagos", registeredAt: new Date(now - 120_000).toISOString() },
    { firstName: "Example", lastInitial: "B", state: "Federal Capital Territory", registeredAt: new Date(now - 60_000).toISOString() },
  ],
});

test("validates and projects public fields only, normalizes states, sorts newest first", () => {
  const input = fixture();
  input.registrations[0].email = "test-only@example.invalid";
  input.registrations[0].lastName = "PRIVATE-TEST-ONLY";
  input.registrations[0].phone = "PRIVATE-TEST-ONLY";
  input.privateRecords = [{ fullName: "PRIVATE-TEST-ONLY" }];
  const feed = helpers.parseRecentEyewitnessRegistrations(input, now);
  assert.equal(feed.registrations[0].firstName, "Example");
  assert.equal(feed.registrations[0].state, "FCT");
  assert.deepEqual(Object.keys(feed.registrations[0]).sort(), ["firstName", "lastInitial", "registeredAt", "state"]);
  assert.doesNotMatch(JSON.stringify(feed), /PRIVATE-TEST-ONLY|example\.invalid/);
  const empty = helpers.parseRecentEyewitnessRegistrations({ schemaVersion: 1, registrations: [] }, now);
  assert.equal(empty.registrations.length, 0);
});

test("rejects malformed names, full surnames in initials, missing states, invalid/future dates and oversized feeds", () => {
  for (const [key, value] of [
    ["firstName", ""], ["firstName", "<script>"], ["firstName", "bad@example.invalid"],
    ["lastInitial", "FullSurname"], ["state", "Unknown"], ["registeredAt", "yesterday"],
    ["registeredAt", new Date(now + 3_600_000).toISOString()], ["registeredAt", null],
  ]) {
    const input = fixture(); input.registrations[0][key] = value;
    assert.throws(() => helpers.parseRecentEyewitnessRegistrations(input, now));
  }
  assert.throws(() => helpers.parseRecentEyewitnessRegistrations({ registrations: [] }, now));
  assert.throws(() => helpers.parseRecentEyewitnessRegistrations({
    schemaVersion: 1, registrations: Array(16).fill(fixture().registrations[0]),
  }, now));
  const input = fixture(); input.registrations[0].lastInitial = "";
  assert.equal(helpers.parseRecentEyewitnessRegistrations(input, now).registrations[1].lastInitial, "");
});

test("relative and exact timestamps distinguish minutes, hours and days in WAT", () => {
  const timestampNow = Date.parse("2026-10-03T12:00:00Z");
  assert.equal(helpers.registrationTimeLabel("2026-10-03T12:00:00Z", timestampNow), "Just now");
  assert.equal(helpers.registrationTimeLabel("2026-10-03T11:59:00Z", timestampNow), "1 minute ago");
  assert.equal(helpers.registrationTimeLabel("2026-10-03T11:58:00Z", timestampNow), "2 minutes ago");
  assert.equal(helpers.registrationTimeLabel("2026-10-03T11:00:00Z", timestampNow), "1 hour ago");
  assert.equal(helpers.registrationTimeLabel("2026-10-02T12:00:00Z", timestampNow), "1 day ago");
  assert.match(helpers.registrationDateLabel("2026-10-03T12:00:00Z"), /13:00 WAT$/);
});

test("same-origin proxy uses a fixed HTTPS source, no-store and timeout; strips private data", async () => {
  const oldFetch = global.fetch;
  const route = load("app/api/eyewitness-registrations/recent/route.ts", {
    "@/lib/recent-eyewitness-registrations": helpers,
  });
  try {
    global.fetch = async (url, options) => {
      assert.equal(url, helpers.RECENT_EYEWITNESS_SOURCE);
      assert.equal(options.cache, "no-store");
      assert.equal(options.redirect, "error");
      assert.ok(options.signal);
      const input = fixture(); input.registrations[0].email = "test-only@example.invalid";
      return Response.json(input);
    };
    const response = await route.GET();
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.doesNotMatch(JSON.stringify(await response.json()), /example\.invalid/);
    for (const outcome of [
      async () => new Response("", { status: 404 }),
      async () => Response.json({ records: [] }),
      async () => Response.json({ schemaVersion: 1, registrations: [{ lastName: "PRIVATE-TEST-ONLY" }] }),
      async () => { throw new Error("network or timeout PRIVATE-TEST-ONLY"); },
    ]) {
      global.fetch = outcome;
      const failure = await route.GET();
      assert.equal(failure.status, 503);
      const body = await failure.json();
      assert.ok(body.error);
      assert.equal(body.registrations, undefined);
      assert.doesNotMatch(JSON.stringify(body), /PRIVATE-TEST-ONLY/);
    }
  } finally { global.fetch = oldFetch; }
});

const preparedFile = "backend-changes/ngelectionpolls/recent-eyewitness-registrations.route.ts.txt";
function preparedRoute(rows, capture = {}, connectionFails = false) {
  const geo = {
    states: [
      { n: "LAGOS", lgas: [{ n: "TEST LGA", wards: [{ n: "TEST WARD" }] }] },
      { n: "FCT", lgas: [{ n: "TEST LGA", wards: [{ n: "TEST WARD" }] }] },
    ],
  };
  return load(preparedFile, {
    "@/data/donationsGeo.json": geo,
    "@/lib/mongodb": { connectDB: async () => {
      if (connectionFails) throw new Error("PRIVATE-CONNECTION-TEST-ONLY");
    } },
    "@/lib/models/User": {
      aggregate: (pipeline) => {
        capture.pipeline = pipeline;
        return {
          option: (options) => {
            capture.options = options;
            return {
              cursor: (options) => {
                capture.cursorOptions = options;
                return {
                  async *[Symbol.asyncIterator]() { yield* rows; },
                  async close() { capture.closed = true; },
                };
              },
            };
          },
        };
      },
    },
  });
}
const candidate = (state = "LAGOS") => ({
  firstName: "Test", lastInitial: "A", coverageState: state,
  lga: "Test  LGA", ward: "Test Ward", createdAt: new Date(now - 120_000),
  email: "PRIVATE-TEST-ONLY", phone: "PRIVATE-TEST-ONLY", lastName: "PRIVATE-TEST-ONLY",
});

test("prepared MongoDB route matches coverage eligibility, projects initial within DB, limits after matching", async () => {
  const capture = {};
  const route = preparedRoute([
    ...Array.from({ length: 20 }, () => candidate("UNKNOWN")),
    candidate("FCT"), ...Array.from({ length: 20 }, () => candidate()),
  ], capture);
  const response = await route.GET();
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.registrations.length, 15, "Do not truncate before skipping unmatched locations");
  assert.equal(body.registrations[0].state, "FCT");
  assert.deepEqual(Object.keys(body.registrations[0]).sort(), ["firstName", "lastInitial", "registeredAt", "state"]);
  assert.doesNotMatch(JSON.stringify(body), /PRIVATE-TEST-ONLY|TEST WARD|TEST LGA/);
  assert.equal(capture.pipeline[0].$match.role, "eyewitness");
  assert.equal(capture.pipeline[0].$match.biodataCompleted, true);
  assert.equal(capture.pipeline[0].$match.emailVerified, undefined);
  assert.equal(capture.pipeline[0].$match.status, undefined);
  assert.deepEqual(capture.pipeline[1].$sort, { createdAt: -1, _id: -1 });
  assert.equal(capture.pipeline[2].$project._id, 0);
  assert.ok(capture.pipeline[2].$project.lastInitial.$substrCP);
  assert.equal(capture.pipeline[2].$project.lastName, undefined);
  assert.equal(capture.pipeline[2].$project.email, undefined);
  assert.equal(capture.options.maxTimeMS, 8000);
  assert.equal(capture.closed, true);
});

test("prepared route supports legitimate empty feeds, missing initials and privacy-safe connection failures", async () => {
  const empty = await preparedRoute([]).GET();
  assert.deepEqual(await empty.json(), { schemaVersion: 1, registrations: [] });
  const noInitial = candidate(); noInitial.lastInitial = "";
  const response = await preparedRoute([noInitial]).GET();
  assert.equal((await response.json()).registrations[0].lastInitial, "");
  const failure = await preparedRoute([], {}, true).GET();
  assert.equal(failure.status, 503);
  assert.doesNotMatch(JSON.stringify(await failure.json()), /PRIVATE-CONNECTION/);
});

const { EyewitnessRegistrationTicker } = load("src/components/EyewitnessRegistrationTicker.tsx", {
  "@/lib/recent-eyewitness-registrations": helpers,
});
test("ticker displays masked names, assigned states, actual timestamps and accessible duplicate loop", () => {
  const feed = helpers.parseRecentEyewitnessRegistrations(fixture(), now);
  const html = renderToStaticMarkup(React.createElement(EyewitnessRegistrationTicker, {
    feed, status: "live", onRetry: () => {},
  }));
  assert.match(html, />Live</);
  assert.match(html, /Example B\./);
  assert.match(html, /Test A\./);
  assert.match(html, /Assigned to/);
  assert.match(html, /Lagos State/);
  assert.match(html, /1 minute ago/);
  assert.ok(html.includes(`dateTime="${fixture().registrations[1].registeredAt}"`));
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /donated|Donations happening|₦/);
});

test("ticker shows distinct loading, empty and unavailable states, never incorrectly live", () => {
  for (const [status, expected] of [
    ["loading", /Loading recent eyewitness registrations/],
    ["empty", /No completed eyewitness profiles/],
    ["unavailable", /registrations are unavailable/],
  ]) {
    const html = renderToStaticMarkup(React.createElement(EyewitnessRegistrationTicker, {
      feed: null, status, onRetry: () => {},
    }));
    assert.match(html, expected);
    assert.doesNotMatch(html, />Live</);
    if (status === "unavailable") {
      assert.match(html, /role="alert"/);
      assert.match(html, /Try again/);
    }
  }
});

// Exercise the actual hook with controlled scheduling, without a browser or network.
function hookHarness() {
  const state = [];
  let index = 0, previousDeps, effect, cleanup;
  const hook = load("src/hooks/useRecentEyewitnessRegistrations.ts", {
    react: {
      useState: (initial) => {
        const key = index++;
        if (!(key in state)) state[key] = initial;
        return [state[key], (value) => { state[key] = typeof value === "function" ? value(state[key]) : value; }];
      },
      useEffect: (callback, deps) => {
        if (!previousDeps || deps.some((value, i) => value !== previousDeps[i])) {
          effect = callback; previousDeps = [...deps];
        }
      },
    },
  }).useRecentEyewitnessRegistrations;
  return {
    render: () => {
      index = 0;
      const result = hook();
      if (effect) { cleanup?.(); const callback = effect; effect = undefined; cleanup = callback(); }
      return result;
    },
    unmount: () => cleanup?.(),
  };
}
const settle = () => new Promise((resolve) => setImmediate(resolve));

test("hook polls every 30 seconds, clears stale data on failure and supports retry", async () => {
  const oldWindow = global.window, oldFetch = global.fetch;
  let interval, intervalMs, cleared = false, calls = 0;
  const feed = helpers.parseRecentEyewitnessRegistrations(fixture(), now);
  global.window = {
    setTimeout: () => 1, clearTimeout: () => {},
    setInterval: (fn, ms) => { interval = fn; intervalMs = ms; return 2; },
    clearInterval: () => { cleared = true; },
  };
  const harness = hookHarness();
  try {
    global.fetch = async (url, options) => {
      calls++;
      assert.equal(url, "/api/eyewitness-registrations/recent");
      assert.equal(options.cache, "no-store");
      return Response.json(feed);
    };
    assert.equal(harness.render().status, "loading");
    await settle();
    assert.equal(harness.render().status, "live");
    assert.equal(intervalMs, 30_000);
    global.fetch = async () => { calls++; return new Response("", { status: 503 }); };
    interval(); interval();
    await settle();
    assert.equal(calls, 2, "Overlapping refresh must not make another request");
    const failed = harness.render();
    assert.equal(failed.status, "unavailable");
    assert.equal(failed.feed, null, "Failed refresh must not leave stale entries labeled live");
    global.fetch = async () => Response.json(feed);
    failed.retry(); harness.render();
    await settle();
    assert.equal(harness.render().status, "live");
  } finally {
    harness.unmount();
    assert.equal(cleared, true);
    global.fetch = oldFetch; global.window = oldWindow;
  }
});

test("hook handles empty feeds and aborts in-flight requests on unmount", async () => {
  const oldWindow = global.window, oldFetch = global.fetch;
  let interval, signal, resolveRequest;
  global.window = {
    setTimeout: () => 1, clearTimeout: () => {},
    setInterval: (fn) => { interval = fn; return 2; }, clearInterval: () => {},
  };
  const harness = hookHarness();
  try {
    global.fetch = async () => Response.json({ schemaVersion: 1, registrations: [], fetchedAt: new Date(now).toISOString() });
    harness.render(); await settle();
    assert.equal(harness.render().status, "empty");
    global.fetch = async (_url, options) => {
      signal = options.signal;
      return new Promise((resolve) => { resolveRequest = resolve; });
    };
    interval();
    harness.unmount();
    assert.equal(signal.aborted, true);
    resolveRequest(Response.json(helpers.parseRecentEyewitnessRegistrations(fixture(), now)));
    await settle();
    assert.equal(harness.render().status, "empty", "Unmounted requests must not update state");
  } finally { global.fetch = oldFetch; global.window = oldWindow; }
});
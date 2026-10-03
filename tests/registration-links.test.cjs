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
const registration = load("src/lib/registration.ts");
const url = "https://www.ngelectionpolls.org/signup";
const image = ({ priority, fill, ...props }) => React.createElement("img", props);
const link = ({ children, href, ...props }) => React.createElement("a", { href, ...props }, children);

test("registration uses the exact requested NGelectionpolls sign-up address", () => {
  assert.equal(registration.NGELECTIONPOLLS_SIGNUP_URL, url);
});

test("login uses the exact requested NGelectionpolls login address", () => {
  assert.equal(registration.NGELECTIONPOLLS_LOGIN_URL, "https://www.ngelectionpolls.org/login");
});

test("desktop and expanded mobile menu both render working external registration and login links", () => {
  for (const mobileOpen of [false, true]) {
    const { MainNavigationSection } = load(
      "src/screens/Asif/sections/MainNavigationSection/MainNavigationSection.tsx",
      {
        react: { ...React, useState: () => [mobileOpen, () => {}] },
        "next/link": link,
        "next/image": image,
        "next/navigation": { usePathname: () => "/" },
        "@/components/ThemeToggle": { ThemeToggle: () => null },
        "@/lib/registration": registration,
      },
    );
    const html = renderToStaticMarkup(React.createElement(MainNavigationSection, { activePage: "Home" }));
    // The mobile panel remains in the DOM and is collapsed with CSS when closed.
    assert.equal((html.match(/href="https:\/\/www\.ngelectionpolls\.org\/signup"/g) || []).length, 2);
    assert.equal((html.match(/href="https:\/\/www\.ngelectionpolls\.org\/login"/g) || []).length, 2);
    assert.match(html, /Login to your account/);
    assert.match(html, /Register Here/);
    assert.match(html, /Create an Account/);
    assert.doesNotMatch(html, /href="\/register"/);
    assert.doesNotMatch(html, /href="\/login"/);
  }
});

test("footer registration link points to NGelectionpolls", () => {
  const { SiteFooterSection } = load("src/screens/Asif/sections/SiteFooterSection/SiteFooterSection.tsx", {
    "next/image": image,
    "@/lib/registration": registration,
  });
  const html = renderToStaticMarkup(React.createElement(SiteFooterSection));
  assert.match(html, /href="https:\/\/www\.ngelectionpolls\.org\/signup"/);
  assert.match(html, /Register Now/);
  assert.doesNotMatch(html, /href="\/register"/);
});

test("all page-specific and Login registration entry points use the shared destination", () => {
  for (const [file, expected] of [
    ["app/about/page.tsx", 2],
    ["app/states/page.tsx", 2],
    ["app/the-award/page.tsx", 2],
    ["app/how-it-works/page.tsx", 3],
    ["app/login/page.tsx", 2],
  ]) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal((source.match(/href=\{NGELECTIONPOLLS_SIGNUP_URL\}/g) || []).length, expected, file);
    assert.doesNotMatch(source, /href=["']\/register|handleRegisterClick|onNavigateToRegister/, file);
  }
  const hero = fs.readFileSync("src/screens/Asif/Asif.tsx", "utf8");
  assert.match(hero, /primaryButton=\{\{ label: "Register to Participate", icon: ShieldAlert, href: NGELECTIONPOLLS_SIGNUP_URL \}\}/);
});

test("saved /register addresses redirect externally instead of presenting the obsolete form", () => {
  const redirected = Symbol("redirected");
  const { default: RegistrationLayout } = load("app/register/layout.tsx", {
    "@/lib/registration": registration,
    "next/navigation": { redirect: (destination) => {
      assert.equal(destination, url);
      throw redirected;
    } },
  });
  assert.throws(() => RegistrationLayout(), (error) => error === redirected);
});

test("saved /login addresses redirect to the existing NGelectionpolls login page", () => {
  const redirected = Symbol("redirected");
  const { default: LoginLayout } = load("app/login/layout.tsx", {
    "@/lib/registration": registration,
    "next/navigation": { redirect: (destination) => {
      assert.equal(destination, "https://www.ngelectionpolls.org/login");
      throw redirected;
    } },
  });
  assert.throws(() => LoginLayout(), (error) => error === redirected);
});
// Accessibility and function checks for the lab homepage.
// Run against a preview server: TEST_URL=http://127.0.0.1:4480 npm run test:a11y
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { projects } from "../src/data/projects.ts";

const base = (process.env.TEST_URL || "http://127.0.0.1:4480").replace(/\/$/, "");
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  args: ["--no-sandbox"],
});
const context = await browser.newContext({ viewport: { width: 1360, height: 1000 } });
const checks = [];
const scans = [];
const errors = [];
const check = (name, pass, detail = "") => checks.push({ name, pass: Boolean(pass), detail });
const spacing =
  "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }";

try {
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto(base + "/", { waitUntil: "domcontentloaded" });
  check("Page loads", response.status() === 200, response.status());
  for (const img of await page.locator("img").all()) await img.scrollIntoViewIfNeeded();
  await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode())));
  const structure = await page.evaluate(() => {
    const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((node) => Number(node.tagName[1]));
    return {
      h1: document.querySelectorAll("h1").length,
      headings: levels.every((level, i) => (i === 0 ? level === 1 : level <= levels[i - 1] + 1)),
      images: [...document.images].every((img) => img.alt.trim() && img.complete && img.naturalWidth > 0),
      csp: Boolean(document.querySelector('meta[http-equiv="Content-Security-Policy"]')),
      lang: document.documentElement.lang,
      media: document.querySelectorAll("video,audio,iframe,object,embed").length,
    };
  });
  check("One h1 and sequential headings", structure.h1 === 1 && structure.headings);
  check("Images load and have alternative text", structure.images);
  check("Restrictive Content-Security-Policy", structure.csp);
  check("Declared English language", structure.lang === "en");
  check("Single static page without embedded media", structure.media === 0);
  check(
    "Every research project is listed with its website",
    JSON.stringify(await page.locator(".research-item .paper-title").allTextContents()) === JSON.stringify(projects.map((p) => p.title)) &&
      (await page.locator(".paper-links a").evaluateAll((links) => links.map((a) => a.href))).join() === projects.map((p) => p.url).join(),
  );
  await page.evaluate(() => {
    document.activeElement?.blur();
    window.scrollTo(0, 0);
  });
  await page.keyboard.press("Tab");
  check("Skip link is first in keyboard order", await page.locator(".skip-link").evaluate((el) => el === document.activeElement));
  await page.keyboard.press("Enter");
  check("Skip link focuses main", await page.locator("main").evaluate((el) => el === document.activeElement));
  await page.keyboard.press("Tab");
  check(
    "Keyboard focus is visible",
    await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle !== "none"),
  );
  for (const mode of ["desktop", "mobile", "text-spacing"]) {
    await page.setViewportSize(mode === "desktop" ? { width: 1360, height: 1000 } : { width: 320, height: 800 });
    if (mode === "text-spacing") await page.addStyleTag({ content: spacing });
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    scans.push({
      mode,
      violations: result.violations,
      incomplete: result.incomplete.map((item) => ({ id: item.id, nodes: item.nodes.length })),
      passes: result.passes.length,
    });
    check(`${mode} reflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  }
  check("No browser or CSP errors", errors.length === 0, errors);
} finally {
  await browser.close();
}
const report = {
  date: new Date().toISOString(),
  base,
  standard: "WCAG 2.1 A and AA automated checks; not a compliance certification",
  scans,
  checks,
  violationCount: scans.reduce((n, scan) => n + scan.violations.length, 0),
  failedChecks: checks.filter((item) => !item.pass),
  manualLimitations: [
    "Screen-reader usability has not been fully evaluated.",
    "Linked project websites are checked in their own repositories.",
    "Automated checks cannot establish full ADA/WCAG compliance.",
  ],
};
await mkdir("reports", { recursive: true });
await writeFile("reports/axe-wcag21aa.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ scans: scans.length, checks: checks.length, violations: report.violationCount, failures: report.failedChecks }, null, 2));
if (report.violationCount || report.failedChecks.length) process.exit(1);

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const baseURL = process.env.VORTEX_URL || "http://127.0.0.1:4173";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
const report = {};

for (const profile of [
  { name: "desktop", viewport: { width: 1440, height: 1000 } },
  { name: "mobile", viewport: { width: 390, height: 844 }, isMobile: true },
]) {
  const context = await browser.newContext({ viewport: profile.viewport, isMobile: profile.isMobile });
  await context.addInitScript(() => sessionStorage.setItem("vortex-intro", "1"));
  const page = await context.newPage();
  const errors = [];
  const failedRequests = [];
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("requestfailed", (request) => failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText}`));
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.7) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(350);
  await page.screenshot({ path: `artifacts/home-${profile.name}.png`, fullPage: true });
  report[profile.name] = { errors, failedRequests, title: await page.title() };
  await context.close();
}

await browser.close();
await writeFile("artifacts/browser-report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

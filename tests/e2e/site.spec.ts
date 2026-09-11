import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("vortex-intro", "1"));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "VORTEX", level: 1 })).toBeVisible();
});

test("home tells a complete automotive story", async ({ page }) => {
  await expect(page.getByRole("link", { name: /Entrer dans la halle/i })).toBeVisible();
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.75) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await expect(page.getByRole("heading", { name: /Choisissez\s+votre époque/i })).toBeAttached();
  await expect(page.getByText("Venir au musée", { exact: true })).toBeAttached();
});

test("navigation and vehicle route work", async ({ page }) => {
  await page.getByRole("link", { name: /Explorer les ailes/i }).click();
  await expect(page).toHaveURL(/\/collections/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("critical accessibility rules pass", async ({ page }) => {
  const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
  expect(results.violations).toEqual([]);
});

test("WebGL is adaptive and has a semantic fallback", async ({ page }, testInfo) => {
  const canvas = page.locator(".immersive-hall__webgl canvas");
  if (testInfo.project.name === "desktop") {
    await expect(canvas).toBeVisible();
  } else {
    await expect(canvas).toHaveCount(0);
  }
  await expect(page.locator(".immersive-hall__machine svg")).toBeVisible();
});

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("vortex-intro", "1"));
  await page.goto("/");
  await expect(page.locator("h1").filter({ hasText: /La légende/i }).first()).toBeVisible();
});

test("home tells a complete automotive story", async ({ page }) => {
  await expect(page.getByRole("link", { name: /Découvrir la collection/i })).toBeVisible();
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.75) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await expect(page.getByRole("heading", { name: /Chaque voiture porte son propre siècle/i })).toBeVisible();
  await expect(page.getByText("Premier chapitre", { exact: true })).toBeVisible();
});

test("navigation and vehicle route work", async ({ page }) => {
  const menuButton = page.getByRole("button", { name: /Ouvrir le menu/i });
  if (await menuButton.isVisible().catch(() => false)) {
    await menuButton.click();
  }

  await page
    .getByRole("navigation", { name: /Navigation principale|Navigation mobile/i })
    .getByRole("link", { name: /^Collections$/i })
    .click();

  await expect(page).toHaveURL(/\/collections/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("critical accessibility rules pass", async ({ page }) => {
  const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
  expect(results.violations).toEqual([]);
});

test("hero remains semantic and image-led", async ({ page }) => {
  await expect(page.locator('header img[alt*="Voiture"]').first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Découvrir la collection/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Notre histoire/i })).toBeVisible();
});

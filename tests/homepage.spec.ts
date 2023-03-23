import { test, expect } from "@playwright/test";

test("homepage could be accessed ", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Pameran Karya Teknologi Pendidikan 2023 - Universitas Negeri Malang"
  );
});

test("homepage have 3 section", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("section")).toHaveCount(3);

  // make sure the section title is h2
  await expect(page.locator("section").nth(0).locator("h2")).toHaveCount(1);
  await expect(page.locator("section").nth(1).locator("h2")).toHaveCount(1);
  await expect(page.locator("section").nth(2).locator("h2")).toHaveCount(1);

  // make sure the section have the correct title
  await expect(page.locator("section").nth(0).locator("h2")).toHaveText(
    "Selamat datang Teknolog Pendidikan!"
  );
  await expect(page.locator("section").nth(1).locator("h2")).toHaveText(
    "Kategori Karya Pameran"
  );
  await expect(page.locator("section").nth(2).locator("h2")).toHaveText(
    "Siapa Anda?"
  );

  await expect(page.locator("section").nth(0)).toHaveAttribute("id", "tentang");
  await expect(page.locator("section").nth(1)).toHaveAttribute(
    "id",
    "kategori-karya"
  );
  await expect(page.locator("section").nth(2)).toHaveAttribute(
    "id",
    "player-selector"
  );
});

test("footer have a link to github repo", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("footer")).toHaveCount(1);
});

test("nav have link to mainpages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("nav")).toHaveCount(1);
  await expect(page.locator("nav").locator("a")).toHaveCount(5);

  await expect(page.locator("nav").locator("a").nth(0)).toHaveAttribute(
    "href",
    "/"
  );
  await expect(page.locator("nav").locator("a").nth(1)).toHaveAttribute(
    "href",
    "/tentang"
  );
  await expect(page.locator("nav").locator("a").nth(2)).toHaveAttribute(
    "href",
    "/partisipan"
  );
  await expect(page.locator("nav").locator("a").nth(3)).toHaveAttribute(
    "href",
    "/karya"
  );
  await expect(page.locator("nav").locator("a").nth(4)).toHaveAttribute(
    "href",
    "/bantuan"
  );
});

import { test, expect } from "@playwright/test";

test.describe("menu category filter", () => {
  test("shows all dishes by default", async ({ page }) => {
    await page.goto("/");

    const starters = ["Bruschetta", "Soup of the Day", "Garlic Prawns", "Caesar Salad"];
    const mains = ["Classic Burger", "Grilled Salmon", "Margherita Pizza"];
    const desserts = ["Chocolate Lava Cake", "Crème Brûlée"];

    for (const name of [...starters, ...mains, ...desserts]) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
  });

  test("filters dishes when a category is selected", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Desserts", exact: true }).click();

    // Only dessert dishes should be visible.
    await expect(page.getByRole("heading", { name: "Chocolate Lava Cake" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Crème Brûlée" })).toBeVisible();

    // A dish from another category must be filtered out.
    await expect(page.getByRole("heading", { name: "Classic Burger" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Bruschetta" })).toHaveCount(0);
  });

  test("restores full list when 'All' is selected again", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Mains", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Bruschetta" })).toHaveCount(0);

    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Bruschetta" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Classic Burger" })).toBeVisible();
  });
});

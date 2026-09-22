// categories.js
// A small shared list of expense categories, each with an emoji icon and a
// color. Both the form (dropdown) and the list (badges) import this so the
// two stay in sync and the UI looks consistent everywhere.

export const CATEGORIES = [
  { name: "Food", icon: "🍔", color: "#f59e0b" },
  { name: "Travel", icon: "✈️", color: "#3b82f6" },
  { name: "Shopping", icon: "🛍️", color: "#ec4899" },
  { name: "Bills", icon: "🧾", color: "#ef4444" },
  { name: "Entertainment", icon: "🎬", color: "#8b5cf6" },
  { name: "Health", icon: "💊", color: "#10b981" },
  { name: "Other", icon: "📦", color: "#6b7280" },
];

// Helper: given a category name (string), find its matching icon/color.
// Falls back to the "Other" entry if the name isn't in the list above.
export function getCategoryInfo(name) {
  return CATEGORIES.find((c) => c.name === name) || CATEGORIES[CATEGORIES.length - 1];
}

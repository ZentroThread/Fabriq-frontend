export const QUERY_KEYS = {
  ITEMS: {
    ALL: ["items"] as const,
    BY_ID: (id: string) => ["items", id] as const,
    BY_CATEGORY: (categoryId: number) =>
      ["items", "category", categoryId] as const,
  },
  // Add other query keys as needed
};

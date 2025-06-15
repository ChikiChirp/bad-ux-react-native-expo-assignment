export const Typography = {
  fontFamily: "Times New Roman",
  textTransform: "uppercase" as const,

  // Base styles that can be spread into components
  baseText: {
    fontFamily: "Times New Roman",
    textTransform: "uppercase" as const,
  },

  // Common text variants
  title: {
    fontFamily: "Times New Roman",
    textTransform: "uppercase" as const,
    fontSize: 32,
    fontWeight: "bold" as const,
  },

  subtitle: {
    fontFamily: "Times New Roman",
    textTransform: "uppercase" as const,
    fontSize: 20,
    fontWeight: "bold" as const,
  },

  body: {
    fontFamily: "Times New Roman",
    textTransform: "uppercase" as const,
    fontSize: 16,
  },

  caption: {
    fontFamily: "Times New Roman",
    textTransform: "uppercase" as const,
    fontSize: 12,
  },
};

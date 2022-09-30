export const JSONSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      subName: { type: "string" },
      specialDiets: { type: "array" },
      metaDescription: { type: "string" },
      description: { type: "string" },
      servings: { type: "string" },
      time: {
        type: "object",
        properties: {
          prep: { type: "string" },
          cook: { type: "string" },
          active: { type: "string" },
          inactive: { type: "string" },
          ready: { type: "string" },
          total: { type: "string" },
        },
      },
      difficulty: { type: "string" },
      tags: { type: "array" },
      ingredients: { type: "array" },
      instructions: { type: "array" },
      image: { type: "string" },
      imageAlt: { type: "string" },
    },
  },
};

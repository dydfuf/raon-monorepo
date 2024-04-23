export const siteConfig = {
  name: "COFFEE DB",
  domain: "coffee.raonc.dev",
  mobileNav: [
    {
      label: "All Coffee",
      to: "/coffee/list",
    },
    {
      label: "Suggestion",
      to: "/coffee/suggestion",
    },
  ],
  mainNav: [
    {
      label: "All Coffee",
      to: "/coffee/list",
    },
    {
      label: "Suggestion",
      to: "/coffee/suggestion",
    },
  ],
};

export const IS_CLIENT = typeof window !== "undefined";


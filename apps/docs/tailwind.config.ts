const baseConfig = require("@dydfuf/ui/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    "content/**/*.mdx",
    "registry/**/*.{ts,tsx}",
  ],
};

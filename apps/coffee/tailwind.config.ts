// const baseConfig = require("@dydfuf/ui/tailwind.config");
import baseConfig from "@dydfuf/ui/tailwind.config";

import type { Config } from "tailwindcss";

export default {
  ...baseConfig,
  // content: ["./app/**/*.{js,jsx,ts,tsx}"],
  // theme: {
  //   extend: {},
  // },
  // plugins: [],
} satisfies Config;

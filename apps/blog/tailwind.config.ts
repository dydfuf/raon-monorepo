import baseConfig from "@raonc/ui/tailwind.config";

import type { Config } from "tailwindcss";

export default {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme.extend,
      screens: {
        mobile: "320px",
      },
      animation: {
        ...baseConfig.theme.extend.animation,
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        ...baseConfig.theme.extend.keyframes,
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
} satisfies Config;

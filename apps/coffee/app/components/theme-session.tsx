import { createThemeSessionResolver } from "remix-themes";
import { siteConfig } from "../constant/common";
import { createCookieSessionStorage } from "@remix-run/node";

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // Set domain and secure only if in production
    ...(isProduction ? { domain: siteConfig.domain, secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);

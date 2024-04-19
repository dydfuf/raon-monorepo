import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import stylesheet from "@raonc/ui/globals.css?url";
import fontStyleSheet from "../public/font/pretendardvariable.css?url";
import { LinksFunction } from "@remix-run/node";
import SiteHeader from "./components/site-header";
import { TailwindIndicator } from "./components/tailwind-indicator";
import { Icons } from "./components/Icons";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fontStyleSheet },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ fontFamily: "Pretendard Variable" }}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  const isLoading = ["loading", "submitting"].includes(navigation.state);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex">
        {isLoading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center bg-accent/60 z-[9999]">
            <Icons.spinner className="animate-spin" />
          </div>
        )}
        {<Outlet />}
      </main>
      {/* <SiteFooter /> */}
      <TailwindIndicator />
    </div>
  );
}
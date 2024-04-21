import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import stylesheet from "@raonc/ui/globals.css?url";
import fontStyleSheet from "../public/font/pretendardvariable.css?url";
import { LinksFunction, LoaderFunctionArgs } from "@vercel/remix";
import SiteHeader from "./components/site-header";
import { TailwindIndicator } from "./components/tailwind-indicator";
import { Icons } from "./components/Icons";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import { themeSessionResolver } from "./components/theme-session";
import { cn } from "@raonc/ui/lib/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fontStyleSheet },
  { rel: "stylesheet", href: stylesheet },
];

export function App({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html
      lang="en"
      className={cn(theme)}
      style={{ colorScheme: theme?.toString() }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no"
        />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
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

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <Root />
    </ThemeProvider>
  );
}

export function Root() {
  const navigation = useNavigation();
  const isLoading = ["loading", "submitting"].includes(navigation.state);

  return (
    <App>
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
    </App>
  );
}

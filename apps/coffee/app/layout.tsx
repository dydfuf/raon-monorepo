import { TailwindIndicator } from "../components/TailwindIndicator";
import { ThemeProvider } from "../components/ThemeProvider";
import SiteHeader from "../components/SiteHeader";
import "@raonc/ui/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1 flex">{children}</main>
            <TailwindIndicator />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

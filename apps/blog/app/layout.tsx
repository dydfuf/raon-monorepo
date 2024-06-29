import "@raonc/ui/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import RootHead from "./RootHead";
import NextThemeProvider from "../components/common/NextThemeProvider";
import { Noto_Sans_KR } from "next/font/google";
import { TailwindIndicator } from "../components/tailwind-indicator";
import AppLayout from "../components/common/AppLayout";
import { SITE_CONFIG } from "../constant/common";

const description =
  "안녕하세요. Raon.dev의 개발 블로그 입니다. 주로 Front-end 관련 글을 작성합니다. Youtube 에서 라이브 방송을 합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_CONFIG.siteUrl}`),
  title: {
    default: SITE_CONFIG.siteName,
    template: `${SITE_CONFIG.siteName} | %s`,
  },
  description,
  openGraph: {
    title: SITE_CONFIG.siteName,
    description,
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.siteName,
    locale: "ko-Kr",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.siteUrl}/og.png`,
        width: 400,
        height: 600,
      },
    ],
  },
};

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <RootHead />
      <body className={notoSansKr.className}>
        <NextThemeProvider>
          <AppLayout>{children}</AppLayout>
          <Analytics />
          <TailwindIndicator />
        </NextThemeProvider>
      </body>
    </html>
  );
}

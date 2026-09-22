import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/data/site";

import "./globals.css";

const centuryGothic = localFont({
  src: [
    {
      path: "../assets/fonts/century-gothic-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/century-gothic-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/century-gothic-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/century-gothic-bold-italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-century-gothic",
  display: "swap",
});

const oregonLdo = localFont({
  src: [
    {
      path: "../assets/fonts/oregon-ldo-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/oregon-ldo-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-oregon-ldo",
  display: "swap",
});

const themeScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem("theme");
      var theme =
        storedTheme === "light" || storedTheme === "dark"
          ? storedTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/magnifier-icon-taupe.svg`,
        type: "image/svg+xml",
      },
    ],
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/magnifier-icon-taupe.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${centuryGothic.variable} ${oregonLdo.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

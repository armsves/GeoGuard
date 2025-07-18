import "./global.css";
import "katex/dist/katex.css";
import { PHProvider } from "./providers";
import type { Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";
import { baseUrl, createMetadata } from "@/utils/metadata";
import Chatbot from "@/components/ui/chatbot";
import { SearchRootProvider } from "./searchRootProvider";
import { Banner } from "fumadocs-ui/components/banner";
import "./global.css";
import "katex/dist/katex.css";

export const metadata = createMetadata({
  title: {
    template: "%s | Avalanche Builder Hub",
    default: "Avalanche Builder Hub",
  },
  description:
    "Build your Fast & Interoperable Layer 1 Blockchain with Avalanche.",
  metadataBase: baseUrl,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#fff" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <PHProvider>
        <body className="flex min-h-screen flex-col">
          <SearchRootProvider>{children}</SearchRootProvider>
          <div id="privacy-banner-root" className="relative">
          </div>
        </body>
      </PHProvider>
    </html>
  );
}

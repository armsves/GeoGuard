"use client";

import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";
import { Footer } from "@/components/navigation/footer";
import { Header } from "@/components/navigation/header";
import { baseOptions } from "@/app/layout.config";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <SessionProvider>

      <Header />
      {children}
      <Footer />

    </SessionProvider>
  );
}

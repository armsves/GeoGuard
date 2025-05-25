"use client";

import React from "react";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Sponsors } from '@/components/landing/globe';

export default function Hero() {
  return (
    <>
    </>
  );
}

function GradientBG({
  children,
  className,
  ...props
}: React.PropsWithChildren<
  {
    className?: string;
  } & React.HTMLAttributes<HTMLElement>
>) {
  return (
    <div
      className={cn(
        "relative flex content-center items-center flex-col flex-nowrap h-min justify-center overflow-visible p-px w-full",
      )}
      {...props}
    >
      <div className={cn("w-auto z-10 px-4 py-2 rounded-none", className)}>
        {children}
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-950 absolute z-1 flex-none inset-[2px] " />
    </div>
  );
}
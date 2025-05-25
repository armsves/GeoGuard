"use client"

import { Button } from "../Button"

interface ConnectWalletPromptProps {
  onConnect: () => void;
}

export const ConnectWalletPrompt = ({ onConnect }: ConnectWalletPromptProps) => (
  <div className="space-y-4 max-w-md mx-auto">
    <Button
      onClick={onConnect}
      className="w-full bg-black hover:bg-zinc-800 text-white font-medium py-4 px-5 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200 flex items-center justify-center relative group"
    >
      <span className="absolute inset-0 w-full h-full rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <span className="relative z-10 text-white">Connect Core Wallet</span>
    </Button>

  </div>
) 

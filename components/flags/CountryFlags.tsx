"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MintModal } from '@/components/modals/MintModal';
import { LookupModal } from '@/components/modals/LookupModal';
import { PlusCircle, Search, ServerCog } from 'lucide-react';

export function CountryFlags() {
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);

  return (
    <>
      <section className="bg-background">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Global Coverage</h2>
          <div className="flex justify-center items-center space-x-8 mb-10">
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2" title="USA">🇺🇸</span>
              <span className="text-sm font-medium">USA</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2" title="European Union">🇪🇺</span>
              <span className="text-sm font-medium">European Union</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2" title="India">🇮🇳</span>
              <span className="text-sm font-medium">India</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2" title="China">🇨🇳</span>
              <span className="text-sm font-medium">China</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2" title="Russia">🇷🇺</span>
              <span className="text-sm font-medium">Russia</span>
            </div>
          </div>
          
          {/* Contract interaction buttons */}
          <div className="flex flex-col items-center mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">GeoGuard Contract Actions</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => setIsMintModalOpen(true)}
              >
                <PlusCircle size={20} />
                Mint New Token
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsLookupModalOpen(true)}
              >
                <Search size={20} />
                Lookup Node ID
              </Button>
              <Link href="/validator-manager">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="gap-2"
                >
                  <ServerCog size={20} />
                  Add Validator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <MintModal 
        isOpen={isMintModalOpen} 
        onClose={() => setIsMintModalOpen(false)} 
      />
      <LookupModal 
        isOpen={isLookupModalOpen} 
        onClose={() => setIsLookupModalOpen(false)} 
      />
    </>
  );
}

export default CountryFlags; 
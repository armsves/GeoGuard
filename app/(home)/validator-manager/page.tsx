"use client";

import dynamic from 'next/dynamic';
import ToolboxMdxWrapper from '@/toolbox/src/components/ToolboxMdxWrapper';

// Dynamic import for the AddValidator component
const AddValidator = dynamic(
  () => import('@/toolbox/src/toolbox/ValidatorManager/AddValidator'),
  { ssr: false }
);

export default function ValidatorManagerPage() {
  const handleError = (error: Error) => {
    console.error('Error in ValidatorManagerPage:', error);
  };

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">GeoGuard Validator Manager</h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Add validators to your subnet by completing the validator registration process.
        </p>
        
        <ToolboxMdxWrapper walletMode="c-chain">
          <AddValidator />
        </ToolboxMdxWrapper>
      </div>
    </div>
  );
} 
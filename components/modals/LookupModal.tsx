"use client";

import { useState, useEffect } from 'react';
import { getNodeId } from '@/utils/contractInteractions';
import { useWalletStore } from '@/toolbox/src/stores/walletStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface LookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LookupModal({ isOpen, onClose }: LookupModalProps) {
  const { walletEVMAddress } = useWalletStore();
  const [tokenId, setTokenId] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const [nodeIdResult, setNodeIdResult] = useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Pre-fill the account address when wallet connects or modal opens
  useEffect(() => {
    if (isOpen && walletEVMAddress) {
      setAccountAddress(walletEVMAddress);
    }
  }, [isOpen, walletEVMAddress]);

  // Auto-hide tooltips after 5 seconds
  useEffect(() => {
    if (error) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleGetNodeId = async () => {
    if (!tokenId) {
      setError('Token ID is required');
      return;
    }

    if (!accountAddress) {
      setError('Account address is required');
      return;
    }

    try {
      setError(null);
      setLookupLoading(true);
      const result = await getNodeId(parseInt(tokenId), accountAddress);
      setNodeIdResult(result);
    } catch (err: any) {
      console.error('Error getting Node ID:', err);
      setError(err.message || 'Failed to get Node ID');
      setNodeIdResult(null);
    } finally {
      setLookupLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-6">Lookup Node ID</h2>
        
        {/* Error tooltip */}
        {error && !error.includes('Token ID') && !error.includes('account address') && showTooltip && (
          <Tooltip open={true}>
            <TooltipTrigger asChild>
              <div className="absolute top-6 right-12 cursor-pointer">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-red-500">
              {error}
            </TooltipContent>
          </Tooltip>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Token ID</label>
            <Input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter Token ID to lookup"
              type="number"
              min="1"
              error={error && error.includes('Token ID') ? error : undefined}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Account Address</label>
            <Input
              value={accountAddress}
              onChange={(e) => setAccountAddress(e.target.value)}
              placeholder="Enter account address"
              error={error && error.includes('account address') ? error : undefined}
              button={<Button
                onClick={() => setAccountAddress(walletEVMAddress || '')}
                stickLeft
              >
                Use My Address
              </Button>}
            />
          </div>
          
          {nodeIdResult && (
            <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              <p className="text-sm font-medium">Node ID:</p>
              <p className="text-sm font-mono break-all">{nodeIdResult}</p>
            </div>
          )}
          
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              onClick={onClose} 
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleGetNodeId} 
              disabled={lookupLoading || !tokenId || !accountAddress}
              variant="secondary"
            >
              {lookupLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Looking up...
                </>
              ) : (
                'Get Node ID'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import { mintToken, getLastTokenId } from '@/utils/contractInteractions';
import { useWalletStore } from '@/toolbox/src/stores/walletStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, X, AlertCircle, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MintModal({ isOpen, onClose }: MintModalProps) {
  const { walletEVMAddress } = useWalletStore();
  const [nodeId, setNodeId] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [lastToken, setLastToken] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isOpen && walletEVMAddress) {
      fetchLastTokenId();
      // Pre-fill the to address with the connected wallet address
      setToAddress(walletEVMAddress);
    }
  }, [isOpen, walletEVMAddress]);

  // Auto-hide tooltips after 5 seconds
  useEffect(() => {
    if (success || error) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const fetchLastTokenId = async () => {
    try {
      setLoading(true);
      const id = await getLastTokenId();
      setLastToken(id);
      setError(null);
    } catch (err) {
      console.error('Error fetching last token ID:', err);
      setError('Failed to fetch last token ID');
    } finally {
      setLoading(false);
    }
  };

  const handleMint = async () => {
    if (!nodeId) {
      setError('Node ID is required');
      return;
    }

    if (!toAddress) {
      setError('Recipient address is required');
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setMintLoading(true);
      
      // Use the last token ID + 1 if no token ID specified
      const tokenIdToUse = tokenId ? parseInt(tokenId) : (lastToken !== null ? lastToken + 1 : 1);
      
      await mintToken(tokenIdToUse, nodeId, toAddress);
      setSuccess(`Token #${tokenIdToUse} minted successfully to ${toAddress.substring(0, 6)}...${toAddress.substring(toAddress.length - 4)} with Node ID: ${nodeId}`);
      
      // Reset form
      setNodeId('');
      setTokenId('');
      
      // Refresh the last token ID
      await fetchLastTokenId();
    } catch (err: any) {
      console.error('Error minting token:', err);
      setError(err.message || 'Failed to mint token');
    } finally {
      setMintLoading(false);
    }
  };

  if (!isOpen) return null;

  const nextTokenId = lastToken !== null ? lastToken + 1 : 1;

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
        
        <h2 className="text-xl font-bold mb-6">Mint New Token</h2>

        {/* Notification tooltips */}
        {error && !error.includes('Node ID') && !error.includes('address') && showTooltip && (
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
        
        {success && showTooltip && (
          <Tooltip open={true}>
            <TooltipTrigger asChild>
              <div className="absolute top-6 right-12 cursor-pointer">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-green-500">
              {success}
            </TooltipContent>
          </Tooltip>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Recipient Address (to)</label>
            <Input
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="Enter recipient address"
              error={error && error.includes('address') ? error : undefined}
              button={<Button
                onClick={() => setToAddress(walletEVMAddress || '')}
                stickLeft
              >
                Use My Address
              </Button>}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Token ID (optional - will use {nextTokenId} if empty)
            </label>
            <Input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter Token ID (optional)"
              type="number"
              min="1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Node ID</label>
            <Input
              value={nodeId}
              onChange={(e) => setNodeId(e.target.value)}
              placeholder="Enter Node ID"
              error={error && error.includes('Node ID') ? error : undefined}
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              onClick={onClose} 
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleMint} 
              disabled={mintLoading || !nodeId || !toAddress}
            >
              {mintLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Minting...
                </>
              ) : (
                'Mint Token'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
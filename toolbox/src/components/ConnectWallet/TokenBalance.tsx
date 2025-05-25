import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * TokenBalance Component
 * @param {Object} props
 * @param {number} props.balance - The token balance to display
 * @param {string} props.symbol - The token symbol
 * @param {Function} props.onClick - Function to call when refresh button is clicked
 * @param {boolean} props.compact - Whether to display in compact mode
 */
const TokenBalance = ({ 
  balance, 
  symbol, 
  onClick,
  compact = false
}: {
    balance: number; 
    symbol: string; 
    onClick: () => Promise<void> | undefined;
    compact?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (onClick) await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
        <span className="text-sm">{balance.toFixed(2)}</span>
        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{symbol}</span>
        <button
          onClick={handleRefresh}
          className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh balance"
          disabled={isLoading}
        >
          <RefreshCw className={`w-3 h-3 text-zinc-500 dark:text-zinc-400 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    );
  }

  return (
    <div className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 flex items-center">
      {balance.toFixed(2)} {symbol}
      <button
        onClick={handleRefresh}
        className="ml-2 p-1 rounded-md bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Refresh balance"
        disabled={isLoading}
      >
        <RefreshCw className={`w-4 h-4 text-zinc-600 dark:text-zinc-300 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};

export default TokenBalance;
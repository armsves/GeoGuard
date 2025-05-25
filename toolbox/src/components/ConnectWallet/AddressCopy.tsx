import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export const AddressCopy = ({
    address,
    compact = false
}: {
    address: string;
    compact?: boolean;
}) => {
    const [isClient, setIsClient] = useState<boolean>(false)
    const [copied, setCopied] = useState(false);

    // Set isClient to true once component mounts (client-side only)
    useEffect(() => {
        setIsClient(true)
    }, [])
    
    const copyToClipboard = (text: string) => {
        if (isClient) {
            navigator.clipboard.writeText(text)
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    // Format address for display (0x1234...5678)
    const formatAddress = (addr: string) => {
        if (!addr) return "Loading...";
        if (addr.length <= 13) return addr;
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    if (compact) {
        return (
            <button
                onClick={() => copyToClipboard(address)}
                className="font-mono flex items-center gap-1 px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-md text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
                title="Copy address to clipboard"
            >
                <span>{copied ? 'Copied!' : formatAddress(address)}</span>
                <Copy className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
            </button>
        );
    }

    return (
        <div className="mt-1 flex items-center justify-between">
            <div className="font-mono text-xs text-zinc-700 dark:text-black bg-zinc-100 dark:bg-zinc-300 px-3 py-1.5 rounded-md overflow-x-auto shadow-sm border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-200 transition-colors flex-1 mr-2 truncate">
                {address ? address : "Loading..."}
            </div>
            {address && (
                <button
                    onClick={() => copyToClipboard(address)}
                    className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-200 transition-colors border border-zinc-200 dark:border-zinc-600 shadow-sm"
                    title="Copy address"
                >
                    <Copy className="w-3.5 h-3.5 text-zinc-600 dark:text-black" />
                </button>
            )}
        </div>
    );
};
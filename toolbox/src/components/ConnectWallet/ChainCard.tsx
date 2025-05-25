import { useState } from 'react';
import TokenBalance from "./TokenBalance";
import { AddressCopy } from "./AddressCopy";
import { Wallet, LogOut } from "lucide-react";

export const ChainCard = ({
    tokenBalance,
    tokenSymbol,
    onTokenRefreshClick,
    address,
    onDisconnect
}: {
    name: string;
    logoUrl: string;
    badgeText: string
    tokenBalance: number;
    tokenSymbol: string;
    onTokenRefreshClick: () => Promise<void> | undefined;
    address: string,
    buttons: React.ReactNode[],
    onDisconnect?: () => void
}) => {
    const [showDisconnectModal, setShowDisconnectModal] = useState(false);

    return (
        <>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2 mb-2">
                            <AddressCopy address={address} compact={true} />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Wallet className="w-3 h-3 text-zinc-500" />
                            <TokenBalance
                                balance={tokenBalance}
                                symbol={tokenSymbol}
                                onClick={onTokenRefreshClick}
                                compact={true}
                            />
                        </div>
                    </div>
                    
                    <div>
                        {onDisconnect && (
                            <button 
                                onClick={() => setShowDisconnectModal(true)}
                                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 p-1"
                                title="Disconnect Wallet"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Disconnect Modal */}
            {showDisconnectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium mb-4">Disconnect Wallet</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            Are you sure you want to disconnect your wallet?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                                onClick={() => setShowDisconnectModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-md bg-red-500 text-white"
                                onClick={() => {
                                    if (onDisconnect) onDisconnect();
                                    setShowDisconnectModal(false);
                                }}
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
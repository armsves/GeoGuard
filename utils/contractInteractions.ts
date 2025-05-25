import { ethers } from 'ethers';

// Contract ABI - only including the functions we need
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "nodeId",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getNodeId",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastTokenId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract address
const contractAddress = '0x18A87471c520008F3187947Efef644c7E66091b4';

/**
 * Get a signer from the wallet
 */
export const getSigner = async () => {
  if (typeof window === 'undefined' || !window.avalanche) {
    throw new Error('Wallet not connected');
  }

  await window.avalanche.request({ method: 'eth_requestAccounts' });
  
  // Create an ethers v6 provider
  const provider = new ethers.BrowserProvider(window.avalanche);
  return await provider.getSigner();
};

/**
 * Get contract instance
 */
export const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

/**
 * Mint a new token
 * @param tokenId - Token ID to mint
 * @param nodeId - Node ID to associate with the token
 * @param to - Address to mint the token to (if not provided, uses the connected wallet)
 */
export const mintToken = async (tokenId: number, nodeId: string, to?: string) => {
  try {
    const contract = await getContract();
    const signer = await getSigner();
    const recipientAddress = to || await signer.getAddress();
    
    const tx = await contract.mint(recipientAddress, BigInt(tokenId), nodeId);
    return await tx.wait();
  } catch (error) {
    console.error('Error minting token:', error);
    throw error;
  }
};

/**
 * Get the node ID associated with a token
 * @param tokenId - Token ID to query
 * @param account - Account address to check
 */
export const getNodeId = async (tokenId: number, account: string) => {
  try {
    const contract = await getContract();
    return await contract.getNodeId(BigInt(tokenId), account);
  } catch (error) {
    console.error('Error getting nodeId:', error);
    throw error;
  }
};

/**
 * Get the latest token ID
 */
export const getLastTokenId = async () => {
  try {
    const contract = await getContract();
    const lastTokenId = await contract.lastTokenId();
    return Number(lastTokenId);
  } catch (error) {
    console.error('Error getting last token ID:', error);
    throw error;
  }
}; 
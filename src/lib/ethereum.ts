import { MetaMaskInpageProvider } from '@metamask/providers';

// 기본 이더리움 프로바이더 타입
type EthereumProvider = {
  request(args: { method: string; params?: any[] }): Promise<any>;
  on(event: string, listener: (accounts: string[]) => void): void;
  removeListener(event: string, listener: (accounts: string[]) => void): void;
};

// window.ethereum 타입 재정의
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

let metamaskProvider: EthereumProvider | null = null;

export const getEthereum = async (): Promise<EthereumProvider | null> => {
  if (typeof window === 'undefined') return null;
  
  try {
    // 캐시된 provider가 있으면 반환
    if (metamaskProvider) return metamaskProvider;

    // MetaMask가 설치되어 있는지 확인
    const provider = window.ethereum;
    if (!provider) {
      console.warn('MetaMask is not installed');
      return null;
    }

    // provider 초기화 대기
    await new Promise(resolve => setTimeout(resolve, 1000));

    // provider 캐시
    metamaskProvider = provider;
    return metamaskProvider;
  } catch (error) {
    console.error('Error accessing ethereum object:', error);
    return null;
  }
};

export const isMetaMaskInstalled = async (): Promise<boolean> => {
  try {
    const ethereum = await getEthereum();
    // MetaMask 설치 여부는 request 메서드로 체크
    if (!ethereum) return false;
    
    try {
      await ethereum.request({ method: 'eth_accounts' });
      return true;
    } catch {
      return false;
    }
  } catch (error) {
    console.error('Error checking MetaMask installation:', error);
    return false;
  }
};

export const requestAccounts = async (): Promise<string[]> => {
  try {
    const ethereum = await getEthereum();
    if (!ethereum) {
      throw new Error('MetaMask is not installed');
    }
    
    const accounts = await ethereum.request({ 
      method: 'eth_requestAccounts' 
    }) as string[];
    
    if (!accounts) {
      throw new Error('No accounts returned');
    }
    
    return accounts;
  } catch (error) {
    console.error('Failed to get accounts:', error);
    throw error;
  }
};

export const getChainId = async (): Promise<string> => {
  try {
    const ethereum = await getEthereum();
    if (!ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const chainId = await ethereum.request({ 
      method: 'eth_chainId' 
    }) as string;
    
    if (!chainId) {
      throw new Error('No chainId returned');
    }
    
    return chainId;
  } catch (error) {
    console.error('Failed to get chainId:', error);
    throw error;
  }
};

export const addEthereumChain = async (chainParams: {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}) => {
  try {
    const ethereum = await getEthereum();
    if (!ethereum) {
      throw new Error('MetaMask is not installed');
    }

    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [chainParams],
    });
  } catch (error) {
    console.error('Failed to add ethereum chain:', error);
    throw error;
  }
};

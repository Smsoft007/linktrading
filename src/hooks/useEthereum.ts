import { useEffect, useState, useCallback } from 'react';
import { getEthereum, isMetaMaskInstalled, requestAccounts } from '@/lib/ethereum';

export const useEthereum = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkMetaMask = useCallback(async () => {
    try {
      const installed = await isMetaMaskInstalled();
      setIsInstalled(installed);
    } catch (error) {
      console.error('Error checking MetaMask:', error);
      setIsInstalled(false);
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts: unknown) => {
    try {
      if (Array.isArray(accounts) && accounts.length > 0 && typeof accounts[0] === 'string') {
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setAccount(null);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error handling accounts change:', error);
      setAccount(null);
      setIsConnected(false);
    }
  }, []);

  const handleChainChanged = useCallback((_chainId: unknown) => {
    try {
      window.location.reload();
    } catch (error) {
      console.error('Error handling chain change:', error);
    }
  }, []);

  useEffect(() => {
    const initializeEthereum = async () => {
      await checkMetaMask();

      const ethereum = await getEthereum();
      if (ethereum) {
        try {
          // 이미 연결된 계정이 있는지 확인
          const accounts = await ethereum.request({ 
            method: 'eth_accounts' 
          }) as string[];
          handleAccountsChanged(accounts);

          ethereum.on('accountsChanged', handleAccountsChanged);
          ethereum.on('chainChanged', handleChainChanged);
        } catch (error) {
          console.error('Error initializing ethereum:', error);
        }
      }
    };

    initializeEthereum();

    return () => {
      const cleanup = async () => {
        const ethereum = await getEthereum();
        if (ethereum) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
      cleanup();
    };
  }, [handleAccountsChanged, handleChainChanged, checkMetaMask]);

  const connect = async () => {
    try {
      setIsLoading(true);
      const accounts = await requestAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    account,
    isConnected,
    isInstalled,
    isLoading,
    connect,
  };
};

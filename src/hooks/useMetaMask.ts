import React, { useState, useEffect } from 'react';

export function useMetaMask() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState('');
  
  useEffect(() => {
    const checkMetaMask = async () => {
      // 안전하게 확인
      const ethereum = window.ethereum;
      const isInstalled = ethereum && ethereum.isMetaMask;
      
      setIsMetaMaskInstalled(!!isInstalled);
      
      if (isInstalled) {
        try {
          // 이미 연결된 계정 가져오기
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
          
          // 계정 변경 이벤트 리스너
          const handleAccountsChanged = (accounts) => {
            setAccount(accounts.length > 0 ? accounts[0] : '');
          };
          
          ethereum.on('accountsChanged', handleAccountsChanged);
          
          return () => {
            // 클린업 함수에서 이벤트 리스너 제거
            ethereum.removeListener('accountsChanged', handleAccountsChanged);
          };
        } catch (error) {
          console.error('Error checking MetaMask accounts:', error);
        }
      }
    };
    
    checkMetaMask();
  }, []);
  
  return { isMetaMaskInstalled, account };
} 
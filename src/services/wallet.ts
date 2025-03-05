export const connectWallet = async () => {
  try {
    // window.ethereum 객체가 존재하는지 확인
    if (typeof window !== 'undefined' && window.ethereum) {
      // window.ethereum을 수정하지 않고 사용
      const provider = window.ethereum;
      
      // 계정 요청
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      return {
        address: accounts[0],
        success: true
      };
    } else {
      throw new Error('MetaMask is not installed');
    }
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    return {
      address: '',
      success: false,
      error: error.message
    };
  }
}; 
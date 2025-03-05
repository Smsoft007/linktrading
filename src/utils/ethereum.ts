export const getEthereumProvider = () => {
  // 브라우저 환경인지 확인
  if (typeof window === 'undefined') {
    return null;
  }
  
  // window.ethereum이 존재하는지 확인
  if (!window.ethereum) {
    return null;
  }
  
  return window.ethereum;
}; 
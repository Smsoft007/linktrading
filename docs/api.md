# API Documentation

This document provides information about the APIs used in the Auto USDT Frontend project.

## API Structure

The application interacts with backend services through API calls. The API services are organized in the `src/services/` directory.

## Authentication API

### Login

```typescript
// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
```

### Register

```typescript
// POST /api/auth/register
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}
```

### Logout

```typescript
// POST /api/auth/logout
interface LogoutResponse {
  success: boolean;
}
```

## Wallet API

### Connect Wallet

```typescript
// POST /api/wallet/connect
interface ConnectWalletRequest {
  address: string;
  signature: string;
}

interface ConnectWalletResponse {
  success: boolean;
  walletId: string;
}
```

### Get Wallet Balance

```typescript
// GET /api/wallet/balance
interface WalletBalanceResponse {
  balance: string;
  currency: string;
}
```

## Transaction API

### Create Transaction

```typescript
// POST /api/transactions
interface CreateTransactionRequest {
  amount: string;
  recipient: string;
  gasPrice?: string;
}

interface CreateTransactionResponse {
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  hash?: string;
}
```

### Get Transaction History

```typescript
// GET /api/transactions
interface Transaction {
  id: string;
  amount: string;
  recipient: string;
  sender: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  hash?: string;
}

interface TransactionHistoryResponse {
  transactions: Transaction[];
  totalCount: number;
}
```

### Get Transaction Details

```typescript
// GET /api/transactions/:id
interface TransactionDetailsResponse extends Transaction {
  fee: string;
  blockNumber?: number;
  confirmations?: number;
}
```

## Error Handling

API responses follow a consistent error format:

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: any;
}
```

Common error codes:

- `AUTH_REQUIRED`: Authentication is required
- `INVALID_CREDENTIALS`: Invalid login credentials
- `INSUFFICIENT_FUNDS`: Insufficient funds for transaction
- `INVALID_ADDRESS`: Invalid wallet address
- `RATE_LIMITED`: Too many requests

## API Client

The application uses Axios for API requests. The API client is configured in `src/services/api.ts`:

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    return Promise.reject(error);
  }
);

export default apiClient;
```

## Usage Example

```typescript
import apiClient from '@/services/api';

// Example function to get user profile
export async function getUserProfile() {
  try {
    const response = await apiClient.get('/api/user/profile');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
}
```

For more detailed information about specific API endpoints, refer to the service files in the `src/services/` directory. 
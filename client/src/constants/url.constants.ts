const API_URL_BASE = 'https://pailot-backend.onrender.com';
// const API_URL_BASE = 'http://localhost:3333';

// Auth Endpoints
export const SIGN_IN_URL = `${API_URL_BASE}/user/sign-in`;

// User Endpoints
export const CREATE_USER_URL = `${API_URL_BASE}/user`;
export const GET_ALL_USER_URL = `${API_URL_BASE}/user`;
export const GET_ALL_COURIER_USER_URL = `${API_URL_BASE}/user/couriers`;
export const GET_USER_URL = `${API_URL_BASE}/user/profile`;
export const GET_USER_BY_USERNAME_URL = (username: string) => `${API_URL_BASE}/user/${username}`;
export const UPDATE_USER_URL = (userId: string) => `${API_URL_BASE}/user/${userId}`;
export const DELETE_USER_URL = (userId: string) => `${API_URL_BASE}/user/${userId}`;

// Courier Endpoints
export const CREATE_COURIER_URL = `${API_URL_BASE}/user/courier`;
export const UPDATE_COURIER_URL =(userId: string) => `${API_URL_BASE}/user/courier/${userId}`;
export const DELETE_COURIER_URL =(userId: string) => `${API_URL_BASE}/user/courier/${userId}`;

// Payments Endpoints
export const INCOMPLETE_PAYMENT_URL = `${API_URL_BASE}/payment/incomplete`;
export const APPROVE_PAYMENT_URL = `${API_URL_BASE}/payment/approve`;
export const COMPLETE_PAYMENT_URL = `${API_URL_BASE}/payment/complete`;
export const CANCELLED_PAYMENT_URL = `${API_URL_BASE}/payment/cancel`;
export const WITHDRAW_URL = `${API_URL_BASE}/payment/courier/withdraw`;

// Transactions Endpoints
export const CREATE_TRANSACTION_URL = `${API_URL_BASE}/transaction`;
export const GET_ALL_TRANSACTIONS_URL = `${API_URL_BASE}/transaction`;
export const GET_PENDING_TRANSACTIONS_URL = `${API_URL_BASE}/transaction/pending`;
export const GET_TRANSACTION_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/${transactiondId}`;
export const UPDATE_TRANSACTION_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/${transactiondId}`;
export const UPDATE_TRANSACTION_STATUS_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/status/${transactiondId}`;
export const ACCEPT_PENDING_TRANSACTION_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/requests/accept-pending/${transactiondId}`;
export const DELETE_TRANSACTION_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/${transactiondId}`;
export const GET_ALL_SENDER_TRANSACTION_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/${transactiondId}`;
export const GET_ALL_COURIER_TRANSACTION_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/${transactiondId}`;
export const GET_ALL_RECEIVER_TRANSACTION_URL = (transactiondId: string) => `${API_URL_BASE}/transaction/${transactiondId}`;
export const GET_ALL_RECEIVER_TRANSACTION_BY_USERNAME_URL = (username: string) => `${API_URL_BASE}/transaction/${username}`;

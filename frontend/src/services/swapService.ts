import api from './api';

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName?: string;
  targetId: string;
  targetName?: string;
  status: 'PENDING' | 'CONFIRMED' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  confirmedAt?: string;
  approvedAt?: string;
}

// Get all swap requests for a user
export const getUserSwapRequests = async (userId: string) => {
  const response = await api.get<SwapRequest[]>(`/api/swaps/user/${userId}`);
  return response.data;
};

// Get sent swap requests by user
export const getSentSwapRequests = async (userId: string) => {
  const response = await api.get<SwapRequest[]>(`/api/swaps/sent/${userId}`);
  return response.data;
};

// Get received swap requests by user
export const getReceivedSwapRequests = async (userId: string) => {
  const response = await api.get<SwapRequest[]>(`/api/swaps/received/${userId}`);
  return response.data;
};

// Get all pending swap requests (admin only)
export const getPendingSwapRequests = async () => {
  const response = await api.get<SwapRequest[]>('/api/swaps/pending');
  return response.data;
};

// Send a swap request
export const sendSwapRequest = async (requesterId: string, targetId: string) => {
  const response = await api.post<SwapRequest>('/api/swaps/request', {
    requesterId,
    targetId,
  });
  return response.data;
};

// Confirm a swap request (by target user)
export const confirmSwapRequest = async (swapId: string) => {
  const response = await api.put<SwapRequest>(`/api/swaps/${swapId}/confirm`);
  return response.data;
};

// Approve a swap request (by admin)
export const approveSwapRequest = async (swapId: string) => {
  const response = await api.put<SwapRequest>(`/api/swaps/${swapId}/approve`);
  return response.data;
};

// Reject a swap request (by target user or admin)
export const rejectSwapRequest = async (swapId: string) => {
  const response = await api.put<SwapRequest>(`/api/swaps/${swapId}/reject`);
  return response.data;
};
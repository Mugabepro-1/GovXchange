import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import UserProfile from '../components/user/UserProfile';
import UserList from '../components/user/UserList';
import SwapRequestsList from '../components/user/SwapRequestsList';
import { getAllUsers } from '../services/userService';
import { 
  getUserSwapRequests, 
  getSentSwapRequests, 
  getReceivedSwapRequests 
} from '../services/swapService';
import { User } from '../context/AuthContext';
import { SwapRequest } from '../services/swapService';

const NormalUserDashboard = () => {
  const { user } = useAuth();
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [sentRequests, setSentRequests] = useState<SwapRequest[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<SwapRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [usersData, sentData, receivedData] = await Promise.all([
          getAllUsers(),
          getSentSwapRequests(user.id),
          getReceivedSwapRequests(user.id)
        ]);
        
        // Filter out current user from available users
        setAvailableUsers(usersData.filter(u => u.id !== user.id && u.role === 'NORMALUSER'));
        setSentRequests(sentData);
        setReceivedRequests(receivedData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const refreshRequests = async () => {
    if (!user) return;
    
    try {
      const [sentData, receivedData] = await Promise.all([
        getSentSwapRequests(user.id),
        getReceivedSwapRequests(user.id)
      ]);
      
      setSentRequests(sentData);
      setReceivedRequests(receivedData);
    } catch (error) {
      console.error('Error refreshing requests:', error);
      toast.error('Failed to refresh requests. Please try again.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-fade-in">
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <UserList 
                  users={availableUsers} 
                  onRequestSent={refreshRequests} 
                />
              </div>
              <div>
                <UserProfile user={user} />
              </div>
            </div>
          } 
        />
        <Route 
          path="/profile" 
          element={<UserProfile user={user} />} 
        />
        <Route 
          path="/swaps" 
          element={
            <SwapRequestsList 
              sentRequests={sentRequests} 
              receivedRequests={receivedRequests}
              onRequestUpdated={refreshRequests}
            />
          } 
        />
        <Route path="*" element={<Navigate to="/user-dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default NormalUserDashboard;
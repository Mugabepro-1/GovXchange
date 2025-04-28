import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PendingSwapsList from '../components/admin/PendingSwapsList';
import UserManagement from '../components/admin/UserManagement';
import Card from '../components/common/Card';
import { getPendingSwapRequests } from '../services/swapService';
import { getAllUsers } from '../services/userService';
import { SwapRequest } from '../services/swapService';
import { User } from '../context/AuthContext';
import { LineChart, Users, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [pendingSwaps, setPendingSwaps] = useState<SwapRequest[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [swapsData, usersData] = await Promise.all([
          getPendingSwapRequests(),
          getAllUsers()
        ]);
        
        setPendingSwaps(swapsData);
        setAllUsers(usersData);
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        toast.error('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const refreshPendingSwaps = async () => {
    try {
      const swapsData = await getPendingSwapRequests();
      setPendingSwaps(swapsData);
    } catch (error) {
      console.error('Error refreshing pending swaps:', error);
      toast.error('Failed to refresh pending swaps. Please try again.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const normalUsers = allUsers.filter(u => u.role === 'NORMALUSER');
  const adminUsers = allUsers.filter(u => u.role === 'ADMIN');

  return (
    <div className="animate-fade-in">
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                  <div className="flex items-center">
                    <div className="mr-4 bg-primary-500 rounded-lg p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{allUsers.length}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Normal Users:</span>
                      <span className="font-medium">{normalUsers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admins:</span>
                      <span className="font-medium">{adminUsers.length}</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200">
                  <div className="flex items-center">
                    <div className="mr-4 bg-secondary-500 rounded-lg p-3">
                      <UserCheck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Pending Swaps</p>
                      <p className="text-2xl font-bold text-gray-900">{pendingSwaps.length}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      className="text-secondary-600 text-sm font-medium hover:text-secondary-800"
                      onClick={() => refreshPendingSwaps()}
                    >
                      Refresh Pending Swaps
                    </button>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200">
                  <div className="flex items-center">
                    <div className="mr-4 bg-accent-500 rounded-lg p-3">
                      <LineChart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">System Status</p>
                      <p className="text-2xl font-bold text-gray-900">Active</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Recent Pending Swaps">
                  {pendingSwaps.length > 0 ? (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {pendingSwaps.slice(0, 5).map((swap) => (
                        <div key={swap.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-medium">Swap #{swap.id.substring(0, 8)}</span>
                            <span className="px-2 py-1 text-xs rounded-full bg-warning-100 text-warning-700">
                              {swap.status}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Requester: {swap.requesterName || swap.requesterId}</p>
                            <p>Target: {swap.targetName || swap.targetId}</p>
                            <p>Created: {new Date(swap.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-gray-500">
                      <p>No pending swap requests</p>
                    </div>
                  )}
                </Card>
                
                <Card title="Recent Users">
                  {allUsers.length > 0 ? (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto">
                      {allUsers.slice(0, 5).map((u) => (
                        <div key={u.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-medium">{u.email}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              u.role === 'ADMIN' 
                                ? 'bg-accent-100 text-accent-800' 
                                : 'bg-primary-100 text-primary-800'
                            }`}>
                              {u.role}
                            </span>
                          </div>
                          {u.role === 'NORMALUSER' && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Job Role: {u.jobRole}</p>
                              <p>Address: {u.address}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-gray-500">
                      <p>No users found</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          } 
        />
        <Route 
          path="/pending-swaps" 
          element={
            <PendingSwapsList 
              pendingSwaps={pendingSwaps}
              onSwapUpdated={refreshPendingSwaps}
            />
          } 
        />
        <Route 
          path="/users" 
          element={<UserManagement users={allUsers} />} 
        />
        <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { sendSwapRequest } from '../../services/swapService';
import { User } from '../../context/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { Search, UserPlus, MapPin, Briefcase } from 'lucide-react';

interface UserListProps {
  users: User[];
  onRequestSent: () => void;
}

const UserList = ({ users, onRequestSent }: UserListProps) => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.jobRole && user.jobRole.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.address && user.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSendRequest = async () => {
    if (!currentUser || !selectedUser) return;
    
    setIsLoading(true);
    try {
      await sendSwapRequest(currentUser.id, selectedUser.id);
      toast.success(`Swap request sent to ${selectedUser.email}`);
      handleCloseModal();
      onRequestSent();
    } catch (error) {
      console.error('Error sending swap request:', error);
      toast.error('Failed to send swap request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card title="Available Users for Job Swap" className="h-full animate-slide-up">
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by email, job role or location..."
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredUsers.length > 0 ? (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{user.email}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{user.jobRole}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{user.address}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<UserPlus className="h-4 w-4" />}
                    onClick={() => handleOpenModal(user)}
                  >
                    Send Request
                  </Button>
                </div>

                {user.qualifications && user.qualifications.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Qualifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {user.qualifications.map((qualification, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800"
                        >
                          {qualification}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center">
            <div className="inline-flex mx-auto items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No users found matching your search criteria</p>
          </div>
        )}
      </Card>

      {selectedUser && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Send Swap Request"
          footer={
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button isLoading={isLoading} onClick={handleSendRequest}>
                Send Request
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p>
              Are you sure you want to send a job swap request to <strong>{selectedUser.email}</strong>?
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Their Job Role</h4>
                  <p className="font-medium">{selectedUser.jobRole}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Their Location</h4>
                  <p className="font-medium">{selectedUser.address}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              If they confirm your request, an admin will review and approve the swap based on
              matching criteria.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserList;
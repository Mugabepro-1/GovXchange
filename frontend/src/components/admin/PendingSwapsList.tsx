import { useState } from 'react';
import { toast } from 'react-toastify';
import { approveSwapRequest, rejectSwapRequest } from '../../services/swapService';
import { SwapRequest } from '../../services/swapService';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

interface PendingSwapsListProps {
  pendingSwaps: SwapRequest[];
  onSwapUpdated: () => void;
}

const PendingSwapsList = ({ pendingSwaps, onSwapUpdated }: PendingSwapsListProps) => {
  const [selectedSwap, setSelectedSwap] = useState<SwapRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (swap: SwapRequest, action: 'approve' | 'reject') => {
    setSelectedSwap(swap);
    setActionType(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSwap(null);
    setActionType(null);
  };

  const handleApproveSwap = async () => {
    if (!selectedSwap) return;
    
    setIsLoading(true);
    try {
      await approveSwapRequest(selectedSwap.id);
      toast.success('Swap request approved successfully');
      handleCloseModal();
      onSwapUpdated();
    } catch (error) {
      console.error('Error approving swap request:', error);
      toast.error('Failed to approve swap request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectSwap = async () => {
    if (!selectedSwap) return;
    
    setIsLoading(true);
    try {
      await rejectSwapRequest(selectedSwap.id);
      toast.success('Swap request rejected');
      handleCloseModal();
      onSwapUpdated();
    } catch (error) {
      console.error('Error rejecting swap request:', error);
      toast.error('Failed to reject swap request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-slide-up">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Pending Swap Requests</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSwapUpdated}
          >
            Refresh
          </Button>
        </div>

        <Card>
          {pendingSwaps.length > 0 ? (
            <div className="space-y-6">
              {pendingSwaps.map((swap) => (
                <div 
                  key={swap.id} 
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex items-center mb-2">
                        <span className="flex items-center text-sm font-medium text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3.5 h-3.5 mr-1" /> {swap.status}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          Created: {new Date(swap.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">Requester</h3>
                          <p className="text-gray-800">{swap.requesterName || swap.requesterId}</p>
                          {swap.confirmedAt && (
                            <p className="text-sm text-gray-600 mt-2">
                              Confirmed: {new Date(swap.confirmedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-2">Target</h3>
                          <p className="text-gray-800">{swap.targetName || swap.targetId}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        Swap ID: {swap.id}
                      </p>
                    </div>
                    
                    <div className="flex flex-row lg:flex-col space-x-3 lg:space-x-0 lg:space-y-3 lg:self-center">
                      {swap.status === 'CONFIRMED' ? (
                        <>
                          <Button 
                            variant="success" 
                            icon={<CheckCircle2 className="h-4 w-4" />}
                            onClick={() => handleOpenModal(swap, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="error" 
                            icon={<XCircle className="h-4 w-4" />}
                            onClick={() => handleOpenModal(swap, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span className="text-sm text-warning-600">
                          Waiting for user confirmation
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <div className="inline-flex mx-auto items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No pending swap requests found</p>
            </div>
          )}
        </Card>
      </div>

      {selectedSwap && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={actionType === 'approve' ? "Approve Swap Request" : "Reject Swap Request"}
          footer={
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                variant={actionType === 'approve' ? 'success' : 'error'}
                isLoading={isLoading}
                onClick={actionType === 'approve' ? handleApproveSwap : handleRejectSwap}
              >
                {actionType === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p>
              {actionType === 'approve'
                ? `Are you sure you want to approve the swap request between ${
                    selectedSwap.requesterName || selectedSwap.requesterId
                  } and ${selectedSwap.targetName || selectedSwap.targetId}?`
                : `Are you sure you want to reject the swap request between ${
                    selectedSwap.requesterName || selectedSwap.requesterId
                  } and ${selectedSwap.targetName || selectedSwap.targetId}?`}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Request Details</h4>
                <p>Swap ID: {selectedSwap.id}</p>
                <p>Created: {new Date(selectedSwap.createdAt).toLocaleString()}</p>
                {selectedSwap.confirmedAt && (
                  <p>Confirmed: {new Date(selectedSwap.confirmedAt).toLocaleString()}</p>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {actionType === 'approve'
                ? 'Approving this swap will notify both users that their swap has been approved.'
                : 'This action cannot be undone.'}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PendingSwapsList;
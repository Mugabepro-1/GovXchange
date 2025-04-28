import { useState } from 'react';
import { toast } from 'react-toastify';
import { confirmSwapRequest, rejectSwapRequest } from '../../services/swapService';
import { SwapRequest } from '../../services/swapService';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface SwapRequestsListProps {
  sentRequests: SwapRequest[];
  receivedRequests: SwapRequest[];
  onRequestUpdated: () => void;
}

const SwapRequestsList = ({ 
  sentRequests, 
  receivedRequests, 
  onRequestUpdated 
}: SwapRequestsListProps) => {
  const [selectedRequest, setSelectedRequest] = useState<SwapRequest | null>(null);
  const [actionType, setActionType] = useState<'confirm' | 'reject' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = (request: SwapRequest, action: 'confirm' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    setActionType(null);
  };

  const handleConfirmRequest = async () => {
    if (!selectedRequest) return;
    
    setIsLoading(true);
    try {
      await confirmSwapRequest(selectedRequest.id);
      toast.success('Swap request confirmed successfully');
      handleCloseModal();
      onRequestUpdated();
    } catch (error) {
      console.error('Error confirming swap request:', error);
      toast.error('Failed to confirm swap request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest) return;
    
    setIsLoading(true);
    try {
      await rejectSwapRequest(selectedRequest.id);
      toast.success('Swap request rejected');
      handleCloseModal();
      onRequestUpdated();
    } catch (error) {
      console.error('Error rejecting swap request:', error);
      toast.error('Failed to reject swap request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="flex items-center text-sm font-medium text-warning-700 bg-warning-50 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3.5 h-3.5 mr-1" /> Pending
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="flex items-center text-sm font-medium text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Confirmed
          </span>
        );
      case 'APPROVED':
        return (
          <span className="flex items-center text-sm font-medium text-success-700 bg-success-50 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approved
          </span>
        );
      case 'REJECTED':
        return (
          <span className="flex items-center text-sm font-medium text-error-700 bg-error-50 px-2.5 py-0.5 rounded-full">
            <XCircle className="w-3.5 h-3.5 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> {status}
          </span>
        );
    }
  };

  return (
    <>
      <div className="space-y-6 animate-slide-up">
        <Card title="Received Swap Requests">
          {receivedRequests.length > 0 ? (
            <div className="space-y-4">
              {receivedRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <div>
                      <div className="flex items-center mb-2">
                        {getStatusBadge(request.status)}
                        <span className="ml-2 text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-medium">
                        From: {request.requesterName || request.requesterId}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Swap ID: {request.id.substring(0, 8)}...
                      </p>
                    </div>
                    
                    {request.status === 'PENDING' && (
                      <div className="flex space-x-3 sm:self-end">
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleOpenModal(request, 'confirm')}
                        >
                          Confirm
                        </Button>
                        <Button 
                          variant="error" 
                          size="sm"
                          onClick={() => handleOpenModal(request, 'reject')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-gray-500">No received swap requests</p>
            </div>
          )}
        </Card>

        <Card title="Sent Swap Requests">
          {sentRequests.length > 0 ? (
            <div className="space-y-4">
              {sentRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        {getStatusBadge(request.status)}
                        <span className="ml-2 text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-medium">
                        To: {request.targetName || request.targetId}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Swap ID: {request.id.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-gray-500">No sent swap requests</p>
            </div>
          )}
        </Card>
      </div>

      {selectedRequest && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={actionType === 'confirm' ? "Confirm Swap Request" : "Reject Swap Request"}
          footer={
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                variant={actionType === 'confirm' ? 'success' : 'error'}
                isLoading={isLoading}
                onClick={actionType === 'confirm' ? handleConfirmRequest : handleRejectRequest}
              >
                {actionType === 'confirm' ? 'Confirm' : 'Reject'}
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <p>
              {actionType === 'confirm'
                ? `Are you sure you want to confirm the swap request from ${
                    selectedRequest.requesterName || selectedRequest.requesterId
                  }?`
                : `Are you sure you want to reject the swap request from ${
                    selectedRequest.requesterName || selectedRequest.requesterId
                  }?`}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Request Details</h4>
                <p>Swap ID: {selectedRequest.id}</p>
                <p>Created: {new Date(selectedRequest.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {actionType === 'confirm'
                ? 'After confirmation, an admin will review and approve the swap based on matching criteria.'
                : 'This action cannot be undone.'}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default SwapRequestsList;
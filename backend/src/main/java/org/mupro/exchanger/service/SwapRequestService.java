package org.mupro.exchanger.service;
import org.mupro.exchanger.model.SwapRequest;
import org.mupro.exchanger.model.SwapStatus;
import org.mupro.exchanger.model.User;
import org.mupro.exchanger.repository.SwapRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SwapRequestService {

    private final SwapRequestRepository swapRequestRepository;

    public SwapRequestService(SwapRequestRepository swapRequestRepository) {
        this.swapRequestRepository = swapRequestRepository;
    }

    public SwapRequest sendSwapRequest(User sender, User receiver) {
        SwapRequest request = new SwapRequest();
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(SwapStatus.PENDING);
        return swapRequestRepository.save(request);
    }

    public List<SwapRequest> getRequestsForReceiver(User receiver) {
        return swapRequestRepository.findByReceiverAndStatus(receiver, SwapStatus.PENDING);
    }

    public SwapRequest confirmRequest(Long requestId) {
        SwapRequest request = swapRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(SwapStatus.CONFIRMED_BY_USER2);
        return swapRequestRepository.save(request);
    }

    public SwapRequest approveRequest(Long requestId) {
        SwapRequest request = swapRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(SwapStatus.APPROVED);
        return swapRequestRepository.save(request);
    }

    public SwapRequest rejectRequest(Long requestId) {
        SwapRequest request = swapRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(SwapStatus.REJECTED);
        return swapRequestRepository.save(request);
    }

    public List<SwapRequest> getPendingSwaps() {
        return swapRequestRepository.findByStatus(SwapStatus.PENDING);
    }
}


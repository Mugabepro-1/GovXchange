package org.mupro.exchanger.service;
import org.mupro.exchanger.model.SwapRequest;
import org.mupro.exchanger.model.SwapStatus;
import org.mupro.exchanger.model.User;
import org.mupro.exchanger.model.Job;
import org.mupro.exchanger.repository.SwapRequestRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SwapRequestService {

    private final SwapRequestRepository swapRequestRepository;
    private final UserService userService;

    public SwapRequestService(SwapRequestRepository swapRequestRepository, UserService userService) {
        this.swapRequestRepository = swapRequestRepository;
        this.userService = userService;
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
    
    public List<SwapRequest> getRequestsBySender(User sender) {
        return swapRequestRepository.findBySender(sender);
    }
    
    public List<SwapRequest> getUserSwapRequests(User user) {
        List<SwapRequest> sent = swapRequestRepository.findBySender(user);
        List<SwapRequest> received = swapRequestRepository.findByReceiver(user);
        
        return Stream.concat(sent.stream(), received.stream())
                .collect(Collectors.toList());
    }

    public SwapRequest confirmRequest(Long requestId) {
        SwapRequest request = swapRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(SwapStatus.CONFIRMED_BY_USER2);
        return swapRequestRepository.save(request);
    }

    public SwapRequest approveRequest(Long requestId) {
        SwapRequest request = swapRequestRepository.findById(requestId).orElseThrow();
        if (request.getStatus() != SwapStatus.CONFIRMED_BY_USER2) {
            throw new IllegalStateException("Request must be confirmed by user2 before admin approval");
        }
        
        // Swap the jobs between users
        User sender = request.getSender();
        User receiver = request.getReceiver();
        Job senderJob = sender.getJob();
        Job receiverJob = receiver.getJob();
        
        sender.setJob(receiverJob);
        receiver.setJob(senderJob);
        
        userService.saveUser(sender);
        userService.saveUser(receiver);
        
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

    public List<SwapRequest> getConfirmedSwaps() {
        return swapRequestRepository.findByStatus(SwapStatus.CONFIRMED_BY_USER2);
    }
}


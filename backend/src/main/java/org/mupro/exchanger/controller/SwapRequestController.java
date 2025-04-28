package org.mupro.exchanger.controller;

import org.mupro.exchanger.dto.SwapRequestDTO;
import org.mupro.exchanger.model.SwapRequest;
import org.mupro.exchanger.model.User;
import org.mupro.exchanger.service.SwapRequestService;
import org.mupro.exchanger.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/swaps")
public class SwapRequestController {

    private final SwapRequestService swapRequestService;
    private final UserService userService;

    public SwapRequestController(SwapRequestService swapRequestService, UserService userService) {
        this.swapRequestService = swapRequestService;
        this.userService = userService;
    }

    @PostMapping("/send")
    public SwapRequest sendRequest(@RequestBody Map<String, String> request) {
        Long requesterId = Long.parseLong(request.get("requesterId"));
        Long targetId = Long.parseLong(request.get("targetId"));
        User sender = userService.getUserById(requesterId);
        User receiver = userService.getUserById(targetId);
        return swapRequestService.sendSwapRequest(sender, receiver);
    }

    @PutMapping("/confirm/{swapId}")
    public SwapRequest confirmRequest(@PathVariable("swapId") Long requestId) {
        return swapRequestService.confirmRequest(requestId);
    }

    @PutMapping("/approve/{swapId}")
    @PreAuthorize("hasRole('ADMIN')")
    public SwapRequest approveRequest(@PathVariable("swapId") Long requestId) {
        return swapRequestService.approveRequest(requestId);
    }

    @PutMapping("/reject/{swapId}")
    @PreAuthorize("hasRole('ADMIN')")
    public SwapRequest rejectRequest(@PathVariable("swapId") Long requestId) {
        return swapRequestService.rejectRequest(requestId);
    }

    @GetMapping("/user/{userId}")
    public List<SwapRequest> getUserSwapRequests(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return swapRequestService.getUserSwapRequests(user);
    }

    @GetMapping("/sent/{userId}")
    public List<SwapRequest> getSentSwapRequests(@PathVariable Long userId) {
        User sender = userService.getUserById(userId);
        return swapRequestService.getRequestsBySender(sender);
    }

    @GetMapping("/received/{userId}")
    public List<SwapRequest> getReceivedSwapRequests(@PathVariable Long userId) {
        User receiver = userService.getUserById(userId);
        return swapRequestService.getRequestsForReceiver(receiver);
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SwapRequest>> getPendingSwaps() {
        List<SwapRequest> pending = swapRequestService.getPendingSwaps();
        return ResponseEntity.ok(pending);
    }

    @GetMapping("/confirmed")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<SwapRequest>> getConfirmedSwaps() {
        List<SwapRequest> confirmed = swapRequestService.getConfirmedSwaps();
        return ResponseEntity.ok(confirmed);
    }
}


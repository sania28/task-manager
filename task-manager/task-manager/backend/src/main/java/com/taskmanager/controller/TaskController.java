package com.taskmanager.controller;

import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.model.User;
import com.taskmanager.repository.UserRepository;
import com.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    private String currentUserId(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
        return user.getId();
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks(
            Authentication authentication,
            @RequestParam(required = false) TaskStatus status) {
        return ResponseEntity.ok(taskService.getTasksForUser(currentUserId(authentication), status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTask(Authentication authentication, @PathVariable String id) {
        return ResponseEntity.ok(taskService.getTask(id, currentUserId(authentication)));
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(Authentication authentication,
                                                     @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.createTask(request, currentUserId(authentication)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(Authentication authentication,
                                                     @PathVariable String id,
                                                     @Valid @RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(id, request, currentUserId(authentication)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(Authentication authentication, @PathVariable String id) {
        taskService.deleteTask(id, currentUserId(authentication));
        return ResponseEntity.noContent().build();
    }
}

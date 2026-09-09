package com.taskmanager.service;

import com.taskmanager.dto.TaskEvent;
import com.taskmanager.dto.TaskRequest;
import com.taskmanager.dto.TaskResponse;
import com.taskmanager.model.Task;
import com.taskmanager.model.TaskStatus;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public List<TaskResponse> getTasksForUser(String ownerId, TaskStatus statusFilter) {
        List<Task> tasks = statusFilter == null
                ? taskRepository.findByOwnerIdOrderByCreatedAtDesc(ownerId)
                : taskRepository.findByOwnerIdAndStatus(ownerId, statusFilter);

        return tasks.stream().map(TaskResponse::fromEntity).toList();
    }

    public TaskResponse getTask(String taskId, String ownerId) {
        Task task = taskRepository.findByIdAndOwnerId(taskId, ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return TaskResponse.fromEntity(task);
    }

    public TaskResponse createTask(TaskRequest request, String ownerId) {
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO)
                .priority(request.getPriority() != null ? request.getPriority() : com.taskmanager.model.TaskPriority.MEDIUM)
                .dueDate(request.getDueDate())
                .ownerId(ownerId)
                .createdAt(Instant.now())
                .build();

        Task saved = taskRepository.save(task);
        TaskResponse response = TaskResponse.fromEntity(saved);
        broadcast(ownerId, "CREATED", response, null);
        return response;
    }

    public TaskResponse updateTask(String taskId, TaskRequest request, String ownerId) {
        Task task = taskRepository.findByIdAndOwnerId(taskId, ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setUpdatedAt(Instant.now());

        Task saved = taskRepository.save(task);
        TaskResponse response = TaskResponse.fromEntity(saved);
        broadcast(ownerId, "UPDATED", response, null);
        return response;
    }

    public void deleteTask(String taskId, String ownerId) {
        taskRepository.findByIdAndOwnerId(taskId, ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        taskRepository.deleteByIdAndOwnerId(taskId, ownerId);
        broadcast(ownerId, "DELETED", null, taskId);
    }

    private void broadcast(String ownerId, String type, TaskResponse task, String taskId) {
        TaskEvent event = TaskEvent.builder()
                .type(type)
                .task(task)
                .taskId(taskId)
                .build();
        // Each user has their own private topic so they only see their own task updates
        messagingTemplate.convertAndSend("/topic/tasks/" + ownerId, event);
    }
}

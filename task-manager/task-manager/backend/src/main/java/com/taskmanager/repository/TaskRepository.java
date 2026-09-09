package com.taskmanager.repository;

import com.taskmanager.model.Task;
import com.taskmanager.model.TaskStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByOwnerIdOrderByCreatedAtDesc(String ownerId);

    List<Task> findByOwnerIdAndStatus(String ownerId, TaskStatus status);

    Optional<Task> findByIdAndOwnerId(String id, String ownerId);

    void deleteByIdAndOwnerId(String id, String ownerId);
}

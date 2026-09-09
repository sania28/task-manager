package com.taskmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskEvent {
    // CREATED, UPDATED, DELETED
    private String type;
    private TaskResponse task;
    private String taskId; // populated for DELETED events
}

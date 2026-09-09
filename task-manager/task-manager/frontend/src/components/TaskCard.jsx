const STATUS_LABELS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className={`task-card priority-${task.priority || 'MEDIUM'}`}>
      <div className="task-title">
        <span>{task.title}</span>
        <span className={`badge badge-${task.status}`}>{STATUS_LABELS[task.status]}</span>
      </div>
      {task.description && <div className="task-desc">{task.description}</div>}
      <div className="task-meta">
        <span>{task.priority} priority</span>
        {task.dueDate && <span>Due {task.dueDate}</span>}
      </div>
      <div className="task-actions">
        <button className="btn btn-secondary" onClick={() => onToggleStatus(task)}>
          {task.status === 'DONE' ? 'Reopen' : 'Advance'}
        </button>
        <button className="btn btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </div>
  )
}

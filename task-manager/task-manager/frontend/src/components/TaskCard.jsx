export default function TaskCard({
task,
onEdit,
onDelete,
onToggleStatus,
}) {
const statusConfig = {
TODO: {
label: 'To Do',
className: 'status-todo',
icon: '○',
},
IN_PROGRESS: {
label: 'In Progress',
className: 'status-progress',
icon: '◐',
},
DONE: {
label: 'Completed',
className: 'status-done',
icon: '✓',
},
}

const status =
statusConfig[task.status] || statusConfig.TODO

const formatDate = (value) => {
if (!value) {
return null
}

const date = new Date(value)

if (Number.isNaN(date.getTime())) {
  return value
}

return date.toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

}

return ( <article className="task-card"> <div className="task-card-top">
<span
className={`task-status ${status.className}`}
> <span>{status.icon}</span>
{status.label} </span>

    <div className="task-menu">
      <button
        type="button"
        className="task-icon-button"
        onClick={() => onEdit(task)}
        title="Edit task"
        aria-label="Edit task"
      >
        ✎
      </button>

      <button
        type="button"
        className="task-icon-button delete-button"
        onClick={() => onDelete(task)}
        title="Delete task"
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  </div>

  <div className="task-card-body">
    <h3
      className={
        task.status === 'DONE'
          ? 'completed-title'
          : ''
      }
    >
      {task.title}
    </h3>

    {task.description && (
      <p className="task-description">
        {task.description}
      </p>
    )}
  </div>

  <div className="task-card-footer">
    <div className="task-date">
      {task.dueDate ? (
        <>
          <span>▣</span>
          <span>{formatDate(task.dueDate)}</span>
        </>
      ) : (
        <span>No due date</span>
      )}
    </div>

    <button
      type="button"
      className={`status-action ${
        task.status === 'DONE'
          ? 'completed-action'
          : ''
      }`}
      onClick={() => onToggleStatus(task)}
    >
      {task.status === 'DONE' ? (
        <>
          <span>↻</span>
          Reopen
        </>
      ) : (
        <>
          <span>✓</span>
          {task.status === 'TODO'
            ? 'Start'
            : 'Complete'}
        </>
      )}
    </button>
  </div>
</article>

)
}

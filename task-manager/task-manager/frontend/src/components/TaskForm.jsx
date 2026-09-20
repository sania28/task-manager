import { useState } from 'react'

const emptyForm = {
title: '',
description: '',
status: 'TODO',
priority: 'MEDIUM',
dueDate: '',
}

export default function TaskForm({ initialTask, onSubmit, onCancel }) {
const [form, setForm] = useState(
initialTask ? { ...emptyForm, ...initialTask } : emptyForm
)
const [error, setError] = useState('')
const [submitting, setSubmitting] = useState(false)

const handleChange = (e) => {
const { name, value } = e.target

```
setForm((current) => ({
  ...current,
  [name]: value,
}))

if (error) {
  setError('')
}
```

}

const handleSubmit = async (e) => {
e.preventDefault()

```
if (!form.title.trim()) {
  setError('Task title is required')
  return
}

setError('')
setSubmitting(true)

try {
  await onSubmit({
    ...form,
    title: form.title.trim(),
    description: form.description?.trim() || '',
    dueDate: form.dueDate || null,
  })
} catch (err) {
  setError(err.response?.data?.error || 'Failed to save task')
} finally {
  setSubmitting(false)
}
```

}

return ( <div
   className="modal-backdrop task-form-backdrop"
   onClick={onCancel}
 >
<div
className="modal task-form-modal"
onClick={(e) => e.stopPropagation()}
>
{/* Modal Header */} <div className="task-form-header"> <div> <span className="task-form-eyebrow">
{initialTask ? 'UPDATE TASK' : 'NEW TASK'} </span>

```
        <h3>
          {initialTask ? 'Edit your task' : 'Create a new task'}
        </h3>

        <p>
          {initialTask
            ? 'Update the details and keep your work organized.'
            : 'Add a task and keep your workflow moving.'}
        </p>
      </div>

      <button
        type="button"
        className="modal-close"
        onClick={onCancel}
        aria-label="Close"
      >
        ×
      </button>
    </div>

    {/* Error */}
    {error && (
      <div className="error-banner form-error">
        <span>!</span>
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="form-group">
        <label htmlFor="task-title">
          Task title
          <span>*</span>
        </label>

        <input
          id="task-title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Complete project documentation"
          autoFocus
          disabled={submitting}
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="task-description">
          Description
          <small>Optional</small>
        </label>

        <textarea
          id="task-description"
          name="description"
          rows={4}
          value={form.description || ''}
          onChange={handleChange}
          placeholder="Add some details about this task..."
          disabled={submitting}
        />
      </div>

      {/* Status + Priority */}
      <div className="modal-row task-form-row">
        <div className="form-group">
          <label htmlFor="task-status">Status</label>

          <div className="select-wrapper">
            <select
              id="task-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Completed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="task-priority">Priority</label>

          <div className="select-wrapper">
            <select
              id="task-priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Due Date */}
      <div className="form-group">
        <label htmlFor="task-due-date">
          Due date
          <small>Optional</small>
        </label>

        <div className="date-input-wrapper">
          <span className="input-icon">▣</span>

          <input
            id="task-due-date"
            type="date"
            name="dueDate"
            value={form.dueDate || ''}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="modal-actions task-form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary task-save-button"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <span className="button-spinner"></span>
              Saving...
            </>
          ) : (
            <>
              <span>✓</span>
              {initialTask ? 'Update Task' : 'Create Task'}
            </>
          )}
        </button>
      </div>
    </form>
  </div>
</div>
```

)
}

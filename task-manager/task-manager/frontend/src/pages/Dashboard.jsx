import { useEffect, useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import { taskApi } from '../services/api'
import { connectTaskSocket, disconnectTaskSocket } from '../services/socket'
import { useAuth } from '../context/AuthContext'

const FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: 'TODO', label: 'To Do' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'DONE', label: 'Done' },
]

const NEXT_STATUS = { TODO: 'IN_PROGRESS', IN_PROGRESS: 'DONE', DONE: 'TODO' }

export default function Dashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [connected, setConnected] = useState(false)

  const loadTasks = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await taskApi.getAll()
      setTasks(data)
    } catch (err) {
      setError('Could not load tasks')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  // Real-time updates via WebSocket: keep local state in sync across tabs/devices
  useEffect(() => {
    if (!user) return

    connectTaskSocket(
      user.id,
      (event) => {
        setTasks((current) => {
          if (event.type === 'CREATED') {
            if (current.some((t) => t.id === event.task.id)) return current
            return [event.task, ...current]
          }
          if (event.type === 'UPDATED') {
            return current.map((t) => (t.id === event.task.id ? event.task : t))
          }
          if (event.type === 'DELETED') {
            return current.filter((t) => t.id !== event.taskId)
          }
          return current
        })
      },
      (isConnected) => setConnected(isConnected)
    )

    return () => disconnectTaskSocket()
  }, [user])

  const openCreateForm = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const openEditForm = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleSubmit = async (formData) => {
    if (editingTask) {
      const { data } = await taskApi.update(editingTask.id, formData)
      setTasks((current) => current.map((t) => (t.id === data.id ? data : t)))
    } else {
      const { data } = await taskApi.create(formData)
      setTasks((current) => [data, ...current])
    }
    setShowForm(false)
    setEditingTask(null)
  }

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}"?`)) return
    await taskApi.remove(task.id)
    setTasks((current) => current.filter((t) => t.id !== task.id))
  }

  const handleToggleStatus = async (task) => {
    const nextStatus = NEXT_STATUS[task.status]
    const { data } = await taskApi.update(task.id, { ...task, status: nextStatus })
    setTasks((current) => current.map((t) => (t.id === data.id ? data : t)))
  }

  const visibleTasks = filter === 'ALL' ? tasks : tasks.filter((t) => t.status === filter)

  return (
    <div className="app-shell">
      <Navbar connected={connected} />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Your tasks</h2>
          <button className="fab" onClick={openCreateForm}>
            + New task
          </button>
        </div>

        <div className="filters" style={{ marginBottom: 20 }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-chip ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <p>Loading tasks…</p>
        ) : visibleTasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks here yet.</p>
            <button className="fab" onClick={openCreateForm}>
              Create your first task
            </button>
          </div>
        ) : (
          <div className="task-grid">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}

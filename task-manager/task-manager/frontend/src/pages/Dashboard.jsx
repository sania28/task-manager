import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

import { taskApi } from '../services/api'
import {
connectTaskSocket,
disconnectTaskSocket,
} from '../services/socket'

import { useAuth } from '../context/AuthContext'

const FILTERS = [
{ key: 'ALL', label: 'All' },
{ key: 'TODO', label: 'To Do' },
{ key: 'IN_PROGRESS', label: 'In Progress' },
{ key: 'DONE', label: 'Done' },
]

const NEXT_STATUS = {
TODO: 'IN_PROGRESS',
IN_PROGRESS: 'DONE',
DONE: 'TODO',
}

export default function Dashboard() {
const { user } = useAuth()
const navigate = useNavigate()

const [tasks, setTasks] = useState([])
const [filter, setFilter] = useState('ALL')
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
const [showForm, setShowForm] = useState(false)
const [editingTask, setEditingTask] = useState(null)
const [connected, setConnected] = useState(false)

const displayName = user?.fullName || user?.name || 'User'

const loadTasks = useCallback(async () => {
setLoading(true)
setError('')

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

useEffect(() => {
if (!user) return

connectTaskSocket(
  user.id,
  (event) => {
    setTasks((current) => {
      if (event.type === 'CREATED') {
        if (
          current.some(
            (task) => task.id === event.task.id
          )
        ) {
          return current
        }

        return [event.task, ...current]
      }

      if (event.type === 'UPDATED') {
        return current.map((task) =>
          task.id === event.task.id
            ? event.task
            : task
        )
      }

      if (event.type === 'DELETED') {
        return current.filter(
          (task) => task.id !== event.taskId
        )
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
setError('')

try {
  if (editingTask) {
    const { data } = await taskApi.update(
      editingTask.id,
      formData
    )

    setTasks((current) =>
      current.map((task) =>
        task.id === data.id ? data : task
      )
    )
  } else {
    const { data } = await taskApi.create(formData)

    setTasks((current) => [data, ...current])
  }

  setShowForm(false)
  setEditingTask(null)
} catch (err) {
  setError('Could not save task')
}

}

const handleDelete = async (task) => {
if (!window.confirm(`Delete "${task.title}"?`)) {
return
}

try {
  await taskApi.remove(task.id)

  setTasks((current) =>
    current.filter((item) => item.id !== task.id)
  )
} catch (err) {
  setError('Could not delete task')
}

}

const handleToggleStatus = async (task) => {
try {
const nextStatus = NEXT_STATUS[task.status]

  const { data } = await taskApi.update(task.id, {
    ...task,
    status: nextStatus,
  })

  setTasks((current) =>
    current.map((item) =>
      item.id === data.id ? data : item
    )
  )
} catch (err) {
  setError('Could not update task')
}

}

const totalTasks = tasks.length

const todoTasks = tasks.filter(
(task) => task.status === 'TODO'
).length

const progressTasks = tasks.filter(
(task) => task.status === 'IN_PROGRESS'
).length

const doneTasks = tasks.filter(
(task) => task.status === 'DONE'
).length

const completion =
totalTasks > 0
? Math.round((doneTasks / totalTasks) * 100)
: 0

const visibleTasks =
filter === 'ALL'
? tasks
: tasks.filter((task) => task.status === filter)

return ( <div className="app-layout"> <Sidebar />

  <main className="main-content">
    <Navbar connected={connected} />

    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="hero-content">
          <span className="hero-badge">
            TASKFLOW WORKSPACE
          </span>

          <h2>
            Welcome back, {displayName} 👋
          </h2>

          <p>
            Organize your work, track your progress and
            complete your tasks one step at a time.
          </p>
        </div>

        <button
          type="button"
          className="hero-action"
          onClick={openCreateForm}
        >
          <span>+</span>
          New Task
        </button>
      </section>

      <section className="overview-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              OVERVIEW
            </span>

            <h3>Your productivity</h3>
          </div>

          <span className="completion-text">
            {completion}% completed
          </span>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-card-total">
            <div className="stat-icon">▣</div>

            <div>
              <span>Total Tasks</span>
              <strong>{totalTasks}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">○</div>

            <div>
              <span>To Do</span>
              <strong>{todoTasks}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">◐</div>

            <div>
              <span>In Progress</span>
              <strong>{progressTasks}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>

            <div>
              <span>Completed</span>
              <strong>{doneTasks}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="tasks-section">
        <div className="section-heading tasks-heading">
          <div>
            <span className="section-label">
              WORKSPACE
            </span>

            <h3>My Tasks</h3>
          </div>

          <button
            type="button"
            className="outline-action"
            onClick={openCreateForm}
          >
            + Add Task
          </button>
        </div>

        <div className="task-toolbar">
          <div className="filters">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`filter-chip ${
                  filter === item.key ? 'active' : ''
                }`}
                onClick={() => setFilter(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <span className="task-count">
            {visibleTasks.length}{' '}
            {visibleTasks.length === 1
              ? 'task'
              : 'tasks'}
          </span>
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your tasks...</p>
          </div>
        ) : visibleTasks.length === 0 ? (
          <div className="empty-state enhanced-empty-state">
            <div className="empty-icon">✓</div>

            <h3>
              {filter === 'ALL'
                ? 'No tasks yet'
                : `No ${
                    FILTERS.find(
                      (item) => item.key === filter
                    )?.label.toLowerCase()
                  } tasks`}
            </h3>

            <p>
              Create a task and start organizing your
              work.
            </p>

            <button
              type="button"
              className="hero-action"
              onClick={openCreateForm}
            >
              + Create Task
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
      </section>

      <section className="quick-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              EXPLORE
            </span>

            <h3>Quick Sections</h3>
          </div>
        </div>

        <div className="quick-grid">
          <button
            type="button"
            className="quick-card"
            onClick={() => navigate('/projects')}
          >
            <div className="quick-card-icon">▣</div>

            <div>
              <h4>Projects</h4>

              <p>
                Keep your projects organized in one
                place.
              </p>
            </div>

            <span className="quick-arrow">→</span>
          </button>

          <button
            type="button"
            className="quick-card"
            onClick={() => navigate('/team')}
          >
            <div className="quick-card-icon">♙</div>

            <div>
              <h4>Team</h4>

              <p>
                View your team workspace and members.
              </p>
            </div>

            <span className="quick-arrow">→</span>
          </button>

          <button
            type="button"
            className="quick-card"
            onClick={() => navigate('/messages')}
          >
            <div className="quick-card-icon">◌</div>

            <div>
              <h4>Messages</h4>

              <p>
                Stay connected with your workspace.
              </p>
            </div>

            <span className="quick-arrow">→</span>
          </button>
        </div>
      </section>

      <section className="productivity-section">
        <div className="productivity-content">
          <span className="section-label">
            PRODUCTIVITY
          </span>

          <h3>
            Stay focused. One task at a time.
          </h3>

          <p>
            Small progress every day can turn into big
            results. Keep your priorities clear and keep
            moving forward.
          </p>
        </div>

        <div className="productivity-progress">
          <div
            className="progress-circle"
            style={{
              '--progress': `${completion}%`,
            }}
          >
            <span>{completion}%</span>
          </div>

          <small>Completion</small>
        </div>
      </section>
    </div>
  </main>

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

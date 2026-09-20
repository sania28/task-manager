import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const initialNotifications = [
{
id: 1,
type: 'task',
icon: '✓',
title: 'Task completed',
message: 'A task in your workspace was marked as completed.',
time: '10 minutes ago',
unread: true,
},
{
id: 2,
type: 'team',
icon: '♙',
title: 'New team activity',
message: 'Your team has shared an update in the workspace.',
time: '1 hour ago',
unread: true,
},
{
id: 3,
type: 'project',
icon: '▣',
title: 'Project progress updated',
message: 'Website Redesign progress has been updated.',
time: '3 hours ago',
unread: true,
},
{
id: 4,
type: 'reminder',
icon: '◷',
title: 'Task reminder',
message: 'You have tasks that need your attention today.',
time: 'Yesterday',
unread: false,
},
{
id: 5,
type: 'system',
icon: '✦',
title: 'Welcome to TaskFlow',
message: 'Your workspace is ready. Start organizing your work.',
time: '2 days ago',
unread: false,
},
]

const filters = [
{ id: 'all', label: 'All' },
{ id: 'unread', label: 'Unread' },
{ id: 'task', label: 'Tasks' },
{ id: 'team', label: 'Team' },
{ id: 'project', label: 'Projects' },
]

export default function Notifications() {
const { user } = useAuth()

const [notifications, setNotifications] = useState(
initialNotifications
)
const [activeFilter, setActiveFilter] = useState('all')

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

const unreadCount = notifications.filter(
(notification) => notification.unread
).length

const filteredNotifications = notifications.filter((notification) => {
if (activeFilter === 'all') return true

```
if (activeFilter === 'unread') {
  return notification.unread
}

return notification.type === activeFilter
```

})

const markAsRead = (id) => {
setNotifications((current) =>
current.map((notification) =>
notification.id === id
? { ...notification, unread: false }
: notification
)
)
}

const markAllAsRead = () => {
setNotifications((current) =>
current.map((notification) => ({
...notification,
unread: false,
}))
)
}

return ( <div className="app-layout"> <Sidebar />

```
  <main className="main-content">
    <header className="static-navbar">
      <div>
        <div className="static-navbar-label">TASKFLOW WORKSPACE</div>
        <h1>Notifications</h1>
      </div>

      <div className="static-navbar-user">
        <div className="navbar-avatar">{initial}</div>

        <div>
          <strong>{displayName}</strong>
          <span>Workspace member</span>
        </div>
      </div>
    </header>

    <div className="static-page notifications-page">
      {/* Hero */}
      <section className="static-page-hero notifications-hero">
        <div>
          <span className="section-label">ACTIVITY CENTER</span>

          <h2>Stay up to date</h2>

          <p>
            Keep track of task activity, team updates and important
            workspace events.
          </p>
        </div>

        <div className="notification-header-actions">
          <span className="unread-summary">
            <strong>{unreadCount}</strong> unread
          </span>

          <button
            type="button"
            className="outline-action"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
      </section>

      {/* Summary */}
      <section className="notification-summary-grid">
        <div className="notification-summary-card">
          <div className="notification-summary-icon">◉</div>

          <div>
            <span>Total notifications</span>
            <strong>{notifications.length}</strong>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="notification-summary-icon">●</div>

          <div>
            <span>Unread</span>
            <strong>{unreadCount}</strong>
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="notification-summary-icon">✓</div>

          <div>
            <span>Read</span>
            <strong>
              {notifications.length - unreadCount}
            </strong>
          </div>
        </div>
      </section>

      {/* Notification List */}
      <section className="static-section">
        <div className="section-heading notification-heading">
          <div>
            <span className="section-label">RECENT ACTIVITY</span>
            <h3>Notifications</h3>
          </div>

          <span className="demo-badge">Frontend Preview</span>
        </div>

        <div className="notification-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`filter-chip ${
                activeFilter === filter.id ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}

              {filter.id === 'unread' && unreadCount > 0 && (
                <span className="filter-count">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="notification-empty">
              <div className="notification-empty-icon">✓</div>

              <h3>You're all caught up</h3>

              <p>
                There are no notifications in this category.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <article
                key={notification.id}
                className={`notification-card ${
                  notification.unread ? 'unread' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div
                  className={`notification-icon notification-${notification.type}`}
                >
                  {notification.icon}
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h3>{notification.title}</h3>

                    {notification.unread && (
                      <span className="notification-new">
                        New
                      </span>
                    )}
                  </div>

                  <p>{notification.message}</p>

                  <span className="notification-time">
                    {notification.time}
                  </span>
                </div>

                {notification.unread && (
                  <span
                    className="notification-unread-dot"
                    title="Unread"
                  ></span>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="notification-info-banner">
        <div className="notification-info-icon">✦</div>

        <div>
          <strong>Activity center preview</strong>

          <p>
            Notification data shown here is static frontend demo
            content. Your existing authentication and task
            functionality remain connected to the backend.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>
```

)
}

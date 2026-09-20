import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const initialNotifications = [
{
id: 1,
type: 'task',
icon: '✓',
title: 'Task completed',
message: 'The task "Complete project documentation" was marked as completed.',
time: '10 minutes ago',
unread: true,
},
{
id: 2,
type: 'team',
icon: '♙',
title: 'New team activity',
message: 'Alex Morgan updated a task in the Website Redesign project.',
time: '35 minutes ago',
unread: true,
},
{
id: 3,
type: 'message',
icon: '◌',
title: 'New message',
message: 'Maya Patel sent you a new message in the workspace.',
time: '1 hour ago',
unread: true,
},
{
id: 4,
type: 'task',
icon: '▣',
title: 'Task deadline approaching',
message: 'The task "Prepare final presentation" is due tomorrow.',
time: '3 hours ago',
unread: false,
},
{
id: 5,
type: 'project',
icon: '◆',
title: 'Project update',
message: 'The TaskFlow App project progress was updated to 45%.',
time: 'Yesterday',
unread: false,
},
{
id: 6,
type: 'team',
icon: '♙',
title: 'Team member activity',
message: 'Daniel Lee joined the Backend Development workspace.',
time: 'Yesterday',
unread: false,
},
]

const filters = ['All', 'Unread', 'Tasks', 'Team', 'Messages']

export default function Notifications() {
const { user, logout } = useAuth()
const navigate = useNavigate()

const [notifications, setNotifications] = useState(
initialNotifications
)
const [filter, setFilter] = useState('All')

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

const unreadCount = notifications.filter(
(notification) => notification.unread
).length

const filteredNotifications = notifications.filter(
(notification) => {
if (filter === 'Unread') {
return notification.unread
}

```
  if (filter === 'Tasks') {
    return notification.type === 'task'
  }

  if (filter === 'Team') {
    return notification.type === 'team'
  }

  if (filter === 'Messages') {
    return notification.type === 'message'
  }

  return true
}
```

)

const handleLogout = () => {
logout()
navigate('/login')
}

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
      <div className="static-navbar-left">
        <div className="static-brand-mark">T</div>

        <div>
          <strong>TaskFlow</strong>
          <span>Workspace</span>
        </div>
      </div>

      <div className="static-navbar-right">
        <button
          type="button"
          className="navbar-icon-button notification-navbar-active"
          onClick={() => navigate('/notifications')}
          title="Notifications"
          aria-label="Notifications"
        >
          ◉
        </button>

        <div className="navbar-divider"></div>

        <div className="navbar-user">
          <div className="navbar-avatar">{initial}</div>

          <div className="navbar-user-info">
            <strong>{displayName}</strong>
            <span>Workspace member</span>
          </div>
        </div>

        <button
          type="button"
          className="navbar-logout"
          onClick={handleLogout}
          title="Log out"
        >
          <span>↪</span>
          <span>Logout</span>
        </button>
      </div>
    </header>

    <div className="static-page">
      <section className="static-page-hero">
        <div>
          <span className="section-label">WORKSPACE</span>

          <h1>Notifications</h1>

          <p>
            Keep track of important activity across your TaskFlow
            workspace.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            className="hero-action"
            onClick={markAllAsRead}
          >
            <span>✓</span>
            Mark all read
          </button>
        )}
      </section>

      <section className="notifications-toolbar">
        <div className="page-filter-group">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${
                filter === item ? 'active' : ''
              }`}
              onClick={() => setFilter(item)}
            >
              {item}

              {item === 'Unread' && unreadCount > 0 && (
                <span className="filter-count">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <span className="task-count">
          {filteredNotifications.length}{' '}
          {filteredNotifications.length === 1
            ? 'notification'
            : 'notifications'}
        </span>
      </section>

      <section className="notifications-card">
        <div className="notifications-card-header">
          <div>
            <span className="section-label">ACTIVITY</span>

            <h3>
              Recent notifications
            </h3>
          </div>

          {unreadCount > 0 && (
            <span className="unread-badge">
              {unreadCount} unread
            </span>
          )}
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="notification-empty">
            <div className="empty-icon">✓</div>

            <h3>
              {filter === 'Unread'
                ? 'You are all caught up'
                : 'No notifications'}
            </h3>

            <p>
              There is nothing new to show in this section.
            </p>

            {filter !== 'All' && (
              <button
                type="button"
                className="outline-action"
                onClick={() => setFilter('All')}
              >
                View all notifications
              </button>
            )}
          </div>
        ) : (
          <div className="notification-list">
            {filteredNotifications.map((notification) => (
              <article
                key={notification.id}
                className={`notification-item ${
                  notification.unread ? 'is-unread' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div
                  className={`notification-icon notification-icon-${notification.type}`}
                >
                  {notification.icon}
                </div>

                <div className="notification-content">
                  <div className="notification-title-row">
                    <h4>{notification.title}</h4>

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
                  <span className="notification-dot"></span>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="static-info-card">
        <div className="static-info-icon">◉</div>

        <div>
          <span className="section-label">NOTIFICATION CENTER</span>

          <h3>Stay updated without losing focus</h3>

          <p>
            This notification center is currently a frontend demo.
            The activity shown here is static and is not connected to
            the backend notification system.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>
```

)
}

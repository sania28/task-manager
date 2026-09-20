import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ connected }) {
const { user, logout } = useAuth()
const navigate = useNavigate()

const handleLogout = () => {
logout()
navigate('/login')
}

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

return ( <nav className="navbar"> <div className="navbar-left"> <div className="mobile-brand"> <div className="navbar-logo">T</div>

```
      <div className="navbar-brand-text">
        <strong>TaskFlow</strong>
        <span>Workspace</span>
      </div>
    </div>

    <div
      className={`connection-status ${
        connected ? 'is-connected' : 'is-connecting'
      }`}
      title={
        connected
          ? 'Live updates connected'
          : 'Connecting to live updates'
      }
    >
      <span className="status-dot"></span>
      <span>{connected ? 'Live' : 'Connecting'}</span>
    </div>
  </div>

  <div className="navbar-right">
    <button
      type="button"
      className="navbar-icon-button"
      title="Notifications"
      aria-label="Notifications"
      onClick={() => navigate('/notifications')}
    >
      <span>◉</span>
    </button>

    <div className="navbar-divider"></div>

    <div className="navbar-user">
      <div className="navbar-avatar">
        {initial}
      </div>

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
</nav>
```

)
}

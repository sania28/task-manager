import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const menuItems = [
{ path: '/dashboard', icon: '⌂', label: 'Dashboard' },
{ path: '/tasks', icon: '✓', label: 'Tasks' },
{ path: '/projects', icon: '▣', label: 'Projects' },
{ path: '/team', icon: '♙', label: 'Team' },
{ path: '/messages', icon: '◌', label: 'Messages' },
{ path: '/settings', icon: '⚙', label: 'Settings' },
{ path: '/notifications', icon: '◉', label: 'Notifications' },
]

export default function Sidebar() {
const { logout } = useAuth()
const navigate = useNavigate()

const handleLogout = () => {
logout()
navigate('/login')
}

return ( <aside className="sidebar"> <div className="sidebar-logo"> <div className="logo-mark">T</div>

```
    <div>
      <h1>TaskFlow</h1>
      <span>Task Manager</span>
    </div>
  </div>

  <nav className="sidebar-nav">
    <p className="sidebar-title">MENU</p>

    {menuItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === '/dashboard'}
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'active' : ''}`
        }
      >
        <span className="sidebar-icon">{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>

  <div className="sidebar-bottom">
    <div className="sidebar-tip">
      <div className="tip-icon">✦</div>

      <div>
        <strong>Stay focused</strong>
        <p>One task at a time.</p>
      </div>
    </div>

    <button
      className="sidebar-logout"
      type="button"
      onClick={handleLogout}
    >
      <span className="sidebar-icon">↪</span>
      <span>Logout</span>
    </button>
  </div>
</aside>
```

)
}

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ connected }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="brand">
        <span>🗂️ TaskFlow</span>
        <span
          className={`status-dot ${connected ? 'connected' : ''}`}
          title={connected ? 'Live updates connected' : 'Connecting…'}
        />
      </div>
      <div className="user-area">
        <span className="name">{user?.fullName}</span>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  )
}

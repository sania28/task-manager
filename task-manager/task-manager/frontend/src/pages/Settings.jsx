import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
const { user, logout } = useAuth()
const navigate = useNavigate()

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

const [profileName, setProfileName] = useState(displayName)
const [email, setEmail] = useState(user?.email || '')
const [notifications, setNotifications] = useState(true)
const [emailUpdates, setEmailUpdates] = useState(false)
const [compactMode, setCompactMode] = useState(false)
const [saved, setSaved] = useState(false)

const handleLogout = () => {
logout()
navigate('/login')
}

const handleSave = (e) => {
e.preventDefault()

setSaved(true)

setTimeout(() => {
  setSaved(false)
}, 2500)

}

return ( <div className="app-layout"> <Sidebar />

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
          className="navbar-icon-button"
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

          <h1>Settings</h1>

          <p>
            Manage your profile and customize your TaskFlow workspace.
          </p>
        </div>
      </section>

      {saved && (
        <div className="settings-success">
          <span>✓</span>
          Settings updated for this session.
        </div>
      )}

      <div className="settings-layout">
        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">◉</div>

            <div>
              <span className="section-label">PROFILE</span>
              <h3>Personal information</h3>
              <p>
                Update the basic information displayed in your workspace.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="settings-avatar-row">
              <div className="settings-large-avatar">
                {profileName.charAt(0).toUpperCase() || initial}
              </div>

              <div>
                <strong>{profileName || 'User'}</strong>
                <span>Workspace member</span>
              </div>
            </div>

            <div className="settings-form-grid">
              <div className="form-group">
                <label htmlFor="settings-name">
                  Full name
                </label>

                <input
                  id="settings-name"
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="settings-email">
                  Email address
                </label>

                <input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="settings-actions">
              <button
                type="submit"
                className="btn btn-primary"
              >
                <span>✓</span>
                Save Changes
              </button>
            </div>
          </form>
        </section>

        <section className="settings-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">◉</div>

            <div>
              <span className="section-label">PREFERENCES</span>
              <h3>Workspace preferences</h3>
              <p>
                Choose how you want your workspace experience to feel.
              </p>
            </div>
          </div>

          <div className="settings-options">
            <div className="settings-option">
              <div>
                <strong>Task notifications</strong>
                <p>
                  Show notifications when task activity needs your
                  attention.
                </p>
              </div>

              <button
                type="button"
                className={`toggle-switch ${
                  notifications ? 'active' : ''
                }`}
                onClick={() =>
                  setNotifications((current) => !current)
                }
                aria-label="Toggle task notifications"
                aria-pressed={notifications}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-option">
              <div>
                <strong>Email updates</strong>
                <p>
                  Receive occasional updates about your workspace.
                </p>
              </div>

              <button
                type="button"
                className={`toggle-switch ${
                  emailUpdates ? 'active' : ''
                }`}
                onClick={() =>
                  setEmailUpdates((current) => !current)
                }
                aria-label="Toggle email updates"
                aria-pressed={emailUpdates}
              >
                <span></span>
              </button>
            </div>

            <div className="settings-option">
              <div>
                <strong>Compact workspace</strong>
                <p>
                  Reduce spacing to display more content at once.
                </p>
              </div>

              <button
                type="button"
                className={`toggle-switch ${
                  compactMode ? 'active' : ''
                }`}
                onClick={() =>
                  setCompactMode((current) => !current)
                }
                aria-label="Toggle compact workspace"
                aria-pressed={compactMode}
              >
                <span></span>
              </button>
            </div>
          </div>
        </section>

        <section className="settings-card settings-security-card">
          <div className="settings-card-header">
            <div className="settings-card-icon">◆</div>

            <div>
              <span className="section-label">SECURITY</span>
              <h3>Account security</h3>
              <p>
                Keep your account information and session under control.
              </p>
            </div>
          </div>

          <div className="security-row">
            <div>
              <strong>Password</strong>
              <p>
                Your password is managed through your TaskFlow account.
              </p>
            </div>

            <button
              type="button"
              className="outline-action"
              onClick={() => navigate('/login')}
            >
              Log in again
            </button>
          </div>

          <div className="security-row danger-row">
            <div>
              <strong>Sign out</strong>
              <p>
                End your current TaskFlow session on this device.
              </p>
            </div>

            <button
              type="button"
              className="danger-outline-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </section>
      </div>

      <section className="static-info-card">
        <div className="static-info-icon">⚙</div>

        <div>
          <span className="section-label">SETTINGS PREVIEW</span>

          <h3>Frontend workspace preferences</h3>

          <p>
            These settings are currently frontend-only. Changes are
            reflected during the current session but are not saved to
            the backend.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>

)
}

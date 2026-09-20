import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
const { user } = useAuth()

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

const [activeSection, setActiveSection] = useState('profile')

const [fullName, setFullName] = useState(displayName)
const [email, setEmail] = useState(user?.email || '')

const [emailNotifications, setEmailNotifications] = useState(true)
const [taskReminders, setTaskReminders] = useState(true)
const [teamUpdates, setTeamUpdates] = useState(false)

const [theme, setTheme] = useState('dark')

const sections = [
{
id: 'profile',
icon: '◉',
label: 'Profile',
description: 'Manage your account details',
},
{
id: 'notifications',
icon: '◉',
label: 'Notifications',
description: 'Control your notifications',
},
{
id: 'appearance',
icon: '◐',
label: 'Appearance',
description: 'Customize your workspace',
},
{
id: 'security',
icon: '◆',
label: 'Security',
description: 'Manage account security',
},
]

const handleSave = (e) => {
e.preventDefault()

```
window.alert(
  'Settings are currently saved only in this frontend preview.'
)
```

}

return ( <div className="app-layout"> <Sidebar />

```
  <main className="main-content">
    <header className="static-navbar">
      <div>
        <div className="static-navbar-label">TASKFLOW WORKSPACE</div>
        <h1>Settings</h1>
      </div>

      <div className="static-navbar-user">
        <div className="navbar-avatar">{initial}</div>

        <div>
          <strong>{displayName}</strong>
          <span>Workspace member</span>
        </div>
      </div>
    </header>

    <div className="static-page settings-page">
      {/* Intro */}
      <section className="static-page-hero settings-hero">
        <div>
          <span className="section-label">PREFERENCES</span>

          <h2>Workspace settings</h2>

          <p>
            Manage your profile, notifications and workspace
            preferences from one place.
          </p>
        </div>

        <span className="demo-badge">Frontend Preview</span>
      </section>

      {/* Settings Layout */}
      <section className="settings-layout">
        {/* Settings Navigation */}
        <aside className="settings-sidebar">
          <div className="settings-sidebar-title">
            <span>SETTINGS</span>
          </div>

          <nav className="settings-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={`settings-nav-item ${
                  activeSection === section.id ? 'active' : ''
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="settings-nav-icon">
                  {section.icon}
                </span>

                <span>
                  <strong>{section.label}</strong>
                  <small>{section.description}</small>
                </span>

                <span className="settings-nav-arrow">→</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="settings-content">
          {activeSection === 'profile' && (
            <form onSubmit={handleSave}>
              <div className="settings-card">
                <div className="settings-card-header">
                  <div>
                    <span className="section-label">ACCOUNT</span>
                    <h3>Profile information</h3>
                    <p>
                      Update the information displayed on your
                      TaskFlow workspace.
                    </p>
                  </div>

                  <div className="settings-profile-avatar">
                    {initial}
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
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
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

                <div className="settings-readonly-box">
                  <span>ACCOUNT STATUS</span>

                  <div>
                    <span className="settings-online-dot"></span>
                    <strong>Active account</strong>
                  </div>
                </div>

                <div className="settings-card-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <span className="section-label">
                    NOTIFICATIONS
                  </span>

                  <h3>Notification preferences</h3>

                  <p>
                    Choose which updates you want to receive.
                  </p>
                </div>
              </div>

              <div className="settings-options">
                <label className="settings-option">
                  <div>
                    <strong>Email notifications</strong>
                    <p>
                      Receive important workspace updates by email.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) =>
                      setEmailNotifications(e.target.checked)
                    }
                  />

                  <span className="toggle-switch"></span>
                </label>

                <label className="settings-option">
                  <div>
                    <strong>Task reminders</strong>
                    <p>
                      Get reminders about upcoming task deadlines.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={taskReminders}
                    onChange={(e) =>
                      setTaskReminders(e.target.checked)
                    }
                  />

                  <span className="toggle-switch"></span>
                </label>

                <label className="settings-option">
                  <div>
                    <strong>Team updates</strong>
                    <p>
                      Receive updates when your team activity changes.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={teamUpdates}
                    onChange={(e) =>
                      setTeamUpdates(e.target.checked)
                    }
                  />

                  <span className="toggle-switch"></span>
                </label>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <span className="section-label">APPEARANCE</span>

                  <h3>Workspace appearance</h3>

                  <p>
                    Choose how TaskFlow should look on your screen.
                  </p>
                </div>
              </div>

              <div className="theme-options">
                <button
                  type="button"
                  className={`theme-option ${
                    theme === 'dark' ? 'active' : ''
                  }`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="theme-preview theme-dark-preview">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div>
                    <strong>Dark</strong>
                    <small>TaskFlow dark workspace</small>
                  </div>

                  {theme === 'dark' && (
                    <span className="theme-check">✓</span>
                  )}
                </button>

                <button
                  type="button"
                  className={`theme-option ${
                    theme === 'light' ? 'active' : ''
                  }`}
                  onClick={() => setTheme('light')}
                >
                  <div className="theme-preview theme-light-preview">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div>
                    <strong>Light</strong>
                    <small>Light workspace preview</small>
                  </div>

                  {theme === 'light' && (
                    <span className="theme-check">✓</span>
                  )}
                </button>
              </div>

              <div className="settings-demo-note">
                <span>i</span>
                <p>
                  Appearance selection is currently a frontend
                  preview and does not change the global theme.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <span className="section-label">SECURITY</span>

                  <h3>Account security</h3>

                  <p>
                    Manage your password and account security
                    preferences.
                  </p>
                </div>
              </div>

              <div className="security-item">
                <div className="security-icon">◆</div>

                <div>
                  <strong>Password</strong>
                  <p>
                    Keep your account protected with a strong
                    password.
                  </p>
                </div>

                <button
                  type="button"
                  className="outline-action"
                  onClick={() =>
                    window.alert(
                      'Password management is not connected in this frontend preview.'
                    )
                  }
                >
                  Change
                </button>
              </div>

              <div className="security-item">
                <div className="security-icon">✓</div>

                <div>
                  <strong>Account protection</strong>
                  <p>
                    Your TaskFlow account is currently active.
                  </p>
                </div>

                <span className="security-active">
                  Active
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="settings-info-banner">
        <div className="settings-info-icon">✦</div>

        <div>
          <strong>Frontend settings preview</strong>

          <p>
            These preference controls are currently visual frontend
            features. Your existing authentication and task
            backend remain unchanged.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>
```

)
}

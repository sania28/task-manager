import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const members = [
{
id: 1,
name: 'Aarav Sharma',
role: 'Project Manager',
status: 'Online',
tasks: 14,
avatar: 'A',
},
{
id: 2,
name: 'Priya Singh',
role: 'UI/UX Designer',
status: 'Online',
tasks: 9,
avatar: 'P',
},
{
id: 3,
name: 'Rahul Kumar',
role: 'Frontend Developer',
status: 'Away',
tasks: 12,
avatar: 'R',
},
{
id: 4,
name: 'Neha Verma',
role: 'Backend Developer',
status: 'Offline',
tasks: 7,
avatar: 'N',
},
{
id: 5,
name: 'Vikash Gupta',
role: 'QA Engineer',
status: 'Online',
tasks: 11,
avatar: 'V',
},
{
id: 6,
name: 'Ananya Das',
role: 'Product Designer',
status: 'Away',
tasks: 6,
avatar: 'A',
},
]

export default function Team() {
const { user, logout } = useAuth()
const navigate = useNavigate()

const [search, setSearch] = useState('')
const [filter, setFilter] = useState('All')

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

const filteredMembers = members.filter((member) => {
const matchesSearch =
member.name.toLowerCase().includes(search.toLowerCase()) ||
member.role.toLowerCase().includes(search.toLowerCase())

const matchesFilter =
  filter === 'All' || member.status === filter

return matchesSearch && matchesFilter

})

const handleLogout = () => {
logout()
navigate('/login')
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

          <h1>Team</h1>

          <p>
            View your workspace members and keep track of team activity.
          </p>
        </div>

        <button
          type="button"
          className="hero-action"
          onClick={() => navigate('/messages')}
        >
          <span>◌</span>
          Messages
        </button>
      </section>

      <section className="team-toolbar">
        <div className="team-search">
          <span>⌕</span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team members..."
          />
        </div>

        <div className="page-filter-group">
          {['All', 'Online', 'Away', 'Offline'].map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${
                filter === item ? 'active' : ''
              }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="team-grid">
        {filteredMembers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>

            <h3>No members found</h3>

            <p>
              Try a different name, role or availability filter.
            </p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <article className="team-card" key={member.id}>
              <div className="team-card-top">
                <div className="team-avatar">
                  {member.avatar}
                </div>

                <span
                  className={`member-status ${
                    member.status === 'Online'
                      ? 'member-status-online'
                      : member.status === 'Away'
                      ? 'member-status-away'
                      : 'member-status-offline'
                  }`}
                >
                  <span></span>
                  {member.status}
                </span>
              </div>

              <div className="team-card-content">
                <h3>{member.name}</h3>

                <p>{member.role}</p>
              </div>

              <div className="team-card-footer">
                <span>
                  <strong>{member.tasks}</strong> active tasks
                </span>

                <button
                  type="button"
                  className="team-message-button"
                  onClick={() => navigate('/messages')}
                >
                  Message →
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <section className="static-info-card">
        <div className="static-info-icon">♙</div>

        <div>
          <span className="section-label">DEMO WORKSPACE</span>

          <h3>Team information</h3>

          <p>
            The team members shown here are static demo content.
            This section is currently frontend-only and is not
            connected to the backend.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>

)
}

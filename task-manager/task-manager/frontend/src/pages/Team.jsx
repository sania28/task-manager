writing{variant="standard" id="58321" title="Team.jsx"}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const teamMembers = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'Frontend Developer',
    department: 'Development',
    status: 'Online',
    projects: 4,
    initials: 'AM',
  },
  {
    id: 2,
    name: 'Maya Patel',
    role: 'UI/UX Designer',
    department: 'Design',
    status: 'Online',
    projects: 3,
    initials: 'MP',
  },
  {
    id: 3,
    name: 'Daniel Lee',
    role: 'Backend Developer',
    department: 'Development',
    status: 'Away',
    projects: 5,
    initials: 'DL',
  },
  {
    id: 4,
    name: 'Jordan Kim',
    role: 'Product Manager',
    department: 'Product',
    status: 'Offline',
    projects: 6,
    initials: 'JK',
  },
  {
    id: 5,
    name: 'Emma Wilson',
    role: 'Frontend Developer',
    department: 'Development',
    status: 'Online',
    projects: 2,
    initials: 'EW',
  },
  {
    id: 6,
    name: 'Noah Carter',
    role: 'Product Designer',
    department: 'Design',
    status: 'Away',
    projects: 3,
    initials: 'NC',
  },
]

const filters = ['All', 'Development', 'Design', 'Product']

export default function Team() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const displayName = user?.fullName || user?.name || 'User'
  const initial = displayName.charAt(0).toUpperCase()

  const filteredMembers = teamMembers.filter((member) => {
    const matchesFilter =
      filter === 'All' || member.department === filter

    const searchValue = search.trim().toLowerCase()

    const matchesSearch =
      !searchValue ||
      member.name.toLowerCase().includes(searchValue) ||
      member.role.toLowerCase().includes(searchValue)

    return matchesFilter && matchesSearch
  })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-layout">
      <Sidebar />

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
                See your workspace members, roles and current availability.
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
                </button>
              ))}
            </div>

            <div className="team-search">
              <span>⌕</span>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search team members..."
                aria-label="Search team members"
              />
            </div>
          </section>

          <div className="team-results-bar">
            <div>
              <span className="section-label">TEAM MEMBERS</span>
              <h3>
                {filteredMembers.length}{' '}
                {filteredMembers.length === 1 ? 'member' : 'members'}
              </h3>
            </div>

            <span className="team-workspace-badge">
              Workspace
            </span>
          </div>

          {filteredMembers.length === 0 ? (
            <section className="empty-state enhanced-empty-state">
              <div className="empty-icon">⌕</div>

              <h3>No team members found</h3>

              <p>
                Try a different name, role or department.
              </p>

              <button
                type="button"
                className="outline-action"
                onClick={() => {
                  setSearch('')
                  setFilter('All')
                }}
              >
                Clear filters
              </button>
            </section>
          ) : (
            <section className="team-grid">
              {filteredMembers.map((member) => (
                <article className="team-card" key={member.id}>
                  <div className="team-card-top">
                    <div className="team-avatar">
                      {member.initials}
                    </div>

                    <span
                      className={`team-status ${
                        member.status === 'Online'
                          ? 'team-status-online'
                          : member.status === 'Away'
                            ? 'team-status-away'
                            : 'team-status-offline'
                      }`}
                    >
                      <span className="team-status-dot"></span>
                      {member.status}
                    </span>
                  </div>

                  <div className="team-card-content">
                    <h3>{member.name}</h3>

                    <p className="team-role">
                      {member.role}
                    </p>

                    <span className="team-department">
                      {member.department}
                    </span>
                  </div>

                  <div className="team-card-footer">
                    <div className="team-meta">
                      <span>▣</span>
                      <span>
                        {member.projects}{' '}
                        {member.projects === 1
                          ? 'project'
                          : 'projects'}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="team-action"
                      onClick={() => navigate('/messages')}
                    >
                      Message
                      <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}

          <section className="static-info-card">
            <div className="static-info-icon">♙</div>

            <div>
              <span className="section-label">TEAM WORKSPACE</span>

              <h3>Stay connected with your team</h3>

              <p>
                This team section is currently a frontend workspace
                preview. The member information shown here is static
                demo content and is not connected to the backend.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

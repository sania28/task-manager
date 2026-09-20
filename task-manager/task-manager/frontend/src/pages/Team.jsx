import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const teamMembers = [
{
name: 'Alex Morgan',
role: 'Product Manager',
department: 'Product',
status: 'Online',
initials: 'AM',
},
{
name: 'Sarah Wilson',
role: 'UI/UX Designer',
department: 'Design',
status: 'Online',
initials: 'SW',
},
{
name: 'Daniel Carter',
role: 'Frontend Developer',
department: 'Engineering',
status: 'Away',
initials: 'DC',
},
{
name: 'Emma Davis',
role: 'Backend Developer',
department: 'Engineering',
status: 'Offline',
initials: 'ED',
},
{
name: 'Michael Brown',
role: 'QA Engineer',
department: 'Engineering',
status: 'Online',
initials: 'MB',
},
{
name: 'Olivia Taylor',
role: 'Marketing Specialist',
department: 'Marketing',
status: 'Away',
initials: 'OT',
},
]

export default function Team() {
const { user } = useAuth()

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

return ( <div className="app-layout"> <Sidebar />

```
  <main className="main-content">
    <header className="static-navbar">
      <div>
        <div className="static-navbar-label">TASKFLOW WORKSPACE</div>
        <h1>Team</h1>
      </div>

      <div className="static-navbar-user">
        <div className="navbar-avatar">{initial}</div>

        <div>
          <strong>{displayName}</strong>
          <span>Workspace member</span>
        </div>
      </div>
    </header>

    <div className="static-page team-page">
      {/* Hero */}
      <section className="static-page-hero">
        <div>
          <span className="section-label">COLLABORATION</span>

          <h2>Your team workspace</h2>

          <p>
            View your workspace members, their roles and their current
            availability in one place.
          </p>
        </div>

        <button
          type="button"
          className="hero-action"
          onClick={() =>
            window.alert(
              'Inviting team members is a frontend demo feature for now.'
            )
          }
        >
          <span>+</span>
          Invite Member
        </button>
      </section>

      {/* Team Summary */}
      <section className="team-summary-grid">
        <div className="team-summary-card">
          <div className="team-summary-icon">♙</div>

          <div>
            <span>Total Members</span>
            <strong>{teamMembers.length}</strong>
          </div>
        </div>

        <div className="team-summary-card">
          <div className="team-summary-icon">●</div>

          <div>
            <span>Online Now</span>
            <strong>
              {
                teamMembers.filter(
                  (member) => member.status === 'Online'
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="team-summary-card">
          <div className="team-summary-icon">◐</div>

          <div>
            <span>Away</span>
            <strong>
              {
                teamMembers.filter(
                  (member) => member.status === 'Away'
                ).length
              }
            </strong>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="static-section">
        <div className="section-heading">
          <div>
            <span className="section-label">WORKSPACE MEMBERS</span>
            <h3>Team members</h3>
          </div>

          <span className="demo-badge">Frontend Preview</span>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <article className="team-member-card" key={member.name}>
              <div className="team-member-top">
                <div className="team-avatar">
                  {member.initials}

                  <span
                    className={`team-status-dot ${member.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  ></span>
                </div>

                <button
                  type="button"
                  className="team-more-button"
                  title="More options"
                  aria-label={`More options for ${member.name}`}
                  onClick={() =>
                    window.alert(
                      'Team member actions are available in the frontend preview.'
                    )
                  }
                >
                  ⋮
                </button>
              </div>

              <div className="team-member-info">
                <h3>{member.name}</h3>

                <p>{member.role}</p>

                <span className="team-department">
                  {member.department}
                </span>
              </div>

              <div className="team-member-footer">
                <span
                  className={`member-availability ${member.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  <span></span>
                  {member.status}
                </span>

                <button
                  type="button"
                  className="team-message-button"
                  onClick={() =>
                    window.alert(
                      `Messaging ${member.name} is a frontend demo feature.`
                    )
                  }
                >
                  Message
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Collaboration Banner */}
      <section className="team-info-banner">
        <div className="team-info-icon">✦</div>

        <div>
          <strong>Built for collaboration</strong>

          <p>
            Use this workspace to keep track of people and roles.
            Team data shown here is static frontend demo content.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>
```

)
}

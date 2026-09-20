import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const projects = [
{
title: 'Website Redesign',
description:
'Modernize the company website with a cleaner interface and improved user experience.',
status: 'In Progress',
progress: 68,
tasks: 12,
members: 4,
category: 'Design',
},
{
title: 'TaskFlow Mobile',
description:
'Plan and design a mobile experience for managing tasks on the go.',
status: 'Planning',
progress: 32,
tasks: 8,
members: 3,
category: 'Product',
},
{
title: 'Portfolio Website',
description:
'Build a professional portfolio to showcase projects, skills and achievements.',
status: 'Completed',
progress: 100,
tasks: 15,
members: 2,
category: 'Development',
},
]

export default function Projects() {
const { user } = useAuth()

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

return ( <div className="app-layout"> <Sidebar />

```
  <main className="main-content">
    <header className="static-navbar">
      <div>
        <div className="static-navbar-label">TASKFLOW WORKSPACE</div>
        <h1>Projects</h1>
      </div>

      <div className="static-navbar-user">
        <div className="navbar-avatar">{initial}</div>

        <div>
          <strong>{displayName}</strong>
          <span>Workspace member</span>
        </div>
      </div>
    </header>

    <div className="static-page projects-page">
      <section className="static-page-hero">
        <div>
          <span className="section-label">WORKSPACE</span>

          <h2>Manage your projects</h2>

          <p>
            Keep your work organized by grouping related tasks into
            projects and tracking your overall progress.
          </p>
        </div>

        <button
          type="button"
          className="hero-action"
          onClick={() =>
            window.alert(
              'Project creation is a frontend demo feature for now.'
            )
          }
        >
          <span>+</span>
          New Project
        </button>
      </section>

      <section className="project-summary-grid">
        <div className="project-summary-card">
          <span className="project-summary-icon">▣</span>

          <div>
            <span>Total Projects</span>
            <strong>{projects.length}</strong>
          </div>
        </div>

        <div className="project-summary-card">
          <span className="project-summary-icon">◐</span>

          <div>
            <span>In Progress</span>
            <strong>
              {
                projects.filter(
                  (project) => project.status === 'In Progress'
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="project-summary-card">
          <span className="project-summary-icon">✓</span>

          <div>
            <span>Completed</span>
            <strong>
              {
                projects.filter(
                  (project) => project.status === 'Completed'
                ).length
              }
            </strong>
          </div>
        </div>
      </section>

      <section className="static-section">
        <div className="section-heading">
          <div>
            <span className="section-label">YOUR WORK</span>
            <h3>Project overview</h3>
          </div>

          <span className="demo-badge">Frontend Preview</span>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-card-top">
                <div className="project-icon">
                  {project.title.charAt(0)}
                </div>

                <span
                  className={`project-status ${project.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="project-card-content">
                <span className="project-category">
                  {project.category}
                </span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>
              </div>

              <div className="project-progress-area">
                <div className="project-progress-header">
                  <span>Progress</span>
                  <strong>{project.progress}%</strong>
                </div>

                <div className="project-progress-track">
                  <div
                    className="project-progress-bar"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="project-card-footer">
                <div className="project-meta">
                  <span>✓ {project.tasks} tasks</span>
                  <span>♙ {project.members} members</span>
                </div>

                <button
                  type="button"
                  className="project-open-button"
                  onClick={() =>
                    window.alert(
                      `${project.title} is a frontend demo project.`
                    )
                  }
                >
                  View
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="project-info-banner">
        <div className="project-info-icon">✦</div>

        <div>
          <strong>Project workspace preview</strong>

          <p>
            These project cards are currently frontend-only demo
            content. Your real task management and authentication
            features continue to use the existing backend.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>
```

)
}

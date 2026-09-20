import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const conversations = [
{
id: 1,
name: 'Alex Morgan',
role: 'Frontend Developer',
initials: 'AM',
status: 'Online',
message: 'The dashboard design looks great!',
time: '10:42 AM',
unread: 2,
},
{
id: 2,
name: 'Maya Patel',
role: 'UI/UX Designer',
initials: 'MP',
status: 'Online',
message: 'I have updated the latest mockups.',
time: '09:18 AM',
unread: 1,
},
{
id: 3,
name: 'Daniel Lee',
role: 'Backend Developer',
initials: 'DL',
status: 'Away',
message: 'The API changes are ready for review.',
time: 'Yesterday',
unread: 0,
},
{
id: 4,
name: 'Jordan Kim',
role: 'Product Manager',
initials: 'JK',
status: 'Offline',
message: 'Let us discuss the project timeline.',
time: 'Yesterday',
unread: 0,
},
]

const demoMessages = [
{
id: 1,
sender: 'Alex Morgan',
text: 'Hey! How is the TaskFlow dashboard coming along?',
time: '10:35 AM',
own: false,
},
{
id: 2,
sender: 'You',
text: 'It is coming together nicely. I am finishing the UI now.',
time: '10:38 AM',
own: true,
},
{
id: 3,
sender: 'Alex Morgan',
text: 'Nice! The new layout looks clean and easy to use.',
time: '10:42 AM',
own: false,
},
]

export default function Messages() {
const { user, logout } = useAuth()
const navigate = useNavigate()

const [selectedConversation, setSelectedConversation] = useState(
conversations[0]
)
const [search, setSearch] = useState('')
const [message, setMessage] = useState('')

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

const filteredConversations = conversations.filter((conversation) => {
const value = search.trim().toLowerCase()

if (!value) return true

return (
  conversation.name.toLowerCase().includes(value) ||
  conversation.role.toLowerCase().includes(value) ||
  conversation.message.toLowerCase().includes(value)
)

})

const handleLogout = () => {
logout()
navigate('/login')
}

const handleSend = (e) => {
e.preventDefault()

if (!message.trim()) return

setMessage('')

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
      <section className="static-page-hero messages-page-hero">
        <div>
          <span className="section-label">WORKSPACE</span>

          <h1>Messages</h1>

          <p>
            Stay connected with your workspace and keep conversations
            organized.
          </p>
        </div>

        <button
          type="button"
          className="hero-action"
          onClick={() => navigate('/team')}
        >
          <span>♙</span>
          View Team
        </button>
      </section>

      <section className="messages-workspace">
        <aside className="messages-sidebar">
          <div className="messages-sidebar-header">
            <div>
              <span className="section-label">INBOX</span>
              <h3>Conversations</h3>
            </div>

            <span className="messages-count">
              {conversations.length}
            </span>
          </div>

          <div className="messages-search">
            <span>⌕</span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              aria-label="Search conversations"
            />
          </div>

          <div className="conversation-list">
            {filteredConversations.length === 0 ? (
              <div className="conversation-empty">
                <span>⌕</span>
                <p>No conversations found.</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  type="button"
                  key={conversation.id}
                  className={`conversation-item ${
                    selectedConversation.id === conversation.id
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedConversation(conversation)
                  }
                >
                  <div className="conversation-avatar">
                    {conversation.initials}

                    <span
                      className={`conversation-status ${
                        conversation.status === 'Online'
                          ? 'online'
                          : conversation.status === 'Away'
                            ? 'away'
                            : 'offline'
                      }`}
                    ></span>
                  </div>

                  <div className="conversation-content">
                    <div className="conversation-top">
                      <strong>{conversation.name}</strong>
                      <small>{conversation.time}</small>
                    </div>

                    <div className="conversation-bottom">
                      <span>{conversation.message}</span>

                      {conversation.unread > 0 && (
                        <b>{conversation.unread}</b>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        <section className="chat-panel">
          <header className="chat-header">
            <div className="chat-user">
              <div className="conversation-avatar large">
                {selectedConversation.initials}

                <span
                  className={`conversation-status ${
                    selectedConversation.status === 'Online'
                      ? 'online'
                      : selectedConversation.status === 'Away'
                        ? 'away'
                        : 'offline'
                  }`}
                ></span>
              </div>

              <div>
                <h3>{selectedConversation.name}</h3>
                <span>
                  {selectedConversation.status} ·{' '}
                  {selectedConversation.role}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="navbar-icon-button"
              title="View team"
              aria-label="View team"
              onClick={() => navigate('/team')}
            >
              ♙
            </button>
          </header>

          <div className="chat-messages">
            <div className="chat-date-divider">
              <span>Today</span>
            </div>

            {demoMessages.map((item) => (
              <div
                key={item.id}
                className={`chat-message ${
                  item.own ? 'own' : ''
                }`}
              >
                {!item.own && (
                  <div className="chat-message-avatar">
                    {selectedConversation.initials}
                  </div>
                )}

                <div className="chat-message-content">
                  <div className="chat-bubble">
                    {item.text}
                  </div>

                  <small>{item.time}</small>
                </div>
              </div>
            ))}
          </div>

          <form
            className="chat-input-area"
            onSubmit={handleSend}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              aria-label="Write a message"
            />

            <button
              type="submit"
              className="chat-send-button"
              disabled={!message.trim()}
              title="Send message"
              aria-label="Send message"
            >
              →
            </button>
          </form>
        </section>
      </section>

      <section className="static-info-card">
        <div className="static-info-icon">◌</div>

        <div>
          <span className="section-label">MESSAGING WORKSPACE</span>

          <h3>Keep conversations in one place</h3>

          <p>
            This messages section is currently a frontend demo.
            Conversations and messages shown here are static and are
            not connected to the backend.
          </p>
        </div>
      </section>
    </div>
  </main>
</div>

)
}

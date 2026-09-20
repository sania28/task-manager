import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'

const conversations = [
{
id: 1,
name: 'Alex Morgan',
role: 'Product Manager',
initials: 'AM',
status: 'Online',
lastMessage: 'The project timeline looks good.',
time: '10:42 AM',
unread: 2,
},
{
id: 2,
name: 'Sarah Wilson',
role: 'UI/UX Designer',
initials: 'SW',
status: 'Online',
lastMessage: 'I have updated the dashboard design.',
time: '09:18 AM',
unread: 1,
},
{
id: 3,
name: 'Daniel Carter',
role: 'Frontend Developer',
initials: 'DC',
status: 'Away',
lastMessage: 'Can we review this task later?',
time: 'Yesterday',
unread: 0,
},
{
id: 4,
name: 'Emma Davis',
role: 'Backend Developer',
initials: 'ED',
status: 'Offline',
lastMessage: 'API changes are ready for review.',
time: 'Yesterday',
unread: 0,
},
]

const demoMessages = [
{
id: 1,
sender: 'Alex Morgan',
text: 'Hey! How is the project going?',
time: '10:38 AM',
own: false,
},
{
id: 2,
sender: 'You',
text: 'Going well. I am working on the remaining tasks.',
time: '10:40 AM',
own: true,
},
{
id: 3,
sender: 'Alex Morgan',
text: 'Great! The project timeline looks good.',
time: '10:42 AM',
own: false,
},
]

export default function Messages() {
const { user } = useAuth()

const [selectedConversation, setSelectedConversation] = useState(
conversations[0]
)
const [message, setMessage] = useState('')
const [search, setSearch] = useState('')

const displayName = user?.fullName || user?.name || 'User'
const initial = displayName.charAt(0).toUpperCase()

const filteredConversations = conversations.filter((conversation) =>
conversation.name.toLowerCase().includes(search.toLowerCase())
)

const handleSend = (e) => {
e.preventDefault()

```
if (!message.trim()) return

setMessage('')

window.alert(
  'Sending messages is currently a frontend demo feature.'
)
```

}

return ( <div className="app-layout"> <Sidebar />

```
  <main className="main-content">
    <header className="static-navbar">
      <div>
        <div className="static-navbar-label">TASKFLOW WORKSPACE</div>
        <h1>Messages</h1>
      </div>

      <div className="static-navbar-user">
        <div className="navbar-avatar">{initial}</div>

        <div>
          <strong>{displayName}</strong>
          <span>Workspace member</span>
        </div>
      </div>
    </header>

    <div className="static-page messages-page">
      <section className="static-page-hero messages-hero">
        <div>
          <span className="section-label">COMMUNICATION</span>

          <h2>Stay connected with your team</h2>

          <p>
            Keep conversations, updates and team communication in
            one simple workspace.
          </p>
        </div>

        <span className="demo-badge">Frontend Preview</span>
      </section>

      <section className="messages-workspace">
        {/* Conversation List */}
        <aside className="conversation-sidebar">
          <div className="conversation-header">
            <div>
              <span className="section-label">INBOX</span>
              <h3>Conversations</h3>
            </div>

            <span className="conversation-count">
              {conversations.length}
            </span>
          </div>

          <div className="conversation-search">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people..."
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
                  key={conversation.id}
                  type="button"
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
                      className={`conversation-status-dot ${conversation.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    ></span>
                  </div>

                  <div className="conversation-content">
                    <div className="conversation-name-row">
                      <strong>{conversation.name}</strong>
                      <small>{conversation.time}</small>
                    </div>

                    <p>{conversation.lastMessage}</p>
                  </div>

                  {conversation.unread > 0 && (
                    <span className="unread-badge">
                      {conversation.unread}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Chat Area */}
        <div className="chat-panel">
          <div className="chat-header">
            <div className="chat-user">
              <div className="chat-avatar">
                {selectedConversation.initials}

                <span
                  className={`chat-status-dot ${selectedConversation.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                ></span>
              </div>

              <div>
                <strong>{selectedConversation.name}</strong>
                <span>
                  {selectedConversation.status} ·{' '}
                  {selectedConversation.role}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="chat-more-button"
              title="More options"
              aria-label="More options"
              onClick={() =>
                window.alert(
                  'Conversation options are available in the frontend preview.'
                )
              }
            >
              ⋮
            </button>
          </div>

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
                  <div className="message-avatar">
                    {selectedConversation.initials}
                  </div>
                )}

                <div className="message-content">
                  <div className="message-bubble">
                    {item.text}
                  </div>

                  <span className="message-time">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form className="message-composer" onSubmit={handleSend}>
            <button
              type="button"
              className="composer-button"
              title="Attach file"
              aria-label="Attach file"
              onClick={() =>
                window.alert(
                  'File attachments are not connected in this frontend preview.'
                )
              }
            >
              +
            </button>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
            />

            <button
              type="submit"
              className="send-message-button"
              aria-label="Send message"
            >
              →
            </button>
          </form>
        </div>
      </section>
    </div>
  </main>
</div>
```

)
}

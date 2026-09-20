```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

function RootRedirect() {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  return (
    <Navigate
      to={user ? '/dashboard' : '/login'}
      replace
    />
  )
}

function ProtectedPage({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* Public routes */}
        <Route
          path="/"
          element={<RootRedirect />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Main task workspace */}
        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />

        {/* Frontend-only sections */}
        <Route
          path="/projects"
          element={
            <ProtectedPage>
              <Projects />
            </ProtectedPage>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedPage>
              <Team />
            </ProtectedPage>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedPage>
              <Messages />
            </ProtectedPage>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedPage>
              <Settings />
            </ProtectedPage>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedPage>
              <Notifications />
            </ProtectedPage>
          }
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </AuthProvider>
  )
}
```

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
const { login } = useAuth()
const navigate = useNavigate()

const [form, setForm] = useState({
email: '',
password: '',
})

const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

const handleChange = (e) => {
setForm((current) => ({
...current,
[e.target.name]: e.target.value,
}))

```
if (error) {
  setError('')
}
```

}

const handleSubmit = async (e) => {
e.preventDefault()
setError('')
setLoading(true)

```
try {
  await login(form.email, form.password)
  navigate('/dashboard')
} catch (err) {
  setError(
    err.response?.data?.error || 'Invalid email or password'
  )
} finally {
  setLoading(false)
}
```

}

return ( <div className="auth-page"> <div className="auth-background-glow auth-glow-one"></div> <div className="auth-background-glow auth-glow-two"></div>

```
  <div className="auth-card">
    <div className="auth-brand">
      <div className="auth-logo">T</div>

      <div>
        <strong>TaskFlow</strong>
        <span>Task Manager</span>
      </div>
    </div>

    <div className="auth-heading">
      <span className="auth-eyebrow">WELCOME BACK</span>
      <h1>Welcome back</h1>
      <p className="subtitle">
        Log in to manage your tasks and stay productive.
      </p>
    </div>

    {error && (
      <div className="error-banner auth-error">
        <span>!</span>
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="login-email">Email address</label>

        <div className="auth-input-wrapper">
          <span className="auth-input-icon">@</span>

          <input
            id="login-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Password</label>

        <div className="auth-input-wrapper">
          <span className="auth-input-icon">●</span>

          <input
            id="login-password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary auth-submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="button-spinner"></span>
            Logging in...
          </>
        ) : (
          <>
            Log in
            <span>→</span>
          </>
        )}
      </button>
    </form>

    <div className="auth-divider">
      <span></span>
      <small>TaskFlow Workspace</small>
      <span></span>
    </div>

    <p className="auth-switch">
      Don't have an account?{' '}
      <Link to="/register">Create an account</Link>
    </p>
  </div>
</div>
```

)
}

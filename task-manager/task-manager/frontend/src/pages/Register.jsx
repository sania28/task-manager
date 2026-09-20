import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
const { register } = useAuth()
const navigate = useNavigate()

const [form, setForm] = useState({
fullName: '',
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

if (error) {
  setError('')
}

}

const handleSubmit = async (e) => {
e.preventDefault()
setError('')
setLoading(true)

try {
  await register(form.fullName, form.email, form.password)
  navigate('/dashboard')
} catch (err) {
  setError(
    err.response?.data?.error || 'Could not create account'
  )
} finally {
  setLoading(false)
}

}

return ( <div className="auth-page"> <div className="auth-background-glow auth-glow-one"></div> <div className="auth-background-glow auth-glow-two"></div>


  <div className="auth-card register-card">
    <div className="auth-brand">
      <div className="auth-logo">T</div>

      <div>
        <strong>TaskFlow</strong>
        <span>Task Manager</span>
      </div>
    </div>

    <div className="auth-heading">
      <span className="auth-eyebrow">GET STARTED</span>
      <h1>Create your account</h1>
      <p className="subtitle">
        Start organizing your work and stay on top of your tasks.
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
        <label htmlFor="register-name">Full name</label>

        <div className="auth-input-wrapper">
          <span className="auth-input-icon">◉</span>

          <input
            id="register-name"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="register-email">Email address</label>

        <div className="auth-input-wrapper">
          <span className="auth-input-icon">@</span>

          <input
            id="register-email"
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
        <label htmlFor="register-password">Password</label>

        <div className="auth-input-wrapper">
          <span className="auth-input-icon">●</span>

          <input
            id="register-password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <small className="input-hint">
          Use at least 6 characters for your password.
        </small>
      </div>

      <button
        type="submit"
        className="btn btn-primary auth-submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="button-spinner"></span>
            Creating account...
          </>
        ) : (
          <>
            Create account
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
      Already have an account?{' '}
      <Link to="/login">Log in</Link>
    </p>
  </div>
</div>

)
}

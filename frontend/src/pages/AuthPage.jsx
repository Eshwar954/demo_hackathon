import { enumLabels } from '../services/api'

function AuthPage({ mode, onModeChange, form, setForm, onLogin, onSignup, error, loading }) {
  const isLogin = mode === 'login'
  const selectableRoles = enumLabels.roles.filter((role) => role !== 'ADMIN')

  return (
    <div className="auth-layout">
      <section className="auth-panel">
        <p className="page-eyebrow">Authentication</p>
        <h2>{isLogin ? 'Login' : 'Create account'}</h2>

        <div className="tab-row">
          <button type="button" className={isLogin ? 'tab active' : 'tab'} onClick={() => onModeChange('login')}>
            Login
          </button>
          <button type="button" className={!isLogin ? 'tab active' : 'tab'} onClick={() => onModeChange('signup')}>
            Signup
          </button>
        </div>

        {isLogin ? (
          <div className="form-grid two-column">
            <label>
              <span>Email</span>
              <input name="email" value={form.email} onChange={setForm} placeholder="name@company.com" />
            </label>
            <label>
              <span>Password</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={setForm}
                placeholder="Enter password"
              />
            </label>
          </div>
        ) : (
          <div className="form-grid two-column">
            <label>
              <span>Name</span>
              <input name="name" value={form.name} onChange={setForm} placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" value={form.email} onChange={setForm} placeholder="name@company.com" />
            </label>
            <label>
              <span>Password</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={setForm}
                placeholder="Enter password"
              />
            </label>
            <label>
              <span>Organization</span>
              <input
                name="organizationName"
                value={form.organizationName}
                onChange={setForm}
                placeholder="Organization"
              />
            </label>
            <label>
              <span>Role</span>
              <select name="role" value={form.role} onChange={setForm}>
                {selectableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {error ? <p className="error-box">{error}</p> : null}

        <div className="form-actions">
          {isLogin ? (
            <button type="button" className="primary-button" onClick={onLogin} disabled={loading}>
              Login
            </button>
          ) : (
            <button type="button" className="primary-button" onClick={onSignup} disabled={loading}>
              Create account
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default AuthPage
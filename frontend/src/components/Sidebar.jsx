function Sidebar({ currentPage, role, onNavigate, onSignOut }) {
  const sections = ['Dashboard', 'Projects', 'Credits', 'Listings', 'Transactions', 'Ledger']

  return (
    <div className="nav-panel">
      <div className="brand-block">
        <div className="brand-mark">CC</div>
        <div>
          <h1>Carbon Credit</h1>
          <p>Tracking and trading</p>
        </div>
      </div>

      <div className="role-chip">{role.replace('_', ' ')}</div>

      <nav className="nav-list" aria-label="Primary">
        {sections.map((item) => (
          <button
            key={item}
            type="button"
            className={item === currentPage ? 'nav-item active' : 'nav-item'}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <button type="button" className="secondary-button signout-button" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  )
}

export default Sidebar
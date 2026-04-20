function Topbar({ title, subtitle, actions }) {
  return (
    <div className="topbar-row">
      <div>
        <p className="page-eyebrow">Carbon Credit Trading System</p>
        <h2>{title}</h2>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      <div className="topbar-actions">{actions}</div>
    </div>
  )
}

export default Topbar
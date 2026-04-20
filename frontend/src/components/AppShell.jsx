import './AppShell.css'

function AppShell({ sidebar, header, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">{sidebar}</aside>
      <div className="workspace">
        <header className="workspace-header">{header}</header>
        <main className="workspace-content">{children}</main>
      </div>
    </div>
  )
}

export default AppShell
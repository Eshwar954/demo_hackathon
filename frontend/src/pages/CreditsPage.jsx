import SimpleTable from '../components/SimpleTable'

function CreditsPage({ credits }) {
  const rows = credits.map((credit) => ({
    id: credit.id,
    cells: [credit.id, credit.projectId, credit.totalCredits, credit.availableCredits, credit.issueDate, credit.status],
  }))

  return (
    <div className="section-stack">
      <section className="content-card">
        <div className="section-header">
          <h3>Credit status</h3>
          <p>Track issued credits and their availability by project.</p>
        </div>
        <SimpleTable
          columns={['ID', 'Project', 'Total', 'Available', 'Issue date', 'Status']}
          rows={rows}
          emptyMessage="No credit records yet."
        />
      </section>
    </div>
  )
}

export default CreditsPage
import SimpleTable from '../components/SimpleTable'

function LedgerPage({ ledger }) {
  const rows = ledger.map((entry) => ({
    id: entry.id,
    cells: [entry.id, entry.creditId, entry.type, entry.quantity, entry.balance, entry.transactionDate],
  }))

  return (
    <div className="section-stack">
      <section className="content-card">
        <div className="section-header">
          <h3>Ledger history</h3>
          <p>View the transfer and balance trail for each credit.</p>
        </div>

        <SimpleTable
          columns={['ID', 'Credit', 'Type', 'Quantity', 'Balance', 'Date']}
          rows={rows}
          emptyMessage="No ledger entries available."
        />
      </section>
    </div>
  )
}

export default LedgerPage
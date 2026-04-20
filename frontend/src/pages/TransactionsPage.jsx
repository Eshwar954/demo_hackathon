import SimpleTable from '../components/SimpleTable'

function TransactionsPage({ role, form, onChange, onSubmit, transactions, users, loading }) {
  const userMap = new Map(users.map((user) => [String(user.id), user]))

  function formatUser(userId) {
    if (!userId && userId !== 0) {
      return '-'
    }

    const user = userMap.get(String(userId))
    if (!user) {
      return `ID: ${userId}`
    }

    return `${user.name} (${user.email})`
  }

  const rows = transactions.map((transaction) => ({
    id: transaction.id,
    cells: [
      transaction.id,
      transaction.listingId ?? '-',
      formatUser(transaction.buyerId),
      formatUser(transaction.projectOwnerId),
      transaction.quantity,
      transaction.totalPrice,
      transaction.status,
    ],
  }))

  return (
    <div className="section-stack">
      {role === 'BUYER' ? (
        <section className="content-card">
          <div className="section-header">
            <h3>Purchase credits</h3>
            <p>Buy credits by selecting a listing, quantity, and buyer ID.</p>
          </div>

          <div className="form-grid three-column">
            <label>
              <span>Listing ID</span>
              <input name="listingId" type="number" value={form.listingId} onChange={onChange} />
            </label>
            <label>
              <span>Quantity</span>
              <input name="quantity" type="number" value={form.quantity} onChange={onChange} />
            </label>
            <label>
              <span>Buyer ID</span>
              <input name="buyerId" type="number" value={form.buyerId} onChange={onChange} />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="primary-button" onClick={onSubmit} disabled={loading}>
              Purchase credits
            </button>
          </div>
        </section>
      ) : (
        <section className="content-card read-only-card">
          <p className="read-only-label">Read only</p>
          <h3>Transactions</h3>
          <p>Only buyers can purchase credits. This section shows the system transaction history.</p>
        </section>
      )}

      <SimpleTable
        columns={['ID', 'Listing', 'Buyer', 'Project owner', 'Quantity', 'Total price', 'Status']}
        rows={rows}
        emptyMessage="No transactions recorded."
      />
    </div>
  )
}

export default TransactionsPage
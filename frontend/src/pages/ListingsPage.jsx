import SimpleTable from '../components/SimpleTable'

function ListingsPage({ role, sessionUser, form, onChange, onSubmit, listings, credits, projects, loading }) {
  const canCreate = role === 'PROJECT_OWNER'

  const visibleListings =
    role === 'PROJECT_OWNER' && sessionUser?.id
      ? listings.filter((listing) => {
          const credit = credits.find((item) => String(item.id) === String(listing.creditId))
          const project = credit ? projects.find((item) => String(item.id) === String(credit.projectId)) : null
          return String(project?.ownerId) === String(sessionUser.id)
        })
      : listings

  const rows = visibleListings.map((listing) => ({
    id: listing.id,
    cells: [listing.id, listing.creditId, listing.quantity, listing.price, listing.listingDate, listing.status],
  }))

  return (
    <div className="section-stack">
      {canCreate ? (
        <section className="content-card">
          <div className="section-header">
            <h3>Create listing</h3>
            <p>Publish credits for sale using the backend listing endpoint.</p>
          </div>

          <div className="form-grid three-column">
            <label>
              <span>Credit ID</span>
              <input name="creditId" type="number" value={form.creditId} onChange={onChange} />
            </label>
            <label>
              <span>Quantity</span>
              <input name="quantity" type="number" value={form.quantity} onChange={onChange} />
            </label>
            <label>
              <span>Price</span>
              <input name="price" type="number" value={form.price} onChange={onChange} />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="primary-button" onClick={onSubmit} disabled={loading}>
              Create listing
            </button>
          </div>
        </section>
      ) : (
        <section className="content-card read-only-card">
          <p className="read-only-label">Read only</p>
          <h3>Marketplace listings</h3>
          <p>Only project owners can create listings. Buyers and admins can review the listing records here.</p>
        </section>
      )}

      <SimpleTable
        columns={['ID', 'Credit', 'Quantity', 'Price', 'Date', 'Status']}
        rows={rows}
        emptyMessage="No listings found."
      />
    </div>
  )
}

export default ListingsPage
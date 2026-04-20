import { useMemo, useState } from 'react'
import SimpleTable from '../components/SimpleTable'
import StatCard from '../components/StatCard'

function DashboardPage({
  role,
  sessionUser,
  users,
  projects,
  credits,
  listings,
  transactions,
  ledger,
  adminUserForm,
  onAdminUserFormChange,
  onCreateAdminUser,
  canCreateUsers,
  onNavigate,
  onVerifyProject,
  onPreparePurchase,
}) {
  const [priceLimit, setPriceLimit] = useState('')
  const [quantityLimit, setQuantityLimit] = useState('')

  const ownedProjects = useMemo(() => {
    if (role !== 'PROJECT_OWNER' || !sessionUser?.id) {
      return []
    }

    return projects.filter((project) => String(project.ownerId) === String(sessionUser.id))
  }, [projects, role, sessionUser])

  const ownedProjectIds = useMemo(
    () => new Set(ownedProjects.map((project) => String(project.id))),
    [ownedProjects],
  )

  const ownedCredits = useMemo(() => {
    if (role !== 'PROJECT_OWNER') {
      return []
    }

    return credits.filter((credit) => ownedProjectIds.has(String(credit.projectId)))
  }, [credits, ownedProjectIds, role])

  const ownedCreditIds = useMemo(
    () => new Set(ownedCredits.map((credit) => String(credit.id))),
    [ownedCredits],
  )

  const ownedListings = useMemo(() => {
    if (role !== 'PROJECT_OWNER') {
      return []
    }

    return listings.filter((listing) => ownedCreditIds.has(String(listing.creditId)))
  }, [listings, ownedCreditIds, role])

  const activeListings = useMemo(
    () => listings.filter((listing) => listing.status === 'ACTIVE'),
    [listings],
  )

  const filteredBuyerListings = useMemo(() => {
    return activeListings.filter((listing) => {
      const priceMatches = !priceLimit || Number(listing.price) <= Number(priceLimit)
      const quantityMatches = !quantityLimit || Number(listing.quantity) >= Number(quantityLimit)
      return priceMatches && quantityMatches
    })
  }, [activeListings, priceLimit, quantityLimit])

  const pendingProjects = projects.filter(
    (project) => project.status === 'UNDER_VERIFICATION' || project.status === 'CREATED',
  )

  const stats =
    role === 'ADMIN'
      ? [
          { label: 'Pending verifications', value: pendingProjects.length, helper: 'Approve or reject projects' },
          { label: 'Registered users', value: users.length, helper: 'System user registry' },
          { label: 'Open listings', value: activeListings.length, helper: 'Live marketplace inventory' },
        ]
      : role === 'PROJECT_OWNER'
        ? [
            { label: 'Total projects', value: ownedProjects.length, helper: 'Projects created by you' },
            {
              label: 'Generated credits',
              value: ownedCredits.reduce((sum, credit) => sum + (credit.totalCredits || 0), 0),
              helper: 'From verified projects',
            },
            {
              label: 'Available credits',
              value: ownedCredits.reduce((sum, credit) => sum + (credit.availableCredits || 0), 0),
              helper: 'Ready for listing or sale',
            },
            { label: 'Listings created', value: ownedListings.length, helper: 'Credits offered for sale' },
          ]
        : [
            { label: 'Available listings', value: filteredBuyerListings.length, helper: 'Open to purchase' },
            { label: 'Transactions', value: transactions.length, helper: 'Purchase history' },
            { label: 'Ledger entries', value: ledger.length, helper: 'Balance movement' },
          ]

  const rows = {
    pendingProjects: pendingProjects.map((project) => ({
      id: project.id,
      cells: [
        project.projectName,
        project.projectType,
        project.estimatedReduction,
        project.status,
        <div className="action-inline">
          <button type="button" className="inline-button success" onClick={() => onVerifyProject(project, 'APPROVED')}>
            Approve
          </button>
          <button type="button" className="inline-button danger" onClick={() => onVerifyProject(project, 'REJECTED')}>
            Reject
          </button>
        </div>,
      ],
    })),
    buyerListings: filteredBuyerListings.map((listing) => ({
      id: listing.id,
      cells: [
        listing.id,
        listing.creditId,
        listing.quantity,
        listing.price,
        listing.status,
        <button type="button" className="inline-button" onClick={() => onPreparePurchase(listing)}>
          Purchase
        </button>,
      ],
    })),
  }

  return (
    <div className="section-stack">
      <section className="card-grid three-up">
        {stats.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>

      {role === 'ADMIN' ? (
        <>
          {canCreateUsers ? (
            <section className="content-card">
              <div className="section-header">
                <h3>Create user</h3>
                <p>Create Project Owner or Buyer accounts.</p>
              </div>
              <div className="form-grid two-column">
                <label>
                  <span>Name</span>
                  <input name="name" value={adminUserForm.name} onChange={onAdminUserFormChange} />
                </label>
                <label>
                  <span>Email</span>
                  <input name="email" value={adminUserForm.email} onChange={onAdminUserFormChange} />
                </label>
                <label>
                  <span>Password</span>
                  <input name="password" type="password" value={adminUserForm.password} onChange={onAdminUserFormChange} />
                </label>
                <label>
                  <span>Organization</span>
                  <input name="organizationName" value={adminUserForm.organizationName} onChange={onAdminUserFormChange} />
                </label>
                <label>
                  <span>Role</span>
                  <select name="role" value={adminUserForm.role} onChange={onAdminUserFormChange}>
                    <option value="PROJECT_OWNER">Project Owner</option>
                    <option value="BUYER">Buyer</option>
                  </select>
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="primary-button" onClick={onCreateAdminUser}>
                  Create user
                </button>
              </div>
            </section>
          ) : null}

          <section className="content-card">
            <div className="section-header">
              <h3>Pending project verifications</h3>
              <p>Approve or reject submitted projects.</p>
            </div>
            <SimpleTable
              columns={['Project', 'Type', 'Reduction', 'Status', 'Actions']}
              rows={rows.pendingProjects}
              emptyMessage="No projects are waiting for review."
            />
          </section>

        </>
      ) : null}

      {role === 'PROJECT_OWNER' ? (
        <>
          <section className="content-card action-banner">
            <div>
              <h3>Project owner tools</h3>
              <p>Create projects and publish listings from the dedicated pages.</p>
            </div>
            <button type="button" className="primary-button" onClick={() => onNavigate('Projects')}>
              Manage projects
            </button>
          </section>
        </>
      ) : null}

      {role === 'BUYER' ? (
        <>
          <section className="content-card">
            <div className="section-header">
              <h3>Available credit listings</h3>
              <p>Use filters to find the right quantity and price.</p>
            </div>
            <div className="form-grid three-column buyer-filters">
              <label>
                <span>Max price</span>
                <input type="number" value={priceLimit} onChange={(event) => setPriceLimit(event.target.value)} />
              </label>
              <label>
                <span>Minimum quantity</span>
                <input type="number" value={quantityLimit} onChange={(event) => setQuantityLimit(event.target.value)} />
              </label>
            </div>
            <SimpleTable
              columns={['ID', 'Credit', 'Quantity', 'Price', 'Status', 'Action']}
              rows={rows.buyerListings}
              emptyMessage="No active listings match the filters."
            />
          </section>
          <section className="content-card action-banner">
            <div>
              <h3>Track activity</h3>
              <p>See complete transaction and ledger history from the Transactions and Ledger pages.</p>
            </div>
            <button type="button" className="secondary-button" onClick={() => onNavigate('Transactions')}>
              Open transactions
            </button>
          </section>
        </>
      ) : null}
    </div>
  )
}

export default DashboardPage

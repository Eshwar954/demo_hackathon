import { useEffect, useRef, useState } from 'react'
import AppShell from './components/AppShell'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import AuthPage from './pages/AuthPage'
import CreditsPage from './pages/CreditsPage'
import DashboardPage from './pages/DashboardPage'
import LedgerPage from './pages/LedgerPage'
import ListingsPage from './pages/ListingsPage'
import ProjectsPage from './pages/ProjectsPage'
import TransactionsPage from './pages/TransactionsPage'
import { api } from './services/api'
import './App.css'

const DEMO_ACCOUNTS_STORAGE_KEY = 'carbon-credit-demo-accounts'

const initialAuthForm = {
  name: '',
  email: '',
  password: '',
  organizationName: '',
  role: 'PROJECT_OWNER',
}

const loginAuthForm = {
  name: '',
  email: '',
  password: '',
  organizationName: '',
  role: 'ADMIN',
}

const adminSession = {
  id: 0,
  name: 'Admin',
  email: 'admin@gmail.com',
  password: 'admin123',
  organizationName: 'System',
  role: 'ADMIN',
}

const initialProjectForm = {
  projectName: '',
  projectType: 'Reforestation',
  location: '',
  estimatedReduction: '',
  createdBy: '',
}

const initialListingForm = {
  creditId: '',
  quantity: '',
  price: '',
}

const initialTransactionForm = {
  listingId: '',
  quantity: '',
  buyerId: '',
}

const initialAdminUserForm = {
  name: '',
  email: '',
  password: '',
  organizationName: '',
  role: 'BUYER',
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function loadStoredAccounts() {
  if (typeof window === 'undefined') {
    return [adminSession]
  }

  try {
    const raw = window.localStorage.getItem(DEMO_ACCOUNTS_STORAGE_KEY)
    if (!raw) {
      return [adminSession]
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return [adminSession]
    }

    const withoutAdmin = parsed.filter((account) => normalizeEmail(account?.email) !== adminSession.email)
    return [adminSession, ...withoutAdmin]
  } catch {
    return [adminSession]
  }
}

function saveStoredAccounts(accounts) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(DEMO_ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts))
  } catch {
    // Ignore storage write errors and keep in-memory auth working.
  }
}

function App() {
  const successTimeoutRef = useRef(null)
  const [authenticated, setAuthenticated] = useState(false)
  const [mode, setMode] = useState('login')
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [currentRole, setCurrentRole] = useState('PROJECT_OWNER')
  const [sessionUser, setSessionUser] = useState(null)
  const [authForm, setAuthForm] = useState(loginAuthForm)
  const [accounts, setAccounts] = useState(loadStoredAccounts)
  const [adminUserForm, setAdminUserForm] = useState(initialAdminUserForm)
  const [projectForm, setProjectForm] = useState(initialProjectForm)
  const [listingForm, setListingForm] = useState(initialListingForm)
  const [transactionForm, setTransactionForm] = useState(initialTransactionForm)
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [credits, setCredits] = useState([])
  const [listings, setListings] = useState([])
  const [transactions, setTransactions] = useState([])
  const [ledger, setLedger] = useState([])
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
    }
  }, [])

  function showSuccess(message) {
    setError('')
    setSuccessMessage(message)

    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current)
    }

    successTimeoutRef.current = setTimeout(() => {
      setSuccessMessage('')
    }, 2500)
  }

  async function refreshData() {
    setLoading(true)
    setError('')
    try {
      const [usersData, projectsData, creditsData, listingsData, transactionsData, ledgerData] = await Promise.all([
        api.getUsers(),
        api.getProjects(),
        api.getCredits(),
        api.getListings(),
        api.getTransactions(),
        api.getLedger(),
      ])

      setUsers(usersData || [])
      setProjects(projectsData || [])
      setCredits(creditsData || [])
      setListings(listingsData || [])
      setTransactions(transactionsData || [])
      setLedger(ledgerData || [])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  function handleModeChange(nextMode) {
    setMode(nextMode)
    setError('')
    setSuccessMessage('')

    if (nextMode === 'login') {
      setAuthForm(loginAuthForm)
      return
    }

    setAuthForm(initialAuthForm)
  }

  function updateField(setter) {
    return (event) => {
      const { name, value } = event.target
      setter((previous) => ({ ...previous, [name]: value }))
    }
  }

  async function handleSignup() {
    setLoading(true)
    setError('')
    setSuccessMessage('')
    try {
      if (authForm.role === 'ADMIN') {
        throw new Error('Admin account is fixed. Use the admin credentials to sign in.')
      }

      const createdUser = await api.createUser(authForm)
      const localAccount = { ...createdUser, password: authForm.password }
      setAccounts((previous) => {
        const email = normalizeEmail(localAccount.email)
        const filtered = previous.filter((account) => normalizeEmail(account.email) !== email)
        const nextAccounts = [...filtered, localAccount]
        saveStoredAccounts(nextAccounts)
        return nextAccounts
      })
      setSessionUser(localAccount)
      setCurrentRole(localAccount.role)
      setAuthenticated(true)
      setCurrentPage('Dashboard')
      showSuccess('Account created successfully.')
      await refreshData()
    } catch (requestError) {
      setSuccessMessage('')
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogin() {
    const inputEmail = normalizeEmail(authForm.email)
    const inputPassword = String(authForm.password || '')

    if (!inputEmail || !inputPassword) {
      setSuccessMessage('')
      setError('Email and password are required.')
      return
    }

    const adminMatch = inputEmail === adminSession.email && inputPassword === adminSession.password

    let selectedUser = adminMatch
      ? adminSession
      : accounts.find(
          (account) =>
            normalizeEmail(account.email) === inputEmail &&
            String(account.password || '') === inputPassword &&
            account.password,
        )

    if (!selectedUser) {
      try {
        const backendUser = await api.loginUser({ email: inputEmail, password: inputPassword })
        selectedUser = { ...backendUser, password: inputPassword }

        setAccounts((previous) => {
          const filtered = previous.filter((account) => normalizeEmail(account.email) !== inputEmail)
          const nextAccounts = [...filtered, selectedUser]
          saveStoredAccounts(nextAccounts)
          return nextAccounts
        })
      } catch {
        setSuccessMessage('')
        setError('Invalid credentials.')
        return
      }
    }

    showSuccess('Login successful.')
    setSessionUser(selectedUser)
    setCurrentRole(selectedUser.role)
    setAuthenticated(true)
    setCurrentPage('Dashboard')
    await refreshData()
  }

  async function handleCreateProject() {
    setLoading(true)
    setError('')
    setSuccessMessage('')
    try {
      await api.createProject({
        ...projectForm,
        estimatedReduction: Number(projectForm.estimatedReduction),
        createdBy: Number(projectForm.createdBy || sessionUser?.id || 1),
      })
      setProjectForm(initialProjectForm)
      showSuccess('Project created successfully.')
      await refreshData()
      setCurrentPage('Dashboard')
    } catch (requestError) {
      setSuccessMessage('')
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateAdminUser() {
    setLoading(true)
    setError('')
    setSuccessMessage('')
    try {
      if (currentRole !== 'ADMIN') {
        throw new Error('Only admin can create users.')
      }

      const createdUser = await api.createUser(adminUserForm)
      const localAccount = { ...createdUser, password: adminUserForm.password }
      setAccounts((previous) => {
        const email = normalizeEmail(localAccount.email)
        const filtered = previous.filter((account) => normalizeEmail(account.email) !== email)
        const nextAccounts = [...filtered, localAccount]
        saveStoredAccounts(nextAccounts)
        return nextAccounts
      })
      setAdminUserForm(initialAdminUserForm)
      showSuccess('User created successfully.')
      await refreshData()
    } catch (requestError) {
      setSuccessMessage('')
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateListing() {
    setLoading(true)
    setError('')
    setSuccessMessage('')
    try {
      const creditId = Number(listingForm.creditId)
      const quantity = Number(listingForm.quantity)
      const price = Number(listingForm.price)

      if (!creditId || !quantity || !price) {
        throw new Error('Credit ID, quantity, and price are required.')
      }

      if (quantity <= 0 || price <= 0) {
        throw new Error('Quantity and price must be greater than 0.')
      }

      const selectedCredit = credits.find((credit) => String(credit.id) === String(creditId))
      if (!selectedCredit) {
        throw new Error('Selected credit was not found.')
      }

      const availableCredits = Number(selectedCredit.availableCredits || 0)
      if (quantity > availableCredits) {
        throw new Error(`Entered quantity exceeds available credits (${availableCredits}).`)
      }

      await api.createListing({
        ...listingForm,
        creditId,
        quantity,
        price,
      })
      setListingForm(initialListingForm)
      showSuccess('Listing created successfully.')
      await refreshData()
      setCurrentPage('Dashboard')
    } catch (requestError) {
      setSuccessMessage('')
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handlePurchase() {
    setLoading(true)
    setError('')
    setSuccessMessage('')
    try {
      const listingId = Number(transactionForm.listingId)
      const quantity = Number(transactionForm.quantity)

      if (!listingId || !quantity) {
        throw new Error('Listing ID and quantity are required.')
      }

      if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0.')
      }

      const selectedListing = listings.find((listing) => String(listing.id) === String(listingId))
      if (!selectedListing) {
        throw new Error('Selected listing was not found.')
      }

      if (selectedListing.status !== 'ACTIVE') {
        throw new Error('Selected listing is not active.')
      }

      const availableQuantity = Number(selectedListing.quantity || 0)
      if (quantity > availableQuantity) {
        throw new Error(`Entered quantity exceeds available listing quantity (${availableQuantity}).`)
      }

      await api.createTransaction({
        ...transactionForm,
        listingId,
        quantity,
        buyerId: Number(transactionForm.buyerId || sessionUser?.id || 1),
      })
      setTransactionForm(initialTransactionForm)
      showSuccess('Transaction completed successfully.')
      await refreshData()
    } catch (requestError) {
      setSuccessMessage('')
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyProject(project, status) {
    setLoading(true)
    setError('')
    setSuccessMessage('')
    try {
      await api.createVerification({
        projectId: project.id,
        verifiedReduction: project.estimatedReduction,
        verifiedBy: sessionUser?.id || 1,
        status,
      })
      showSuccess(
        status === 'APPROVED'
          ? 'Project approved successfully.'
          : 'Project rejected successfully.',
      )
      await refreshData()
    } catch (requestError) {
      setSuccessMessage('')
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  function handlePreparePurchase(listing) {
    setTransactionForm({
      listingId: String(listing.id),
      quantity: String(listing.quantity),
      buyerId: String(sessionUser?.id || ''),
    })
    setCurrentPage('Transactions')
  }

  const authPanel = (
    <AuthPage
      mode={mode}
      onModeChange={handleModeChange}
      form={authForm}
      setForm={updateField(setAuthForm)}
      onLogin={handleLogin}
      onSignup={handleSignup}
      error={error}
      loading={loading}
    />
  )

  if (!authenticated) {
    return authPanel
  }

  let pageTitle = 'Dashboard'
  let pageSubtitle = 'Role-based overview of projects, credits, listings, transactions, and ledger history.'
  let pageBody = null

  if (currentPage === 'Dashboard') {
    pageTitle = `${currentRole.replace('_', ' ')} Dashboard`
    pageSubtitle = 'Simple summary cards and role-specific workflows pulled from the backend.'
    pageBody = (
      <DashboardPage
        role={currentRole}
        sessionUser={sessionUser}
        users={users}
        projects={projects}
        credits={credits}
        listings={listings}
        transactions={transactions}
        ledger={ledger}
        adminUserForm={adminUserForm}
        onAdminUserFormChange={updateField(setAdminUserForm)}
        onCreateAdminUser={handleCreateAdminUser}
        canCreateUsers={currentRole === 'ADMIN'}
        onNavigate={setCurrentPage}
        onVerifyProject={handleVerifyProject}
        onPreparePurchase={handlePreparePurchase}
      />
    )
  }

  if (currentPage === 'Projects') {
    pageTitle = 'Project Management'
    pageSubtitle = 'Create new projects and review existing project status.'
    pageBody = (
      <ProjectsPage
        role={currentRole}
        sessionUser={sessionUser}
        form={projectForm}
        onChange={updateField(setProjectForm)}
        onSubmit={handleCreateProject}
        projects={projects}
        credits={credits}
        listings={listings}
        loading={loading}
      />
    )
  }

  if (currentPage === 'Credits') {
    pageTitle = 'Credit Status'
    pageSubtitle = 'Track issued credits and available balances.'
    pageBody = <CreditsPage role={currentRole} credits={credits} listings={listings} />
  }

  if (currentPage === 'Listings') {
    pageTitle = 'Credit Listings'
    pageSubtitle = 'Create and review active or closed listings.'
    pageBody = (
      <ListingsPage
        role={currentRole}
        sessionUser={sessionUser}
        form={listingForm}
        onChange={updateField(setListingForm)}
        onSubmit={handleCreateListing}
        listings={listings}
        credits={credits}
        projects={projects}
        loading={loading}
      />
    )
  }

  if (currentPage === 'Transactions') {
    pageTitle = 'Transactions'
    pageSubtitle = 'Purchase credits and review transaction history.'
    pageBody = (
      <TransactionsPage
        role={currentRole}
        form={transactionForm}
        onChange={updateField(setTransactionForm)}
        onSubmit={handlePurchase}
        transactions={transactions}
        users={users}
        loading={loading}
      />
    )
  }

  if (currentPage === 'Ledger') {
    pageTitle = 'Ledger / History'
    pageSubtitle = 'Inspect credit movement and balance tracking.'
    pageBody = <LedgerPage ledger={ledger} />
  }

  const sidebar = (
    <Sidebar
      currentPage={currentPage}
      role={currentRole}
      onNavigate={setCurrentPage}
      onSignOut={() => {
        setAuthenticated(false)
        setSessionUser(null)
        setCurrentPage('Dashboard')
        setAuthForm(loginAuthForm)
        setProjectForm(initialProjectForm)
        setListingForm(initialListingForm)
        setTransactionForm(initialTransactionForm)
        setAdminUserForm(initialAdminUserForm)
        setError('')
        setSuccessMessage('')
      }}
    />
  )

  const header = (
    <Topbar
      title={pageTitle}
      subtitle={pageSubtitle}
      actions={
        <div className="header-actions">
          <button type="button" className="secondary-button" onClick={refreshData} disabled={loading}>
            Refresh data
          </button>
        </div>
      }
    />
  )

  return (
    <>
      {successMessage ? <div className="success-toast">{successMessage}</div> : null}
      <AppShell sidebar={sidebar} header={header}>
        {error ? <p className="error-box">{error}</p> : null}
        {pageBody}
      </AppShell>
    </>
  )
}

export default App

import { useState } from 'react';
import { Card } from '../components/Widgets';
import Table from '../components/Table';
import { useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  /* ------------------- STATE & MOCK DATA ------------------- */

  // 1. User Management State
  const [showUserModal, setShowUserModal] = useState(false);
  const [filterRole, setFilterRole] = useState('All');
  const userHeaders = ["Name", "Email", "Organization", "Role"];
  const [networkUsers, setNetworkUsers] = useState([
    { name: "EcoCorp Admin", email: "admin@ecocorp.com", org: "EcoCorp", role: "Owner" },
    { name: "Global Trade Inc", email: "trader@globaltrade.com", org: "GlobalTrade", role: "Buyer" },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', org: '', password: '', role: 'Buyer' });

  // 2. Project Verification State
  const projectHeaders = ["Project Name", "Type", "Reduction", "Status", "Action"];
  const [projects, setProjects] = useState([
    { id: "PRJ-01", name: "Amazonia Reforestation", type: "Forestry", reduction: "10,500 Tons", status: "VERIFIED" },
    { id: "PRJ-02", name: "Indonesian Solar", type: "Renewable Energy", reduction: "5,000 Tons", status: "UNDER_VERIFICATION" },
    { id: "PRJ-03", name: "Congo Wind Farm", type: "Renewable Energy", reduction: "12,200 Tons", status: "CREATED" }
  ]);

  // 3. Credit Issuance Tracking State
  const issuanceHeaders = ["Project", "Total Credits", "Available", "Status"];
  const issuances = [
    { project: "Amazonia Reforestation", total: "10,500", available: "5,000", status: "ISSUED" },
    { project: "Congo Wind Farm", total: "12,200", available: "12,200", status: "PENDING_MINT" }
  ];

  // 4. Transaction Monitoring State
  const [txFilterStatus, setTxFilterStatus] = useState('All');
  const [txFilterDate, setTxFilterDate] = useState('');
  const transactionHeaders = ["Buyer", "Project", "Quantity", "Price", "Status", "Date"];
  const transactions = [
    { buyer: "GlobalTrade", project: "Amazonia Ref...", quantity: "1,000", price: "$12.50", status: "SUCCESS", date: "2024-10-12" },
    { buyer: "TechLogistics", project: "Congo Wind Farm", quantity: "2,500", price: "$14.00", status: "FAILED", date: "2024-10-10" },
    { buyer: "GreenCorp", project: "Amazonia Ref...", quantity: "500", price: "$12.00", status: "SUCCESS", date: "2024-10-15" }
  ];

  // 5. Ledger / Audit State
  const ledgerHeaders = ["Credit ID", "Type", "Quantity", "Balance", "Date"];
  const ledgers = [
    { creditId: "CRD-9001", type: "MINT", quantity: "+10,500", balance: "10,500", date: "2024-10-01" },
    { creditId: "CRD-9002", type: "TRANSFER", quantity: "-1,000", balance: "9,500", date: "2024-10-12" },
    { creditId: "CRD-9003", type: "TRANSFER", quantity: "-500", balance: "9,000", date: "2024-10-15" },
    { creditId: "CRD-9004", type: "MINT", quantity: "+12,200", balance: "21,200", date: "2024-10-19" },
  ];

  /* ------------------- HANDLERS ------------------- */

  const handleCreateUser = (e) => {
    e.preventDefault();
    if(newUser.name && newUser.email && newUser.org && newUser.password){
      setNetworkUsers([{ name: newUser.name, email: newUser.email, org: newUser.org, role: newUser.role }, ...networkUsers]);
      setShowUserModal(false);
      setNewUser({ name: '', email: '', org: '', password: '', role: 'Buyer' });
    }
  };

  const updateProjectStatus = (id, newStatus) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };


  /* ------------------- COMPUTED DATA ------------------- */

  // Filtered Users
  const filteredUsers = filterRole === 'All' ? networkUsers : networkUsers.filter(u => u.role === filterRole);

  // Filtered Transactions
  const filteredTransactions = transactions.filter(t => {
    const matchStatus = txFilterStatus === 'All' || t.status === txFilterStatus;
    const matchDate = t.date.includes(txFilterDate); // Soft search match
    return matchStatus && matchDate;
  });

  // Mapped Projects with Action Buttons
  const displayProjects = projects.map(p => ({
    name: p.name,
    type: p.type,
    reduction: p.reduction,
    status: p.status,
    action: p.status === 'UNDER_VERIFICATION' ? (
      <div className="flex gap-2">
        <button onClick={() => updateProjectStatus(p.id, 'VERIFIED')} className="text-success hover:bg-success/10 font-bold text-[10px] uppercase tracking-widest border border-success/30 px-2 py-1 rounded">Approve</button>
        <button onClick={() => updateProjectStatus(p.id, 'REJECTED')} className="text-error hover:bg-error/10 font-bold text-[10px] uppercase tracking-widest border border-error/30 px-2 py-1 rounded">Reject</button>
      </div>
    ) : p.status === 'CREATED' ? (
      <button onClick={() => updateProjectStatus(p.id, 'UNDER_VERIFICATION')} className="text-primary hover:bg-primary/10 font-bold text-[10px] uppercase tracking-widest border border-primary/30 px-2 py-1 rounded">Start Audit</button>
    ) : (
      <span className="text-outline text-[10px] font-bold uppercase tracking-widest">Locked</span>
    )
  }));


  /* ------------------- ROUTING VIEWS ------------------- */

  if (path.includes('/users')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">User Management</h1>
            <p className="text-on-surface-variant font-body">Create roles, view entities, and filter global participants.</p>
          </div>
          <button onClick={() => setShowUserModal(true)} className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label font-bold text-xs tracking-widest uppercase hover:bg-primary/90 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">person_add</span> Create User
          </button>
        </div>

        <div className="flex gap-2 mb-2">
           {['All', 'Owner', 'Buyer'].map(r => (
             <button key={r} onClick={() => setFilterRole(r)} className={`px-4 py-1.5 rounded-full font-label text-[10px] font-bold uppercase tracking-widest transition-colors ${filterRole === r ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-lowest border border-outline-variant text-on-surface-variant'}`}>{r}</button>
           ))}
        </div>
        <Table headers={userHeaders} data={filteredUsers} />

        {showUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/20 backdrop-blur-[2px] px-4">
            <div className="bg-surface-container-lowest p-8 rounded-xl max-w-sm w-full shadow-2xl border border-outline-variant">
              <h3 className="font-headline text-2xl font-bold mb-6">Create Global User</h3>
              <form className="space-y-4" onSubmit={handleCreateUser}>
                <div><label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Name</label><input required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none text-sm" placeholder="John Doe" /></div>
                <div><label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Email</label><input required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none text-sm" placeholder="john@org.com" /></div>
                <div><label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Organization</label><input required value={newUser.org} onChange={e => setNewUser({...newUser, org: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none text-sm" placeholder="GreenTech Ltd" /></div>
                <div><label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Password</label><input required type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none text-sm" placeholder="••••••••" /></div>
                <div><label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Role</label>
                  <select value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2 outline-none text-sm cursor-pointer"><option>Buyer</option><option>Owner</option></select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowUserModal(false)} className="flex-1 py-3 rounded-lg border border-outline-variant text-xs font-bold uppercase hover:bg-surface-variant">Cancel</button>
                  <button type="submit" className="flex-1 bg-primary text-on-primary py-3 rounded-lg text-xs font-bold uppercase hover:bg-primary/90">Create User</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (path.includes('/projects')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">Project Verification</h1><p className="text-on-surface-variant">Review submitted ecological assets and approve or reject minting authorization.</p></div>
        <Table headers={projectHeaders} data={displayProjects} />
      </div>
    );
  }

  if (path.includes('/issuance')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">Credit Issuance</h1><p className="text-on-surface-variant">Monitor live credits generated post-verification.</p></div>
        <Table headers={issuanceHeaders} data={issuances} />
      </div>
    );
  }

  if (path.includes('/transactions')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end">
          <div><h1 className="font-headline text-3xl font-extrabold mb-2">Transaction Monitoring</h1><p className="text-on-surface-variant">View global secondary market transfers.</p></div>
          <div className="flex gap-3">
             <input type="date" value={txFilterDate} onChange={(e) => setTxFilterDate(e.target.value)} className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none" />
             <select value={txFilterStatus} onChange={(e) => setTxFilterStatus(e.target.value)} className="bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm outline-none cursor-pointer">
               <option value="All">All Statuses</option>
               <option value="SUCCESS">Success</option>
               <option value="FAILED">Failed</option>
             </select>
          </div>
        </div>
        <Table headers={transactionHeaders} data={filteredTransactions} />
      </div>
    );
  }

  if (path.includes('/ledger')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2 text-primary flex items-center gap-2"><span className="material-symbols-outlined">menu_book</span> Audit Ledger</h1><p className="text-on-surface-variant">Immutable chronological history of all credit movements.</p></div>
        <div className="border-t-[4px] border-primary rounded-xl overflow-hidden shadow-xl shadow-primary/5">
           <Table headers={ledgerHeaders} data={ledgers} />
        </div>
      </div>
    );
  }

  // DEFAULT FRONT DASHBOARD SUMMARY
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="font-headline text-3xl font-extrabold mb-2">Dashboard Summary</h1><p className="text-on-surface-variant">Global overview of network activity.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Projects" value="124" icon="park" trend="+3" isPositive={true}/>
        <Card title="Credits Issued" value="1.2M" icon="generating_tokens" trend="+50k" isPositive={true}/>
        <Card title="Credits Sold" value="890k" icon="shopping_cart" />
        <Card title="Total Transactions" value="15,482" icon="sync_alt" trend="+12%" isPositive={true}/>
      </div>
      <div>
         <h2 className="font-headline text-xl font-bold flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-primary">rule</span> Projects Under Review</h2>
         <Table headers={projectHeaders} data={displayProjects.filter(p => !['VERIFIED', 'REJECTED'].includes(p.status))} />
      </div>
    </div>
  );
};
export default AdminDashboard;

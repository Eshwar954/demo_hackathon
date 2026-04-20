import { useState, useEffect } from 'react';
import { Card } from '../components/Widgets';
import Table from '../components/Table';
import { useLocation } from 'react-router-dom';
import { projectAPI, listingAPI, creditAPI, transactionAPI } from '../services/api';

const OwnerDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  /* ------------------- STATE ------------------- */

  const [notification, setNotification] = useState(null);
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // 1. Projects State
  const projectHeaders = ["Project Name", "Type", "Reduction", "Status"];
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', type: 'Forestry', location: '', reduction: '', startDate: '', endDate: '' });

  // 2. Issuance / Credits State
  const creditHeaders = ["Project", "Total Credits", "Available Credits", "Status"];
  const [credits, setCredits] = useState([]);

  // 3. Listings State
  const listingHeaders = ["Project", "Price", "Quantity", "Status"];
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({ project: '', price: '', quantity: '' });

  // 4. Sales State
  const salesHeaders = ["Buyer", "Quantity", "Price", "Status"];
  const [sales, setSales] = useState([]);


  /* ------------------- DATA FETCHING (AXIOS) ------------------- */
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (path.includes('/projects')) {
          const res = await projectAPI.getAll();
          setProjects(res.data || []);
        } else if (path.includes('/credits')) {
          const res = await creditAPI.getAll();
          setCredits(res.data || []);
        } else if (path.includes('/listings')) {
          const cRes = await creditAPI.getAll();
          setCredits(cRes.data || []);
          const lRes = await listingAPI.getAll();
          setListings(lRes.data || []);
        } else if (path.includes('/sales')) {
          const res = await transactionAPI.getAll();
          setSales(res.data || []);
        } else if (!path.includes('/create-project')) {
          // Dashboard Summary
          const pRes = await projectAPI.getAll();
          setProjects(pRes.data || []);
          const lRes = await listingAPI.getAll();
          setListings(lRes.data || []);
        }
      } catch (err) {
        console.error("Backend API Connection Failed.", err);
      }
    };
    fetchData();
  }, [path]);

  /* ------------------- HANDLERS (AXIOS) ------------------- */

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (newProject.name && newProject.reduction) {
      try {
        await projectAPI.create(newProject);
        setNewProject({ name: '', type: 'Forestry', location: '', reduction: '', startDate: '', endDate: '' });
        showNotification("Project Successfully Created & Pending Audit.");
      } catch (err) {
        alert("Failed to reach server. Backend unavailable.");
      }
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (newListing.price && newListing.quantity) {
      try {
        await listingAPI.create(newListing);
        const lRes = await listingAPI.getAll();
        setListings(lRes.data || []);
        setNewListing({ project: '', price: '', quantity: '' });
        showNotification("Credits listed securely onto the active order book.");
      } catch (err) {
        alert("Failed to reach server. Backend unavailable.");
      }
    }
  };

  /* ------------------- COMPUTED FORMATTERS ------------------- */
  const displayProjects = projects.map(p => ({
     name: p.name || p.carbonProject,
     type: p.type || 'Standard',
     reduction: p.reduction || p.verifiedReduction,
     status: p.status || p.verificationStatus
  }));

  const displayCredits = credits.map(c => ({
     project: c.project || 'Unknown',
     total: c.totalCredits || '-',
     available: c.availableCredits || '-',
     status: c.status || 'PENDING_MINT'
  }));

  const displayListings = listings.map(l => ({
     project: l.project || 'Unknown',
     price: l.price || '$0.00',
     quantity: l.quantity || '0',
     status: l.status || 'ACTIVE'
  }));

  // Map backend DTO array (assuming specific names exist based on controller)
  const availableProjects = credits.filter(c => (c.status || c.creditStatus) === 'ISSUED').map(c => c.project || 'Unknown');

  /* ------------------- ROUTING VIEWS ------------------- */

  if (path.includes('/create-project')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">Create Carbon Project</h1><p className="text-on-surface-variant">Register a new ecological asset for verification and minting.</p></div>
        
        <form onSubmit={handleCreateProject} className="bg-surface-container-lowest p-8 border border-outline-variant rounded-xl shadow-xl space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Project Name</label>
              <input required value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. Amazonia Preservation" />
            </div>
            <div>
              <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Project Type</label>
              <select value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none text-sm cursor-pointer">
                <option>Forestry</option><option>Renewable Energy</option><option>Methane Capture</option>
              </select>
            </div>
            <div>
              <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Location</label>
              <input required value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none text-sm" placeholder="e.g. Brazil" />
            </div>
            <div className="col-span-2">
              <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Estimated Reduction (Tons/Year)</label>
              <input required type="number" value={newProject.reduction} onChange={e => setNewProject({...newProject, reduction: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none text-sm" placeholder="1000" />
            </div>
            <div>
              <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Start Date</label>
              <input required type="date" value={newProject.startDate} onChange={e => setNewProject({...newProject, startDate: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none text-sm" />
            </div>
            <div>
              <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">End Date</label>
              <input required type="date" value={newProject.endDate} onChange={e => setNewProject({...newProject, endDate: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none text-sm" />
            </div>
          </div>
          <button type="submit" className="w-full py-4 mt-6 bg-primary text-on-primary rounded-xl font-headline font-bold uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">publish</span> Submit Project
          </button>
        </form>

        {notification && (
          <div className="fixed bottom-8 right-8 bg-success-container text-on-success-container border border-success/20 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-8 z-50">
            <span className="material-symbols-outlined text-success text-2xl">check_circle</span>
            <span className="font-label font-bold text-sm tracking-wide">{notification}</span>
          </div>
        )}
      </div>
    );
  }

  if (path.includes('/projects')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">My Projects</h1><p className="text-on-surface-variant">View the status of your submitted projects.</p></div>
        <Table headers={projectHeaders} data={displayProjects} />
      </div>
    );
  }

  if (path.includes('/credits')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">Credit Balance</h1><p className="text-on-surface-variant">Manage your mintable and available carbon assets.</p></div>
        <Table headers={creditHeaders} data={displayCredits} />
      </div>
    );
  }

  if (path.includes('/listings')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="lg:w-1/3">
             <div className="bg-surface-container-lowest p-6 border border-outline-variant rounded-xl shadow-xl sticky top-[100px]">
               <h3 className="font-headline text-2xl font-bold mb-2">Create Listing</h3>
               <p className="text-on-surface-variant text-sm mb-6">Offload credits entirely to the active market orderbook.</p>
               
               <form className="space-y-4" onSubmit={handleCreateListing}>
                  <div>
                    <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Select Credit / Project</label>
                    <select required value={newListing.project} onChange={e => setNewListing({...newListing, project: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none text-sm cursor-pointer">
                      <option value="" disabled>Select live project...</option>
                      {availableProjects.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Quantity to Sell</label>
                    <input required type="number" value={newListing.quantity} onChange={e => setNewListing({...newListing, quantity: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. 500" />
                  </div>
                  <div>
                    <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Listing Price per Credit ($)</label>
                    <input required type="number" step="0.01" value={newListing.price} onChange={e => setNewListing({...newListing, price: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. 12.50" />
                  </div>
                  <button type="submit" className="w-full py-3 mt-2 bg-primary text-on-primary rounded-lg font-headline font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">sell</span> List Credits
                  </button>
               </form>
             </div>
          </div>
          
          <div className="lg:w-2/3 space-y-4">
             <div><h2 className="font-headline text-2xl font-bold mb-1">My Active Listings</h2><p className="text-on-surface-variant mb-4 text-sm">Monitor your current market exposures.</p></div>
             <Table headers={listingHeaders} data={displayListings} />
          </div>

        </div>

        {notification && (
          <div className="fixed bottom-8 right-8 bg-success-container text-on-success-container border border-success/20 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-8 z-50">
            <span className="material-symbols-outlined text-success text-2xl">check_circle</span>
            <span className="font-label font-bold text-sm tracking-wide">{notification}</span>
          </div>
        )}
      </div>
    );
  }

  if (path.includes('/sales')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">Sales & Transactions</h1><p className="text-on-surface-variant">Trace your closed ecosystem transactions and buyer receipts.</p></div>
        <Table headers={salesHeaders} data={sales} /> // Adjust with mapped data later
      </div>
    );
  }

  // DEFAULT DASHBOARD
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-headline text-3xl font-extrabold text-on-surface mb-2">Creator Summary</h1>
        <p className="text-on-surface-variant font-body mb-6">Overview of your verification pipelines and market exposures.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Projects" value={projects.length} icon="park" trend="Live" isPositive={true}/>
        <Card title="Active Listings" value={listings.filter(l => l.status === 'ACTIVE').length} icon="storefront" trend="API" isPositive={true}/>
      </div>

      <div className="space-y-4">
        <h2 className="font-headline text-xl font-bold flex items-center gap-2">
           <span className="material-symbols-outlined text-primary">eco</span> Your Projects Flow
        </h2>
        <Table headers={projectHeaders} data={displayProjects} />
      </div>

    </div>
  );
};
export default OwnerDashboard;

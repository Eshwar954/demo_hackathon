import { useState } from 'react';
import { Card } from '../components/Widgets';
import Table from '../components/Table';
import { useLocation } from 'react-router-dom';

const OwnerDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  /* ------------------- STATE & MOCK DATA ------------------- */

  // 1. Projects State
  const projectHeaders = ["Project Name", "Type", "Reduction", "Status"];
  const [projects, setProjects] = useState([
    { name: "Reforestation Alpha", type: "Forestry", reduction: "4,500 Tons", status: "VERIFIED" },
    { name: "Solar Phase 1", type: "Renewable Energy", reduction: "5,000 Tons", status: "UNDER_VERIFICATION" },
    { name: "Wind Park Bravo", type: "Renewable Energy", reduction: "12,000 Tons", status: "CREATED" }
  ]);
  const [newProject, setNewProject] = useState({ name: '', type: 'Forestry', location: '', reduction: '', startDate: '', endDate: '' });

  const [notification, setNotification] = useState(null);
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // 2. Issuance / Credits State
  const creditHeaders = ["Project", "Total Credits", "Available Credits", "Status"];
  const [credits, setCredits] = useState([
    { project: "Reforestation Alpha", total: "4,500", available: "1,500", status: "ISSUED" },
    { project: "Solar Phase 1", total: "-", available: "-", status: "PENDING_MINT" },
  ]);

  // 3. Listings State
  const listingHeaders = ["Project", "Price", "Quantity", "Status"];
  const [listings, setListings] = useState([
    { project: "Reforestation Alpha", price: "$12.00", quantity: "1,000", status: "ACTIVE" },
    { project: "Reforestation Alpha", price: "$12.50", quantity: "2,000", status: "CLOSED" }
  ]);
  const [newListing, setNewListing] = useState({ project: 'Reforestation Alpha', price: '', quantity: '' });

  // 4. Sales State
  const salesHeaders = ["Buyer", "Quantity", "Price", "Status"];
  const sales = [
    { buyer: "EcoCorp Trading", quantity: "2,000", price: "$12.50", status: "SUCCESS" },
    { buyer: "Global Tech", quantity: "500", price: "$11.00", status: "FAILED" }
  ];


  /* ------------------- HANDLERS ------------------- */

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.reduction) {
      setProjects([
        { name: newProject.name, type: newProject.type, reduction: `${newProject.reduction} Tons`, status: "CREATED" },
        ...projects
      ]);
      setNewProject({ name: '', type: 'Forestry', location: '', reduction: '', startDate: '', endDate: '' });
      showNotification("Project Successfully Created & Pending Audit.");
    }
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (newListing.price && newListing.quantity) {
      setListings([
        { project: newListing.project, price: `$${newListing.price}`, quantity: newListing.quantity, status: "ACTIVE" },
        ...listings
      ]);
      setNewListing({ project: 'Reforestation Alpha', price: '', quantity: '' });
      showNotification("Credits listed securely onto the active order book.");
    }
  };

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
      </div>
    );
  }

  if (path.includes('/projects')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">My Projects</h1><p className="text-on-surface-variant">View the status of your submitted projects.</p></div>
        <Table headers={projectHeaders} data={projects} />
      </div>
    );
  }

  if (path.includes('/credits')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">Credit Balance</h1><p className="text-on-surface-variant">Manage your mintable and available carbon assets.</p></div>
        <Table headers={creditHeaders} data={credits} />
      </div>
    );
  }

  if (path.includes('/listings')) {
    const availableProjects = credits.filter(c => c.status === 'ISSUED').map(c => c.project);

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
                    <select value={newListing.project} onChange={e => setNewListing({...newListing, project: e.target.value})} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 outline-none text-sm cursor-pointer">
                      {availableProjects.map(p => <option key={p}>{p}</option>)}
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
             <Table headers={listingHeaders} data={listings} />
          </div>

        </div>
      </div>
    );
  }

  if (path.includes('/sales')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div><h1 className="font-headline text-3xl font-extrabold mb-2">Sales & Transactions</h1><p className="text-on-surface-variant">Trace your closed ecosystem transactions and buyer receipts.</p></div>
        <Table headers={salesHeaders} data={sales} />
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
        <Card title="Total Projects" value={projects.length} icon="park" trend="+1" isPositive={true}/>
        <Card title="Total Credits" value="4,500" icon="public" />
        <Card title="Credits Sold" value="2,000" icon="payments" trend="steady" isPositive={true}/>
        <Card title="Active Listings" value={listings.filter(l => l.status === 'ACTIVE').length} icon="storefront" trend="live" isPositive={true}/>
      </div>

      <div className="space-y-4">
        <h2 className="font-headline text-xl font-bold flex items-center gap-2">
           <span className="material-symbols-outlined text-primary">eco</span> Your Projects Flow
        </h2>
        <Table headers={projectHeaders} data={projects} />
      </div>

      {notification && (
        <div className="fixed bottom-8 right-8 bg-success-container text-on-success-container border border-success/20 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-8 z-50">
          <span className="material-symbols-outlined text-success text-2xl">check_circle</span>
          <span className="font-label font-bold text-sm tracking-wide">{notification}</span>
        </div>
      )}
    </div>
  );
};
export default OwnerDashboard;

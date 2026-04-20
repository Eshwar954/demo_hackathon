import { useState, useEffect } from 'react';
import Table from '../components/Table';
import { useLocation } from 'react-router-dom';
import { listingAPI, transactionAPI } from '../services/api';

const BuyerDashboard = () => {
  const location = useLocation();
  const path = location.pathname;

  /* ------------------- STATE ------------------- */
  
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState('');
  const [notification, setNotification] = useState(null);

  const [transactions, setTransactions] = useState([]);
  const transactionHeaders = ["Project", "Quantity", "Total Price", "Status", "Date"];

  const marketHeaders = ["Project", "Price per Credit", "Available Quantity", "Seller", "Action"];
  const [listings, setListings] = useState([]);

  /* ------------------- DATA FETCHING (AXIOS) ------------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (path.includes('/transactions')) {
          const res = await transactionAPI.getAll();
          setTransactions(res.data || []);
        } else {
          // Marketplace / Default Fetch
          const res = await listingAPI.getAll();
          setListings(res.data || []);

          // Silently pre-fetch transactions to calculate totalPurchased metric
          const tRes = await transactionAPI.getAll();
          setTransactions(tRes.data || []);
        }
      } catch(err) {
        console.error("Backend connection failed.", err);
      }
    };
    fetchData();
  }, [path]);


  /* ------------------- HANDLERS (AXIOS) ------------------- */

  const handleBuyClick = (listing) => {
    setSelectedListing(listing);
    setBuyQuantity('');
    setShowBuyModal(true);
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (buyQuantity > 0 && selectedListing) {
      if (parseInt(buyQuantity) > parseInt(selectedListing.available || 0)) {
        setNotification("Requested quantity exceeds available market supply.");
        setTimeout(() => setNotification(null), 4000);
        return;
      }

      const priceVal = parseFloat(selectedListing.price ? selectedListing.price.replace('$', '') : 0);
      const total = priceVal * parseInt(buyQuantity);
      
      const payload = {
         project: selectedListing.project,
         quantity: buyQuantity,
         totalPrice: total,
      };

      try {
        await transactionAPI.purchase(payload);
        
        // Refresh local UI to reflect purchase success immediately
        const tRes = await transactionAPI.getAll();
        setTransactions(tRes.data || []);
        
        setShowBuyModal(false);
        setSelectedListing(null);
        setNotification(`Successfully purchased ${buyQuantity} credits from ${selectedListing.project}!`);
        setTimeout(() => setNotification(null), 4000);

      } catch (err) {
        alert("Transaction failed. Backend server unavailable.");
      }
    }
  };

  /* ------------------- COMPUTED DATA ------------------- */

  // Calculate total purchased generic summary metric
  const totalPurchased = transactions
    .filter(t => (t.status || t.transactionStatus) === 'SUCCESS')
    .reduce((acc, t) => acc + parseInt(t.quantity || 0), 0);

  const displayListings = listings.map(l => ({
     project: l.project || l.carbonProject || 'Unknown',
     price: l.price || '$0.00',
     available: l.quantity || l.availableQuantity || '0',
     seller: l.seller || 'Market',
     action: (
       <button onClick={() => handleBuyClick({ ...l, available: l.quantity || l.availableQuantity })} className="text-primary hover:bg-primary/10 font-bold text-[10px] uppercase tracking-widest border border-primary/30 px-3 py-1.5 rounded transition-all">
         Buy
       </button>
     )
  }));


  /* ------------------- ROUTING VIEWS ------------------- */

  if (path.includes('/transactions')) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="font-headline text-3xl font-extrabold mb-2">My Transactions</h1>
            <p className="text-on-surface-variant text-sm">Historically immutable tracking of all your carbon asset purchases.</p>
          </div>
          <div className="bg-primary-fixed/20 border border-primary/20 px-6 py-3 rounded-xl flex flex-col items-end">
            <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">Total Purchased Credits</span>
            <span className="font-headline text-2xl font-extrabold text-primary">{totalPurchased}</span>
          </div>
        </div>

        <Table headers={transactionHeaders} data={transactions} />
      </div>
    );
  }

  // DEFAULT VIEW: MARKETPLACE
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="font-headline text-3xl font-extrabold mb-2">Global Marketplace</h1>
          <p className="text-on-surface-variant text-sm border-l-2 border-primary pl-3">Explore and purchase verified carbon reductions from the worldwide ecosystem.</p>
        </div>
        <div className="bg-primary-fixed/20 border border-primary/20 px-6 py-3 rounded-xl flex flex-col items-end shadow-sm shadow-primary/5">
          <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Total Owned Credits</span>
          <span className="font-headline text-2xl font-extrabold text-primary leading-none">{totalPurchased}</span>
        </div>
      </div>

      <div className="border border-outline-variant/50 rounded-2xl overflow-hidden shadow-xl shadow-primary/5">
         <Table headers={marketHeaders} data={displayListings} />
      </div>

      {showBuyModal && selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/20 backdrop-blur-[2px] px-4">
          <div className="bg-surface-container-lowest p-8 rounded-xl max-w-sm w-full shadow-2xl shadow-primary/10 border border-outline-variant animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-center mb-4">
               <div className="w-12 h-12 bg-primary-fixed/20 text-primary rounded-full flex items-center justify-center">
                 <span className="material-symbols-outlined text-2xl">shopping_bag</span>
               </div>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-1 text-center">Secure Purchase</h3>
            <p className="text-on-surface-variant text-xs mb-6 text-center">Acquire verified market assets.</p>
            
            <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-on-surface-variant">Project:</span>
                <span className="font-bold text-on-surface truncate ml-2 max-w-[150px]">{selectedListing.project}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-on-surface-variant">Seller:</span>
                <span className="font-bold text-on-surface truncate ml-2 max-w-[150px]">{selectedListing.seller || 'Market'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Unit Price:</span>
                <span className="font-bold text-primary">{selectedListing.price}</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handlePurchase}>
              <div>
                <div className="flex justify-between mb-1.5 align-bottom">
                  <label className="block font-label text-[10px] font-bold uppercase tracking-widest text-outline">Purchase Quantity</label>
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Available: {selectedListing.available}</span>
                </div>
                <input required type="number" min="1" max={selectedListing.available} value={buyQuantity} onChange={e => setBuyQuantity(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none text-sm font-headline font-bold text-center text-lg" placeholder="100" />
              </div>
              
              <div className="bg-surface-container border border-outline-variant px-4 py-3 rounded-lg flex justify-between items-center shadow-inner">
                <span className="font-label text-xs uppercase tracking-widest font-bold text-on-surface-variant">Total Cost</span>
                <span className="font-headline text-xl font-extrabold text-on-surface">
                  {buyQuantity ? `$${(parseFloat(selectedListing.price ? selectedListing.price.replace('$', '') : 0) * parseInt(buyQuantity)).toFixed(2)}` : '$0.00'}
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowBuyModal(false)} className="flex-1 py-3.5 rounded-lg font-label font-bold text-[10px] uppercase tracking-widest border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface-variant">Cancel</button>
                <button type="submit" disabled={!buyQuantity} className="flex-1 bg-primary text-on-primary py-3.5 rounded-lg font-label font-bold text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">Deploy Funds</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-8 right-8 bg-success-container text-on-success-container border border-success/20 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-8 z-50">
          <span className="material-symbols-outlined text-success text-2xl">check_circle</span>
          <span className="font-label font-bold text-sm tracking-wide">{notification}</span>
        </div>
      )}
    </div>
  );
};
export default BuyerDashboard;

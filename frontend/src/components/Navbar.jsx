import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-surface shadow-sm shadow-primary/5 sticky top-0 z-50 border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">eco</span>
          <div className="font-headline text-primary font-extrabold uppercase tracking-widest hidden sm:block">
            The Ecological Ledger
          </div>
        </div>
        
        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_circle</span>
              <span className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                [{user.role}] {user.email}
              </span>
            </div>
            <button 
              onClick={logout}
              className="text-error hover:text-error-container font-label text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

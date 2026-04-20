import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  
  if (!user) return null;

  const getLinks = () => {
    switch (user.role) {
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
          { label: 'Users', path: '/admin/users', icon: 'group' },
          { label: 'Projects', path: '/admin/projects', icon: 'park' },
          { label: 'Issuance', path: '/admin/issuance', icon: 'toll' },
          { label: 'Transactions', path: '/admin/transactions', icon: 'receipt_long' },
          { label: 'Ledger Audit', path: '/admin/ledger', icon: 'menu_book' },
        ];
      case 'owner':
        return [
          { label: 'Dashboard', path: '/owner', icon: 'dashboard' },
          { label: 'Create Project', path: '/owner/create-project', icon: 'add_circle' },
          { label: 'My Projects', path: '/owner/projects', icon: 'account_tree' },
          { label: 'Credits', path: '/owner/credits', icon: 'account_balance_wallet' },
          { label: 'Listings', path: '/owner/listings', icon: 'storefront' },
          { label: 'Sales', path: '/owner/sales', icon: 'receipt_long' },
        ];
      case 'buyer':
        return [
          { label: 'Marketplace', path: '/buyer', icon: 'storefront' },
          { label: 'My Transactions', path: '/buyer/transactions', icon: 'receipt_long' },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 bg-surface border-r border-outline-variant/30 h-[calc(100vh-65px)] flex flex-col p-4 shadow-sm shadow-primary/5 hidden md:flex sticky top-[65px]">
      <div className="text-xs font-label uppercase tracking-widest text-outline mb-6 px-4">Menu</div>
      <nav className="space-y-2 flex-grow">
        {links.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
              currentPath === link.path 
                ? 'bg-primary-fixed/30 text-primary font-bold' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
            }`}
          >
            <span className={`material-symbols-outlined transition-colors ${currentPath === link.path ? 'text-primary' : 'text-outline group-hover:text-primary'}`}>
              {link.icon}
            </span>
            <span className={`font-body ${currentPath === link.path ? 'font-bold' : 'font-medium'}`}>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

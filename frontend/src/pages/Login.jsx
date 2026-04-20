import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const mockToken = "mock_jwt_token_" + role;
      login(role, email, mockToken);
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center relative overflow-hidden px-4 md:px-0 py-12 min-h-screen">
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          className="w-full h-full object-cover"
          alt="Abstract Background"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Qz71JycpUXH9PygqkGbiGpluVznW3I53UFadXj9eTP5LNRqbG6bRUlEWgOJ8XZgjsaHVMoqosZzO23husDtKDCerIu9Zd7VofGOCVnHB4PCpDw76H-KfKP_9xME1nNsEvIBr7MV2W3ejjPH5wo451Xq_NAKF42QWMouIDs3jb_gaM92AL6ICuWO3U2novtMWHj8CsLZWqHqJWTYGsV8NhtL63bkDRfbajQ7ZHlzOP64OpUuOun59bHHqa1v7MJueLG2YnOex1kQ"
        />
      </div>
      
      <div className="w-full max-w-md z-10 bg-surface-container-lowest rounded-2xl shadow-xl shadow-primary/10 border border-outline-variant/50 p-8 md:p-10">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-fixed/30 rounded-2xl flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-4xl">eco</span>
            </div>
          </div>
          <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-2">Sign In</h2>
          <p className="text-on-surface-variant text-sm">Access your ledger account.</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-2">
            <label className="cursor-pointer group">
              <input 
                className="peer sr-only" 
                name="role" 
                type="radio" 
                value="admin" 
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.value)} 
              />
              <div className="flex flex-col items-center p-3 rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-primary-fixed/20 transition-all duration-300">
                <span className="font-label text-[10px] font-bold uppercase tracking-tighter">Admin</span>
              </div>
            </label>
            <label className="cursor-pointer group">
              <input 
                className="peer sr-only" 
                name="role" 
                type="radio" 
                value="owner"
                checked={role === 'owner'}
                onChange={(e) => setRole(e.target.value)}  
              />
              <div className="flex flex-col items-center p-3 rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-primary-fixed/20 transition-all duration-300">
                <span className="font-label text-[10px] font-bold uppercase tracking-tighter">Owner</span>
              </div>
            </label>
            <label className="cursor-pointer group">
              <input 
                className="peer sr-only" 
                name="role" 
                type="radio" 
                value="buyer" 
                checked={role === 'buyer'}
                onChange={(e) => setRole(e.target.value)} 
              />
              <div className="flex flex-col items-center p-3 rounded-xl border border-outline-variant peer-checked:border-primary peer-checked:bg-primary-fixed/20 transition-all duration-300">
                <span className="font-label text-[10px] font-bold uppercase tracking-tighter">Buyer</span>
              </div>
            </label>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block font-label text-xs font-bold uppercase tracking-widest text-outline mb-1.5">Email</label>
              <input 
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary font-body transition-all outline-none text-on-surface" 
                placeholder="identity@ledger.eco" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-label text-xs font-bold uppercase tracking-widest text-outline mb-1.5">Password</label>
              <input 
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary font-body transition-all outline-none text-on-surface" 
                placeholder="••••••••••••" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button className="w-full bg-primary text-on-primary py-3.5 rounded-lg font-headline font-bold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98] duration-200" type="submit">
            <span>Sign In</span>
            <span className="material-symbols-outlined text-lg">login</span>
          </button>


        </form>
        
        <div className="mt-8 text-center pt-2">
          <p className="font-label text-xs text-on-surface-variant">
            Don't have an account? 
            <Link to="/register" className="text-primary font-bold hover:underline ml-1">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

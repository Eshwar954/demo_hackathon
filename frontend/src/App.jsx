import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<Layout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Owner Routes */}
          <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
            <Route element={<Layout />}>
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route path="/owner/*" element={<OwnerDashboard />} />
            </Route>
          </Route>

          {/* Buyer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
            <Route element={<Layout />}>
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/buyer/*" element={<BuyerDashboard />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App(){
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buyer" element={<ProtectedRoute role="buyer"><BuyerDashboard/></ProtectedRoute>} />
          <Route path="/seller" element={<ProtectedRoute role="seller"><SellerDashboard/></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;

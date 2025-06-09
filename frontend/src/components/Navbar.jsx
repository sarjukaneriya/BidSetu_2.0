import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <div>BidSetu</div>
      {user && (
        <div className="space-x-2">
          {user.role === 'buyer' && <Link to="/buyer">Dashboard</Link>}
          {user.role === 'seller' && <Link to="/seller">Dashboard</Link>}
          {user.role === 'admin' && <Link to="/admin">Dashboard</Link>}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

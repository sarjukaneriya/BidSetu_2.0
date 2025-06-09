import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // naive decode
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.id, role: payload.role });
    }
  }, [token]);

  const login = (t) => {
    setToken(t);
    localStorage.setItem('token', t);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name: string, role: 'owner' | 'driver' } | null
  const [isLoading, setIsLoading] = useState(false);

  const login = async (role) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        name: role === 'driver' ? 'Driver Dave' : 'Kelvin M.',
        role: role,
        id: '123456'
      });
      setIsLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(null);
      setIsLoading(false);
    }, 500);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

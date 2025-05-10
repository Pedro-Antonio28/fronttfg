import { createContext, useContext, useEffect, useState } from 'react';
import axios from '@/shared/functions/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchUser = async () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get('/user');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

  const login = async (credentials, role = 'student') => {
    const { data } = await axios.post(`/${role}/login`, credentials);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ ...data.user, role }));
    setUser({ ...data.user, role });
    console.log(data)
    return data;
  };

  const register = async (credentials, role = 'student') => {
    const { data } = await axios.post(`/${role}/register`, credentials);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ ...data.user, role }));
    setUser({ ...data.user, role });
    return data;
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const hasRole = (role) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

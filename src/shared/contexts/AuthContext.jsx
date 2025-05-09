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
      try {
        const { data } = await axios.get('/user');
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials, role = 'student') => {
    const { data } = await axios.post(`/login/${role}`, credentials);
    localStorage.setItem('token', data.token);
    setUser({ ...data.user, role });
    return data;
  };

  const register = async (credentials, role = 'student') => {
    const { data } = await axios.post(`/register/${role}`, credentials);
    localStorage.setItem('token', data.token);
    setUser({ ...data.user, role });
    return data;
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch {}
    localStorage.removeItem('token');
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

import { Routes, Route } from 'react-router-dom';
import HomePage from './modules/home/pages/HomePage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import LoginPage from './modules/auth/pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
  )
}

export default App

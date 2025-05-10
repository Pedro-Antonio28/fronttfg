import { Routes, Route } from 'react-router-dom';
import HomePage from './modules/home/pages/HomePage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import LoginPage from './modules/auth/pages/LoginPage';
import GoogleSuccessPage from './modules/auth/pages/GoogleSuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage/>} />
        <Route path="/google-success" element={<GoogleSuccessPage />} />
    </Routes>
  )
}

export default App

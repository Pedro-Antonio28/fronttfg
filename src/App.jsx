import { Routes, Route } from 'react-router-dom';
import HomePage from './modules/home/pages/HomePage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import LoginPage from './modules/auth/pages/LoginPage';
import StudentDashboard from './modules/student/pages/StudentDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/students/dashboard" element={<StudentDashboard/>} />
    </Routes>
  )
}

export default App

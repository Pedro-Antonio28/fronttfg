import { Routes, Route } from 'react-router-dom';
import HomePage from './modules/home/pages/HomePage';
import StudentDashboard from './modules/student/pages/StudentDashboard';
import StudentRegister from './modules/student/pages/StudentRegister';
import StudentLogin from './modules/student/pages/StudentLogin';
import TeacherRegister from './modules/teacher/pages/TeacherRegister';
import TeacherLogin from './modules/teacher/pages/TeacherLogin';
import TeacherDashboard from './modules/teacher/pages/TeacherDashboard';
import ProtectedRoute from './shared/components/ProtectedRoute';
import StudentProfile from "./modules/student/pages/StudentProfile.jsx";
import TeacherProfile from "./modules/teacher/pages/TeacherProfile.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard/></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute role="student"><StudentProfile/></ProtectedRoute>} />

      <Route path="/teacher/register" element={<TeacherRegister />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard/></ProtectedRoute>} />
        <Route path="/teacher/profile" element={<ProtectedRoute role="teacher"><TeacherProfile/></ProtectedRoute>} />


    </Routes>
  )
}

export default App

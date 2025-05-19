import { Routes, Route } from 'react-router-dom';
import HomePage from './modules/home/pages/HomePage';
import StudentDashboard from './modules/student/pages/StudentDashboard';
import StudentRegister from './modules/student/pages/StudentRegister';
import StudentLogin from './modules/student/pages/StudentLogin';
import TeacherRegister from './modules/teacher/pages/TeacherRegister';
import TeacherLogin from './modules/teacher/pages/TeacherLogin';
import TeacherDashboard from './modules/teacher/pages/TeacherDashboard';
import ProtectedRoute from './shared/components/ProtectedRoute';
import StudentClassActivities from './modules/student/pages/StudentClassActivities';
import ClassLayout from "./shared/components/ClassLayout.jsx";
import StudentClassResults from './modules/student/pages/StudentClassResults.jsx';
import StudentClassMembers from './modules/student/pages/StudentClassMembers.jsx';
import StudentClassChat from './modules/student/pages/StudentClassChat.jsx';
import JoinClass from './modules/student/pages/JoinClass.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student/join-class" element={<JoinClass />} />
      <Route path="/student/register" element={<StudentRegister />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard/></ProtectedRoute>} />

      <Route path="/teacher/register" element={<TeacherRegister />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard/></ProtectedRoute>} />

      <Route path="/student/class/:classId" element={<ClassLayout />}>
        <Route path="activities" element={<StudentClassActivities />} />
        <Route path="results" element={<StudentClassResults />} />
        <Route path="members" element={<StudentClassMembers />} />
        <Route path="chat" element={<StudentClassChat />} />
      </Route>





    </Routes>
  )


}

export default App

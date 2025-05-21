import LoginBase from '@/shared/components/LoginBase';

const TeacherLogin = () => (
  <LoginBase
    role="teacher"
    redirectTo="/teacher/dashboard"
    registerLink="/teacher/register"
    rol="Profesor"
  />
);

export default TeacherLogin;

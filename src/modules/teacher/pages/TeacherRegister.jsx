import RegisterBase from '@/shared/components/RegisterBase';

const TeacherRegister = () => (
  <RegisterBase
    role="teacher"
    redirectTo="/teacher/dashboard"
    loginRoute="/teacher/login"
    rol="Profesor"
  />
);

export default TeacherRegister;

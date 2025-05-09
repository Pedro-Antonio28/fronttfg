import RegisterBase from '@/shared/components/RegisterBase';

const TeacherRegister = () => (
  <RegisterBase role="teacher" redirectTo="/teacher/dashboard" loginRoute="/login/teacher" />
);

export default TeacherRegister;

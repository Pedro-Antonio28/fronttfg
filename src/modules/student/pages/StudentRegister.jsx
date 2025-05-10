import RegisterBase from '@/shared/components/RegisterBase';

const StudentRegister = () => (
  <RegisterBase role="student" redirectTo="/student/dashboard" loginRoute="/student/login" rol="Estudiante"/>
);

export default StudentRegister;

import RegisterBase from '@/shared/components/RegisterBase';

const StudentRegister = () => (
  <RegisterBase role="student" redirectTo="/student/dashboard" loginRoute="/student/login" />
);

export default StudentRegister;

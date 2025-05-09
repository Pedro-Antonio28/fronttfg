import LoginBase from "@/shared/components/LoginBase";

const StudentLogin = () => (
  <LoginBase
    role="student"
    redirectTo="/student/dashboard"
    registerLink="/student/register"
  />
);

export default StudentLogin;

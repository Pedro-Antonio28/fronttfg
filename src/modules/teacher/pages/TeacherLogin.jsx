import LoginBase from "@/shared/components/LoginBase";

const TeacherLogin = () => (
  <LoginBase
    role="teacher"
    redirectTo="/teacher/dashboard"
    registerLink="/teacher/login"
  />
);

export default TeacherLogin;

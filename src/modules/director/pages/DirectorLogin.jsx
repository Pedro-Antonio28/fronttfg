import LoginBase from '@/shared/components/LoginBase';

const DirectorLogin = () => (
  <LoginBase
    role="director"
    redirectTo="/director/dashboard"
    registerLink="/director/register"
    rol="Director"
  />
);

export default DirectorLogin;

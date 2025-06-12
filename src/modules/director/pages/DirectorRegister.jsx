import { useState } from 'react';
import RegisterBase from '@/shared/components/RegisterBase';

const DirectorRegister = () => {
  const [extraFields, setExtraFields] = useState({
    profile_img: '',
    school_name: '',
    school_code: '',
    school_email: '',
    school_tel: '',
    school_type: '',
  });

  return (
    <RegisterBase
      role="director"
      redirectTo="/director/dashboard"
      loginRoute="/director/login"
      rol="Director"
      extraFields={extraFields}
      setExtraFields={setExtraFields}
    />
  );
};

export default DirectorRegister;

import axios from '@/shared/functions/axiosConfig';

export const register = async ({ name, email, password }) => {
  const response = await axios.post('/register', {
    name,
    email,
    password,
  });
  return response.data;
};

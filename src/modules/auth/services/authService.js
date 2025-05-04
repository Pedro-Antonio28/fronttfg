import axios from '@/shared/functions/axiosConfig';

export const register = async ({ name, email, password, password_confirmation }) => {
  const response = await axios.post('/register', {
    name,
    email,
    password,
    password_confirmation
  });

  localStorage.setItem('student_token', response.data.token)

  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await axios.post('/login', {
    email,
    password
  });

  localStorage.setItem('student_token', response.data.token);

  return response.data;
};


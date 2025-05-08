import axios from '@/shared/functions/axiosConfig';

export const fetchDashboard = async () => {
  try {
    const response = await axios.get('/teachers/dashboard');
    console.log(response.data.data)
    return response.data.data; // solo retornamos la lista de clases
  } catch (error) {
    console.error('Error fetching dashboard:', error.response?.data || error.message);
    throw error;
  }
};
  
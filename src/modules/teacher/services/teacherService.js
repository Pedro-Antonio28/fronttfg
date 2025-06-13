import axios from '@/shared/functions/axiosConfig';

export const fetchDashboard = async (page = 1) => {
  try {
    const response = await axios.get(`/teacher/dashboard?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard:', error.response?.data || error.message);
    throw error;
  }
};

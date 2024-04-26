import axios from 'axios';
import Cookies from 'js-cookie';
import instance from '../../api';

const API_URL = 'http://localhost:3000';

const registerAdmin = async (user) => {
  const response = await axios.post(`${API_URL}/api/auth/adminRegistration`, user);
  return response.data;
};
const registerInstructor = async (user) => {
  const response = await axios.post(`${API_URL}/api/auth/instructor-registration`, user);
  return response.data;
};

const registerStudent = async (user) => {
  const response = await axios.post(`${API_URL}/user/registerUser`, user);
  return response.data;
};

const adminLogin = async (user) => {
  const response = await axios.post(`${API_URL}/api/auth/signin`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.user)
  }

  return response.data;
};

const instructorLogin = async (user) => {
  const response = await axios.post(`${API_URL}/api/auth/signin`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.user)
  }

  return response.data;
};

const studentLogin = async (user) => {
  const response = await axios.post(`${API_URL}/user/login`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.user)
  }

  return response.data;
};

const logout = () => {
  Cookies.remove('access_token');
};

const authService = {
  registerAdmin,
  registerInstructor,
  registerStudent,
  adminLogin,
  instructorLogin,
  studentLogin,
  logout,
};

export default authService;


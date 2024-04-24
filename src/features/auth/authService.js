import axios from 'axios';
import Cookies from 'js-cookie';
import instance from '../../api';

const API_URL = 'http://localhost:3000';

const registerInstructor = async (user) => {
  const response = await axios.post(`${API_URL}/register/instructor`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.userId)
    Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
  }

  return response.data;
};

const registerStudent = async (user) => {
  const response = await axios.post(`${API_URL}/register/student`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.userId)
    Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
  }

  return response.data;
};

const adminLogin = async (user) => {
  const response = await axios.post(`${API_URL}/login/admin`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.userId)
    Cookies.set('accessToken', response.data.accessToken);
  }

  return response.data;
};

const instructorLogin = async (user) => {
  const response = await axios.post(`${API_URL}/login/instructor`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.userId)
    Cookies.set('accessToken', response.data.accessToken);
  }

  return response.data;
};

const studentLogin = async (user) => {
  const response = await axios.post(`${API_URL}/login/student`, user);

  if (response.data) {
    localStorage.setItem('user', response.data.userId)
    Cookies.set('accessToken', response.data.accessToken);
  }

  return response.data;
};

const logout = () => {
  Cookies.remove('accessToken');
};

const authService = {
  registerInstructor,
  registerStudent,
  adminLogin,
  instructorLogin,
  studentLogin,
  logout,
};

export default authService;


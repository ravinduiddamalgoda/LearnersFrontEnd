import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = ''

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.userId))
    Cookies.set('accessToken', response.data.accessToken, { expires: 7 });
    Cookies.set('refreshToken', response.data.refreshToken, { expires: 14 });
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.userId))
    
    Cookies.set('accessToken', response.data.accessToken);
    Cookies.set('refreshToken', response.data.refreshToken);
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
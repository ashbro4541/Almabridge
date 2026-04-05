// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Authentication
  REGISTER: `${API_BASE_URL}/register`,
  LOGIN: `${API_BASE_URL}/loginform`,
  CHECK_AUTH: `${API_BASE_URL}/checkauth`,
  
  // Student data
  GET_STUDENTS: `${API_BASE_URL}/studata`,
  GET_STUDENTS_PASSOUT: `${API_BASE_URL}/studatapassout`,
  GET_STUDENT_BY_ID: (id) => `${API_BASE_URL}/Moreinfo/${id}`,
  GET_CONTACT_INFO: (id) => `${API_BASE_URL}/ContactForm/${id}`,
  
  // Profile management
  CREATE_PROFILE: `${API_BASE_URL}/creatprofile`,
  
  // Payment
  SUBMIT_PAYMENT: `${API_BASE_URL}/submitpayment`,
  
  // Favorites
  GET_FAVORITES: `${API_BASE_URL}/favorites`,
  ADD_FAVORITE: `${API_BASE_URL}/favorites`,
  DELETE_FAVORITE: (id) => `${API_BASE_URL}/favorites/${id}`
};

export default API_BASE_URL;

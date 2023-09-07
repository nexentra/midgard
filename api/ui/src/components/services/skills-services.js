import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:8080/api/";
class SkillsService {
  getAllMySkills() {
    axios.get(API_URL + 'myskills', { headers: authHeader() })
  }
  getUserData() {
    return axios.get(API_URL + 'users/'+localStorage.getItem('userid'), { headers: authHeader() });
  }

  editUserData() {
    return axios.put(API_URL + 'users/'+localStorage.getItem('userid'), { headers: authHeader() });
  }

  deleteUserData() {
    return axios.delete(API_URL + 'users/'+localStorage.getItem('userid'), { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'skills', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URL + '', { headers: authHeader() });
  }
}
export default new SkillsService();

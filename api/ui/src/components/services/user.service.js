import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "https://genesisrestapi.herokuapp.com/";
class UserService {
  getAllUsers() {
    return axios.get(API_URL + 'users');
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
export default new UserService();

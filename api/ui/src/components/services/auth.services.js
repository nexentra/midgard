import axios from "axios";
const API_URL = process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:8080/api/";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", response.data.token);
          localStorage.setItem("userid", response.data.id);
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userid");
    window.location.reload()
  }
  register(name, email, password) {
    return axios.post(API_URL + "users", {
      name,
      email,
      password
    })
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("user", response.data.token);
        localStorage.setItem("userid", response.data.id);
      }
      return response.data;
    });
  }
  getCurrentUser() {
    return (localStorage.getItem('user'),localStorage.getItem('userid'));
  }
}
export default new AuthService();

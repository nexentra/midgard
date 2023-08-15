import axios from "axios";
const API_URL = "/api/"
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
          localStorage.setItem("userid", JSON.stringify(response.data.id));
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
    });
  }
  getCurrentUser() {
    return (JSON.parse(localStorage.getItem('user')),JSON.parse(localStorage.getItem('userid')));
  }
}
export default new AuthService();

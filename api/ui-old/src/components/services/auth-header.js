export default function authHeader() {
    const user = localStorage.getItem('user');
    let token = "Bearer " + user

    if (user) {
      return { Authorization:token};
    } else {
      return {};
    }
  }

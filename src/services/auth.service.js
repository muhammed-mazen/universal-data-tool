import axios from "axios";

import { API_URL } from "./api.conf";

class AuthService {
  login(username, password) {
    return axios
      .post(
        API_URL + "auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.accessToken) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  getAllUsers() {
    return axios.post(API_URL + "auth/users/all").then((response) => {
      return response.data;
    });
  }
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();

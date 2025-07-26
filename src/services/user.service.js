import axios from "axios";
import authHeader from "./auth.header";

import { API_URL } from "./api.conf";

class UserService {
  getAllUsers() {
    let user = JSON.parse(localStorage.getItem("user"));

    return axios
      .get(API_URL + "users/", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addUser(username, password, isPhrase) {
    return axios
      .post(
        API_URL + "users/add",
        {
          username: username,
          password: password,
          is_phrase: isPhrase,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
  getFile(fileName) {
    return axios.post(
      API_URL + "data/",
      {
        file_name: fileName,
      },
      {
        headers: authHeader(),
      }
    );
  }
  generateString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  getUserTasks() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      return axios.post(
        API_URL + "users_tasks",
        {
          username: user.username,
        },
        { headers: authHeader() }
      );
    }
    return [];
  }
  getUserTasksFull(index) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      return axios.get(
        API_URL +
          `users-data/${user.userType ? user.userType : "ner"}/?index=${index}`,
        { headers: authHeader() }
      );
    }
    return [];
  }
  getUserData(caseID, sentenceID) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return axios.post(
        API_URL + "users_tasks/data/get",
        {
          username: user.username,
          caseID: caseID,
          sentenceID: sentenceID,
        },
        {
          headers: authHeader(),
        }
      );
    }
    return [];
  }
  getUserDataByUsername(usernames) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isAdmin) {
      return axios.post(
        API_URL + "data/export/",
        {
          usernames: usernames,
        },
        {
          headers: authHeader(),
        }
      );
    } else {
      return new Promise((resolve, reject) => {
        reject("Not authorized");
      });
    }
  }
  deleteUserData(caseID, sentenceID) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return axios.post(
        API_URL + "users_tasks/data/delete",
        {
          username: user.username,
          caseID: caseID,
          sentenceID: sentenceID,
        },
        {
          headers: authHeader(),
        }
      );
    }
    return [];
  }
  getClasses() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      return axios.post(
        API_URL + "users_tasks/classes",
        {
          type: user.isPhrase ? "phrases" : "words",
        },
        { headers: authHeader() }
      );
    }
    return [];
  }
  saveUserTasks(data) {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      return axios.post(
        API_URL + `users-data/${user.userType ? user.userType : "ner"}/`,
        data,
        {
          headers: authHeader(),
        }
      );
    }
    return [];
  }
}

export default new UserService();

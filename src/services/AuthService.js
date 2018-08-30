import { getStore } from "../shared/redux/store";
import Http from "./HttpService";
import * as Actions from "../shared/login/redux/actions";
import decode from "jwt-decode";

class Auth {
  constructor() {
    this._isAuthenticated = false;
    setTimeout(() => {
      this.store = getStore();

      this.data = this.store.getState().login.data;
    });
  }

  login(credentials) {
    return Http.post("/login", credentials);
  }

  register(credentials) {
    return Http.post("/register", credentials);
  }

  updateUser(user_id, credentials) {
    return Http.put(`/update-user/${user_id}`, credentials);
  }
  updateUserAvatar(user_id, credentials = null, file) {
    let config = {};
    let formData = new FormData();
    formData.append("image", file);
    config.headers = {
      "content-type": "multipart/form-data"
    };
    return Http.post(`/upload-image-user/${user_id}`, formData, config);
  }

  isAuthenticated() {
    return this.isTokenExpired();
  }

  setToken(data) {
    this.data.user = data.user;
    this.data.token = data.token;
  }

  getUser() {
    if (this.isAuthenticated()) {
      return this.data.user;
    }

    return null;
  }

  getToken() {
    if (this.isTokenExpired()) {
      return this.data.token;
    }

    return null;
  }

  isTokenExpired() {
    // try {
    if (this.data) {
      if (this.data.token) {
        const decoded = decode(this.data.token);
        if (decoded.exp < Date.now() / 1000) {
          // Checking if token is expired. N
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
    // }
    // catch (err) {
    //     console.log('Entra en el catch');
    //     return false;
    // }
  }

  getTokenDecoded() {
    return null;
  }

  logout() {
    this.data = {};
    this._isAuthenticated = false;
    localStorage.clear();
    return this.store.dispatch(Actions.logout());
  }
}

const auth = new Auth();

export default auth;

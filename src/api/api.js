import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  // разрешаем передачу на сервер наших куков (чтобы кажый раз не подтверждать авторизацию)
  withCredentials: true,
  headers: {
    "API-KEY": "35fddf9f-083e-4cdb-bf30-9d3fd6b5a744",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 1) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((data) => data);
  },
  deleteFollow(id) {
    return instance.delete(`follow/${id}`).then((data) => data);
  },

  createFollow(id) {
    return instance.post(`follow/${id}`).then((data) => data);
  },

  getProfile(id) {
    console.warn(
      "usersAPI.getProfile is deprecated. Please use profileAPI.getProfile"
    );
    return profileAPI.getProfile(id);
  },
}

export const authAPI = {
  getAuth() {
    return instance.get("auth/me").then((data) => data);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance
      .post("/auth/login", { email, password, rememberMe, captcha })
      .then((data) => data);
  },
  logout() {
    return instance.delete("/auth/login");
  },
};

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`).then((data) => data);
  },
  getStatus(id) {
    return instance.get(`profile/status/${id}`).then((data) => data);
  },
  updateStatus(status) {
    return instance
      .put("profile/status/", { status: status })
      .then((data) => data);
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put("profile/photo/",
            formData,
            {headers: {"Content-Type": "multipart/form-data",}}
          )
      .then((data) => data);
  },
  saveProfileInfo(profile) {
    return instance 
      .put("profile", profile)
      .then((data) => data);
  }
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get("security/get-captcha-url").then((data) => data);
  }
};

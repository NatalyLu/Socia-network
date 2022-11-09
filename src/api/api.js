import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  // разрешаем передачу на сервер наших куков (чтобы кажый раз не подтверждать авторизацию)
  withCredentials: true,
  headers: {
    "API-KEY": "35fddf9f-083e-4cdb-bf30-9d3fd6b5a744",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 1) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  deleteFollow(id) {
    return instance.delete(`follow/${id}`)
      .then(response => response.data);
  },

  createFollow(id) {
    return instance.post(`follow/${id}`)
      .then(response => response.data);
  },

  getProfile(id) {
    return instance.get(`profile/${id}`)
      .then((response) => response.data);
  },
}

export const authAPI = {
  getAuth() {
    return instance.get(`auth/me`)
      .then((response) => response.data);
  },
}

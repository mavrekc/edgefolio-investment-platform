export const sessionStorageUtil = {
  setAccessToken: (token) => {
    sessionStorage.setItem("access_token", token);
  },
  getAccessToken: () => {
    return sessionStorage.getItem("access_token");
  },
  clearAccessToken: () => {
    sessionStorage.removeItem("access_token");
  },
  setUserData: (data) => {
    sessionStorage.setItem("user_data", JSON.stringify(data));
  },
  getUserData: () => {
    return JSON.parse(sessionStorage.getItem("user_data"));
  },
  clearUserData: () => {
    sessionStorage.removeItem("user_data");
  },
  setUserEmail: (data) => {
    sessionStorage.setItem("reset_email", JSON.stringify(data));
  },
  getUserEmail: () => {
    return JSON.parse(sessionStorage.getItem("reset_email"));
  },
  clearUserEmail: () => {
    sessionStorage.removeItem("reset_email");
  },
};

export const localStorageUtil = {
  setRefreshToken: (token) => {
    localStorage.setItem("refresh_token", token);
  },
  getRefreshToken: () => {
    return localStorage.getItem("refresh_token");
  },
};

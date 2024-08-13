export const storageAccessToken = (token: string) => {
  if (token) {
    return localStorage.setItem("accessToken", token);
  }
  console.log("token not found");
};

export const storageRefreshToken = (token: string) => {
  if (token) {
    return localStorage.setItem("refreshToken", token);
  }
  console.log("token not found");
};

export const getToken = (token: string) => {
  if (token) {
    return localStorage.getItem(token);
  }
  return null;
};

export const removeToken = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  console.log("logout");
};

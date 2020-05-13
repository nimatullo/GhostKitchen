export const JWT_TOKEN = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
};

export const BASE_URL = "http://api.ghostkitchen.site";

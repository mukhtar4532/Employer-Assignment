import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;

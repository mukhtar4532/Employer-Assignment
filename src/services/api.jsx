import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

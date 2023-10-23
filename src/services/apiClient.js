import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

export default apiClient;

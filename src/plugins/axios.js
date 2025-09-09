// src/plugins/axios.js
import axios from "axios";

// console.log(process.env.VUE_APP_API_BASE_URL)

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // withCredentials: true, // Enable sending cookies with requests
});

export default api;

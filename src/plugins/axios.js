// src/plugins/axios.js
import axios from "axios";

// console.log(process.env.VUE_APP_API_BASE_URL)

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    // withCredentials: true, // Enable sending cookies with requests
});

export default api;


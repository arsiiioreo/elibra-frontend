// src/plugins/axios.js
import { token } from "@/stores/auth";
import axios from "axios";

const api = axios.create({
	baseURL: "https://antiquewhite-cassowary-936393.hostingersite.com/",
	// baseURL: "http://127.0.0.1:8000/",
});

// Request interceptor: inject token if exists
api.interceptors.request.use(
	async (config) => {
		if (token) {
			config.headers.Authorization = `Bearer ${token.value}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default api;

// stores/auth.js
import router from "@/router";
import api from "@/plugins/axios";

import { showLoading, hideLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { jwtDecode } from "jwt-decode";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { getRequest } from "./requestService";
import { clearCache as clearAdminCache } from "./adminCache";
import { clearCache as clearLibrarianCache } from "./librarianCache";

export const user = ref(null);
export const token = ref(localStorage.getItem("token") || null);
export const justLoggedIn = ref(false);

export const setUser = (userData) => {
	user.value = userData;
};

export const thisIsMe = async () => {
	showLoading({ message: "Loading data, please wait..." });

	if (user.value) {
		hideLoading();
		return user.value;
	}

	try {
		const res = await getRequest("user");

		if (res) setUser(res.data);
		if (res.data.role === "1") {
			localStorage.setItem("branch_id", res.data.branch.id);
		}
		return user.value;
	} catch (e) {
		showStatus({ status: "error", title: "Error", message: e });
	} finally {
		hideLoading();
	}
};

export const refreshToken = async () => {
	console.log("executed");

	showLoading({ message: "Validating Session" });
	try {
		const res = await api.get("api/auth/refresh", {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});

		console.log("refresh was executed");
		token.value = res.data.access_token;
		localStorage.setItem("token", res.data.access_token);
	} catch (e) {
		await clearAuth();
		useToast().error("Session expired, please login again.");
	} finally {
		hideLoading();
	}
};

export const checkTokenValidity = async () => {
	const storedToken = token.value;

	if (!storedToken) {
		console.log("no stored token");
		return false;
	}

	const decoded = jwtDecode(storedToken);

	if (!decoded || !decoded.exp) {
		console.log("no stored decoded exp");
		return false;
	}

	const now = Date.now() / 1000; // seconds

	if (decoded.exp <= now) {
		console.log("token expired");
		return false;
	}

	return true;
};

export const verifyExistence = async () => {
	const tokenValidity = await checkTokenValidity();
	if (tokenValidity) {
		// Token is valid, proceed
		console.log("existence verified as valid");
	} else {
		console.log("existence verified as invalid");
		await refreshToken();
	}

	return;
};

export const login = async ({ user = null, password = null }) => {
	showLoading({ message: "Logging in" });

	try {
		const res = await api.post("api/auth/login", { user, password });

		if (res.data.status === "success") {
			token.value = res.data.access_token;
			localStorage.setItem("token", token.value);

			return res;
		} else {
			return res;
		}
	} catch (e) {
		return e;
	}
};

export const clearAuth = async () => {
	// Show loading
	showLoading({ message: "Logging out, please wait..." });
	try {
		const res = await api.get("api/auth/logout", {
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});

		// Success alert after logout
		showStatus({ status: "success", title: "Logged Out", message: res.data.message });
	} catch (e) {
		showStatus({ status: "error", title: "Logged Out", message: e.message });
	} finally {
		user.value = null;
		token.value = null;
		router.replace({ name: "login" });
		localStorage.clear();
		clearAdminCache();
		clearLibrarianCache();
	}
};

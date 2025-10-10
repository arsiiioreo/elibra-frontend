// stores/auth.js
import router from "@/router";
import Swal from "sweetalert2";
import api from "@/plugins/axios";

import { showLoading, hideLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { jwtDecode } from "jwt-decode";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { getRequest } from "./requestService";

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

        setUser(res.data);
        return user.value;
    } catch (e) {
        showStatus({ status: "error", title: "Error", message: e });
    } finally {
        hideLoading();
    }
};

export const refreshToken = async () => {
    console.log("executed");

    showLoading({ message: "Validating session, please wait..." });
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
        useToast().error("Session expired, please log in again.");
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

export const clearAuth = async () => {
    // Show loading
    showLoading({ message: "Logging out, please wait..." });
    await new Promise((resolve) => {
        setTimeout(() => {
            user.value = null;
            token.value = null;
            localStorage.clear();
            router.replace({ name: "login" });
            resolve();
        }, 1500);
    });

    // Success alert after logout
    Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been successfully logged out.",
        timer: 1500,
        showConfirmButton: false,
    });
};

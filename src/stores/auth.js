// stores/auth.js
import api from "@/plugins/axios";
import { showStatus } from "@/services/StatusService";
import { jwtDecode } from "jwt-decode";
import { ref } from "vue";

export const user = ref(null);
export const token = ref(localStorage.getItem("token") ? atob(localStorage.getItem("token")) : null);
export const justLoggedIn = ref(false);

export const setUser = (userData) => {
    user.value = userData;
};

export const thisIsMe = async () => {
    if (user.value) return user.value;

    try {
        const res = await api.get("user", {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        });

        setUser(res.data);
        return user.value;
    } catch (e) {
        showStatus({ status: "error", title: "Error", message: e });
    }
};

export const refreshAuth = () => {
    const storedToken = token.value;

    if (!storedToken) {
        // logout();    
        return;
    }

    const decoded = jwtDecode(storedToken);

    if (!decoded || !decoded.exp) {
        // logout();    
        return;
    }

    const now = Date.now() / 1000; // seconds
    const gracePeriod = 5 * 60; // 5 minutes in seconds

    if (decoded.exp <= now) {
        // Already expired
        const expiredSince = now - decoded.exp;

        if (expiredSince <= gracePeriod) {
            // Within 5 mins → try to refresh
            console.log("Token expired but within grace period. Refreshing...");
        } else {
            // Expired long ago → force logout
            console.log("Token expired beyond grace period. Logging out...");
            // logout();    
        }
    } else {
        // Token still valid
        console.log("Token still valid ✅");
        return storedToken;
    }
};

export const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.clear();
};

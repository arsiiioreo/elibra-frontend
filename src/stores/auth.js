// stores/auth.js
import api from "@/plugins/axios";
import { showStatus } from "@/services/StatusService";
import { ref } from "vue";

export const user = ref(null);
const rawToken = localStorage.getItem("token");
export const token = ref(rawToken ? atob(rawToken) : null);

export const setUser = (userData) => {
    user.value = userData;
};

export const thisIsMe = async () => {
    if (user.value) return user.value;

    try {
        const res = await api.get("user", {
            Authorization: `Bearer ${token.value}`,
        });

        if (res) {
            setUser(res.data);
            return user.value;
        }
    } catch (e) {
        showStatus({ status: "error", title: "Error", message: e });
    }
};

export const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.clear();
};


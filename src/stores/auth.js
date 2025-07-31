// stores/auth.js
import { ref } from "vue";

export const user = ref(null);
const rawToken = localStorage.getItem("token");
export const token = ref(rawToken ? atob(rawToken) : null);

export const setUser = (userData) => {
    user.value = userData;
};

export const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.clear();
};


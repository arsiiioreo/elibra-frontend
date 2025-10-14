// All named imports
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import api from "@/plugins/axios";
import swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import Toast, { POSITION, useToast } from "vue-toastification";

// CSS imports
import "vue-toastification/dist/index.css";
import "./css/app.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

// Service imports
import { token, clearAuth } from "@/stores/auth";

const app = createApp(App);
const toast = useToast();

// Global properties
app.config.globalProperties.$jwtDecode = jwtDecode;
app.config.globalProperties.$api = api;
app.config.globalProperties.$token = token;
app.config.globalProperties.$swal = swal;
app.config.globalProperties.$toast = toast;

app.config.globalProperties.$logout = async () => {
    try {
        const result = await swal.fire({
            title: "Logout Confirmation",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            clearAuth();
        }
    } catch (error) {
        swal.fire({
            icon: "error",
            title: "Logout Error",
            text: "Error logging out, please try again.",
        });
    }
};

const options = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
};

app.use(router).use(Toast, options).mount("#app");

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
import { showLoading } from "./services/LoadingService";

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
            // Show loading
            showLoading({ message: "Logging out, please wait..." });
            // swal.fire({
            //     html: `
            //         <img src="/spinner.gif" alt="loading" width="150" />
            //         <h2 class="mb-0">Logging out, please wait...</h2>
            //     `,
            //     showConfirmButton: false,
            //     allowOutsideClick: false,
            //     allowEscapeKey: false,
            //     backdrop: true,
            // });

            await new Promise((resolve) => {
                setTimeout(() => {
                    clearAuth();
                    router.replace({ name: "login" });
                    resolve();
                }, 1500);
            });

            // Success alert after logout
            swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been successfully logged out.",
                timer: 1500,
                showConfirmButton: false,
            });
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

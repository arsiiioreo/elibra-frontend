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
import { confirm } from "@/services/YesNoService";
import { showLoading, hideLoading } from "./services/LoadingService";
import { showStatus } from "./services/StatusService";

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
        const answer = await confirm({
            title: "Logout Confirmation",
            message: "Are you sure you want to logout?",
        });

        if (answer) {
            showLoading({ message: "Logging out..." });

            await new Promise((resolve) => {
                setTimeout(() => {
                    clearAuth();
                    router.replace({ name: "login" });
                    resolve();
                }, 1500);
            });
        }
    } catch (error) {
        showStatus({
            status: "error",
            message: "Error logging out, please try again.",
            title: "Logout Error",
        });
    } finally {
        hideLoading();
    }
};

const options = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
};

app.use(router).use(Toast, options).mount("#app");

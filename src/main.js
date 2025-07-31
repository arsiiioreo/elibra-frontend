import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import api from "@/plugins/axios";
import "./css/app.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import { user, token, setUser, clearAuth } from "@/stores/auth";
import { confirm } from "@/services/YesNoService";
import { showLoading, hideLoading } from "./services/LoadingService";
import { showStatus } from "./services/StatusService";

const app = createApp(App);

app.config.globalProperties.$api = api;
app.config.globalProperties.$token = token;

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

const loadUser = () => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
    showLoading({ message: "Loading user data..." });
    try {
        api.get("/user")
            .then(async (res) => {
                setUser(res.data);
            })
            .catch(() => clearAuth());
    } catch (error) {
        console.log(error);
    } finally {
        hideLoading();
    }
};

if (token.value && !!user.value) {
    loadUser();
}

app.use(router).mount("#app");

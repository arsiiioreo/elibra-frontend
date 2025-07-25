import { createApp } from "vue";
import { confirm } from "@/services/YesNoService";
import App from "./App.vue";
import router from "./router";
import api from "@/plugins/axios";
import "./css/app.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const app = createApp(App);
app.config.globalProperties.$api = api;

const logout = async () => {
    const answer = await confirm({
        title: "Logout Confirmation",
        message: "Are you sure you want to logout?",
    });

    if (answer) {
        localStorage.clear();
        router.replace({ name: "login" });
    }
};
app.config.globalProperties.$logout = logout;

app.use(router).mount("#app");

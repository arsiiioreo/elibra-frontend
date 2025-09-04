<template>
    <div id="loginPage" class="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-center p-md-0 p-4" style="background-color: #e5e5e5">
        <div class="container mb-5">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-xl-9">
                    <div class="row g-0 shadow rounded-4 overflow-hidden bg-white">
                        <!-- Left Side -->
                        <div class="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center bg-success text-white p-4">
                            <div class="d-flex flex-column justify-content-center align-items-center my-5">
                                <img src="@/assets/book.png" alt="E-Libra Logo" class="mb-3" style="width: 80px" />
                                <h1 class="fw-bold mb-0">E-Libra</h1>
                                <p class="mt-3 mb-4 text-center small">“Enhanced Library Integrated Book and Resources Automation”</p>
                                <div class="fs-3 mb-4">● ● ● ● ●</div>
                            </div>
                            <div class="text-center small">
                                Developed By<br />
                                <span class="fw-bold">FSJinx</span>
                            </div>
                        </div>
                        <!-- Right Side -->
                        <div class="col-md-6 p-lg-5 p-4 d-flex flex-column justify-content-center">
                            <div class="d-flex align-items-center justify-content-evenly mb-3 my-md-1">
                                <img src="@/assets/ISU.png" alt="ISU Logo" style="width: 60px; height: 60px; object-fit: contain" />
                                <h2 class="fw-bold text-center" style="color: #222">LOGIN</h2>
                                <img src="@/assets/LIBRARY.png" alt="ISU Logo" style="width: 60px; height: 60px; object-fit: contain" />
                            </div>
                            <form class="d-flex flex-column gap-2 mt-md-4" @submit.prevent="login" method="POST">
                                <div class="btn-group btn-group-sm border border-1 border-success p-1 mb-2 rounded" role="group" aria-label="Role selection">
                                    <button type="button" class="btn" :class="[form.role === 'admin' ? 'btn-success' : '']" @click="form.role = 'admin'">Admin</button>
                                    <button type="button" class="btn" :class="[form.role === 'student' ? 'btn-success' : '']" @click="form.role = 'student'">Student</button>
                                </div>

                                <label class="fw-medium">Username</label>
                                <input type="text" class="form-control mb-2" v-model="form.user" placeholder="Enter your username" autocomplete="email" required />
                                <label class="fw-medium">Password</label>
                                <div class="position-relative">
                                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password" class="form-control mb-2 pe-5" placeholder="Enter your password" required />
                                    <div v-if="form.password" class="position-absolute top-0 end-0 m-2 me-3">
                                        <i class="bi" :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" @click="showPassword = !showPassword" style="cursor: pointer"></i>
                                    </div>
                                </div>
                                <a href="#" class="text-primary text-decoration-none small text-end w-100">Forgot Password?</a>
                                <button type="submit" class="btn btn-success fw-bold mt-2">LOGIN</button>
                            </form>
                            <div class="text-center mt-3 text-muted small">Don’t have an account yet? <a href="/register" class="fw-bold text-decoration-none text-success">Register</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-auto">
                    <span class="small text-muted">
                        <i class="bi bi-info-circle me-1"></i>
                        This is a property of the Isabela State University – Main Campus. This is a centralized Integrated Library Management System.
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { hideLoading, showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { token } from "@/stores/auth";

export default {
    data() {
        return {
            form: {
                user: "",
                password: "",
                role: "admin",
            },
            isLoading: false,
            showPassword: false,

            // Status Popup Props
            showPopup: false,
            statPop: {
                status: "",
                title: "",
                message: "",
            },
        };
    },
    methods: {
        async login() {
            try {
                showLoading({ message: "Logging in, please wait..." });
                const loginResponse = await this.$api.post("/auth/login", this.form);

                if (loginResponse) {
                    if (loginResponse.data.status === "success") {
                        token.value = loginResponse.data.access_token;

                        localStorage.setItem("token", btoa(loginResponse.data.access_token));

                        const home = {
                            0: "SuperAdmin",
                            1: "Admin",
                            2: "Student",
                        };

                        this.$router.push({
                            name: home[loginResponse.data.redirect],
                        });
                    } else {
                        console.log(loginResponse.data.message);
                    }
                }
            } catch (error) {
                showStatus({ status: "error", title: "Login Failed", message: error.response?.data?.message || "An unexpected error occurred. Please try again later." });
            } finally {
                hideLoading();
            }
        },
    },
};
</script>


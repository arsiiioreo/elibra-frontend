<template>
    <div id="loginPage" class="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-center p-md-0 p-4" style="background-color: #e5e5e5">
        <div class="container mb-5">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-xl-7">
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
                                <img src="@/assets/isu.png" alt="ISU Logo" style="width: 60px; height: 60px; object-fit: contain" />
                                <h2 class="fw-bold text-center mx-3" style="color: #222">LOGIN</h2>
                                <img src="@/assets/library.png" alt="ISU Logo" style="width: 60px; height: 60px; object-fit: contain" />
                            </div>
                            <form class="d-flex flex-column gap-2 mt-md-4" @submit.prevent="login" method="POST">
                                <label class="fw-medium">Username</label>
                                <input type="text" class="form-control mb-2" v-model="form.user" placeholder="Enter your username" autocomplete="email" required />
                                <label class="fw-medium">Password</label>
                                <div class="position-relative">
                                    <input :type="showPassword ? 'text' : 'password'" v-model="form.password" class="form-control mb-2 pe-5" placeholder="Enter your password" required />
                                    <div v-if="form.password" class="position-absolute top-0 end-0 m-2 me-3">
                                        <i class="bi" :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" @click="showPassword = !showPassword" style="cursor: pointer"></i>
                                    </div>
                                </div>
                                <a href="#" class="text-decoration-none small text-end w-100 text-prime">Forgot Password?</a>
                                <button type="submit" class="btn btn-success mt-2 text-center" :disabled="isLoading">
                                    <div class="spinner-border" role="status" v-if="isLoading" style="width: 1rem; height: 1rem; border-width: 0.15em; vertical-align: middle; margin-right: 5px">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <span v-else>Login</span>
                                </button>
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
import { justLoggedIn, token } from "@/stores/auth";
import { postRequest } from "@/stores/requestService";
import { jwtDecode } from "jwt-decode";

export default {
    data() {
        return {
            form: {
                user: "",
                password: "",
            },
            isLoading: false,
            showPassword: false,
        };
    },
    methods: {
        async login() {
            this.isLoading = true;
            try {
                const loginResponse = await postRequest("auth/login", this.form);

                if (loginResponse.data.status === "success") {
                    token.value = loginResponse.data.access_token;
                    localStorage.setItem("token", loginResponse.data.access_token);
                    justLoggedIn.value = true;

                    const decoded = jwtDecode(token.value);
                    const home = {
                        0: "Admin",
                        1: "Librarian",
                    };

                    this.$router.push({ name: home[decoded.role] });
                }
            } catch (error) {
                const data = error.response?.data;
                console.log(data);

                if (data.errors) {
                    const firstError = Object.values(data.errors)[0];
                    this.$toast.error(firstError);
                } else {
                    this.$toast.error("An error occured, please try again.");
                }
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>

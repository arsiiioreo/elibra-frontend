<template>
	<div id="loginPage" class="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-center p-md-0 p-4" style="background-color: #e5e5e5">
		<div class="container mb-5">
			<div class="row justify-content-center">
				<div class="col-lg-10 col-xl-7">
					<div class="row g-0 shadow rounded-4 overflow-hidden bg-white" style="height: 500px">
						<!-- Left Side -->
						<div class="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center bg-success text-white p-4">
							<div class="d-flex flex-column justify-content-center align-items-center my-5">
								<img src="@/assets/book.png" alt="E-Libra Logo" class="mb-3" style="width: 80px" />
								<h1 class="fw-bold mb-0 text-white">E-Libra</h1>
								<p class="mt-3 mb-4 text-center small">“Enhanced Library Integrated Book and Resources Automation”</p>
								<div class="fs-3 mb-4">● ● ● ● ●</div>
							</div>
							<div class="text-center small">
								Developed By<br />
								<span class="fw-bold">FSJinx</span>
							</div>
						</div>
						<!-- Right Side -->
						<div class="col-md-6 p-md-5 p-4 d-flex flex-column justify-content-center">
							<div class="d-flex align-items-center justify-content-evenly mb-3 mb-md-4 my-md-1">
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
import { justLoggedIn, login, token } from "@/stores/auth";
import { jwtDecode } from "jwt-decode";
import { thisIsMe } from "../../stores/auth";
import { showStatus } from "@/services/StatusService";

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
				const res = await login(this.form);
				this.isLoading = false;

				// --- SUCCESS PATH ---
				if (res.data?.status === "success") {
					justLoggedIn.value = true;

					const decoded = jwtDecode(token.value);

					// Patron trying to access web
					if (decoded.role === "2") {
						return showStatus({
							status: "info",
							title: "Oops",
							message: "The web version is for administrative users. Please use the mobile app for patron features.",
						});
					}

					// Identify the user then set their session
					await thisIsMe();

					// redirect — stick to ONE destination unless role-based
					this.$router.push({ name: "landing" });

					return;
				}

				// --- FAILURE PATH (but handled by backend) ---
				if (res?.status === 403) {
					return showStatus({
						status: "error",
						title: "Account Locked",
						message: res.response.data.message,
					});
				}

				return showStatus({
					status: "error",
					title: "Error",
					message: res.data?.message ?? "Login failed.",
				});
			} catch (err) {
				this.isLoading = false;

				return showStatus({
					status: "error",
					title: "Network Error",
					message: err?.response?.data?.message ?? "Please check your connection.",
				});
			}
		},
	},
};
</script>

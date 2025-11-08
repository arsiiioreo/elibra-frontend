<template>
	<div class="vh-100 w-100 d-flex align-items-center justify-content-center bg-light">
		<div class="container text-center mb-5">
			<!-- Header -->
			<div class="d-flex align-items-center justify-content-center gap-3 mb-5">
				<img src="@/assets/logo.png" alt="Logo" width="65" />
				<h2 class="text-prime fw-bold mb-0 me-5">Choose an app to open</h2>
			</div>

			<!-- Buttons -->
			<div class="d-flex flex-wrap justify-content-center" style="gap: 5rem">
				<router-link :to="{ name: 'OPAC' }" class="app-btn">
					<i class="bi bi-book display-5"></i>
					<span>OPAC</span>
				</router-link>

				<router-link :to="{ name: 'Attendance' }" class="app-btn" v-if="url">
					<i class="bi bi-person-check display-5"></i>
					<span>ATTENDANCE</span>
				</router-link>

				<router-link :to="{ name: url }" class="app-btn" v-if="url">
					<i class="bi bi-speedometer2 display-5"></i>
					<span>DASHBOARD</span>
				</router-link>

				<router-link :to="{ name: 'login' }" class="app-btn" v-else>
					<i class="bi bi-door-open display-5"></i>
					<span>LOGIN</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { token } from "@/stores/auth";
import { jwtDecode } from "jwt-decode";

export default {
	name: "AppChooser",
	created() {
		this.generateUrl();
	},
	data() {
		return {
			url: null,
		};
	},
	methods: {
		generateUrl() {
			const decodedToken = token.value ? jwtDecode(token.value) : null;

			if (decodedToken && decodedToken.role) {
				const role = decodedToken.role;
				if (!role) {
					this.url = null;
				} else if (role === "0") {
					this.url = "Admin";
				} else if (role === "1") {
					this.url = "Librarian";
				}
			} else {
				this.url = null;
			}
			console.log(this.url);
		},
	},
};
</script>

<style scoped>
.text-prime {
	color: #1e8449; /* Change to your primary theme color */
}

.app-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	width: 180px;
	height: 180px;
	border: 2px solid #0eb55c;
	border-radius: 1rem;
	color: #0eb55c;
	text-decoration: none;
	font-weight: 600;
	background-color: white;
	transition: all 0.05s ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.app-btn:hover {
	background-color: #0eb55c;
	color: white;
	transform: translateY(-3px);
	box-shadow: 0 6px 16px rgba(25, 135, 84, 0.25);
}

.app-btn i {
	transition: transform 0.05s ease;
}

.app-btn:hover i {
	transform: scale(1.15);
}

@media (max-width: 768px) {
	.app-btn {
		width: 125px;
		height: 125px;
	}
	.app-btn span {
		font-size: 0.9rem;
	}
}
</style>

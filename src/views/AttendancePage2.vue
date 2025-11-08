<template>
	<div class="d-flex flex-column justify-content-center align-items-center vh-100 position-relative bg-dark text-white overflow-hidden">
		<!-- Glowing gradient background -->
		<div class="position-absolute top-0 start-0 w-100 h-100 gradient-bg"></div>

		<router-link :to="{ name: 'landing' }" class="btn rounded-pill btn-outline-prime px-3 position-absolute top-0 end-0 m-5"><i class="bi bi-house me-2"></i>Home</router-link>

		<!-- Glass card -->
		<div class="card glass-card border-0 shadow-lg text-center p-5" style="max-width: 420px; z-index: 10">
			<div class="mb-4">
				<img src="/logo.png" alt="ISU Logo" class="mb-3" style="width: 60px" />
				<h2 class="fw-bold mb-0 text-light">e-Attendance</h2>
				<small class="text-secondary">Log your presence with ID number</small>
			</div>

			<!-- Input -->
			<div class="form-floating mb-4">
				<input type="text" v-model="idNumber" class="form-control text-center fw-semibold fs-5 rounded-4 border-0" id="idInput" placeholder="Enter ID Number" @input="validateInput" @keyup.enter="submitAttendance" />
				<label for="idInput">ID Number</label>
			</div>

			<div v-if="error" class="text-danger small mb-3 fade-in">{{ error }}</div>

			<!-- Button -->
			<button class="btn btn-lg btn-primary w-100 py-2 fw-bold rounded-4 position-relative overflow-hidden" :disabled="loading || !isValid" @click="submitAttendance">
				<span v-if="!loading">Log Attendance</span>
				<span v-else>
					<span class="spinner-border spinner-border-sm me-2" role="status"></span>
					Logging...
				</span>
			</button>

			<!-- Success -->
			<transition name="fade">
				<div v-if="successMessage" class="alert alert-success mt-4 rounded-4 shadow-sm fade-in">✅ {{ successMessage }}</div>
			</transition>
		</div>

		<footer class="text-center mt-4 small opacity-75" style="z-index: 5">© {{ new Date().getFullYear() }} Isabela State University | e-Libra</footer>
	</div>
</template>

<script setup>
import { ref } from "vue";

const idNumber = ref("");
const error = ref("");
const loading = ref(false);
const successMessage = ref("");
const isValid = ref(false);

function validateInput() {
	idNumber.value = idNumber.value.replace(/\D/g, ""); // Only digits
	if (idNumber.value.length < 9) {
		error.value = "ID number must be at least 9 digits.";
		isValid.value = false;
	} else {
		error.value = "";
		isValid.value = true;
	}
}

async function submitAttendance() {
	if (!isValid.value) return;
	loading.value = true;
	successMessage.value = "";
	error.value = "";

	await new Promise((r) => setTimeout(r, 1500));

	const success = Math.random() > 0.1;

	loading.value = false;

	if (success) {
		successMessage.value = `Welcome! Attendance logged at ${new Date().toLocaleTimeString()}`;
		idNumber.value = "";
		isValid.value = false;
	} else {
		error.value = "Invalid ID or already logged in today.";
	}
}
</script>

<style scoped>
.gradient-bg {
	background: radial-gradient(circle at top left, rgba(34, 215, 152, 0.4), transparent 40%), radial-gradient(circle at bottom right, rgba(129, 200, 31, 0.3), transparent 40%), #054a3d;
	filter: blur(50px);
	z-index: 0;
}

.glass-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	animation: float 5s ease-in-out infinite alternate;
}

@keyframes float {
	0% {
		transform: translateY(0px);
	}
	100% {
		transform: translateY(-10px);
	}
}

.fade-in {
	animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

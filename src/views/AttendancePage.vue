<template>
	<div class="d-flex flex-column justify-content-center align-items-center vh-100 position-relative bg-dark text-white overflow-hidden">
		<!-- Gradient Background -->
		<div class="position-absolute top-0 start-0 w-100 h-100 gradient-bg"></div>

		<!-- LOGIN CARD -->
		<div class="card glass-card p-4 fade-in text-white overflow-hidden" style="width: 400px; z-index: 5" v-if="!branch_id">
			<div class="mb-4 text-center text-light">
				<img src="/logo.png" alt="ISU Logo" class="mb-3" style="width: 60px" />
				<h2 class="fw-bold mb-0">Login</h2>
				<small class="text-secondary">Log in as librarian to access the page.</small>
			</div>

			<form class="vstack gap-4" @submit.prevent="login">
				<!-- Username -->
				<div class="form-floating">
					<input type="text" v-model="username" class="form-control border-0 text-center" id="username" placeholder="Enter Username" required />
					<label for="username">Username</label>
				</div>

				<!-- Password -->
				<div class="form-floating">
					<input type="password" v-model="password" class="form-control border-0 text-center" id="password" placeholder="Enter Password" required />
					<label for="password">Password</label>
				</div>

				<div v-if="error" class="text-danger small mb-3 fade-in">{{ error }}</div>

				<!-- Login Button -->
				<button class="btn btn-lg btn-primary w-100 py-2 fw-bold position-relative overflow-hidden" :disabled="loading" type="submit">
					<span v-if="!loading">Login</span>
					<span v-else>
						<span class="spinner-border spinner-border-sm me-2" role="status"></span>
						Logging in...
					</span>
				</button>
			</form>
		</div>

		<!-- MAIN CARD -->
		<div class="card glass-card p-4 fade-in text-white overflow-hidden" style="width: 80%; max-width: 1000px; z-index: 5" v-else>
			<div class="row align-items-stretch overflow-hidden">
				<!-- Chart Section -->
				<div class="col-md-7">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<h5 class="text-uppercase text-white mb-0">
							<router-link :to="{ name: 'landing' }" class="mt-2 text-white me-3">
								<i class="bi bi-house fs-5"></i>
							</router-link>
							Student Entries per Hour
						</h5>
						<i class="bi bi-bar-chart-line fs-4 text-prime"></i>
					</div>
					<canvas id="entryChart" height="300"></canvas>
				</div>

				<!-- Attendance Form Section -->
				<div class="col-md-5 d-flex flex-column">
					<div class="hstack mb-3">
						<img src="@/assets/logo.png" alt="Logo" width="50" />
						<h5 class="mb-0 ms-2 me-auto">Attendance Log</h5>
						<div class="text-end">
							<h4 class="fw-semibold mb-0">{{ page.time }}</h4>
							<p class="mb-0 opacity-75">{{ page.date }}</p>
						</div>
					</div>

					<form @submit.prevent="handleSubmit">
						<div class="vstack mb-3 w-100">
							<label class="form-label small opacity-75">Student ID</label>
							<div class="hstack gap-2">
								<input type="text" id="studentId" v-model="form.id_number" ref="studentIdInput" class="form-control fs-5" placeholder="Enter Student ID" required autocomplete="off" @focus="isFocused = true" @blur="isFocused = false" />
								<button type="submit" class="btn btn-outline-prime px-3 fs-5" :disabled="!form.id_number.trim()">Submit</button>
							</div>
						</div>
					</form>

					<div class="card h-100 w-100 p-3 overflow-hidden" :class="{ glow: studentData }">
						<!-- Patron not found -->
						<div v-if="toastVisible && toastMessage" class="vstack justify-content-center align-items-center text-danger h-100 w-100">
							<i class="bi bi-person-fill-x display-1"></i>
							{{ toastMessage }}
						</div>

						<!-- Student found -->
						<div v-if="toastVisible && studentData" class="vstack h-100 justify-content-end">
							<div class="hstack justify-content-center w-100 h-100 position-relative">
								<div class="position-absolute top-0 start-0 w-100 rounded-top bg-prime" style="height: 9rem"></div>
								<div class="d-flex align-items-center shadow-sm rounded-circle border position-relative" :class="[studentData?.patron.user.pending_registration_approval == 1 ? 'border-info' : 'border-success']" style="width: 150px; height: 150px; z-index: 2; background: white">
									<img :src="studentData?.patron.user.profile_picture" class="rounded-circle" style="width: 100%; height: 100%; object-fit: contain" />
									<span class="position-absolute bottom-0 end-0 me-2 badge bg-info rounded-circle p-1" title="Verified" v-if="studentData?.patron.user.email_verified_at"><i class="bi bi-check fw-bold fs-5"></i></span>
								</div>
							</div>

							<table class="table mt-auto">
								<tbody>
									<tr>
										<th>Name</th>
										<td class="text-capitalize">{{ studentData?.patron.user.last_name + ", " + studentData?.patron.user.first_name + (studentData?.patron.user.middle_initial ? " " + studentData?.patron.user.middle_initial + "." : "") }}</td>
									</tr>
									<tr>
										<th>ID Number</th>
										<td>{{ studentData?.patron.id_number }}</td>
									</tr>
									<tr>
										<th>Patron Type</th>
										<td>{{ studentData?.patron.patron_type.name }}</td>
									</tr>
								</tbody>
								<tbody v-if="studentData?.patron.patron_type.id == 3">
									<tr>
										<th>Organization/Campus</th>
										<td>{{ studentData?.patron.external_organization }}</td>
									</tr>
								</tbody>
								<tbody v-else>
									<tr>
										<th>Program</th>
										<td>{{ studentData?.patron.program.abbrev }}</td>
									</tr>
									<tr>
										<th>Department</th>
										<td>{{ studentData?.patron.program.department.abbrev }}</td>
									</tr>
								</tbody>
								<tbody>
									<tr>
										<th>Time In</th>
										<td>{{ studentData?.created_at }}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- Default -->
						<div v-if="!toastVisible && !studentData" class="vstack justify-content-center align-items-center text-muted h-100">
							<p class="mb-0">No Data Available.</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="text-center mt-4 small opacity-75" style="z-index: 5">© {{ new Date().getFullYear() }} Isabela State University | e-Libra</footer>
	</div>
</template>

<script>
import { markRaw } from "vue";
import Chart from "chart.js/auto";
import profile_default from "@/assets/profile_default.png";
import api from "@/plugins/axios";
import { showLoading } from "@/services/LoadingService";
import { login, token } from "@/stores/auth";
import { showStatus } from "@/services/StatusService";
import { postRequest } from "@/stores/requestService";

export default {
	name: "AttendancePage",

	data() {
		return {
			username: "",
			password: "",
			error: "",
			loading: false,
			isFocused: false,
			form: {
				id_number: "",
				status: "Check-in",
			},
			page: {
				time: "",
				date: "",
			},
			branch_id: null,
			profile_picture: profile_default,
			studentData: null,
			toastMessage: "",
			toastVisible: false,

			entryChart: null,
			hours: [],
			timer: null,
			entries: Array(10).fill(0),
		};
	},

	methods: {
		forceFocus() {
			this.$nextTick(() => {
				const el = this.$refs.studentIdInput;
				if (el) el.focus();
			});
		},

		updateDateTime() {
			const now = new Date();
			this.page.time = now.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
			this.page.date = now.toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		},

		async handleSubmit() {
			if (!this.form.id_number) return;

			clearTimeout(this.timer);

			const id = document.getElementById("studentId");
			id.select();

			const res = await postRequest("attendance/record", { branch_id: this.branch_id, id_number: this.form.id_number });
			this.toastVisible = false;
			this.toastMessage = "";

			if (res.data.status) {
				this.studentData = res.data.data;
				this.toastVisible = true;
				this.fetchLogs();
				setTimeout(() => {
					this.studentData = null;
				}, 5000);
			} else {
				this.toastMessage = res.data.message;
				this.toastVisible = true;
			}

			this.clearInput();
			id.focus();
		},

		clearInput() {
			this.timer = setTimeout(() => {
				this.form.id_number = "";
				this.toastVisible = false;
				this.toastMessage = "";
				this.studentData = null;
			}, 10000);
		},

		initChart() {
			const ctx = document.getElementById("entryChart");
			if (!ctx) return;

			if (this.entryChart) this.entryChart.destroy();

			this.entryChart = markRaw(
				new Chart(ctx, {
					type: "line",
					data: {
						labels: this.hours,
						datasets: [
							{
								label: "Number of Entries",
								data: this.entries,
								backgroundColor: "rgba(34, 215, 152, 0.6)",
								borderColor: "#22d798",
								borderWidth: 1,
							},
						],
					},
					options: {
						scales: {
							x: { ticks: { color: "#fff" } },
							y: {
								beginAtZero: true,
								ticks: { color: "#fff" },
								min: 0,
								suggestedMax: 10,
							},
						},
						plugins: {
							legend: { labels: { color: "#fff" } },
						},
					},
				})
			);
		},

		async fetchLogs() {
			try {
				const res = await api.get("api/attendance/logs", { params: { branch_id: 1 } });
				const logs = res.data;

				this.hours = logs.map((item) => item.hour);
				this.entries = logs.map((item) => item.total);

				if (this.entryChart) {
					this.entryChart.data.labels = this.hours;
					this.entryChart.data.datasets[0].data = this.entries;
					this.entryChart.update();
				}
			} catch (err) {
				console.error("Failed to fetch logs:", err);
			}
		},

		async login() {
			showLoading({ message: "Logging in" });
			try {
				const res = await login({ user: this.username, password: this.password });

				token.value = res.data.access_token;
			} catch (e) {
				showStatus({ status: "error", title: "Error", message: e.message });
			}
		},
	},

	mounted() {
		this.updateDateTime();
		setInterval(this.updateDateTime, 1000);
		this.branch_id = localStorage.getItem("branch_id") ?? null;

		this.forceFocus();
	},

	watch: {
		isFocused(newVal) {
			if (!newVal) {
				this.forceFocus();
			}
		},

		branch_id(newVal) {
			if (newVal) {
				this.$nextTick(() => {
					this.initChart();
					this.fetchLogs();
					setInterval(this.fetchLogs, 60000);
				});
			}
		},

		"form.id_number"() {
			clearTimeout(this.timer);
			this.clearInput();
		},
	},
};
</script>

<style scoped>
.gradient-bg {
	background: radial-gradient(circle at top left, rgba(34, 215, 152, 0.4), transparent 40%), radial-gradient(circle at bottom right, rgba(129, 200, 31, 0.3), transparent 40%), #054a3d;
	filter: blur(30px);
	z-index: 0;
}

.glass-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.14);
	border-radius: 1rem;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	animation: float 5s ease-in-out infinite alternate;
}

.form-group {
	margin-bottom: 0.5rem;
}

.fade-in {
	animation: fadeIn 0.8s ease forwards;
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

@keyframes fadeOut {
	from {
		opacity: 1;
		transform: translateY(0);
	}
	to {
		opacity: 0;
		transform: translateY(-10px);
	}
}

@keyframes float {
	0% {
		transform: translateY(0px);
	}
	100% {
		transform: translateY(-10px);
	}
}

@keyframes glow {
	0% {
		box-shadow: 0 0 0 rgba(34, 215, 152, 0);
	}
	50% {
		box-shadow: 0 0 10px rgba(38, 238, 168, 1);
	}
	100% {
		box-shadow: 0 0 0 rgba(34, 215, 152, 0);
	}
}

.glow {
	animation: glow 1s ease-out;
}
</style>

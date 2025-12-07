<template>
	<div class="h-100 w-100 vstack overflow-auto p-2">
		<!-- Top row: Library Info + Status Cards -->
		<div class="row g-3 mb-3 d-flex mb-5">
			<!-- Library info card -->
			<div class="col-md-6">
				<div class="card shadow-sm">
					<div class="card-body hstack align-items-start p-4 gap-2">
						<!-- Icon -->
						<div class="text-bg-success p-2 me-3 rounded">
							<i class="bi bi-buildings display-3"></i>
						</div>
						<!-- Library Details -->
						<div class="vstack">
							<h3>{{ info?.librarian?.section?.branch?.name || "Loading..." }}</h3>
							<strong>Librarian: {{ info?.first_name || "Unknown" }}</strong>
							<span>Campus: {{ info?.campus ? info?.campus?.name + " (" + info?.campus?.abbrev + ")" : "Loading..." }}</span>
						</div>
						<!-- Link to details -->
						<router-link :to="{ name: 'LibrarianInformation' }" class="ms-auto">View Details</router-link>
					</div>
				</div>
			</div>

			<!-- Status cards (Borrowed Books, Patron Logs, Overdue) -->
			<div class="col-md-3" v-for="(item, index) in statCards" :key="index">
				<div class="card h-100 shadow-sm">
					<div class="card-body vstack justify-content-between">
						<!-- Card Title -->
						<strong class="mb-4">{{ item?.title }}</strong>
						<!-- Card Value + Trend Icon -->
						<div class="hstack">
							<i
								class="bi fs-2 me-2"
								:class="{
									'bi-graph-up-arrow text-success': item?.value?.new > item?.value?.old,
									'bi-graph-down-arrow text-danger': item?.value?.new < item?.value?.old,
									'bi-arrow-down-up': item?.value?.new === item?.value?.old,
								}"
							></i>
							<div class="ms-auto">
								<span class="me-2 fs-1">{{ item?.value?.new }}</span>
								<span class="small text-success" v-if="item?.value?.new > item?.value?.old">(+{{ item?.value?.new - item?.value?.old }} new)</span>
								<span class="small text-danger" v-else-if="item?.value?.new < item?.value?.old">(-{{ item?.value?.old - item?.value?.new }})</span>
								<span class="small text-muted" v-else>(-)</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Library Statistics Section -->
		<div class="row g-3 mb-5 d-flex">
			<h3 class="fw-bold">Library Statistics</h3>

			<!-- Latest Acquisition -->
			<div class="col-md-4">
				<div class="card shadow-sm">
					<div class="card-header">Latest Acquisition</div>
					<div class="card-body">
						<!-- Table for latest acquisitions -->
						<table class="table table-striped table-hover mb-0">
							<thead>
								<tr>
									<th>Title</th>
									<th>Type</th>
									<th>Year</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(acq, idx) in latestAcquisitions" :key="idx">
									<td>{{ acq.title }}</td>
									<td>{{ acq.type }}</td>
									<td>{{ acq.year }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Circulation Logs -->
			<div class="col-md-8">
				<div class="card shadow-sm">
					<div class="card-header">Circulation Logs</div>
					<div class="card-body">
						<!-- Table for circulation -->
						<table class="table table-striped table-hover mb-0">
							<thead>
								<tr>
									<th>Patron</th>
									<th>Book</th>
									<th>Borrowed On</th>
									<th>Returned On</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(log, idx) in circulationLogs" :key="idx">
									<td>{{ log.patron }}</td>
									<td>{{ log.book }}</td>
									<td>{{ log.borrowed_at }}</td>
									<td>{{ log.returned_at || "-" }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!-- Patron Statistics Section -->
		<div class="row g-3 mb-5">
			<h3 class="fw-bold">Patron Statistics</h3>

			<!-- Gender Distribution Chart -->
			<div class="col-md-6">
				<div class="card shadow-sm">
					<div class="card-header">Gender Distribution Chart</div>
					<div class="card-body">
						<!-- Placeholder for chart library (Chart.js, ApexCharts, etc.) -->
						<canvas id="genderChart" height="200"></canvas>
					</div>
				</div>
			</div>

			<!-- Attendance Chart -->
			<div class="col-md-6">
				<div class="card shadow-sm">
					<div class="card-header">Attendance Chart</div>
					<div class="card-body">
						<!-- Line chart of today's attendance -->
						<canvas id="attendanceChart" height="200"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";
import { getRequest } from "@/stores/requestService";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
	mounted() {
		this.libraryInfo();
		this.loadDashboard();
		this.renderCharts(); // render charts after data is ready
	},

	data() {
		return {
			info: null,
			statCards: [
				{ title: "Card 1", value: { old: 0, new: 1 } },
				{ title: "Card 2", value: { old: 1, new: 0 } },
				{ title: "Card 3", value: { old: 0, new: 0 } },
			],
			latestAcquisitions: [
				{ title: "Intro to Algorithms", type: "Book", year: 2023 },
				{ title: "Advanced Vue.js", type: "Book", year: 2024 },
				{ title: "Intro to Algorithms", type: "Book", year: 2023 },
				{ title: "Advanced Vue.js", type: "Book", year: 2024 },
				{ title: "Intro to Algorithms", type: "Book", year: 2023 },
				{ title: "Advanced Vue.js", type: "Book", year: 2024 },
				{ title: "Intro to Algorithms", type: "Book", year: 2023 },
				{ title: "Advanced Vue.js", type: "Book", year: 2024 },
				{ title: "Intro to Algorithms", type: "Book", year: 2023 },
				{ title: "Advanced Vue.js", type: "Book", year: 2024 },
			],
			circulationLogs: [
				{ patron: "John Doe", book: "Intro to Algorithms", borrowed_at: "2025-11-23", returned_at: null },
				{ patron: "Jane Smith", book: "Advanced Vue.js", borrowed_at: "2025-11-22", returned_at: "2025-11-23" },
				{ patron: "John Doe", book: "Intro to Algorithms", borrowed_at: "2025-11-23", returned_at: null },
				{ patron: "Jane Smith", book: "Advanced Vue.js", borrowed_at: "2025-11-22", returned_at: "2025-11-23" },
				{ patron: "John Doe", book: "Intro to Algorithms", borrowed_at: "2025-11-23", returned_at: null },
				{ patron: "Jane Smith", book: "Advanced Vue.js", borrowed_at: "2025-11-22", returned_at: "2025-11-23" },
				{ patron: "John Doe", book: "Intro to Algorithms", borrowed_at: "2025-11-23", returned_at: null },
				{ patron: "Jane Smith", book: "Advanced Vue.js", borrowed_at: "2025-11-22", returned_at: "2025-11-23" },
				{ patron: "John Doe", book: "Intro to Algorithms", borrowed_at: "2025-11-23", returned_at: null },
				{ patron: "Jane Smith", book: "Advanced Vue.js", borrowed_at: "2025-11-22", returned_at: "2025-11-23" },
			],
			attendanceLog: [
				{ time: "08:00", count: 5 },
				{ time: "09:00", count: 15 },
				{ time: "10:00", count: 25 },
				{ time: "11:00", count: 20 },
				{ time: "12:00", count: 30 },
				{ time: "13:00", count: 22 },
				{ time: "14:00", count: 18 },
				{ time: "15:00", count: 12 },
				{ time: "16:00", count: 8 },
				{ time: "17:00", count: 25 },
			],
			genderMap: [
				{ patron_type: "Student", attendance: { male: 34, female: 45, other: 2 } },
				{ patron_type: "Faculty", attendance: { male: 12, female: 8, other: 0 } },
				{ patron_type: "Guest", attendance: { male: 43, female: 21, other: 5 } },
			],
		};
	},

	methods: {
		async libraryInfo() {
			this.info = await thisIsMe();
		},

		async loadDashboard() {
			const a = await getRequest("l");
			this.statCards = a.data.data.status_cards;
			console.log(this.statCards);
		},

		renderCharts() {
			// --- Attendance Chart ---
			const attendanceCtx = document.getElementById("attendanceChart").getContext("2d");
			new Chart(attendanceCtx, {
				type: "line",
				data: {
					labels: this.attendanceLog.map((a) => a.time),
					datasets: [
						{
							label: "Attendance",
							data: this.attendanceLog.map((a) => a.count),
							borderColor: "#198754",
							backgroundColor: "rgba(25, 135, 84, 0.1)",
							tension: 0.3,
							fill: true,
							pointRadius: 5,
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: { display: true, position: "top" },
						title: { display: true, text: "Today's Attendance" },
					},
					scales: { y: { beginAtZero: true } },
				},
			});

			// --- Gender Distribution Clustered Column Chart ---
			const genderCtx = document.getElementById("genderChart").getContext("2d");

			new Chart(genderCtx, {
				type: "bar",
				data: {
					labels: this.genderMap.map((g) => g.patron_type), // X-axis: Patron types
					datasets: [
						{
							label: "Male",
							data: this.genderMap.map((g) => g.attendance.male),
							backgroundColor: "#3292ff",
						},
						{
							label: "Female",
							data: this.genderMap.map((g) => g.attendance.female),
							backgroundColor: "#ff32b0",
						},
						{
							label: "Other",
							data: this.genderMap.map((g) => g.attendance.other),
							backgroundColor: "#6c757d",
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: { position: "bottom" },
						title: { display: true, text: "Patron Gender Distribution" },
					},
					scales: {
						x: { stacked: false }, // clustered
						y: { beginAtZero: true, stacked: false },
					},
				},
			});
		},
	},
};
</script>

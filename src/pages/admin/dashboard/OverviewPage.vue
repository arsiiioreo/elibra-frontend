<template>
	<div class="container-fluid overflow-auto">
		<div class="overview-section mb-3">
			<OverviewComponent :data="cardsData" :fetching="fetchingData" />
		</div>

		<div class="performance-section mb-5">
			<h2 class="mb-3">Campus Performance</h2>
			<div class="row">
				<div class="col-md-6">
					<canvas id="studentsChart"></canvas>
				</div>
				<div class="col-md-6">
					<canvas id="performanceChart"></canvas>
				</div>
			</div>
		</div>

		<div class="table-section">
			<h2 class="mb-3">Performance Table</h2>
			<table class="table table-striped table-bordered">
				<thead class="thead-light">
					<tr>
						<th>Campus</th>
						<th>Students</th>
						<th>Staff</th>
						<th>Performance</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Campus A</td>
						<td>1,200</td>
						<td>120</td>
						<td>85%</td>
					</tr>
					<tr>
						<td>Campus B</td>
						<td>950</td>
						<td>100</td>
						<td>78%</td>
					</tr>
					<tr>
						<td>Campus C</td>
						<td>1,500</td>
						<td>150</td>
						<td>92%</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import { onMounted } from "vue";
import Chart from "chart.js/auto";
import OverviewComponent from "@/components/pages/admin/dashboard/overview/StatusCards.vue";
import { getRequest } from "@/stores/requestService";
import { showStatus } from "@/services/StatusService";

export default {
	name: "DashboardPage",
	components: {
		OverviewComponent,
	},
	data() {
		return {
			fetchingData: false,

			cardsData: {
				campuses: 0,
				orders: 345,
				revenue: "$12,345",
				feedback: 123,
			},
		};
	},
	setup() {
		onMounted(() => {
			const studentsCtx = document.getElementById("studentsChart").getContext("2d");
			const performanceCtx = document.getElementById("performanceChart").getContext("2d");

			new Chart(studentsCtx, {
				type: "bar",
				data: {
					labels: ["Campus A", "Campus B", "Campus C"],
					datasets: [
						{
							label: "Students",
							data: [1200, 950, 1500],
							backgroundColor: ["#007bff", "#28a745", "#ffc107"],
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							display: false,
						},
					},
				},
			});

			new Chart(performanceCtx, {
				type: "doughnut",
				data: {
					labels: ["Campus A", "Campus B", "Campus C"],
					datasets: [
						{
							label: "Performance",
							data: [85, 78, 92],
							backgroundColor: ["#007bff", "#28a745", "#ffc107"],
						},
					],
				},
				options: {
					responsive: true,
				},
			});
		});
	},
	methods: {
		async fetchDashboard() {
			this.fetchingData = true;

			try {
				const a = await getRequest("a");

				this.cardsData = {
					campuses: a.data.data.total_campus,
					users: a.data.data.total_user,
					librarians: a.data.data.total_librarian,
					patrons: a.data.data.total_patron,
				};
			} catch (e) {
				showStatus({ status: "error", title: "Error", message: e.message });
			} finally {
				this.fetchingData = false;
			}
		},
	},
	mounted() {
		this.fetchDashboard();
	},
};
</script>

<style scoped>
.card {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

canvas {
	max-height: 300px;
}
</style>

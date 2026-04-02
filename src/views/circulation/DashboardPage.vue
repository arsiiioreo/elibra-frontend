<template>
	<div class="p-4 h-100 overflow-y-auto">
		<!-- Header Actions -->
		<div class="hstack justify-content-end gap-2 mb-4">
			<a class="btn btn-outline-primary" href="#attendance">Attendance</a>
			<button class="btn btn-primary">Generate Report</button>
		</div>

		<!-- KPI Cards -->
		<div class="row g-3 mb-4">
			<div class="col-md-3" v-for="stat in stats" :key="stat.label">
				<div class="card shadow-sm h-100">
					<div class="card-body">
						<small class="text-muted">{{ stat.label }}</small>
						<h3 class="fw-bold mb-0">{{ stat.value }}</h3>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="row g-3 mb-4">
			<!-- Recent Circulation -->
			<div class="col-md-8">
				<div class="card shadow-sm h-100">
					<div class="card-header fw-semibold">Recent Circulation</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item" v-for="log in circulationLogs" :key="log.id">
							{{ log.message }}
						</li>
					</ul>
				</div>
			</div>

			<!-- Overdue -->
			<div class="col-md-4">
				<div class="card shadow-sm h-100 border-danger">
					<div class="card-header fw-semibold text-danger">Overdue Items</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item" v-for="item in overdueItems" :key="item.id">
							<div class="fw-semibold">{{ item.title }}</div>
							<small class="text-muted"> {{ item.borrower }} • {{ item.days }} days overdue </small>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Attendance -->
		<div id="attendance" class="card shadow-sm mb-4">
			<div class="card-header fw-semibold">Attendance</div>
			<div class="card-body">
				<p class="mb-1">Total Today: <strong>128</strong></p>
				<p class="mb-0 text-muted">Peak hour: 1:00 PM – 2:00 PM</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			stats: [
				{ label: "Borrowed Today", value: 24 },
				{ label: "Active Loans", value: 312 },
				{ label: "Overdue Items", value: 18 },
				{ label: "Active Borrowers", value: 97 },
			],

			circulationLogs: [
				{ id: 1, message: 'Juan Dela Cruz borrowed "Clean Code"' },
				{ id: 2, message: 'Maria Santos returned "Database Systems"' },
			],

			overdueItems: [{ id: 1, title: "Operating Systems", borrower: "Alex Cruz", days: 5 }],
		};
	},
};
</script>

<style scoped>
* {
	scroll-behavior: smooth;
	scroll-margin-top: 1.5rem;
}
</style>

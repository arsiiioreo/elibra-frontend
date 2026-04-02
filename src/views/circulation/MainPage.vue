<template>
	<div class="hstack vh-100 w-100 overflow-hidden">
		<aside class="h-100 vstack align-items-center border-end" style="min-width: 300px">
			<div class="hstack justify-content-center gap-2 my-5">
				<img src="@/assets/logo.png" alt="" width="50" height="auto" />
				<h2 class="text-prime fw-bold mb-0">e-Libra</h2>
			</div>
			<ul class="nav nav-pills flex-column w-100 p-3">
				<li class="nav-item" v-for="page in pages" :key="page.name">
					<RouterLink :to="page.to" class="nav-link p-4 text-dark rounded-3" active-class="bg-prime text-white">
						<i class="bi me-2" :class="page.icon"></i>
						{{ page.name }}
					</RouterLink>
				</li>
			</ul>
			<ul class="nav nav-pills flex-column mt-auto w-100 p-3 gap-2">
				<RouterLink class="btn p-3 text-dark rounded-3" :to="{ name: 'landing' }"><i class="bi bi-house me-2"></i>Home</RouterLink>
				<button class="btn btn-outline-success p-3 text-dark rounded-3" @click="$logout"><i class="bi bi-door-open me-2"></i>Logout</button>
			</ul>
		</aside>
		<main class="h-100 w-100 overflow-auto bg-body-tertiary">
			<RouterView />
		</main>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";
export default {
	data() {
		return {
			user: null,
		};
	},

	async mounted() {
		this.user = await thisIsMe();

		if (!this.user) {
			this.$router.replace({ name: "PageUnauthorized" });
			// showStatus({message: 'Sorry, you are'})
		}
	},

	computed: {
		pages() {
			return [
				{ name: "Dashboard", icon: "bi-columns-gap", to: { name: "CirculationDashboard" } },
				{ name: "Circulation", icon: "bi-journal-check", to: { name: "CirculationBorrowing" } },
				{ name: "Attendance", icon: "bi-door-open", to: { name: "CirculationAttendance" } },
			];
		},
	},
};
</script>

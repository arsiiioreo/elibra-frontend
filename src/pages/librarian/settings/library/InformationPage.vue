<template>
	<div class="h-100 w-100 vstack overflow-auto">
		<div class="p-4 hstack justify-content-between">
			<div>
				<h5 class="fw-bold">Library Information</h5>
				<p class="small mb-0">{{ `A preview of the ${user?.librarian?.section?.branch?.name}'s Information'.` }}</p>
			</div>
		</div>

		<div class="text-start">
			<div class="card-body p-4">
				<div class="row g-2 mb-5">
					<div class="col-md-4 hstack gap-3">
						<div class="p-3 bg-success text-white rounded">
							<i class="bi bi-buildings display-6"></i>
						</div>
						<div class="vstack justify-content-center">
							<h2 class="fw-bold">{{ info?.librarian?.section?.branch?.name || "Not yet assigned" }}</h2>
							<p class="mb-2">{{ info?.campus?.name }}</p>
							<span class="small badge fs-6 text-bg-primary" style="width: fit-content" v-if="isOpen">Open</span>
							<span class="small badge fs-6 text-bg-danger" style="width: fit-content" v-else>Closed</span>
						</div>
					</div>
				</div>

				<!-- General Information -->

				<div class="row mb-4 border-bottom pb-3">
					<div class="col-md-12 hstack justify-content-between align-items-end">
						<span class="fw-bold">General Information</span>
						<button class="btn btn-outline-primary">Update Information</button>
					</div>
				</div>

				<div class="row g-3 mb-5">
					<div class="col-md-6 vstack gap-2 border-bottom">
						<small><i class="bi bi-building-fill me-2"></i>Campus Name</small>
						<p class="text-muted">{{ info?.librarian?.section?.branch?.campus?.name || "-" }}</p>
					</div>
					<div class="col-md-6 vstack gap-2 border-bottom">
						<small><i class="bi bi-map-fill me-2"></i>Campus Address</small>
						<p class="text-muted">{{ info?.librarian?.section?.branch?.campus?.address || "-" }}</p>
					</div>

					<div class="col-md-6 vstack gap-2 border-bottom">
						<small><i class="bi bi-house-fill me-2"></i>Branch</small>
						<p class="text-muted">{{ info?.librarian?.section?.branch?.name || "-" }}</p>
					</div>
					<div class="col-md-6 vstack gap-2 border-bottom">
						<small><i class="bi bi-check-circle-fill me-2"></i>Affiliated Department</small>
						<p class="text-muted">{{ info?.librarian?.section?.branch?.department?.name || "Not affiliated to any department" }}</p>
					</div>

					<div class="col-md-6 vstack gap-2 border-bottom">
						<small><i class="bi bi-door-open-fill me-2"></i>Opening Hours</small>
						<p class="text-muted">{{ formatHour(info?.librarian?.section?.branch?.opening_hour || null) }}</p>
					</div>
					<div class="col-md-6 vstack gap-2 border-bottom">
						<small><i class="bi bi-door-closed-fill me-2"></i>Closing Hours</small>
						<p class="text-muted">{{ formatHour(info?.librarian?.section?.branch?.closing_hour) || null }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";
import { formatHour } from "@/utilities/dataManipulation";

export default {
	name: "LibraryInformationPage",
	async created() {
		this.user = await thisIsMe();
		this.fetchInfo();
	},

	computed: {
		isOpen() {
			const now = new Date();
			const day = now.getDay();

			// Fri–Sun always closed
			if (day === 5 || day === 6 || day === 0) return false;

			const opening = new Date(`1970-01-01T${this.info?.librarian?.section?.branch?.opening_hour}`);
			const closing = new Date(`1970-01-01T${this.info?.librarian?.section?.branch?.closing_hour}`);
			const current = new Date(`1970-01-01T${now.toTimeString().slice(0, 8)}`);

			return current >= opening && current <= closing;
		},
	},

	data() {
		return {
			info: null,
			user: null,
		};
	},
	methods: {
		formatHour,
		async fetchInfo() {
			this.info = await thisIsMe();
		},
		parseHour(time) {
			if (!time) return 0;
			return Number(time.split(":")[0]);
		},
		parseMinute(time) {
			if (!time) return 0;
			return Number(time.split(":")[1]);
		},
	},
};
</script>

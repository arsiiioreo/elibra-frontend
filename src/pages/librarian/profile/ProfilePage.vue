<template>
	<div class="h-100 w-100 overflow-auto p-2">
		<div class="row g-2">
			<div class="col-lg-4 overflow-hidden vstack gap-3">
				<div class="card shadow-sm">
					<div class="card-header"><i class="bi bi-card-image me-3"></i>Profile Picture</div>
					<div class="card-body d-flex justify-content-center p-5">
						<div class="hstack justify-content-center align-items-center p-2 border border-success rounded-circle position-relative overflow-hidden shadow" style="height: 200px; width: 200px">
							<img :src="info?.profile_picture" alt="" width="200" />
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-8 overflow-hidden vstack gap-3">
				<div class="card shadow-sm h-100">
					<div class="card-header">
						<i class="bi bi-person me-2"></i>
						Profile Information
					</div>
					<div class="card-body">
						<div class="row g-3">
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Full Name</small>
								<p class="text-muted">{{ info?.first_name + " " + (info?.middle_initial ? info?.middle_initial + "." : "N/A") + " " + info?.last_name }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Gender</small>
								<p class="text-muted">{{ wellFormed(info?.sex) }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Date of Birth</small>
								<p class="text-muted">{{ info?.birthdate || "-" }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Status</small>
								<p class="text-muted">{{ info?.status }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Account Created</small>
								<p class="text-muted">{{ formatShortDate(info?.created_at) }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Last Modified At</small>
								<p class="text-muted">{{ formatDate(info?.updated_at) }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-8">
				<div class="card shadow-sm h-100">
					<div class="card-header"><i class="bi bi-phone me-2"></i> Account Information</div>
					<div class="card-body">
						<div class="row g-3">
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small><i class="bi bi-buildings me-2"></i>Campus</small>
								<p class="text-muted">{{ info?.campus?.name || "-" }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small><i class="bi bi-map me-2"></i>Campus Address</small>
								<p class="text-muted">{{ info?.campus?.address || "-" }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small><i class="bi bi-building me-2"></i>Library</small>
								<p class="text-muted">{{ info?.librarian?.section?.branch?.name || "-" }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small><i class="bi bi-door-open me-2"></i>Assigned Section</small>
								<p class="text-muted">{{ info?.librarian?.section?.name ? info?.librarian?.section?.name + " Library" : "-" }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Affiliated Department</small>
								<p class="text-muted">{{ info?.branch?.department?.name || "None" }}</p>
							</div>
							<div class="col-md-6 vstack gap-2 border-bottom">
								<small>Joined Since</small>
								<p class="text-muted">{{ formatShortDate(info?.librarian?.created_at) }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-4">
				<div class="card shadow-sm h-100">
					<div class="card-header"><i class="bi bi-phone me-2"></i> Contact Information</div>
					<div class="card-body">
						<div class="row g-3">
							<div class="col-md-12 vstack gap-2 border-bottom">
								<small><i class="bi bi-phone me-2"></i>Contact Number</small>
								<p class="text-muted">{{ info?.contact_number || "-" }}</p>
							</div>
							<div class="col-md-12 vstack gap-2 border-bottom">
								<small><i class="bi bi-envelope me-2"></i>Email</small>
								<p class="text-muted">{{ info?.email || "-" }}</p>
							</div>
							<div class="col-md-12 vstack gap-2 border-bottom">
								<small><i class="bi bi-check-circle me-2"></i>Email Verified At</small>
								<p class="text-muted">{{ info?.email_verified_at ? formatShortDate(info?.email_verified_at) : "Not yet verified" }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{{ info }}
</template>

<script>
import { thisIsMe } from "@/stores/auth";
import profile_picture from "@/assets/profile_default.png";
import { formatDate, formatShortDate, wellFormed } from "@/utilities/dataManipulation";

export default {
	name: "ProfilePage",
	data() {
		return {
			info: null,
			profile_picture_url: profile_picture,
		};
	},

	created() {
		this.fetchInfo();
	},

	methods: {
		wellFormed,
		formatShortDate,
		formatDate,

		async fetchInfo() {
			try {
				this.info = await thisIsMe();
			} catch (e) {
				console.error(e);
			}
		},
	},
};
</script>

<style scoped>
.p {
	margin: 0;
}

small {
	font-weight: bold;
}
</style>

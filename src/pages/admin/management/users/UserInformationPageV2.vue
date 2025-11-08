<template>
	<div class="card-header hstack justify-content-between p-1">
		<div class="hstack gap-2">
			<button class="btn" @click="updatePage"><i class="bi bi-chevron-left"></i></button>
			<p class="m-0">{{ user?.first_name || "User" }}'s Information</p>
		</div>
		<div class="hstack gap-2">
			<!-- Default dropstart button -->
			<div class="btn-group dropstart">
				<button class="btn" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></button>
				<ul class="dropdown-menu">
					<li><a class="dropdown-item" href="#">Edit User</a></li>
					<li><a class="dropdown-item" href="#">Deactivate User</a></li>
					<li @click="deleteUser">
						<a class="dropdown-item" href="#"><i class="bi bi-trash me-2"></i>Delete User</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="card-body overflow-auto">
		<!-- User Info Display -->
		<div class="w-100">
			<div class="row">
				<!-- Profile Picture -->
				<div class="col-12 text-center mb-5 d-flex flex-column align-items-center">
					<img :src="user.profile_picture" alt="Profile Picture" class="rounded-circle border" width="120" height="120" />
					<h6 class="mt-3 fw-bold text-capitalize">{{ user.first_name }} {{ user.middle_initial ? user.middle_initial + "." : "" }} {{ user.last_name }}</h6>
					<span class="badge bg-warning" v-if="user.pending_registration_approval == 1">For Approval</span>
					<span class="badge bg-success" v-else-if="user.status == 0">Active</span>
					<span class="badge bg-warning text-dark" v-else-if="user.status == 1">Suspended</span>
					<span class="badge bg-secondary" v-else>Expired</span>
				</div>

				<!-- Details -->
				<div class="col-12">
					<!-- Personal Information -->
					<h5 class="fw-bold">Personal Information</h5>

					<div class="row mb-3">
						<div class="col-sm-12">
							<label class="text-muted mb-1">Email</label>
							<p class="fw-semibold mb-0">{{ user.email }}</p>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-sm-6">
							<label class="text-muted mb-1">Role</label>
							<p class="fw-semibold mb-0">{{ user.role }}</p>
						</div>
						<div class="col-sm-6">
							<label class="text-muted mb-1">Sex</label>
							<p class="fw-semibold mb-0 text-capitalize">{{ user.sex }}</p>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-sm-6">
							<label class="text-muted mb-1">Contact Number</label>
							<p class="fw-semibold mb-0">
								{{ user.contact_number || "—" }}
							</p>
						</div>
						<div class="col-sm-6">
							<label class="text-muted mb-1">Email Verified At</label>
							<p class="fw-semibold mb-0">
								{{ formatDate(user.email_verified_at) }}
							</p>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-sm-6">
							<label class="text-muted mb-1">Created At</label>
							<p class="fw-semibold mb-0">
								{{ formatDate(user.created_at) }}
							</p>
						</div>
						<div class="col-sm-6">
							<label class="text-muted mb-1">Updated At</label>
							<p class="fw-semibold mb-0">
								{{ formatDate(user.updated_at) }}
							</p>
						</div>
					</div>
				</div>

				<!-- Divider -->
				<hr />

				<!-- Details -->
				<div class="col-12" v-if="user.librarian">
					<!-- Personal Information -->
					<h5 class="fw-bold">Personal Information</h5>

					<div class="row mb-3">
						<div class="col-sm-6">
							<label class="text-muted mb-1">Email</label>
							<p class="fw-semibold mb-0">{{ user.email }}</p>
						</div>
						<div class="col-sm-6">
							<label class="text-muted mb-1">Sex</label>
							<p class="fw-semibold mb-0 text-capitalize">{{ user.sex }}</p>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-sm-6">
							<label class="text-muted mb-1">Role</label>
							<p class="fw-semibold mb-0">{{ user.role }}</p>
						</div>
						<div class="col-sm-6">
							<label class="text-muted mb-1">Campus</label>
							<p class="fw-semibold mb-0">
								{{ user.campus_id ? user.campus_id : "—" }}
							</p>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-sm-6">
							<label class="text-muted mb-1">Contact Number</label>
							<p class="fw-semibold mb-0">
								{{ user.contact_number || "—" }}
							</p>
						</div>
						<div class="col-sm-6">
							<label class="text-muted mb-1">Email Verified At</label>
							<p class="fw-semibold mb-0">
								{{ formatDate(user.email_verified_at) }}
							</p>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col-sm-6">
							<label class="text-muted mb-1">Created At</label>
							<p class="fw-semibold mb-0">
								{{ formatDate(user.created_at) }}
							</p>
						</div>
						<div class="col-sm-6">
							<label class="text-muted mb-1">Updated At</label>
							<p class="fw-semibold mb-0">
								{{ formatDate(user.updated_at) }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="card-footer" v-if="user.pending_registration_approval === '1'">
		<div class="card">
			<div class="card-header">Registration Status</div>
			<div class="card-body">{{ user?.first_name }} is still pending for approval. Approve or Reject {{ user?.first_name }}'s registration now.</div>
			<div class="card-footer text-end gap-2">
				<button class="btn btn-outline-danger me-2">Reject</button>
				<button class="btn btn-success" @click="approve">Approve</button>
			</div>
		</div>
	</div>
</template>

<script>
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { confirm } from "@/services/YesNoService";
import { getRequest } from "@/stores/requestService";
import { formatDate } from "@/utilities/dataManipulation";

export default {
	props: {
		data: Object, // not Array; user data is an object
	},
	data() {
		return {
			user: {}, // internal copy
			fetching: false,
			profile_picture: this.defaultAvatar,
		};
	},
	watch: {
		data: {
			immediate: true,
			handler(newVal) {
				this.user = { ...newVal };
			},
		},
	},
	methods: {
		formatDate,

		async approve() {
			const ans = await confirm({ title: "Approve User", message: `Are you sure you want to approve ${this.user.first_name}'s registration? ` });
			if (ans) {
				showLoading({ message: "Approving, please wait..." });
				try {
					const res = await getRequest("a/user/approve/" + this.user.id);
					this.user.pending_registration_approval = "0";
					showStatus({ status: "success", title: "Approved", message: res.data.message });
					this.$emit("page:changes");
				} catch (e) {
					showStatus({ status: "error", title: "Error", message: "Failed to approve user." + e.message });
				}
			}
		},
	},
	mounted() {
		console.log(this.data);
		this.user = this.data;
	},
};
</script>

<style scoped>
.card-body {
	font-size: 0.85rem !important;
}
</style>

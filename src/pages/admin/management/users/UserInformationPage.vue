<template>
	<div class="card-header hstack justify-content-between p-1">
		<div class="hstack gap-1">
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
					<li @click="restoreUser" v-if="user.deleted_at">
						<a class="dropdown-item" href="#"><i class="bi bi-arrow-clockwise me-2"></i>Retrieve User</a>
					</li>
					<li @click="deleteUser" v-else>
						<a class="dropdown-item" href="#"><i class="bi bi-trash me-2"></i>Delete User</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="card-body pt-1 overflow-auto">
		<!-- User Info Display -->
		<div class="row gap-4">
			<!-- Profile Picture -->
			<div class="col-12 position-relative">
				<!-- Banner -->
				<div class="position-absolute top-0 start-0 w-100 rounded-top" style="height: 7rem" :class="[user.deleted_at ? 'bg-danger' : user.role == 0 ? 'bg-dark' : user.role == 1 ? 'bg-info' : 'bg-prime']"></div>

				<!-- Profile picture (in front of banner) -->
				<div class="d-flex align-items-center mb-3 shadow-sm rounded-circle border position-relative" :class="[user.pending_registration_approval == 1 ? 'border-info' : 'border-success']" style="width: 100px; height: 100px; z-index: 2; margin-top: 3rem; background: white">
					<img :src="user.profile_picture" class="rounded-circle" style="width: 100%; height: 100%; object-fit: contain" />
					<span class="position-absolute bottom-0 end-0 me-2 badge bg-info rounded-circle p-1" title="Verified" v-if="user.email_verified_at"><i class="bi bi-check fw-bold fs-5"></i></span>
				</div>

				<!-- Name + status -->
				<div class="hstack justify-content-between mt-2">
					<h4 class="fw-bold mb-1">{{ user.name }}</h4>
					<span class="badge bg-info" v-if="user.pending_registration_approval == 1">For Approval</span>
					<span class="badge bg-danger" v-else-if="user.deleted_at">Deleted</span>
					<span class="badge bg-success" v-else-if="user.status == 0">Active</span>
					<span class="badge bg-warning text-dark" v-else-if="user.status == 1">Suspended</span>
					<span class="badge bg-secondary" v-else>Expired</span>
				</div>

				<p class="text-muted mb-1" v-if="user.role == 1">
					{{ "@" + user.librarian.username + " | " + user.email }}
				</p>
				<p class="text-muted mb-1" v-else>{{ user.email }}</p>
				<span class="badge bg-white text-dark me-2 border" style="border-radius: 3px"> {{ user.roleText }}</span>

				<div class="hstack justify-content-between mt-4" v-if="user.pending_registration_approval === '1'">
					<p class="mb-0">Approve user registration?</p>
					<div class="hstack gap-2">
						<button class="btn btn-sm btn-outline-danger pe-3"><i class="bi bi-x me-1"></i>Reject</button>
						<button class="btn btn-sm btn-outline-success pe-3" @click="approve"><i class="bi bi-check me-1"></i>Approve</button>
					</div>
				</div>

				<hr />
			</div>

			<!-- Personal Information -->
			<div class="col-12">
				<h6 class="fw-bold mb-3 text-primary"><i class="bi bi-person-circle me-2"></i>Personal Information</h6>
				<table class="table table-responsive table-hover">
					<tbody>
						<tr>
							<th>First Name</th>
							<td>{{ user.first_name }}</td>
						</tr>
						<tr>
							<th>Middle Initial</th>
							<td>{{ user.middle_initial || "N/A" }}</td>
						</tr>
						<tr>
							<th>Last Name</th>
							<td>{{ user.last_name }}</td>
						</tr>
						<tr>
							<th>Sex</th>
							<td>{{ user.sex }}</td>
						</tr>
						<tr>
							<th>Role</th>
							<td>{{ user.roleText }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Account Information -->
			<div class="col-12">
				<h6 class="fw-bold mb-3 text-primary"><i class="bi bi-person-vcard-fill me-2"></i>Account & Contact Information</h6>
				<table class="table table-responsive table-hover">
					<tbody>
						<tr>
							<th>Email</th>
							<td class="text-lowercase">{{ user.email }}</td>
						</tr>
						<tr v-if="user.librarian">
							<th>Username</th>
							<td style="text-transform: none">{{ user.librarian.username }}</td>
						</tr>
						<tr>
							<th>Contact Number</th>
							<td>{{ user.contact_number || "-" }}</td>
						</tr>
						<tr>
							<th>Login Attempts</th>
							<td>{{ user.login_attempt }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Librarian Information -->
			<div class="col-12" v-if="user.librarian">
				<h6 class="fw-bold mb-3 text-primary"><i class="bi bi-building me-2"></i>Library Information</h6>
				<table class="table table-responsive table-hover">
					<tbody v-if="user?.librarian?.section">
						<tr>
							<th>Campus</th>
							<td>{{ user.librarian.branch?.campus?.name + " (" + user.librarian.branch?.campus?.abbrev + ")" }}</td>
						</tr>
						<tr>
							<th>Branch</th>
							<td>{{ user.librarian.branch?.name }}</td>
						</tr>
						<tr>
							<th>Member since</th>
							<td>{{ formatShortDate(user.librarian.branch?.created_at) }}</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="2" style="text-transform: none">This librarian hasn't been assigned to any libraries yet.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Patron Information -->
			<div class="col-12" v-if="user.patron">
				<h6 class="fw-bold mb-3 text-primary"><i class="bi bi-person-workspace me-2"></i>Patron Information</h6>
				<table class="table table-responsive table-hover">
					<tbody>
						<tr>
							<th>ID Number</th>
							<td>{{ user.patron.id_number || "-" }}</td>
						</tr>
						<tr>
							<th>EBC</th>
							<td>{{ user.patron.ebc || "-" }}</td>
						</tr>
					</tbody>
					<tbody v-if="user.patron.patron_type_id == 3">
						<tr>
							<th>Organization/Campus</th>
							<td>{{ user.patron.external_organization }}</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<th>Campus</th>
							<td>{{ user.patron?.program.department.campus?.name + " (" + user.patron?.program.department.campus?.abbrev + ")" }}</td>
						</tr>
						<tr>
							<th>Department</th>
							<td>{{ user.patron.program.department.abbrev + " - " + user.patron.program.department.name }}</td>
						</tr>
						<tr>
							<th>Program</th>
							<td>{{ user.patron.program.abbrev + " - " + user.patron.program.name }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Account Status Information -->
			<div class="col-12">
				<h6 class="fw-bold mb-3 text-primary"><i class="bi bi-exclamation-circle me-2"></i>Account Status</h6>
				<table class="table table-responsive table-hover">
					<tbody>
						<tr>
							<th>Status</th>
							<td>{{ user.status == 0 ? "Active" : user.status == 1 ? "Suspended" : user.status == 2 ? "Expired" : "Invalid" }}</td>
						</tr>
						<tr>
							<th>Registration Approval Status</th>
							<td>{{ user.pending_registration_approval == 0 ? "Approved" : user.pending_registration_approval == 1 ? "Pending" : user.pending_registration_approval == 2 ? "Rejected" : "Invalid" }}</td>
						</tr>
						<tr>
							<th>Created</th>
							<td>{{ formatDate(user.created_at) || "-" }}</td>
						</tr>
						<tr>
							<th>Last Modified</th>
							<td>{{ formatDate(user.updated_at) || "-" }}</td>
						</tr>
						<tr>
							<th>Deleted At</th>
							<td>{{ formatDate(user.deleted_at) || "-" }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { confirm } from "@/services/YesNoService";
import { deleteRequest, getRequest, putRequest } from "@/stores/requestService";
import { formatDate, formatShortDate } from "@/utilities/dataManipulation";

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
		formatShortDate,

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

		async restoreUser() {
			const ans = await confirm({ title: "Delete User", message: `Are you sure you want to restore ${this.data.first_name}'s account?` });
			if (ans) {
				showLoading({ message: "Restoring" });
				try {
					const res = await putRequest("a/user/restore/" + this.user.id);
					showStatus({ status: "success", title: "Restored", message: res.data.message });
				} catch (e) {
					showStatus({ status: "error", title: "Error", message: "Failed to restore user." + e.message });
				}
			}
			this.$emit("page:changes", null);
		},

		async deleteUser() {
			let ans = null;

			if (this.data.deleted_at) {
				ans = await confirm({ title: "Permanently Delete User", message: `Are you sure you want to permanently delete ${this.data.first_name}'s account?` });
			} else {
				ans = await confirm({ title: "Delete User", message: `Are you sure you want to delete ${this.data.first_name}'s account?` });
			}
			if (ans) {
				showLoading({ message: "Deleting" });
				try {
					const res = await deleteRequest("a/user/delete/" + this.user.id);
					this.user.pending_registration_approval = "0";
					showStatus({ status: "success", title: "Deleted", message: res.data.message });
				} catch (e) {
					showStatus({ status: "error", title: "Error", message: "Failed to delete user." + e.message });
				}
			}
			this.$emit("page:changes", null);
		},
	},
	mounted() {
		console.log(this.data);
		this.user = this.data;
	},
};
</script>

<style scoped>
th {
	text-align: start !important;
	width: 35% !important;
}

td {
	text-transform: capitalize;
}
</style>

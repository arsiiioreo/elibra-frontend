<template>
	<div class="card p-3 shadow-sm" v-if="!selectedDepartment">
		<div class="d-flex justify-content-between align-items-center mb-3">
			<h5 class="m-0"><i class="bi bi-diagram-3 me-3"></i>Campus Departments</h5>
			<div class="hstack gap-2">
				<button class="btn btn-primary btn-sm" @click="openAddForm"><i class="bi bi-plus-lg me-2"></i>Add Department</button>
				<button class="btn btn-outline-dark btn-sm" @click="fetchDepartment"><i class="bi bi-arrow-clockwise me-2"></i>Refresh</button>
			</div>
		</div>

		<!-- Department Table -->
		<table class="table table-bordered table-hover align-middle">
			<thead class="table-light">
				<tr>
					<th style="width: 10%">No.</th>
					<th>Name</th>
					<th>Abbrev</th>
					<th class="text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="fetching">
					<td colspan="7" class="text-center text-muted">Loading...</td>
				</tr>
				<tr v-else-if="departments && departments.length === 0">
					<td colspan="7" class="text-center text-muted">No Department found.</td>
				</tr>
				<tr v-else v-for="(d, index) in departments" :key="d.id">
					<td>{{ index + 1 }}</td>
					<td>
						{{ d.name }} <span class="text-danger">{{ d.deleted_at ? " (Deleted)" : "" }}</span>
					</td>
					<td>{{ d.abbrev || "—" }}</td>
					<td class="text-center">
						<button class="btn btn-sm btn-outline-primary me-1" @click="selectedDepartment = d">
							<i class="bi bi-eye"></i>
						</button>
						<button class="btn btn-sm btn-outline-warning me-1" @click="editDepartment({ name: d.name, abbrev: d.abbrev, campus_id: d.campus_id, id: d.id })">
							<i class="bi bi-pencil"></i>
						</button>
						<button class="btn btn-sm btn-outline-danger" @click="deleteDepartment(d)">
							<i class="bi bi-trash"></i>
						</button>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- Vue-Only Modal -->
		<teleport to="body">
			<div v-if="showModal" class="custom-modal-backdrop">
				<div class="custom-modal">
					<div class="modal-header justify-content-between">
						<h5 class="mb-3">
							<i class="bi" :class="isEditing ? 'bi-pencil' : 'bi-plus-circle'"></i>
							{{ isEditing ? "Edit Department" : "Add New Department" }}
						</h5>
						<button class="btn-close" @click="cancelModal"></button>
					</div>

					<div class="modal-body">
						<form @submit.prevent="saveDepartment">
							<div class="mb-2">
								<label class="form-label">Name <span class="text-danger">*</span></label>
								<input type="text" class="form-control" v-model="form.name" required />
							</div>

							<div class="mb-2">
								<label class="form-label">Abbreviation</label>
								<input type="text" class="form-control" v-model="form.abbrev" placeholder="CCSICT" required />
							</div>

							<div class="d-flex justify-content-end gap-2">
								<button type="button" class="btn btn-secondary" @click="cancelModal">Cancel</button>
								<button type="submit" class="btn btn-primary" :disabled="!canSave">
									{{ isEditing ? "Update" : "Save" }}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</teleport>
	</div>
	<div class="card p-3 shadow-sm" v-else>
		<ProgramPage :department="selectedDepartment" @back="selectedDepartment = null" />
	</div>
</template>

<script>
import Swal from "sweetalert2";
import { getRequest, postRequest } from "@/stores/requestService";
import { showLoading } from "@/services/LoadingService";

import ProgramPage from "./ProgramPage.vue";

export default {
	props: {
		campus_id: { type: Number, required: true },
	},
	components: { ProgramPage },
	data() {
		return {
			departments: [],
			fetching: false,
			showModal: false,
			isEditing: false,
			form: {
				id: null,
				name: "",
				abbrev: "",
				campus_id: this.campus_id,
			},
			originalForm: {},
			selectedDepartment: null,
		};
	},
	computed: {
		canSave() {
			if (!this.form.name) return false;
			if (this.isEditing) {
				return this.form.name !== this.originalForm.name || this.form.contact_info !== this.originalForm.contact_info || this.form.department_id !== this.originalForm.department_id || this.form.opening_hour !== this.originalForm.opening_hour || this.form.closing_hour !== this.originalForm.closing_hour;
			}
			return true;
		},
	},
	methods: {
		async fetchDepartment() {
			this.fetching = true;
			try {
				const res = await getRequest(`department/read/${this.campus_id}`);
				this.departments = res.data.data;
				console.log(this.departments);
			} catch (err) {
				console.error(err);
				Swal.fire("Error", "Failed to fetch Department.", "error");
			} finally {
				this.fetching = false;
			}
		},

		openAddForm() {
			this.resetForm();
			this.isEditing = false;
			this.showModal = true;
		},

		editDepartment(department) {
			this.form = { ...department };
			this.originalForm = { ...department };
			this.isEditing = true;
			this.showModal = true;
		},

		async saveDepartment() {
			if (!this.form.name) return;

			const payload = {
				...this.form,
				campus_id: this.campus_id,
			};
			showLoading({ message: "Saving department, please wait..." });
			if (this.isEditing) {
				const res = await Swal.fire({
					title: "Update Department?",
					text: "Are you sure you want to update this department information?",
					icon: "question",
					showCancelButton: true,
					confirmButtonText: "Yes, update it",
					cancelButtonText: "Cancel",
				});
				if (!res.isConfirmed) return;

				try {
					showLoading({ message: "Upading information, please wait..." });
					await postRequest("department/update", payload);
					this.fetchDepartment();
					Swal.fire("Updated!", "Department information updated.", "success");
				} catch (err) {
					console.error(err);
					Swal.fire("Error", "Failed to update department.", "error");
				}
			} else {
				try {
					await postRequest("department/create", payload);
					Swal.fire("Added!", "New department has been added.", "success");
					this.fetchDepartment();
				} catch (err) {
					console.error(err);
					Swal.fire("Error", "Failed to add department.", "error");
				}
			}

			this.showModal = false;
		},

		async deleteDepartment(department) {
			const res = await Swal.fire({
				title: "Delete Department?",
				text: `Are you sure you want to delete "${department.name}"?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it",
				cancelButtonText: "Cancel",
			});

			if (res.isConfirmed) {
				try {
					await postRequest("department/delete", { id: department.id });
					Swal.fire("Deleted!", "Department removed successfully.", "success");
					this.fetchDepartment();
				} catch (err) {
					console.error(err);
					Swal.fire("Error", "Failed to delete department.", "error");
				}
			}
		},

		cancelModal() {
			this.showModal = false;
		},

		resetForm() {
			this.form = {
				id: null,
				name: "",
				contact_info: "",
				department_id: null,
				opening_hour: "",
				closing_hour: "",
			};
			this.originalForm = { ...this.form };
		},
	},
	mounted() {
		this.fetchDepartment();
	},
};
</script>

<style scoped>
.custom-modal-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeIn 0.2s ease-in-out;
}

.custom-modal {
	background: white;
	border-radius: 6px;
	width: 500px;
	max-width: 95%;
	padding: 1rem;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

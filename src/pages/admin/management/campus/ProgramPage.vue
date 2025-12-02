<template>
	<div class="d-flex justify-content-between align-items-center mb-3">
		<h5 class="m-0">
			<button class="btn btn-outline-secondary me-3" @click="$emit('back', null)">
				<i class="bi bi-chevron-left"></i>
			</button>
			Programs Under {{ department.abbrev }}
		</h5>
		<div class="hstack gap-2">
			<button class="btn btn-primary btn-sm" @click="openAddForm"><i class="bi bi-plus-lg me-2"></i>Add Program</button>
			<button class="btn btn-outline-dark btn-sm" @click="fetchPrograms"><i class="bi bi-arrow-clockwise me-2"></i>Refresh</button>
		</div>
	</div>

	<!-- Programs Table -->
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
				<td colspan="4" class="text-center text-muted">Loading...</td>
			</tr>
			<tr v-else-if="programs.length === 0">
				<td colspan="4" class="text-center text-muted">No programs found.</td>
			</tr>
			<tr v-else v-for="(p, index) in programs" :key="p.id">
				<td>{{ index + 1 }}</td>
				<td>
					{{ p.name }} <span class="text-danger">{{ p.deleted_at ? " (Deleted)" : "" }}</span>
				</td>
				<td>{{ p.abbrev || "—" }}</td>
				<td class="text-center">
					<button class="btn btn-sm btn-outline-warning me-1" @click="editProgram(p)">
						<i class="bi bi-pencil"></i>
					</button>
					<button class="btn btn-sm btn-outline-danger" @click="deleteProgram(p)">
						<i class="bi bi-trash"></i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>

	<!-- Vue Modal -->
	<teleport to="body">
		<div v-if="showModal" class="custom-modal-backdrop">
			<div class="custom-modal">
				<div class="modal-header justify-content-between">
					<h5 class="mb-3">
						<i class="bi" :class="isEditing ? 'bi-pencil' : 'bi-plus-circle'"></i>
						{{ isEditing ? "Edit Program" : "Add New Program" }}
					</h5>
					<button class="btn-close" @click="cancelModal"></button>
				</div>

				<div class="modal-body">
					<form @submit.prevent="saveProgram">
						<div class="mb-2">
							<label class="form-label">Program Name <span class="text-danger">*</span></label>
							<input type="text" class="form-control" v-model="form.name" required />
						</div>

						<div class="mb-2">
							<label class="form-label">Abbreviation</label>
							<input type="text" class="form-control" v-model="form.abbrev" placeholder="BSIT" required />
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
</template>

<script>
import Swal from "sweetalert2";
import { deleteRequest, getRequest, postRequest, putRequest } from "@/stores/requestService";
import { showLoading } from "@/services/LoadingService";

export default {
	props: {
		department: { type: Object, required: true },
	},
	data() {
		return {
			programs: [],
			fetching: false,
			showModal: false,
			isEditing: false,
			form: {
				id: null,
				name: "",
				abbrev: "",
				department_id: this.department.id,
			},
			originalForm: {},
		};
	},
	computed: {
		canSave() {
			if (!this.form.name) return false;
			if (this.isEditing) {
				return this.form.name !== this.originalForm.name || this.form.abbrev !== this.originalForm.abbrev;
			}
			return true;
		},
	},
	methods: {
		async fetchPrograms() {
			this.fetching = true;
			try {
				const res = await getRequest(`program/read/${this.department.id}`);
				this.programs = res.data.data || [];
			} catch (err) {
				console.error(err);
				Swal.fire("Error", "Failed to fetch programs.", "error");
			} finally {
				this.fetching = false;
			}
		},

		openAddForm() {
			this.resetForm();
			this.isEditing = false;
			this.showModal = true;
		},

		editProgram(program) {
			this.form = { ...program };
			this.originalForm = { ...program };
			this.isEditing = true;
			this.showModal = true;
		},

		async saveProgram() {
			if (!this.form.name) return;

			showLoading({ message: this.isEditing ? "Updating program..." : "Saving program..." });

			try {
				if (this.isEditing) {
					const confirm = await Swal.fire({
						title: "Update Program?",
						text: "Are you sure you want to update this program?",
						icon: "question",
						showCancelButton: true,
						confirmButtonText: "Yes, update it",
						cancelButtonText: "Cancel",
					});

					if (!confirm.isConfirmed) return;

					await putRequest("program/update", this.form);
					Swal.fire("Updated!", "Program updated successfully.", "success");
				} else {
					await postRequest("program/create", this.form);
					Swal.fire("Added!", "Program created successfully.", "success");
				}

				this.fetchPrograms();
				this.showModal = false;
			} catch (err) {
				console.error(err);
				Swal.fire("Error", "Failed to save program.", "error");
			}
		},

		async deleteProgram(program) {
			const confirm = await Swal.fire({
				title: "Delete Program?",
				text: `Are you sure you want to delete "${program.name}"?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it",
				cancelButtonText: "Cancel",
			});

			if (!confirm.isConfirmed) return;

			try {
				await deleteRequest(`program/delete/${program.id}`);
				Swal.fire("Deleted!", "Program deleted successfully.", "success");
				this.fetchPrograms();
			} catch (err) {
				console.error(err);
				Swal.fire("Error", "Failed to delete program.", "error");
			}
		},

		cancelModal() {
			this.showModal = false;
		},

		resetForm() {
			this.form = {
				id: null,
				name: "",
				abbrev: "",
				department_id: this.department.id,
			};
			this.originalForm = { ...this.form };
		},
	},
	mounted() {
		this.fetchPrograms();
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

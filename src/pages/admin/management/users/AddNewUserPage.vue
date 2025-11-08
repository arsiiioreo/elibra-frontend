<template>
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content border-0 shadow-lg rounded-4 futuristic-card">
			<!-- Header -->
			<div class="modal-header border-0">
				<h5 class="modal-title d-flex align-items-center">
					<i class="bi bi-person-add me-2"></i>
					Add New User
				</h5>
				<button type="button" class="btn-close btn-close-white" @click="closeModal($event)" aria-label="Close"></button>
			</div>

			<!-- Body -->
			<div class="modal-body">
				<form @submit.prevent="submitForm">
					<div class="row g-3">
						<!-- Name Fields -->
						<div class="col-md-4">
							<label class="form-label fw-semibold">Last Name <span class="text-danger">*</span></label>
							<input type="text" class="form-control" v-model.trim="form.last_name" required />
						</div>
						<div class="col-md-4">
							<label class="form-label fw-semibold">First Name <span class="text-danger">*</span></label>
							<input type="text" class="form-control" v-model.trim="form.first_name" required />
						</div>
						<div class="col-md-4">
							<label class="form-label fw-semibold">Middle Initial</label>
							<input type="text" class="form-control" maxlength="1" v-model.trim="form.middle_initial" />
						</div>

						<!-- Sex -->
						<div class="col-md-4">
							<label class="form-label fw-semibold">Sex <span class="text-danger">*</span></label>
							<select class="form-select neon-select" v-model="form.sex" required>
								<option value="">Select</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>

						<!-- Role -->
						<div class="col-md-4">
							<label class="form-label fw-semibold">Role <span class="text-danger">*</span></label>
							<select class="form-select neon-select" v-model="form.role" required>
								<option value="" disabled>Select Role</option>
								<option value="0">Admin</option>
								<option value="1">Librarian</option>
								<option value="2">Patron</option>
							</select>
						</div>

						<!-- Email -->
						<div class="col-md-4">
							<label class="form-label fw-semibold">Email <span class="text-danger">*</span></label>
							<input type="email" class="form-control" v-model.trim="form.email" required />
						</div>

						<!-- LIBRARIAN SECTION -->
						<template v-if="form.role == 1">
							<div class="col-md-4">
								<label class="form-label fw-semibold">Username <span class="text-danger">*</span></label>
								<input type="text" class="form-control" v-model.trim="form.username" required />
							</div>

							<div class="col-md-4">
								<label class="form-label fw-semibold">Campus <span class="text-danger">*</span></label>
								<select class="form-select neon-select" v-model="form.campus_id" @change="filterBranches" required>
									<option value="">Select Campus</option>
									<option v-for="c in campuses" :key="c.id" :value="c.id">{{ c.name }}</option>
								</select>
							</div>

							<div class="col-md-4">
								<label class="form-label fw-semibold">Branch <span class="text-danger">*</span></label>
								<select class="form-select neon-select" v-model="form.branch_id" required>
									<option value="" disabled selected v-if="!form.campus_id">Please select a campus first.</option>
									<option value="" disabled selected v-else-if="filteredBranches.length < 1">No branches in this campus yet.</option>
									<option v-for="b in filteredBranches" :key="b.id" :value="b.id">{{ b.name }}</option>
								</select>
							</div>
						</template>

						<!-- PATRON SECTION -->
						<template v-if="form.role == 2">
							<div class="col-md-4">
								<label class="form-label fw-semibold">Patron Type <span class="text-danger">*</span></label>
								<select class="form-select neon-select" v-model="form.patron_type_id" @change="resetPatronFields" required>
									<option value="">Select Type</option>
									<option v-for="p in patron_types" :key="p.id" :value="p.id">{{ p.name }}</option>
								</select>
							</div>

							<!-- IF STUDENT OR FACULTY -->
							<template v-if="form.patron_type_id == 1 || form.patron_type_id == 2">
								<div class="col-md-4">
									<label class="form-label fw-semibold">Campus <span class="text-danger">*</span></label>
									<select class="form-select neon-select" v-model="form.campus_id" @change="filterDepartments" required>
										<option value="">Select Campus</option>
										<option v-for="c in campuses" :key="c.id" :value="c.id">{{ c.name }}</option>
									</select>
								</div>

								<div class="col-md-4">
									<label class="form-label fw-semibold">Department <span class="text-danger">*</span></label>
									<select class="form-select neon-select" v-model="form.department_id" @change="filterPrograms" required>
										<option value="">Select Department</option>
										<option v-for="d in departments" :key="d.id" :value="d.id" style="white-space: normal; word-wrap: break-word">{{ d.abbrev + " - " + d.name }}</option>
									</select>
								</div>

								<div class="col-md-4">
									<label class="form-label fw-semibold">Program <span class="text-danger">*</span></label>
									<select class="form-select neon-select" v-model="form.program_id" required>
										<option value="">Select Program</option>
										<option v-for="p in programs" :key="p.id" :value="p.id">{{ p.name }}</option>
									</select>
								</div>

								<div class="col-md-4">
									<label class="form-label fw-semibold">ID Number <span class="text-danger">*</span></label>
									<input type="text" class="form-control" v-model.trim="form.id_number" required />
								</div>
							</template>

							<!-- IF GUEST -->
							<template v-if="form.patron_type_id == 3">
								<div class="col-md-6">
									<label class="form-label fw-semibold">External Organization <span class="text-danger">*</span></label>
									<input type="text" class="form-control" v-model.trim="form.external_organization" placeholder="e.g. ISU Roxas Campus" required />
								</div>
							</template>
						</template>
					</div>
					<!-- Footer -->
					<div class="mt-4 hstack gap-2 justify-content-end">
						<button type="button" class="btn btn-outline-danger px-4" @click="closeModal($event)">Cancel</button>
						<button type="submit" class="btn btn-primary px-4"><i class="bi bi-save me-2"></i>Save User</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { showStatus } from "@/services/StatusService";
import { confirm } from "@/services/YesNoService";
import { fetchBranches, fetchCampuses, fetchDepartment, fetchPatronTypes, fetchProgram } from "@/stores/adminCache";
import { postRequest } from "@/stores/requestService";
import { Modal } from "bootstrap";

export default {
	data() {
		return {
			form: {
				last_name: "",
				first_name: "",
				middle_initial: "",
				sex: "",
				role: "",
				email: "",
				campus_id: "",
				branch_id: "",
				id_number: "",
				department_id: "",
				program_id: "",
				patron_type_id: "",
				external_organization: "",
				username: "",
				contact_number: "",
			},
			campuses: [],
			branches: [],
			departments: [],
			programs: [],
			patron_types: [],
			filteredBranches: [],
			filteredDepartments: [],
			filteredPrograms: [],
		};
	},
	methods: {
		filterBranches() {
			this.filteredBranches = this.branches.filter((b) => b.campus_id == this.form.campus_id);
			this.form.branch_id = "";
		},
		async filterDepartments() {
			// this.filteredDepartments = this.departments.filter((d) => d.campus_id == this.form.campus_id);
			// this.form.department_id = "";
			// this.filteredPrograms = [];
			const departments = await fetchDepartment({ id: this.form.campus_id });
			this.departments = departments.data;
		},
		async filterPrograms() {
			const programs = await fetchProgram({ id: this.form.department_id });
			this.programs = programs.data;
			// this.filteredPrograms = this.programs.filter((p) => p.department_id == this.form.department_id);
			// this.form.program_id = "";
		},
		resetPatronFields() {
			this.form.campus_id = "";
			this.form.department_id = "";
			this.form.program_id = "";
			this.form.id_number = "";
			this.form.external_organization = "";
		},

		async submitForm() {
			const res = await postRequest("a/user/create", { ...this.form, pending_registration_approval: "0" });

			if (res.data && res.data.status === "success") {
				showStatus({ status: "success", title: "Success", message: res.data.message });
				this.$emit("added");
				this.resetForm();
				this.closeModal();
			}
		},

		async closeModal(e) {
			if (e) e.preventDefault();

			if (this.hasUnsavedData()) {
				const ans = await confirm({
					title: "Close",
					message: "You have unsaved changes. Do you want to discard them?",
				});
				if (!ans) return;
			}

			const modalEl = Modal.getInstance(document.getElementById("addNewUser"));
			modalEl.hide();
			this.resetForm();
		},

		hasUnsavedData() {
			// Check if any form field is non-empty
			return Object.values(this.form).some((v) => v !== "" && v !== null);
		},

		resetForm() {
			for (let key in this.form) {
				this.form[key] = "";
			}
		},
	},
	async mounted() {
		const patron_types = await fetchPatronTypes();
		this.patron_types = patron_types.data;

		const campus = await fetchCampuses();
		this.campuses = campus.data;

		const branch = await fetchBranches();
		this.branches = branch.data;
	},
};
</script>

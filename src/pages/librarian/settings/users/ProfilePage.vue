<template>
	<div class="card rounded-0 h-100">
		<div class="card-header hstack justify-content-between">
			Profile Information
			<div class="dropdown open">
				<i type="button" class="bi bi-three-dots-vertical btn" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
				<div class="dropdown-menu" aria-labelledby="triggerId">
					<button class="dropdown-item" v-if="!isEditing" @click="isEditing = true">Update Information</button>
					<button class="dropdown-item" v-if="isEditing" @click="isEditing = false">Cancel Update</button>
					<a class="dropdown-item disabled" href="#">Disabled action</a>
				</div>
			</div>
		</div>
		<div class="card-body overflow-y-auto p-4 bg-body-secondary">
			<div class="row justify-content-center">
				<div class="col-lg-8 col-md-10 bg-body p-5">
					<div class="row g-3">
						<!-- Profile Picture -->
						<div class="col-12 d-flex align-items-center gap-3 mb-5">
							<img :src="user?.profile_picture" class="rounded-circle border" width="80" height="80" />
							<div>
								<h4 class="fw-bold">{{ user?.name }}</h4>
								<p class="small mb-0 text-muted">Username: @{{ user?.librarian.username }}</p>
								<p class="small mb-0 text-muted">Email: {{ user?.email }}</p>
							</div>
						</div>

						<!-- Last Name -->
						<div class="col-lg-6">
							<label class="form-label">Last Name</label>
							<input type="text" class="form-control" v-model="form.last_name" :disabled="!isEditing" />
						</div>

						<!-- First Name -->
						<div class="col-lg-6">
							<label class="form-label">First Name</label>
							<input type="text" class="form-control" v-model="form.first_name" :disabled="!isEditing" />
						</div>

						<!-- Middle Initial -->
						<div class="col-lg-4">
							<label class="form-label">Middle Initial</label>
							<input type="text" class="form-control" v-model="form.middle_initial" :disabled="!isEditing" />
						</div>

						<!-- Sex -->
						<div class="col-lg-4">
							<label class="form-label">Sex</label>
							<select class="form-select" v-model="form.sex" :disabled="!isEditing">
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>

						<!-- Birthdate -->
						<div class="col-lg-4">
							<label class="form-label">Birthdate</label>
							<input type="date" class="form-control" v-model="form.birthdate" :disabled="!isEditing" />
						</div>

						<!-- Contact Number -->
						<div class="col-lg-6">
							<label class="form-label">Contact Number</label>
							<input type="text" class="form-control" v-model="form.contact_number" :disabled="!isEditing" />
						</div>

						<!-- Email (READ ONLY) -->
						<div class="col-lg-6">
							<label class="form-label">Email</label>
							<input type="email" class="form-control" :value="form.email" disabled />
						</div>

						<!-- Email Verified -->
						<div class="col-lg-6">
							<label class="form-label">Email Verified</label>
							<input type="email" class="form-control" :value="form.email_verified_at ? 'Verified' : 'Not yet verified'" disabled />
						</div>

						<!-- Campus -->
						<div class="col-lg-6">
							<label class="form-label">Campus</label>
							<input type="text" class="form-control" :value="form.campus?.name" disabled />
						</div>

						<!-- Section -->
						<div class="col-lg-6">
							<label class="form-label">Section</label>
							<input type="text" class="form-control" :value="form.librarian?.section?.name" disabled />
						</div>

						<!-- Status -->
						<div class="col-lg-6">
							<label class="form-label">Account Status</label>
							<input type="text" class="form-control" :value="form.status" disabled />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card-footer hstack justify-content-end gap-2" v-if="isEditing">
			<button class="btn btn-outline-danger" @click="discardChanges">Discard</button>
			<button class="btn btn-outline-primary"><i class="bi bi-floppy me-1"></i> Save</button>
		</div>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";

export default {
	data() {
		return {
			isEditing: false,
			user: null,
			form: {
				last_name: "",
			},
		};
	},

	methods: {
		discardChanges() {
			this.form = structuredClone(this.user);
			this.isEditing = false;
		},
	},

	async mounted() {
		this.user = await thisIsMe();

		if (this.user) {
			this.form = structuredClone(this.user);
		}
	},
};
</script>

<style scoped>
.form-label {
	font-weight: bold;
	margin-left: 1px;
}
</style>

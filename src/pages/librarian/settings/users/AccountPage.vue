<template>
	<div class="card rounded-0 h-100">
		<div class="card-header hstack justify-content-between">
			Account Information
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
						<!-- Username -->
						<div class="col-lg-6">
							<label class="form-label">Username</label>
							<input type="text" class="form-control" :value="form.librarian.username" :disabled="!isEditing" />
						</div>

						<!-- Email (READ ONLY) -->
						<div class="col-lg-6">
							<label class="form-label">Email</label>
							<input type="email" class="form-control" :value="form.email" disabled />
							<small class="text-muted"> Email changes require verification </small>
						</div>

						<!-- Change Password -->
						<div class="col-lg-6">
							<label class="form-label">New Password</label>
							<input type="password" class="form-control" v-model="password.new" :disabled="!isEditing" placeholder="Leave blank to keep current password" />
						</div>

						<div class="col-lg-6">
							<label class="form-label">Confirm Password</label>
							<input type="password" class="form-control" v-model="password.confirm" :disabled="!isEditing" />
						</div>

						<!-- Role -->
						<div class="col-lg-6">
							<label class="form-label">Role</label>
							<input type="text" class="form-control" :value="roleLabel" disabled />
						</div>

						<!-- Status -->
						<div class="col-lg-6">
							<label class="form-label">Account Status</label>
							<input type="text" class="form-control" :value="form.status" disabled />
						</div>

						<!-- Created / Updated -->
						<div class="col-lg-6">
							<label class="form-label">Created At</label>
							<input type="text" class="form-control" :value="formatDate(form.created_at)" disabled />
						</div>

						<div class="col-lg-6">
							<label class="form-label">Last Updated</label>
							<input type="text" class="form-control" :value="formatDate(form.updated_at)" disabled />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card-footer hstack justify-content-end gap-2" v-if="isEditing">
			<button class="btn btn-outline-danger" @click="discardChanges">Discard</button>
			<button class="btn btn-outline-primary"><i class="bi bi-floppy-disk me-1"></i> Save</button>
		</div>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";
import { formatDate } from "@/utilities/dataManipulation";

export default {
	data() {
		return {
			isEditing: false,
			user: null,
			form: {
				last_name: "",
				librarian: {
					username: "",
				},
			},
			password: {
				new: "",
				confirm: "",
			},
		};
	},

	methods: {
		formatDate,
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

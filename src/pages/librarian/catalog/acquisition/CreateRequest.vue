<template>
	<div class="modal-dialog modal-dialog-lg">
		<div class="modal-content">
			<div class="modal-header justify-content-between">
				<h5 class="m-0 fw-bold">📚 Acquisition Request</h5>
				<button class="btn btn-outline-primary btn-sm" @click="resetForm">Reset</button>
			</div>
			<div class="modal-body">
				<form @submit.prevent="createRequest">
					<div class="row g-3">
						<!-- Title -->
						<div class="col-md-6">
							<label class="form-label">Title</label>
							<input type="text" v-model="form.title" class="form-control" required />
						</div>

						<!-- Author -->
						<div class="col-md-6">
							<label class="form-label">Author</label>
							<input type="text" v-model="form.author" class="form-control" />
						</div>

						<!-- Publisher -->
						<div class="col-md-6">
							<label class="form-label">Publisher</label>
							<input type="text" v-model="form.publisher" class="form-control" />
						</div>

						<!-- Year -->
						<div class="col-md-3">
							<label class="form-label">Year</label>
							<input type="number" min="1900" max="2100" v-model="form.year" class="form-control" />
						</div>

						<!-- Edition -->
						<div class="col-md-3">
							<label class="form-label">Edition</label>
							<input type="text" v-model="form.edition" class="form-control" />
						</div>

						<!-- Quantity -->
						<div class="col-md-4">
							<label class="form-label">Quantity</label>
							<input type="number" v-model="form.quantity" class="form-control" required />
						</div>

						<!-- Price -->
						<div class="col-md-4">
							<label class="form-label">Estimated Unit Price</label>
							<input type="number" step="0.01" v-model="form.estimated_unit_price" class="form-control" required />
						</div>

						<!-- Dealer -->
						<div class="col-md-4">
							<label class="form-label">Dealer</label>
							<input type="text" v-model="form.dealer" class="form-control" />
						</div>

						<!-- Item Type -->
						<div class="col-md-12">
							<label class="form-label">Item Type</label>
							<select v-model="form.item_type_id" class="form-select" required>
								<option disabled value="">Select Item Type</option>
								<option :value="type.id" v-for="type in item_types" :key="type.id">{{ type.name }}</option>
							</select>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="text-end mt-4">
						<button class="btn btn-outline-danger me-2" data-bs-dismiss="modal" type="button">Cancel</button>
						<button class="btn btn-success" type="submit"><i class="bi bi-send me-2"></i>Submit Request</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { user } from "@/stores/auth";
import { getItemType } from "@/stores/librarianCache";
import { postRequest } from "@/stores/requestService";
import { Modal } from "bootstrap";

export default {
	data() {
		return {
			item_types: null,
			form: {
				requested_by: user?.id || null,
				title: "",
				author: "",
				publisher: "",
				year: "",
				edition: "",
				quantity: "",
				estimated_unit_price: "",
				dealer: "",
				item_type_id: "",
			},
		};
	},
	async created() {
		this.item_types = await getItemType();
	},
	methods: {
		getItemType,

		async createRequest() {
			try {
				showLoading({ message: "Creating acquisition request" });
				const res = await postRequest("acquisition/request", this.form);
				if (res.status === 201) {
					showStatus({
						status: "success",
						title: "Success",
						message: res.data.message,
					});

					const el = Modal.getInstance(document.getElementById("createRequest"));
					el.hide();
					this.resetForm();
				}
			} catch (e) {
				showStatus({
					status: "error",
					title: "Error",
					message: e.message,
				});
			}
		},
		resetForm() {
			this.form = {
				requested_by: user.value.id,
				title: "",
				author: "",
				publisher: "",
				year: "",
				edition: "",
				quantity: "",
				estimated_unit_price: "",
				dealer: "",
				item_type_id: "",
			};
		},
	},
};
</script>

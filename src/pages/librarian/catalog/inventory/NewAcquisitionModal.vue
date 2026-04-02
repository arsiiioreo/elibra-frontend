<template>
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-body p-4">
				<!-- Header -->
				<div class="d-flex justify-content-between mb-2">
					<div>
						<h4 class="mb-1">Add New Copies</h4>
						<p class="small text-muted">Add a record of newly acquired copies of this item.</p>
					</div>
					<button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
				</div>

				<!-- Form -->
				<form @submit.prevent="addNewCopies">
					<div class="row g-3">
						<!-- Acquisition Mode -->
						<div class="col-12">
							<label for="acquisition_mode" class="form-label required"> Acquisition Mode </label>
							<select name="acquisition_mode" id="acquisition_mode" class="form-control" v-model="acquisition.mode" required>
								<option value="" disabled>Select Acquisition Mode</option>
								<option v-for="(mode, index) in acquisition_modes" :key="index" :value="mode.id">
									{{ mode.name }}
								</option>
							</select>
						</div>

						<!-- Donor / Dealer -->
						<div class="col-12">
							<label for="dealer" class="form-label required">
								{{ acquisition.mode === "purchased" || acquisition.mode === "exchange" ? "Dealer" : "Donor" }}
							</label>
							<input type="text" class="form-control" id="dealer" placeholder="Last Name, First Name Middle Initial" v-model="acquisition.dealer" required />
						</div>

						<!-- Acquisition Date -->
						<div class="col-lg-6">
							<label for="acquisition_date" class="form-label required">Acquisition Date</label>
							<input type="date" class="form-control" id="acquisition_date" v-model="acquisition.date" required />
						</div>

						<!-- Copies -->
						<div class="col-lg-6">
							<label for="copies" class="form-label required">Quantity</label>
							<input type="number" class="form-control" id="copies" placeholder="Enter Copies" min="1" max="199" v-model.number="acquisition.copies" required />
						</div>

						<!-- Price -->
						<div class="col-lg-6" v-if="acquisition.mode === 'purchased'">
							<label for="price" class="form-label required">Price</label>
							<input type="number" class="form-control" id="price" placeholder="Enter Price" min="0" v-model.number="acquisition.price" required />
						</div>

						<!-- Total Price -->
						<div class="col-lg-6" v-if="acquisition.mode === 'purchased'">
							<label for="total_price" class="form-label">Total Price</label>
							<input type="text" class="form-control text-end" id="total_price" :value="totalPrice" readonly />
						</div>

						<!-- Acquisition Remarks -->
						<div class="col-lg-12">
							<label for="acquisition_remarks" class="form-label">Acquisition Remarks</label>
							<textarea type="text" class="form-control" id="acquisition_remarks" style="resize: none" maxlength="255" v-model="acquisition.acquisition_remarks"></textarea>
							<small class="w-100 text-end" :class="acquisition.acquisition_remarks?.length && acquisition.acquisition_remarks?.length >= 254 ? 'text-danger' : ''">{{ acquisition.acquisition_remarks?.length }} / 255</small>
						</div>
					</div>

					<!-- Submit -->
					<div class="text-end mt-3">
						<button type="submit" class="btn btn-outline-success"><i class="bi bi-plus-circle me-2"></i>Add</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
// import { backendRoute } from "@/plugins/axios";
import { generatePdf } from "@/services/generatePdf";
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { confirm } from "@/services/YesNoService";
import { postRequest } from "@/stores/requestService";
import { acquisition_modes } from "@/utilities/selectOptions";
import { Modal } from "bootstrap";

export default {
	props: {
		itemId: { type: Number },
	},

	data() {
		return {
			acquisition_modes: acquisition_modes,
			acquisition: {
				mode: "",
				date: "",
				dealer: "",
				copies: 1,
				price: 0,
				acquisition_remarks: "",
			},
			modalInstance: null,
		};
	},
	computed: {
		hasInputs() {
			return this.acquisition.mode || this.acquisition.dealer;
		},
		totalPrice() {
			if (this.acquisition.copies && this.acquisition.price) {
				return (this.acquisition.copies * this.acquisition.price).toFixed(2);
			}
			return "";
		},
	},
	methods: {
		closeModal() {
			if (this.modalInstance) this.modalInstance.hide();
			this.resetForm();
		},
		async addNewCopies() {
			try {
				const generateReceipt = await confirm({ title: "Receipt", message: "Do you want to generate an acquisition slip for the order summary?" });
				showLoading({ message: "Adding, please wait..." });

				if (generateReceipt) {
					this.receipt = true;
				} else {
					this.receipt = false;
				}

				const res = await postRequest(`item/update/new-acquisition-of/${this.itemId}`, {
					acquisition: {
						acquisition_mode: this.acquisition.mode,
						acquisition_date: this.acquisition.date,
						dealer: this.acquisition.dealer,
						copies: this.acquisition.copies,
						price: this.acquisition.price,
						acquisition_remarks: this.acquisition_remarks,
					},
				});

				if (res.data.status === "success") {
					if (generateReceipt) {
						generatePdf({
							params: "extract/acquisition_slip",
							payload: {
								acquisition_id: res.data.acquisition_id,
							},
						});
					} else {
						showStatus({ status: "success", title: "Success", message: res.data.message });
					}
					// ✅ Close modal AFTER SweetAlert closes
					const el = document.getElementById("addNewCopies");
					const modal = Modal.getInstance(el);
					modal.hide();
				}
				this.closeModal();
			} catch (e) {
				console.error(e);
			}
		},

		resetForm() {
			this.acquisition = {
				mode: "",
				date: "",
				dealer: "",
				copies: null,
				price: null,
			};
		},
	},
};
</script>

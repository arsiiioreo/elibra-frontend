<template>
    <div class="h-100 w-100 overflow-hidden">
        <div class="card w-100 mb-2">
            <div class="card-header d-flex justify-content-between align-items-center">Data Management</div>

            <div class="card-body">
                <button class="btn btn-outline-primary ms-auto" data-bs-toggle="modal" data-bs-target="#createRequest">Create Request</button>
            </div>
        </div>
        <div class="card w-100 h-100">
            <div class="card-body"></div>
        </div>
    </div>

    // Create Acquisition Request
    <div class="modal fade" id="createRequest" data-bs-backdrop="static">
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
                            <div class="col-md-6">
                                <label class="form-label">Item Type</label>
                                <select v-model="form.item_type_id" class="form-select" required>
                                    <option disabled value="">Select Item Type</option>
                                    <option value="1">Book</option>
                                </select>
                            </div>

                            <!-- Status -->
                            <div class="col-md-6">
                                <label class="form-label">Status</label>
                                <select name="status" id="status" class="form-select" v-model="form.status">
                                    <option value="" selected disabled>Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="acquired">Acquired</option>
                                    <option value="rejected">Rejected</option>
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
    </div>
</template>

<script>
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { user } from "@/stores/auth";
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
                status: "pending",
            },
        };
    },
    methods: {
        async createRequest() {
            try {
                showLoading({ message: "Creating acquisition request, please wait" });
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
                status: "pending",
            };
        },
    },
};
</script>

<style scoped>
button.btn-success {
    transition: 0.2s ease;
}

button.btn-success:hover {
    transform: scale(1.03);
}
</style>


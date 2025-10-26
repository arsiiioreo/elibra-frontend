<template>
    <div class="card-header hstack justify-content-between p-1">
        <div class="hstack gap-2">
            <button class="btn" @click="updatePage"><i class="bi bi-chevron-left"></i></button>
            <p class="m-0">{{ data?.first_name || "User" }}'s Information</p>
        </div>
        <div class="hstack gap-2">
            <!-- Default dropstart button -->
            <div class="btn-group dropstart">
                <button class="btn" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Edit User</a></li>
                    <li><a class="dropdown-item" href="#">Deactivate User</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="card-body">
        <!-- Loading Spinner -->
        <div class="h-100 w-100 d-flex justify-content-center align-items-center" v-if="fetching">
            <img :src="spinner" alt="Loading..." width="100" height="100" />
        </div>

        <!-- User Info Display -->
        <div class="w-100 h-100" v-else>
            <div class="row">
                <div class="col-12 p-2 mb-2" v-if="data.pending_registration_approval === '1'">
                    <div class="card">
                        <div class="card-header">Registration Status</div>
                        <div class="card-body">{{ data?.first_name }} is still pending for approval. Approve or Reject {{ data?.first_name }}'s registration now.</div>
                        <div class="card-footer text-end gap-2">
                            <button class="btn btn-outline-danger me-2">Reject</button>
                            <button class="btn btn-success" @click="approve">Approve</button>
                        </div>
                    </div>
                </div>

                <!-- Profile Picture -->
                <div class="col-12 text-center mb-5 d-flex flex-column align-items-center">
                    <img :src="profile_picture" alt="Profile Picture" class="rounded-circle border" width="120" height="120" />
                    <h6 class="mt-3 fw-bold text-capitalize">{{ data.first_name }} {{ data.middle_initial ? data.middle_initial + "." : "" }} {{ data.last_name }}</h6>
                    <span class="badge bg-success" v-if="data.status == 0">Active</span>
                    <span class="badge bg-warning text-dark" v-else-if="data.status == 1">For Approval</span>
                    <span class="badge bg-secondary" v-else>Inactive</span>
                </div>

                <!-- Details -->
                <div class="col-12">
                    <div class="row mb-3">
                        <!-- Personal Information -->
                        <h5 class="fw-bold">Personal Information</h5>
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Email</label>
                            <p class="fw-semibold mb-0">{{ data.email }}</p>
                        </div>
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Sex</label>
                            <p class="fw-semibold mb-0 text-capitalize">{{ data.sex }}</p>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Role</label>
                            <p class="fw-semibold mb-0">{{ data.role }}</p>
                        </div>
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Campus</label>
                            <p class="fw-semibold mb-0">
                                {{ data.campus_id ? data.campus_id : "—" }}
                            </p>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Contact Number</label>
                            <p class="fw-semibold mb-0">
                                {{ data.contact_number || "—" }}
                            </p>
                        </div>
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Email Verified At</label>
                            <p class="fw-semibold mb-0">
                                {{ formatDate(data.email_verified_at) }}
                            </p>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Created At</label>
                            <p class="fw-semibold mb-0">
                                {{ formatDate(data.created_at) }}
                            </p>
                        </div>
                        <div class="col-sm-6">
                            <label class="text-muted mb-1">Updated At</label>
                            <p class="fw-semibold mb-0">
                                {{ formatDate(data.updated_at) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <hr />
        </div>
    </div>
</template>

<script>
import spinner from "@/assets/spinner.gif";
import defaultAvatar from "@/assets/profile_default.png"; // make sure you have a placeholder

import { getRequest } from "@/stores/requestService";
import { showStatus } from "@/services/StatusService";
import { confirm } from "@/services/YesNoService";
import { showLoading } from "@/services/LoadingService";

export default {
    props: {
        id: Number,
    },
    data() {
        return {
            spinner,
            defaultAvatar,
            profile_picture: defaultAvatar,
            fetching: false,
            data: null,
        };
    },
    created() {
        this.fetchDetails();
    },
    watch: {
        id(newVal) {
            if (newVal) this.fetchDetails();
        },
    },
    methods: {
        async approve() {
            const ans = await confirm({ title: "Approve User", message: `Are you sure you want to approve ${this.data.first_name}'s registration?` });
            if (ans) {
                showLoading({ message: "Approving, please wait..." });
                try {
                    const res = await getRequest("a/user/approve/" + this.id);
                    this.data.pending_registration_approval = "0";
                    showStatus({ status: "success", title: "Approved", message: res.data.message });
                } catch (e) {
                    showStatus({ status: "error", title: "Error", message: "Failed to approve user." + e.message });
                }
            }
        },
        updatePage() {
            this.$emit("update-page", false);
        },

        async fetchDetails() {
            this.fetching = true;
            if (this.id) {
                try {
                    const res = await getRequest("a/user/details/" + this.id);
                    this.data = res.data;
                    this.profile_picture = this.data.profile_picture ? this.data.profile_picture : this.defaultAvatar;
                } catch (e) {
                    showStatus({ status: "error", title: "Error", message: "Failed to fetch user details." });
                } finally {
                    this.fetching = false;
                }
            }
        },
        formatDate(date) {
            if (!date) return "—";
            const d = new Date(date);
            return d.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
    },
};
</script>

<style scoped>
.card-body {
    font-size: 0.85rem !important;
}
</style>


<template>
    <div class="card p-3 shadow-sm">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="m-0"><i class="bi bi-diagram-3 me-3"></i>Campus Branches</h5>
            <button class="btn btn-primary btn-sm" @click="openAddForm"><i class="bi bi-plus-lg me-2"></i>Add Branch</button>
        </div>

        <!-- Branches Table -->
        <table class="table table-bordered table-hover align-middle">
            <thead class="table-light">
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Department</th>
                    <th>Opening Hour</th>
                    <th>Closing Hour</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="fetching">
                    <td colspan="7" class="text-center text-muted">Loading...</td>
                </tr>
                <tr v-else-if="branches.length === 0">
                    <td colspan="7" class="text-center text-muted">No branches found.</td>
                </tr>
                <tr v-else v-for="(branch, index) in branches" :key="branch.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ branch.name }}</td>
                    <td>{{ branch.contact_info || "—" }}</td>
                    <td>{{ branch.department?.name || "—" }}</td>
                    <td>{{ branch.opening_hour }}</td>
                    <td>{{ branch.closing_hour }}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary me-1" @click="editBranch(branch)">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" @click="deleteBranch(branch)">
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
                            {{ isEditing ? "Edit Branch" : "Add New Branch" }}
                        </h5>
                        <button class="btn-close" @click="cancelModal"></button>
                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="saveBranch">
                            <div class="mb-2">
                                <label class="form-label">Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" v-model="form.name" required />
                            </div>

                            <div class="mb-2">
                                <label class="form-label">Contact Info</label>
                                <input type="text" class="form-control" v-model="form.contact_info" placeholder="Email or phone number (optional)" />
                            </div>

                            <div class="mb-2">
                                <label class="form-label">Department (optional)</label>
                                <input type="text" class="form-control" v-model="form.department_id" placeholder="Department ID or leave blank" />
                            </div>

                            <div class="row mb-3">
                                <div class="col">
                                    <label class="form-label">Opening Hour</label>
                                    <input type="time" class="form-control" v-model="form.opening_hour" required />
                                </div>
                                <div class="col">
                                    <label class="form-label">Closing Hour</label>
                                    <input type="time" class="form-control" v-model="form.closing_hour" required />
                                </div>
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
</template>

<script>
import Swal from "sweetalert2";
import { getRequest, postRequest } from "@/stores/requestService";
import { hideLoading, showLoading } from "@/services/LoadingService";

export default {
    props: {
        campus_id: { type: Number, required: true },
    },
    data() {
        return {
            branches: [],
            fetching: false,
            showModal: false,
            isEditing: false,
            form: {
                id: null,
                name: "",
                contact_info: "",
                department_id: null,
                opening_hour: "",
                closing_hour: "",
            },
            originalForm: {},
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
        async fetchBranches() {
            this.fetching = true;
            try {
                const res = await getRequest(`branch/read/${this.campus_id}`);
                this.branches = res.data;
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to fetch branches.", "error");
            } finally {
                this.fetching = false;
            }
        },

        openAddForm() {
            this.resetForm();
            this.isEditing = false;
            this.showModal = true;
        },

        editBranch(branch) {
            this.form = { ...branch };
            this.originalForm = { ...branch };
            this.isEditing = true;
            this.showModal = true;
        },

        async saveBranch() {
            if (!this.form.name) return;

            const payload = {
                ...this.form,
                campus_id: this.campus_id,
            };
            showLoading({ message: "Saving branch, please wait..." });
            if (this.isEditing) {
                const res = await Swal.fire({
                    title: "Update Branch?",
                    text: "Are you sure you want to update this branch information?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes, update it",
                    cancelButtonText: "Cancel",
                });
                if (!res.isConfirmed) return;

                try {
                    showLoading({ message: "Upading information, please wait..." });
                    await postRequest("branch/update", payload);
                    this.fetchBranches();
                    Swal.fire("Updated!", "Branch information updated.", "success");
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to update branch.", "error");
                } finally {
                    hideLoading();
                }
            } else {
                try {
                    await postRequest("branch/create", payload);
                    Swal.fire("Added!", "New branch has been added.", "success");
                    this.fetchBranches();
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to add branch.", "error");
                } finally {
                    hideLoading();
                }
            }

            this.showModal = false;
        },

        async deleteBranch(branch) {
            const res = await Swal.fire({
                title: "Delete Branch?",
                text: `Are you sure you want to delete "${branch.name}"?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it",
                cancelButtonText: "Cancel",
            });

            if (res.isConfirmed) {
                try {
                    await postRequest("branch/delete", { id: branch.id });
                    Swal.fire("Deleted!", "Branch removed successfully.", "success");
                    this.fetchBranches();
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "Failed to delete branch.", "error");
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
        this.fetchBranches();
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


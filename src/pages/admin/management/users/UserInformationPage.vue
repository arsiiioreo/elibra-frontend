<template>
    <form class="vstack gap-3">
        <button class="btn btn-outline-secondary" @click="enableUpdateInputs">{{ enableEdit ? "Cancel" : "Update Information" }}</button>
        <!-- Last Name -->
        <BaseInput :model-value="form.last_name" label="Last Name" />
        <div>
            <label class="form-label fw-bold mb-1">Last Name</label>
            <input type="text" class="form-control" v-model="form.last_name" :readonly="enableEdit" />
        </div>

        <!-- Middle Initial -->
        <div>
            <label class="form-label fw-bold mb-1">Middle Initial</label>
            <input type="text" class="form-control" v-model="form.middle_initial" maxlength="1" placeholder="N/A" />
        </div>

        <!-- First Name -->
        <div>
            <label class="form-label fw-bold mb-1">First Name</label>
            <input type="text" class="form-control" v-model="form.first_name" />
        </div>

        <!-- Sex -->
        <div>
            <label class="form-label fw-bold mb-1">Sex</label>
            <select class="form-select" v-model="form.sex">
                <option disabled value="">Select Sex</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
            </select>
        </div>

        <!-- Contact Number -->
        <div>
            <label class="form-label fw-bold mb-1">Contact Number</label>
            <input type="text" class="form-control" v-model="form.contact_number" placeholder="e.g., 09XXXXXXXXX" />
        </div>

        <!-- Email -->
        <div>
            <label class="form-label fw-bold mb-1">Email</label>
            <input type="email" class="form-control" v-model="form.email" />
        </div>

        <!-- Email Verified -->
        <div>
            <label class="form-label fw-bold mb-1">Email Verified</label>
            <select class="form-select" v-model="form.email_verified">
                <option value="1">Yes</option>
                <option value="0">No</option>
            </select>
        </div>

        <!-- Username -->
        <div>
            <label class="form-label fw-bold mb-1">Username</label>
            <input type="text" class="form-control" v-model="form.username" />
        </div>

        <!-- Role -->
        <div>
            <label class="form-label fw-bold mb-1">Role</label>
            <select class="form-select" v-model="form.role">
                <option value="0">Admin</option>
                <option value="1">Librarian</option>
                <option value="2">Patron</option>
            </select>
        </div>

        <!-- Registration Status -->
        <div>
            <label class="form-label fw-bold mb-1">Registration Status</label>
            <select class="form-select" v-model="form.pending_registration_approval">
                <option value="1">Approved</option>
                <option value="0">Pending</option>
            </select>
        </div>

        <!-- Account Status -->
        <div>
            <label class="form-label fw-bold mb-1">Account Status</label>
            <select class="form-select" v-model="form.account_status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
        </div>

        <div class="mt-3 hstack justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-success" @click.prevent="updateUser">Save Changes</button>
        </div>
    </form>
</template>

<script>
import BaseInput from "@/components/inputs/BaseInput.vue";

export default {
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    components: { BaseInput },
    data() {
        return {
            form: {}, // clone to avoid mutating the original directly

            enableEdit: false,
        };
    },
    mounted() {
        this.form = { ...this.user };
    },
    methods: {
        enableUpdateInputs() {
            this.enableEdit = !this.enableEdit;
        },

        async updateUser() {
            try {
                // You can use your requestService here
                // Example:
                // await putRequest(`a/users/${this.form.id}`, this.form);

                console.log("Updated user data:", this.form);
                alert("User updated successfully (mock).");
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
    },
};
</script>


<template>
    <div class="row">
        <div class="card p-4 shadow-sm col-12 col-xl-8 mx-auto">
            <h5 class="mb-3"><i class="bi bi-pencil-square me-2"></i>Update Campus Information</h5>

            <form @submit.prevent="updateCampus" class="w-100">
                <div class="mb-3">
                    <label class="form-label">Campus Name</label>
                    <input type="text" v-model="form.name" class="form-control" placeholder="Enter campus name" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Abbreviation</label>
                    <input type="text" v-model="form.abbrev" class="form-control" placeholder="Enter abbreviation" />
                </div>

                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <input type="text" v-model="form.address" class="form-control" placeholder="Enter address" />
                </div>

                <div class="d-flex gap-2 mt-3 justify-content-end">
                    <!-- Reset Button -->
                    <button type="button" class="btn btn-outline-danger" @click="resetForm" :disabled="!hasChanges"><i class="bi bi-arrow-counterclockwise me-2"></i>Reset</button>

                    <!-- Update Button -->
                    <button type="submit" class="btn btn-primary" :disabled="!hasChanges"><i class="bi bi-save me-2"></i>Update Information</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    props: {
        campus: Object,
    },
    data() {
        return {
            form: {
                name: "",
                abbrev: "",
                address: "",
            },
            originalData: {},
        };
    },
    computed: {
        // Check if any value has changed
        hasChanges() {
            return this.form.name !== this.originalData.name || this.form.abbrev !== this.originalData.abbrev || this.form.address !== this.originalData.address;
        },
    },
    watch: {
        campus: {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (newVal) {
                    this.form = { ...newVal };
                    this.originalData = { ...newVal };
                }
            },
        },
    },
    methods: {
        async updateCampus() {
            if (!this.hasChanges) return;

            const result = await Swal.fire({
                title: "Confirm Update",
                text: "Are you sure you want to update this campus information?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, update it!",
                cancelButtonText: "Cancel",
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                try {
                    // Simulate API call — replace with your actual PUT request
                    // await updateCampusAPI(this.form);

                    await Swal.fire({
                        title: "Updated!",
                        text: "Campus information has been updated successfully.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    // Update original data after successful update
                    this.originalData = { ...this.form };
                } catch (error) {
                    Swal.fire("Error", "Something went wrong while updating.", "error");
                }
            }
        },

        async resetForm() {
            if (!this.hasChanges) return;

            const result = await Swal.fire({
                title: "Reset Changes?",
                text: "All unsaved changes will be lost.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, reset it",
                cancelButtonText: "Cancel",
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                this.form = { ...this.originalData };
                Swal.fire({
                    title: "Reset!",
                    text: "Changes have been reverted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        },
    },
};
</script>

<style scoped>
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>


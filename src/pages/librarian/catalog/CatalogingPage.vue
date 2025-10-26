<template>
    <div class="w-100 h-100 vstack overflow-hidden">
        <div class="card w-100 mb-2" v-if="!showDetails">
            <div class="card-header">Data Management</div>
            <div class="card-body">
                <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#addNewItem">Add New Item</button>
            </div>
        </div>
        <div class="card w-100 h-100 overflow-hidden" v-if="!showDetails">
            <div class="card-header">
                <div class="hstack gap-2 justify-content-between">
                    All Library Items
                    <button class="btn btn-outline-secondary"><i class="bi bi-clockwise"></i>Refresh</button>
                </div>
            </div>
            <div class="card-body overflow-auto">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <td>No</td>
                            <td>Title</td>
                            <td>Year Published</td>
                            <td>Call Number</td>
                            <td>Item Type</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="fetching">
                            <td colspan="6">Loading, please wait...</td>
                        </tr>

                        <tr v-else-if="data && data.length <= 0">
                            <td colspan="6">No data found.</td>
                        </tr>

                        <tr v-else v-for="(d, index) in data" :key="d.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ d.title }}</td>
                            <td>{{ d.year_published }}</td>
                            <td>{{ d.call_number }}</td>
                            <td>{{ d.item_type.name }}</td>
                            <td><button class="btn btn-sm btn-primary" @click="showDetails = true">Full Details</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card h-100 w-100" v-if="showDetails">
            <button class="btn btn-sm btn-primary" @click="showDetails = false">Back</button>
        </div>
    </div>

    <div class="modal fade" id="addNewItem" data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { showStatus } from "@/services/StatusService";
import { getItems } from "@/stores/librarianCache";

export default {
    created() {
        this.fetchItems();
    },
    data() {
        return {
            fetching: false,
            data: null,
            showDetails: false,
        };
    },
    methods: {
        async fetchItems() {
            this.fetching = true;
            try {
                const res = await getItems();

                this.data = res.data;
            } catch (e) {
                showStatus({ status: "error", title: "Error", message: e.message });
            } finally {
                this.fetching = false;
            }
        },
    },
};
</script>

<style scoped>
td:last-child {
    text-align: center;
}
</style>


<template>
    <div class="p-3">
        <div class="row mb-3">
            <div class="col-6">
                <form class="hstack gap-2 align-items-center" @submit.prevent="filterSearch">
                    <input type="text" class="form-control" id="searchQuery" name="searchQuery" placeholder="Enter search" v-model="searchQuery" @input="filterSearch" />
                    <button type="submit" class="btn btn-primary">Search</button>
                </form>
            </div>
            <div class="col-6">
                <div class="hstack gap-2 justify-content-end">
                    <button class="btn btn-secondary" @click="loadCampuses(true)">
                        <i class="bi bi-arrow-clockwise"></i>
                        Refresh
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCampus">
                        <i class="bi bi-plus"></i>
                        Add Campus
                    </button>
                </div>
            </div>
        </div>
        <div class="">
            <div class="d-flex w-100 overflow-hidden bg-light rounded">
                <table class="table table-striped text-center m-0">
                    <thead class="table-dark">
                        <tr>
                            <th style="width: 75px">No.</th>
                            <th>Code</th>
                            <th>Campus</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="isFetchingCampuses">
                            <td>
                                <p class="placeholder-glow mb-0"><span class="placeholder col-12"></span></p>
                            </td>
                            <td>
                                <p class="placeholder-glow mb-0"><span class="placeholder col-12"></span></p>
                            </td>
                            <td>
                                <p class="placeholder-glow mb-0"><span class="placeholder col-12"></span></p>
                            </td>
                            <td>
                                <p class="placeholder-glow mb-0"><span class="placeholder col-12"></span></p>
                            </td>
                            <td>
                                <p class="placeholder-glow mb-0"><span class="placeholder col-12"></span></p>
                            </td>
                            <td>
                                <p class="placeholder-glow mb-0"><span class="placeholder col-12"></span></p>
                            </td>
                        </tr>

                        <tr v-if="isEmpty(campuses) && !isFetchingCampuses">
                            <td colspan="6">No data to show.</td>
                        </tr>

                        <tr v-else v-for="(campus, index) in campuses" :key="campus.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ campus.abbrev }}</td>
                            <td>{{ campus.campus }}</td>
                            <td>{{ campus.address }}</td>
                            <td>
                                <select name="activated" :id="'activated' + campus.id" class="form-select" @change="updateCampusStatus(campus.id, campus.is_active)" v-model="campus.is_active">
                                    <option value="1">{{ getLabel("campusStatus", 1) }}</option>
                                    <option value="0">{{ getLabel("campusStatus", 0) }}</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    class="btn btn-sm btn-warning"
                                    @click="
                                        thisCampus = campus;
                                        isEditing = true;
                                        editingCampusId = campus.id;
                                    "
                                    data-bs-toggle="modal"
                                    data-bs-target="#addCampus">
                                    <i class="bi bi-pencil"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="addCampus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ isEditing ? "Edit" : "Add" }} Campus</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
                    </div>
                    <div class="modal-body">
                        <form class="w-100" @submit.prevent="manageCampus">
                            <div class="mb-3">
                                <label for="code" class="form-label">Campus Code</label>
                                <input id="code" name="code" type="text" class="form-control" placeholder="e.g. ISU-Main" v-model="thisCampus.abbrev" required />
                            </div>
                            <div class="mb-3">
                                <label for="code" class="form-label">Campus Name</label>
                                <input id="name" name="name" type="text" class="form-control" placeholder="e.g. Echague" v-model="thisCampus.campus" required />
                            </div>
                            <div class="mb-3">
                                <label for="code" class="form-label">Campus Address</label>
                                <input id="location" name="location" type="text" class="form-control" placeholder="e.g. San Fabian, Echague, Isabela" v-model="thisCampus.address" required />
                            </div>
                            <hr />
                            <div class="d-100 hstack justify-content-end gap-2">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetForm">Close</button>
                                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{{ isEditing ? "Update" : "Add" }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchCampuses, loading, storage } from "@/stores/apiCache";
import { getLabel } from "@/utilities/dataMap";
import { modifyCampus } from "@/stores/postMethod";
import { isEmpty } from "@/utilities/dataMap";

export default {
    created() {
        this.loadCampuses();
    },
    setup() {
        return {
            getLabel,
            isEmpty,
        };
    },
    computed: {
        isFetchingCampuses() {
            return loading.campuses;
        },
    },
    data() {
        return {
            isEditing: false,
            editingCampusId: null,
            searchQuery: "",
            campuses: [],
            originalCampuses: [],
            thisCampus: [],
        };
    },
    methods: {
        // Fetches the cached Campus
        async loadCampuses(refresh = false) {
            this.campuses = null;
            this.originalCampuses = null;

            if (refresh) storage.campus = null;

            await fetchCampuses();
            this.campuses = storage.campus;
            this.originalCampuses = [...storage.campus];
        },

        // Implements a filter on search
        filterSearch() {
            const q = this.searchQuery.trim().toLowerCase();

            if (this.isEmpty(this.campuses) && this.isEmpty(this.originalCampuses)) return;

            if (q) {
                this.campuses = this.originalCampuses.filter((c) => {
                    return c?.abbrev.toLowerCase().includes(q) || c?.campus?.toLowerCase().includes(q) || c?.address.toLowerCase().includes(q);
                });
            } else {
                // Reset to full list if query is empty
                this.campuses = [...this.originalCampuses];
            }
        },

        // Handles both adding and updating of Campus
        async manageCampus() {
            const formData = new FormData();
            formData.append("abbrev", this.thisCampus.abbrev);
            formData.append("name", this.thisCampus.campus);
            formData.append("address", this.thisCampus.address);

            if (this.isEditing) {
                formData.append("id", this.editingCampusId);
                await modifyCampus(formData, "edit");
            } else {
                await modifyCampus(formData, "add");
            }

            this.loadCampuses();
            this.resetForm();
        },

        resetForm() {
            this.thisCampus = [];
            this.isEditing = false;
            this.editingCampusId = null;
        },
    },
};
</script>


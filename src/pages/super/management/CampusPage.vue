<template>
    <div class="row mb-3">
        <div class="col-6">
            <form class="hstack gap-2 align-items-center" @submit.prevent="filterSearch">
                <input type="text" class="form-control" placeholder="Enter search" v-model="searchQuery" @input="filterSearch" />
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div>
        <div class="col-6">
            <div class="hstack gap-2 justify-content-end">
                <button class="btn btn-secondary" @click="loadCampuses">
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="loadingData">
                        <td>
                            <p class="placeholder-glow mb-0">
                                <span class="placeholder col-12"></span>
                            </p>
                        </td>
                        <td>
                            <p class="placeholder-glow mb-0">
                                <span class="placeholder col-12"></span>
                            </p>
                        </td>
                        <td>
                            <p class="placeholder-glow mb-0">
                                <span class="placeholder col-12"></span>
                            </p>
                        </td>
                        <td>
                            <p class="placeholder-glow mb-0">
                                <span class="placeholder col-12"></span>
                            </p>
                        </td>
                    </tr>

                    <tr v-if="isEmpty(campuses) && !loadingData">
                        <td colspan="4">No data to show.</td>
                    </tr>

                    <tr v-else v-for="(campus, index) in campuses" :key="campus.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ campus.abbrev }}</td>
                        <td>{{ campus.campus }}</td>
                        <td>{{ campus.address }}</td>
                        <td>
                            <select name="activated" id="activated" class="form-select">
                                <option value="0" :selected="campus.is_active === '0'">Deactivate</option>
                                <option value="1" :selected="campus.is_active === '1'">Active</option>
                            </select>
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
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Campus</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="w-100" @submit.prevent="addCampus">
                        <div class="mb-3">
                            <label for="code" class="form-label">Campus Code</label>
                            <input id="code" name="code" type="text" class="form-control" placeholder="e.g. ISU-Main" v-model="campus.abbrev" required />
                        </div>
                        <div class="mb-3">
                            <label for="code" class="form-label">Campus Name</label>
                            <input id="name" name="name" type="text" class="form-control" placeholder="e.g. Echague" v-model="campus.name" required />
                        </div>
                        <div class="mb-3">
                            <label for="code" class="form-label">Campus Location</label>
                            <input id="location" name="location" type="text" class="form-control" placeholder="e.g. San Fabian, Echague, Isabela" v-model="campus.address" required />
                        </div>
                        <hr />
                        <div class="d-100 hstack justify-content-end gap-2">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/plugins/axios";

export default {
    data() {
        return {
            loadingData: false,
            searchQuery: "",
            campuses: [],
            originalCampuses: [],
            campus: [],
        };
    },
    methods: {
        isEmpty(arr) {
            return Array.isArray(arr) && arr.length === 0;
        },

        filterSearch() {
            const q = this.searchQuery.trim().toLowerCase();

            if (q) {
                this.campuses = this.originalCampuses.filter((campus) => {
                    return campus?.abbrev.toLowerCase().includes(q) || campus?.campus?.toLowerCase().includes(q) || campus?.address.toLowerCase().includes(q);
                });
            } else {
                // Reset to full list if query is empty
                this.campuses = [...this.originalCampuses];
            }
        },

        addCampus() {
            console.log("You are adding", this.campus);
        },

        async loadCampuses() {
            this.campuses = null;
            this.originalCampuses = null;

            try {
                this.loadingData = true;
                const res = await api.get("/all-campus");

                if (res) {
                    this.campuses = res.data;
                    this.originalCampuses = [...res.data];
                }
            } catch (error) {
                this.campuses = null;
            } finally {
                this.loadingData = false;
            }
        },
    },
    mounted() {
        this.loadCampuses();
    },
};
</script>


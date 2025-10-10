<template>
    <div class="card">
        <!-- HEADER -->
        <div class="card-header p-3 hstack justify-content-between" v-if="page === 1">
            <h5 class="m-0"><i class="bi bi-building ms-2 me-3"></i>Campus List</h5>
            <div class="hstack gap-2">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewCampus"><i class="bi bi-plus me-2"></i>Add New Campus</button>
                <button class="btn btn-outline-secondary" style="width: 100px" @click="refresh()"><i class="bi bi-arrow-clockwise me-2"></i>Refresh</button>
            </div>
        </div>

        <div class="card-header p-3 hstack" v-else>
            <button class="btn btn-transparent" @click="goBack">
                <i class="bi bi-chevron-left"></i>
            </button>
            <h5 class="m-0"><i class="bi bi-building ms-2 me-3"></i>{{ selectedCampus.name }}</h5>
        </div>

        <!-- BODY -->
        <div class="card-body overflow-hidden position-relative p-0" style="height: 100%; min-height: 400px">
            <div
                class="slider-wrapper d-flex transition-all"
                :style="{
                    transform: page === 1 ? 'translateX(0%)' : 'translateX(-100%)',
                }">
                <!-- PAGE 1 -->
                <div class="page w-100 flex-shrink-0">
                    <div class="card p-2 mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <div class="hstack gap-3">
                                        <div class="hstack gap-2">
                                            <label for="sort" class="m-0">Sort By:</label>
                                            <select name="sort" id="sort" class="form-select" v-model="params.sort" @change="fetchCampuses">
                                                <option value="">Sort By</option>
                                                <option value="name">Name</option>
                                                <option value="created_at">Date Added</option>
                                            </select>
                                        </div>
                                        <div class="hstack gap-2">
                                            <label for="order" class="m-0">Order By:</label>
                                            <select name="order" id="order" class="form-select" v-model="params.order" @change="fetchCampuses">
                                                <option value="">Order By</option>
                                                <option value="asc">Ascending</option>
                                                <option value="desc">Descending</option>
                                            </select>
                                        </div>
                                        <div class="hstack gap-2">
                                            <label for="status" class="m-0">Status:</label>
                                            <select name="status" id="status" class="form-select" v-model="params.status" @change="fetchCampuses">
                                                <option value="" selected>All</option>
                                                <option value="0">Inactive</option>
                                                <option value="1">Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="hstack gap-2 position-relative">
                                        <input type="text" class="form-control" v-model="params.query" placeholder="Search campus..." style="padding-right: 2.3rem" />
                                        <button type="button" class="btn-close position-absolute top-0 bottom-0 end-0 m-2" @click="params.query = ''"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- TABLE -->
                    <table class="table table-hover align-middle mb-0 table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th v-for="(col, i) in columns" :key="i" :style="col.style">
                                    {{ col.label }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="isEmpty(campuses) && !fetchingCampuses" class="text-center">
                                <td :colspan="columnCount">No data to show.</td>
                            </tr>

                            <tr v-else v-for="(campus, index) in campuses" :key="campus.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ campus.abbrev }}</td>
                                <td>{{ campus.name }}</td>
                                <td>{{ campus.address }}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary" @click="goToDetails(campus)">Details</button>
                                </td>
                            </tr>
                            <tr v-if="fetchingCampuses">
                                <td :colspan="columnCount">
                                    <p class="placeholder-glow mb-0">
                                        <span class="placeholder col-12"></span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- PAGE 2 -->
                <div class="page w-100 flex-shrink-0">
                    <ul class="nav nav-tabs gap-1">
                        <li class="nav-item"><button class="nav-link" :class="{ active: infoPage == 1 }" @click="infoPage = 1">Campus Information</button></li>
                        <li class="nav-item"><button class="nav-link" :class="{ active: infoPage == 2 }" @click="infoPage = 2">Branches</button></li>
                    </ul>
                    <div class="w-100 p-3">
                        <div v-if="infoPage === 1">
                            <CampusEditor :campus="selectedCampus" />
                        </div>
                        <div v-else>
                            <CampusBranches :campus_id="selectedCampus?.id" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="addNewCampus">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="m-0"><i class="bi bi-building me-2"></i>Add New Campus</h5>
                        <button class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="">
                            <div class="mb21">
                                <label class="mb-2" for="name">Campus Name</label>
                                <input type="text" class="form-control" id="name" placeholder="i.e. Angadanan Campus" />
                            </div>
                            <div class="mb-2">
                                <label class="mb-2" for="name">Campus Abbreviation</label>
                                <input type="text" class="form-control" id="name" placeholder="i.e. ISU-AC" />
                            </div>
                            <div class="mb-2">
                                <label class="mb-2" for="name">Campus Address</label>
                                <input type="text" class="form-control" id="name" placeholder="Full address of the Campus" />
                            </div>
                            <div class="hstack justify-content-end gap-2 mt-3">
                                <button type="button" class="btn btn-outline-danger">Cancel</button>
                                <button type="button" class="btn btn-success">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { storage } from "@/stores/apiCache";
import { getLabel, isEmpty } from "@/utilities/dataMap";
import { getRequest } from "@/stores/requestService";

import CampusEditor from "./campus/CampusEditorPage.vue";
import CampusBranches from "./campus/CampusBranchesPage.vue";

export default {
    components: { CampusEditor, CampusBranches },
    created() {
        this.fetchCampuses();
    },
    computed: {
        campuses() {
            return storage.campus;
        },
        columnCount() {
            return this.columns.length;
        },
    },
    data() {
        return {
            page: 1,
            infoPage: 1,
            debounceTimer: null,
            selectedCampus: { name: null },
            columns: [{ label: "No.", style: "width: 75px" }, { label: "Code" }, { label: "Campus" }, { label: "Address" }, { label: "Action" }],
            params: {
                query: "",
                sort: "",
                order: "",
                status: "",
                reset() {
                    this.query = "";
                    this.sort = "";
                    this.order = "";
                    this.status = "";
                },
            },
            fetchingCampuses: true,
        };
    },
    watch: {
        "params.query"() {
            clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(() => {
                this.fetchCampuses();
            }, 500);
        },
    },
    methods: {
        isEmpty,
        getLabel,

        refresh() {
            storage.campus = null;
            this.params.reset();
            this.fetchCampuses();
        },

        async fetchCampuses() {
            this.fetchingCampuses = true;

            try {
                this.params.order = this.params.order || "asc";
                this.params.sort = this.params.sort || "name";
                const res = await getRequest("all-c", this.params);
                storage.campus = res.data.data;
                this.fetchingCampuses = false;
            } catch (e) {
                this.fetchingCampuses = false;
                console.log(e);
            }
        },
        goToDetails(campus) {
            this.selectedCampus = campus;
            this.page = 2;
        },
        goBack() {
            this.page = 1;
            this.infoPage = 1;
        },
    },
};
</script>

<style scoped>
th:first-child,
th:nth-child(5),
th:last-child,
td:first-child,
td:last-child {
    text-align: center;
    justify-content: center;
}

/* Sliding container */
.slider-wrapper {
    width: 100%; /* 2 pages side by side */
    transition: transform 0.15s cubic-bezier(0.2, 0, 0.1, 0.5);
}

.page {
    width: 100%;
    padding: 1rem 1rem;
}
</style>

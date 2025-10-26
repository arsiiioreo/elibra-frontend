<template>
    <div class="hstack gap-3 h-100 align-items-center justify-content-start w-100">
        <div class="d-flex flex-column align-items-center justify-content-start text-dark overflow-auto h-100 w-100">
            <div class="card mb-2 w-100">
                <div class="card-header">Data Management</div>
                <div class="card-body">
                    <div class="hstack justify-content-between">
                        <div class="hstack gap-2 justify-content-end">
                            <!-- Filter Dropdown -->
                            <div class="btn-group">
                                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i class="bi bi-funnel me-2"></i><span class="me-2">Filter</span></button>
                                <ul class="dropdown-menu dropdown-menu-end" id="filterBtn" style="width: 300px">
                                    <div class="container p-3">
                                        <h6 class="fw-bold mb-3">Filter Option</h6>
                                        <div class="mb-3">
                                            <label for="role" class="form-label">Role</label>
                                            <select name="role" id="role" class="form-select mb-2" v-model="params.role">
                                                <option value="">All</option>
                                                <option value="0">Admin</option>
                                                <option value="1">Librarian</option>
                                                <option value="2">Patron</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="campus" class="form-label">Campus</label>
                                            <select name="campus" id="campus" class="form-select mb-2" v-model="params.campus">
                                                <option value="">All</option>
                                                <option :value="c.id" v-for="c in campuses" :key="c.id">{{ c.name }}</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="status" class="form-label">Account Status</label>
                                            <select name="status" id="status" class="form-select mb-2" v-model="params.status">
                                                <option value="">All</option>
                                                <option value="0">Active</option>
                                                <option value="1">For Approval</option>
                                                <option value="2">Inactive</option>
                                            </select>
                                        </div>
                                        <div class="hstack justify-content-end gap-2 mt-2">
                                            <button class="btn btn-success" data-bs-dismiss="dropdown" @click="applyFilter">Apply</button>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <!-- Display Manipulation -->
                            <div class="btn-group">
                                <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i class="bi bi-filter me-2"></i><span class="me-2">Sort</span></button>
                                <ul class="dropdown-menu dropdown-menu-end" id="sortBtn" style="width: 300px">
                                    <div class="container p-3">
                                        <h6 class="fw-bold mb-3">Sort Option</h6>
                                        <div class="mb-3">
                                            <label for="sort" class="form-label">Sort By</label>
                                            <select name="sort" id="sort" class="form-select mb-2" v-model="params.sort">
                                                <option value="last_name">Name</option>
                                                <option value="status">Status</option>
                                                <option value="created_at">Date Created</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="order" class="form-label">Order By</label>
                                            <select name="order" id="order" class="form-select mb-2" v-model="params.order">
                                                <option value="asc">Ascending</option>
                                                <option value="desc">Descending</option>
                                            </select>
                                        </div>
                                        <div class="hstack justify-content-end gap-2 mt-2">
                                            <button class="btn btn-success" data-bs-dismiss="dropdown" @click="applySort">Apply</button>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div class="hstack gap-2">
                            <!-- Search Input -->
                            <SearchInput v-model:query="params.query" />
                            <!-- <button class="btn btn-success"><i class="bi bi-plus me-2"></i>Add New User</button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="card w-100 h-100 overflow-auto">
                <div class="card-header hstack justify-content-between">
                    <h5 class="m-0"><i class="bi bi-person-circle ms-2 me-3"></i>All Users</h5>
                    <button class="btn btn-outline-secondary" @click="refresh"><i class="bi bi-arrow-clockwise me-2"></i>Refresh</button>
                </div>
                <div class="card-body overflow-auto p-0">
                    <div class="">
                        <ListPage :users="users" :fetching="fetchingUsers" @selected-id="selectedUserId" />
                    </div>
                </div>
                <div class="card-footer d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <!-- Left side: Entries selector -->
                    <div class="d-flex align-items-center gap-2">
                        <label for="entries" class="form-label mb-0">Show</label>
                        <select name="entries" id="entries" class="form-select form-select-sm" style="width: auto" v-model="params.entries">
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="250">250</option>
                        </select>
                        <span class="text-muted">entries</span>
                    </div>

                    <!-- Right side: Pagination info -->
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                        <label for="page" class="form-label mb-0">Showing page</label>
                        <select name="page" id="page" class="form-select form-select-sm" style="width: auto" v-model="params.page">
                            <option :value="p" v-for="p in pages" :key="p">{{ p }}</option>
                        </select>
                        <span class="text-muted" style="white-space: nowrap"> of {{ pagination.last_page || 1 }} ({{ pagination.total || 0 }} users total) </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card h-100" style="min-width: 400px; max-width: 400px" v-if="showDetails">
            <!-- <div class="card-header">User Information</div> -->
            <UserInformationPage :id="selectedId" v-if="selectedId" @update-page="updatePage" />
        </div>
    </div>
</template>

<script>
import { storage } from "@/stores/adminCache";
import { getRequest } from "@/stores/requestService";
import { Dropdown } from "bootstrap";

import SearchInput from "@/components/inputs/SearchInput.vue";
import UserInformationPage from "./users/UserInformationPage.vue";
import ListPage from "./users/ListPage.vue";

export default {
    name: "LibraryInformationPage",
    components: { ListPage, SearchInput, UserInformationPage },
    created() {
        this.fetchUsers();
        this.fetchCampuses();
    },
    computed: {
        users() {
            return storage.users;
        },
        pages() {
            return Array.from({ length: storage.pagination?.last_page || 1 }, (_, i) => i + 1);
        },
        campuses() {
            return storage.campus;
        },
    },
    data() {
        return {
            showDetails: false,
            selectedId: null,
            fetchingUsers: false,
            debounceTimer: null,
            params: {
                query: "",
                sort: "last_name",
                order: "asc",
                status: "",
                role: "",
                entries: "25",
                page: "1",
                campus: "",
            },
            pagination: {
                total: "",
                per_page: "",
                current_page: "",
                last_page: "",
            },
        };
    },
    methods: {
        updatePage(c) {
            this.showDetails = c;
        },

        selectedUserId(id) {
            this.selectedId = id;
            this.updatePage(true);
        },

        async applyFilter() {
            const dropdownToggle = document.getElementById("filterBtn");
            const dropdown = Dropdown.getInstance(dropdownToggle) || new Dropdown(dropdownToggle);
            dropdown.hide();
            await this.fetchUsers();
        },

        async applySort() {
            const dropdownToggle = document.getElementById("sortBtn");
            const dropdown = Dropdown.getInstance(dropdownToggle) || new Dropdown(dropdownToggle);
            dropdown.hide();
            await this.fetchUsers();
        },

        async fetchUsers() {
            this.fetchingUsers = true;
            this.showDetails = false;
            try {
                const res = await getRequest("a/users", this.params);

                storage.users = res.data.data;
                this.pagination = {
                    total: res.data.total,
                    per_page: res.data.per_page,
                    current_page: res.data.current_page,
                    last_page: res.data.last_page,
                };
            } finally {
                this.fetchingUsers = false;
            }
        },

        refresh() {
            storage.users = null;
            this.fetchUsers();
        },

        async fetchCampuses() {
            try {
                const res = await getRequest("all-c");
                storage.campus = res.data.data;
            } catch (e) {
                console.error(e);
            }
        },
    },
    watch: {
        "params.page"() {
            this.fetchUsers();
        },
        "params.entries"() {
            this.fetchUsers();
        },
        "params.query"() {
            clearTimeout(this.debounceTimer);

            this.debounceTimer = setTimeout(() => {
                this.fetchUsers();
            }, 500);
        },
    },
};
</script>

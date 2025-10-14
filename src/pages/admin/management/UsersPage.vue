<template>
    <div class="card mb-2">
        <div class="card-header">Data Management</div>
        <div class="card-body">
            <div class="vstack gap-3">
                <div class="hstack gap-2">
                    <!-- Filter Dropdown -->
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i class="bi bi-filter me-2"></i>Filter</button>
                        <ul class="dropdown-menu dropdown-menu-end" style="width: 300px">
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
                                    <label for="status" class="form-label">Account Status</label>
                                    <select name="status" id="status" class="form-select mb-2" v-model="params.status">
                                        <option value="">All</option>
                                        <option value="0">Active</option>
                                        <option value="1">For Approval</option>
                                        <option value="2">Inactive</option>
                                    </select>
                                </div>
                                <div class="hstack justify-content-end gap-2 mt-2">
                                    <button class="btn btn-success" data-bs-dismiss="dropdown" @click="fetchUsers">Apply</button>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <!-- Display Manipulation -->
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i class="bi bi-filter me-2"></i>Sort</button>
                        <ul class="dropdown-menu dropdown-menu-end" style="width: 300px">
                            <div class="container p-3">
                                <h6 class="fw-bold mb-3">Filter Option</h6>
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
                                    <button class="btn btn-success" data-bs-dismiss="dropdown" @click="fetchUsers">Apply</button>
                                </div>
                            </div>
                        </ul>
                    </div>
                    <button class="btn btn-success"><i class="bi bi-plus me-2"></i>Add New User</button>
                </div>
                <div class="hstack w-100">
                    <!-- Search Input -->
                    <SearchInput v-model:query="params.query" />
                </div>
            </div>
        </div>
    </div>
    <div class="card w-100 h-100 overflow-hidden">
        <div class="card-header hstack justify-content-between align-items-center p-3">
            <h4 class="mb-0"><i class="bi bi-person-circle me-3 fs-4"></i>All Users</h4>
        </div>
        <div class="card-body overflow-auto p-1">
            <div class="">
                <ListPage :users="users" :fetching="fetchingUsers" />
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
</template>

<script>
import SearchInput from "@/components/inputs/SearchInput.vue";
import { storage } from "@/stores/adminCache";
import ListPage from "./users/ListPage.vue";
import { getRequest } from "@/stores/requestService";
import { Dropdown } from "bootstrap";

export default {
    name: "LibraryInformationPage",
    components: { ListPage, SearchInput },
    created() {
        this.fetchUsers();
    },
    computed: {
        users() {
            return storage.users;
        },
        pages() {
            return Array.from({ length: storage.pagination?.last_page || 1 }, (_, i) => i + 1);
        },
    },
    data() {
        return {
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
        async fetchUsers() {
            const dropdownEl = document.querySelector('[data-bs-toggle="dropdown"]');
            if (dropdownEl) {
                const bsDropdown = Dropdown.getInstance(dropdownEl) || new Dropdown(dropdownEl);
                bsDropdown.hide();
            }

            this.fetchingUsers = true;
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

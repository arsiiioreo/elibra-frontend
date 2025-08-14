<template>
    <div class="d-flex flex-column overflow-hidden h-100">
        <div class="w-100 p-3 bg-white d-flex justify-content-between align-items-center">
            <div class="hstack gap-2 flex-row">
                <strong class="small me-2">All Users</strong>

                <!-- Button for Filtering Table -->
                <div class="dropdown">
                    <button type="button" class="dpdBtn btn btn-sm btn-secondary px-2" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        <i class="bi bi-filter me-1"></i>
                        <span>Filter</span>
                    </button>

                    <form class="dropdown-menu p-3" style="font-size: small; width: 250px">
                        <div class="mb-3">
                            <p class="mb-2 fw-bold">Campus</p>
                            <select name="filterCampus" id="filterCampus" class="form-select form-select-sm" v-model="c">
                                <option value="" selected>All</option>
                                <option v-for="(c, i) in campuses" :key="i" :value="c.id">{{ c.campus }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <p class="mb-2 fw-bold">Role</p>
                            <select name="filterRole" id="filterRole" class="form-select form-select-sm" v-model="r">
                                <option value="">All</option>
                                <option value="0">Super Admin</option>
                                <option value="1">Admin</option>
                                <option value="2">Students</option>
                            </select>
                        </div>
                        <div class="hstack col-12 gap-2">
                            <button
                                type="button"
                                class="btn btn-sm btn-danger col-6"
                                @click="
                                    applyUserFilters(true);
                                    closeDropdown();
                                ">
                                Reset
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-primary col-6"
                                @click="
                                    applyUserFilters();
                                    closeDropdown();
                                ">
                                Apply
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Button for sorting table content -->
                <div class="dropdown">
                    <button type="button" class="dpdBtn btn btn-sm btn-warning px-2" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                        <i class="bi bi-funnel me-1"></i>
                        <span>Sort</span>
                    </button>

                    <form class="dropdown-menu p-3" style="font-size: small; width: 250px">
                        <div class="mb-2">
                            <p class="mb-2 fw-bold">Category</p>
                            <div class="hstack align-items-center gap-1">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="name" value="name" v-model="n" />
                                    <label class="form-check-label" for="name">Name</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="email" value="email" v-model="e" />
                                    <label class="form-check-label" for="email">Email</label>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <p class="mb-2 fw-bold">Order</p>
                            <select name="filterOrder" id="filterOrder" class="form-select form-select-sm" v-model="sortOrder">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        <div class="hstack col-12 gap-2">
                            <button
                                type="button"
                                class="btn btn-sm btn-danger col-6"
                                @click="
                                    applySort(true);
                                    closeDropdown();
                                ">
                                Reset
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-primary col-6"
                                @click="
                                    applySort();
                                    closeDropdown();
                                ">
                                Apply
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Button for refreshing table content -->
                <button type="button" class="btn btn-sm btn-primary px-2" @click="refresh">
                    <i class="bi bi-arrow-clockwise me-1"></i>
                    <span>Refresh</span>
                </button>
            </div>

            <div class="hstack gap-3">
                <div class="input-group">
                    <input v-model="s" @input="applyUserFilters" type="text" list="datalistOptions" id="searchInput" name="searchInput" class="form-control form-control-sm ps-2" placeholder="Search for name or email" style="width: 350px" />
                    <button type="button" class="input-group-text">
                        <i class="bi bi-search" style="font-size: smaller"></i>
                    </button>
                </div>
                <!-- Select entries count to show -->
                <div class="hstack align-items-center gap-2">
                    <small>Show</small>
                    <select name="entries" id="entries" class="form-select form-select-sm" style="width: max-content" v-model="entries" :disabled="isFetchingUsers">
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                    </select>
                    <small>entries</small>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column p-3 h-100 overflow-hidden">
            <div class="h-100 bg-light rounded overflow-auto">
                <table class="table table-hover align-middle table-striped text-nowrap m-0 p-2 position-relative" style="font-size: small; z-index: 1">
                    <thead class="table-secondary sticky-top">
                        <tr>
                            <th class="text-center">No.</th>
                            <th>Name</th>
                            <th class="text-center">Sex</th>
                            <th class="text-center">Role</th>
                            <th>Email</th>
                            <th>Campus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="isFetchingUsers">
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

                        <tr v-if="isEmpty(usersList) && !isFetchingUsers">
                            <td colspan="6" class="text-center">No data to show.</td>
                        </tr>

                        <tr v-else v-for="(u, i) in paginatedUsers" :key="u.id">
                            <td class="text-center">{{ (active - 1) * entries + i + 1 }}</td>
                            <td>{{ u.name }}</td>
                            <td class="text-center">{{ getLabel("sex", u.sex) }}</td>
                            <td class="text-center">{{ getLabel("roles", u.role) }}</td>
                            <td>{{ u.email }}</td>
                            <td>{{ u.campus?.campus }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Footer Summary -->
            <div class="d-flex justify-content-between align-items-center small text-muted mt-2">
                <div class="hstack gap-2">
                    <span> Showing {{ paginatedUsers.length.toLocaleString() }} of {{ usersList.length.toLocaleString() }} users.</span>
                </div>

                <div class="hstack gap-2 align-items-center">
                    <label for="page">Page</label>
                    <select v-model="active" :disabled="isFetchingUsers" name="page" id="page" class="form-select form-select-sm overflow-auto" style="max-height: 150px; width: 75px; scrollbar-width: none">
                        <option v-for="(p, i) in pageOptions" :key="i" :value="p">{{ p }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchCampuses, fetchUsers, loading, storage } from "@/stores/apiCache";
import { filter, search, sort } from "@/utilities/dataManipulation";
import { countArray, getLabel, isEmpty } from "@/utilities/dataMap";
import { Dropdown } from "bootstrap";

export default {
    created() {
        this.loadCampuses();
        this.loadUsers();
    },
    computed: {
        isFetchingUsers() {
            return loading.users;
        },
        pagesCount() {
            return countArray(this.usersList) / this.entries;
        },
        paginatedUsers() {
            const start = (this.active - 1) * this.entries;
            const end = start + this.entries;
            return this.usersList.slice(start, end);
        },
        pageOptions() {
            return Array.from({ length: this.pages }, (_, i) => i + 1);
        },
    },
    setup() {
        return {
            getLabel,
            isEmpty,
            countArray,
        };
    },
    data() {
        return {
            s: "",
            c: "",
            r: "",
            e: "",
            n: "",
            sortOrder: "asc",

            entries: 50,
            active: 1,
            pages: 0,

            campuses: [],
            usersList: [],
            usersForThisPage: [],

            sortKeys: {},
        };
    },
    methods: {
        closeDropdown() {
            document.querySelectorAll(".dpdBtn").forEach((btn) => {
                const dropdown = Dropdown.getInstance(btn);
                if (dropdown) dropdown.hide();
            });
        },

        async loadCampuses() {
            this.campuses = await fetchCampuses();
        },

        async loadUsers(refresh = false) {
            this.usersList = [];

            if (refresh) storage.users = null;
            this.usersList = await fetchUsers();

            this.usersForThisPage = storage.users.filter((e) => (e.pending_registration_approval === "0" ? e.pending_registration_approval : ""));

            this.usersList = this.usersForThisPage;
        },

        applyUserFilters(reset = false) {
            let users = this.usersForThisPage;

            if (reset) {
                this.c = "";
                this.r = "";
            }

            if (this.s) {
                users = search(this.s, users, ["name", "email"]);
            }

            users = filter(users, { "campus.id": this.c, role: this.r });
            this.usersList = users;
            this.applySort();
            this.active = 1;
        },

        applySort(reset = false) {
            const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
            const selectedSortKeys = {};

            if (reset) {
                this.sortOrder = "asc";
                this.sortKeys = {};
                checkboxes.forEach((cb) => {
                    cb.checked = false;
                });
                this.applyUserFilters();
                return;
            }

            checkboxes.forEach((cb) => {
                const key = cb.value;
                const order = this.sortOrder;
                selectedSortKeys[key] = order;
            });

            this.sortKeys = selectedSortKeys;

            const sorted = sort(this.usersList, this.sortKeys);
            this.usersList = sorted;
        },

        refresh() {
            this.e = false;
            this.n = false;
            this.loadUsers();
        },
    },
    watch: {
        usersList() {
            this.pages = Math.ceil(this.pagesCount);
        },
        entries() {
            this.pages = Math.ceil(this.pagesCount);
        },
    },
};
</script>


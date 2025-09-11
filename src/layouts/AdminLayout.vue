<template>
    <div class="d-flex d-sm-none justify-content-center align-items-center w-100" style="height: 100vh">Sorry, this page is not accessible on mobile devices.</div>
    <div class="overflow-hidden d-none d-sm-flex" id="admin-layout" style="max-height: 100vh; min-height: 100vh">
        <!-- Sidebar -->
        <SideBar :user="user" :sideBarOpen="sideBarOpen" />

        <!-- Main content -->
        <div class="flex-grow-1 d-flex flex-column vh-100">
            <!-- Fixed Title Bar -->
            <div class="page-header d-flex justify-content-between align-items-center bg-white p-2 px-3 flex-shrink-0" style="z-index: 1">
                <div class="d-flex align-items-center">
                    <span class="p-2 py-1 bg-light border rounded me-3 text-prime" @click="setSideBarState" style="cursor: pointer">
                        <i class="bi bi-list"></i>
                    </span>
                    <div style="font-size: 0.85rem">
                        <h5 class="fw-bold mb-0">{{ pageTitle }}</h5>
                    </div>
                </div>
                <div class="d-flex gap-2 align-items-center" style="font-size: 0.85rem">
                    <div class="btn-group">
                        <button type="button" class="btn d-flex align-items-center dropdown-toggle border" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                            <span class="px-1 me-2">Admin</span>
                            <img class="me-2 rounded-circle p-1 border border-success" :src="my.profile_picture" alt="logo" style="width: 30px; height: auto" />
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end mt-2" style="width: 300px">
                            <div class="container">
                                <div class="card">
                                    <div class="card-body text-center">
                                        <div class="d-flex text-prime mb-3">
                                            <small class="fw-bold me-auto">Profile Card</small>
                                        </div>
                                        <img class="p-1 rounded-circle border border-success mb-3" :src="my.profile_picture" alt="profile_logo" style="width: 75px; height: 75px" />
                                        <h6 class="card-title fs-5 fw-bold mb-0">{{ my.name ?? "Reign" }}</h6>
                                        <small class="card-subtitle mb-2 text-body-secondary">{{ my.role === "0" ? "Admin" : "Librarian" }}</small>
                                    </div>
                                </div>
                            </div>
                            <li class="p-2">
                                <h6 class="dropdown-header ms-1 ps-0">Actions</h6>
                                <router-link :to="{ name: r.path }" class="dropdown-item p-2 py-3 rounded" type="button" v-for="r in profileCardRoutes" :key="r">
                                    <span class="p-2 bg-secondary text-light mx-2 rounded-1">
                                        <i :class="r.icon"></i>
                                    </span>
                                    {{ r.name }}
                                </router-link>
                                <button class="dropdown-item p-2 py-3 rounded" type="button" @click="$logout">
                                    <span class="p-2 bg-secondary text-light mx-2 rounded-1">
                                        <i class="bi bi-door-open"></i>
                                    </span>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Breadcrumb Section -->
            <header class="navbar d-flex align-items-center w-100 bg-secondary-subtle p-2 text-dark">
                <nav style="--bs-breadcrumb-divider: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22%236c757d%22/%3E%3C/svg%3E')" aria-label="breadcrumb">
                    <ol class="breadcrumb m-0 align-items-center" style="font-size: 0.85rem !important">
                        <i class="bi bi-house-fill ms-2"></i>
                        <p class="mx-2 mb-0" style="background: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22%236c757d%22/%3E%3C/svg%3E') no-repeat center; width: 10px; height: 8px"></p>
                        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item text-dark" :class="{ active: !crumb.to }">
                            <router-link v-if="crumb.to" :to="crumb.to" class="text-decoration-none text-black">{{ crumb.text }}</router-link>
                            <span v-else>{{ crumb.text }}</span>
                        </li>
                    </ol>
                </nav>
            </header>

            <!-- Page content -->
            <main class="flex-grow-1 bg-light-subtle overflow-auto bg-light" style="scrollbar-width: thin">
                <div class="p-4">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<!-- breadcrumbs -->

<script>
import profile_default from "@/assets/profile_default.png";
import SideBar from "../components/SideBar.vue";
// import { jwtDecode } from "jwt-decode";
// import { token } from "@/stores/auth";

// import { thisIsMe } from "@/stores/auth";

export default {
    name: "AdminLayout",
    created() {
        this.loadUser();
    },
    computed: {
        breadcrumbs() {
            let matched = this.$route.matched;
            return matched.map((route) => ({
                text: route.meta.breadcrumb,
                to: route.path !== this.$route.path ? { name: route.name } : null,
            }));
        },
        profileCardRoutes() {
            return this.routesByRole[this.user.role] || {};
        },
    },
    components: {
        SideBar,
    },
    data() {
        return {
            // Variables
            pageTitle: "",
            user: {
                name: "Reign",
                role: "1",
            },
            sideBarOpen: localStorage.getItem("sba-state") === "true",

            my: [],

            routesByRole: {
                0: {
                    profile: { name: "Profile", path: "AdminProfile", icon: "bi bi-person" },
                    settings: { name: "Settings", path: "AdminSettings", icon: "bi bi-gear" },
                },
                1: {
                    profile: { name: "Profile", path: "LibrarianProfile", icon: "bi bi-person" },
                    settings: { name: "Settings", path: "LibrarianSettings", icon: "bi bi-gear" },
                },
            },

            // Objects
            yesNoModal: {
                action: "",
                status: "",
                title: "",
                message: "",
                show: false,
                answer: null,
                isConfirmed: null,
            },
            loadingModal: {
                show: false,
                message: "",
            },
        };
    },
    watch: {
        $route(to) {
            this.pageTitle = to.meta.title || "Super Admin";
        },
    },
    methods: {
        async loadUser() {
            // this.my = await thisIsMe();
            this.my.profile_picture = this.my.profile_picture ? this.my.profile_picture : profile_default;
        },

        setSideBarState() {
            this.sideBarOpen = !this.sideBarOpen;
            localStorage.setItem("sba-state", this.sideBarOpen);
        },
    },
    mounted() {
        const locSide = localStorage.getItem("sba-state");
        // const u = jwtDecode(token.value);
        // this.user.role = u.role;

        if (!locSide) {
            localStorage.setItem("sba-state", true);
            this.sideBarOpen = true;
        } else {
            this.sideBarOpen = locSide === "true";
        }

        this.pageTitle = this.$route.meta.title || "Super Admin";
    },
};
</script>


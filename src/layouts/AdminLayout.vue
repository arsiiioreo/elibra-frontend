<template>
    <div class="d-flex d-sm-none justify-content-center align-items-center w-100" style="height: 100vh">Sorry, this page is not accessible on mobile devices.</div>
    <div class="overflow-hidden d-none d-sm-flex" id="admin-layout" style="max-height: 100vh; min-height: 100vh">
        <!-- Sidebar -->
        <nav id="sidebar" class="bg-prime-secondary d-flex flex-column text-white vh-100" :class="sideBarOpen ? 'p-3' : 'p-0'" :style="sideBarOpen ? 'width: 250px;' : 'width: 0px;'">
            <!-- Logo/Header -->
            <a href="/sup-ad/dashboard" class="d-flex align-items-center mb-md-3 me-md-auto text-decoration-none text-light">
                <img src="@/assets/LOGO-white.png" alt="" style="width: 25px; height: auto" class="me-2" />
                <span class="me-2 fw-bold" style="font-size: 0.85rem">e-Libra</span>
            </a>

            <div class="d-flex me-auto">
                <div class="avatar rounded-circle overflow-hidden me-3 ms-2 border border-light p-1" style="height: 50px; width: 50px">
                    <img :src="my.profile_picture" alt="" class="rounded-circle" style="width: 100%; height: auto" />
                </div>
                <div class="d-flex flex-column justify-content-center" style="font-size: 0.85rem">
                    <span class="small text-white-50">Welcome!</span>
                    <span>{{ my.name }}</span>
                </div>
            </div>

            <hr />

            <!-- TOP ROUTES -->
            <div class="accordion w-100 vstack flex-grow-1 overflow-auto overflow-x-hidden" id="sidebarAccordion" style="scrollbar-width: none">
                <div class="accordion-item" v-for="(route, key) in sideBarRoutes" :key="key">
                    <!-- Accordion Header -->
                    <h2 class="accordion-header" :id="'heading' + key">
                        <button class="accordion-button collapsed bg-prime-secondary text-light" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + key" aria-expanded="false" :aria-controls="'collapse' + key">
                            {{ route.name }}
                        </button>
                    </h2>

                    <!-- Accordion Body -->
                    <div :id="'collapse' + key" class="accordion-collapse collapse" :class="route.name === 'Management' ? 'show' : ''" :aria-labelledby="'heading' + key" data-bs-parent="#sidebarAccordion">
                        <div class="accordion-body p-0">
                            <ul class="nav flex-column mb-auto">
                                <li v-if="!route.child || route.child.length === 0" class="nav-item">
                                    <p class="nav-link p-3 mb-0 rounded-0 bg-dark-subtle text-dark" style="font-size: 0.85rem">No selections to show</p>
                                </li>
                                <li v-else class="nav-item" v-for="(child, index) in route.child" :key="index">
                                    <router-link :to="{ name: child.path }" class="nav-link p-3 rounded-0" :class="[$route.name === child.path ? 'active bg-dark text-light' : 'bg-dark-subtle text-dark']" exact style="font-size: 0.85rem; border-radius: 2px">
                                        <i class="mx-2" :class="child.icon"></i>
                                        {{ child.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <!-- BOTTOM ROUTES -->
            <ul class="nav flex-column mt-auto">
                <li class="nav-item" v-for="(route, key) in lowerRoutes" :key="key">
                    <router-link :to="{ name: route.path }" class="nav-link text-white mb-2" active-class="active border-end border-4 border-success bg-dark" exact style="font-size: 0.85rem; border-radius: 2px">
                        <i class="me-2" :class="route.icon"></i>
                        {{ route.name }}
                    </router-link>
                </li>
                <li class="nav-item">
                    <button type="button" class="nav-link text-white mb-2" @click="this.$logout" style="font-size: 0.85rem">
                        <i class="bi bi-door-open me-2"></i>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Main content -->
        <div class="flex-grow-1 d-flex flex-column vh-100">
            <!-- Fixed Title Bar -->
            <div class="page-header d-flex justify-content-between align-items-center bg-white p-3 flex-shrink-0" style="z-index: 1">
                <div class="d-flex align-items-center">
                    <span class="p-2 py-1 bg-light border rounded me-3 text-prime" @click="setSideBarState" style="cursor: pointer">
                        <i class="bi bi-list"></i>
                    </span>
                    <div style="font-size: 0.85rem">
                        <h5 class="fw-bold mb-0">{{ pageTitle }}</h5>
                    </div>
                </div>
                <div class="d-flex gap-2" style="font-size: 0.85rem">
                    <span class="px-3 border-end">Hey there, {{ my.name }}</span>
                    <span class="px-1">Admin</span>
                </div>
            </div>

            <!-- Top navbar -->
            <header class="navbar d-flex align-items-center w-100 bg-secondary-subtle p-2 text-dark">
                <nav style="--bs-breadcrumb-divider: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22%236c757d%22/%3E%3C/svg%3E')" aria-label="breadcrumb">
                    <ol class="breadcrumb m-0 align-items-center" style="font-size: 0.85rem">
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
                <div class="p-3">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<!-- breadcrumbs -->

<script>
import profile_default from "@/assets/profile_default.png";
import { thisIsMe } from "@/stores/auth";

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
    },
    data() {
        return {
            // Variables
            pageTitle: "",
            sideBarOpen: localStorage.getItem("sba-state") === "true",

            my: [],

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
            sideBarRoutes: {
                management: {
                    name: "Management",
                    child: {
                        dashboard: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                        reports: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                        analytics: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                    },
                },
                general: {
                    name: "General",
                    child: {
                        dashboard: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                        reports: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                        analytics: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                    },
                },
                users: {
                    name: "Users",
                    child: {
                        dashboard: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                        reports: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                        analytics: {
                            name: "Dashboard",
                            path: "AdminDashboard",
                            icon: "bi bi-folder2-open",
                        },
                    },
                },
                manual: {
                    name: "Manual",
                    child: [],
                },
            },
            lowerRoutes: {
                profile: {
                    name: "Profile",
                    path: "SuperAdminProfile",
                    icon: "bi bi-person",
                },
                settings: {
                    name: "Settings",
                    path: "SuperAdminSettings",
                    icon: "bi bi-gear",
                },
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
            this.my = await thisIsMe();
            this.my.profile_picture = this.my.profile_picture ? this.my.profile_picture : profile_default;
        },

        toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("d-none");
        },

        setSideBarState() {
            this.sideBarOpen = !this.sideBarOpen;
            localStorage.setItem("sba-state", this.sideBarOpen);
        },
    },
    mounted() {
        const locSide = localStorage.getItem("sba-state");

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

<style scoped>
#sidebar {
    overflow: hidden; /* Prevents wrapping and content squeeze */
    white-space: nowrap; /* Optional: stops text wrapping */
    min-height: 100vh;
    transition: all 0.3s;
}

.accordion-button:focus {
    box-shadow: none !important;
}

.accordion-button::after {
    filter: brightness(0) invert(1);
}

@media (max-width: 768px) {
    #sidebar {
        position: fixed;
        z-index: 1030;
        top: 0;
        left: 0;
        height: 100vh;
        transform: translateX(-100%);
        width: 250px;
        transition: transform 0.3s ease-in-out;
    }
    #sidebar.d-none {
        transform: translateX(-100%);
    }
    #sidebar:not(.d-none) {
        transform: translateX(0);
    }
}
</style>


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
                    <img :src="user.profile" alt="" class="rounded-circle" style="width: 100%; height: auto" />
                </div>
                <div class="d-flex flex-column justify-content-center" style="font-size: 0.85rem">
                    <span class="small text-white-50">Welcome!</span>
                    <span>{{ user.name }}</span>
                </div>
            </div>

            <hr />

            <!-- TOP ROUTES -->
            <div class="flex-grow-1 overflow-auto overflow-x-hidden">
                <p class="text-light" style="font-size: 0.75rem">Management</p>
                <ul class="nav flex-column mb-auto">
                    <li class="nav-item" v-for="(route, key) in sideBarRoutes" :key="key">
                        <router-link :to="{ name: route.path }" class="nav-link text-white mb-2" active-class="active border-end border-4 border-success bg-dark" exact style="font-size: 0.85rem; border-radius: 2px">
                            <i class="me-2" :class="route.icon"></i>
                            {{ route.name }}
                        </router-link>
                    </li>
                </ul>
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
                    <button type="button" class="nav-link text-white mb-2" @click="promptLogout" style="font-size: 0.85rem">
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
                    <span class="px-3 border-end">Hey there, {{ user.name }}</span>
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

    <LoadingModal :show="loadingModal.show" :message="loadingModal.message" />
    <YesNoModal :show="yesNoModal.show" :status="yesNoModal.status" :title="yesNoModal.title" :message="yesNoModal.message" @answer="handleYesNo" />
</template>

<!-- breadcrumbs -->

<script>
import YesNoModal from "@/components/Modals/YesNoModal.vue";
import LoadingModal from "@/components/Modals/LoadingModal.vue";

export default {
    name: "AdminLayout",
    components: {
        YesNoModal,
        LoadingModal,
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
            user: {
                name: "",
                profile: "",
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
            sideBarRoutes: {
                dashboard: {
                    name: "Files",
                    path: "SuperAdminDashboard",
                    icon: "bi bi-folder2-open",
                },
                campus: {
                    name: "Campus",
                    path: "SuperAdminCampus",
                    icon: "bi bi-buildings",
                },
                users: {
                    name: "Users",
                    path: "SuperAdminUsers",
                    icon: "bi bi-people",
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
        toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("d-none");
        },

        handleYesNo(answer) {
            this.yesNoModal.show = false;

            if (!answer) return;

            switch (this.yesNoModal.action) {
                case "logout":
                    localStorage.clear();
                    this.loadingModal = {
                        show: true,
                        message: "Logging out, please wait...",
                    };

                    setTimeout(() => {
                        this.loadingModal = {
                            show: false,
                            message: "",
                        };
                        this.$router.push({ name: "login" });
                    }, 3000);
                    break;
                default:
                    break;
            }
        },

        setSideBarState() {
            this.sideBarOpen = !this.sideBarOpen;
            localStorage.setItem("sba-state", this.sideBarOpen);
        },

        promptLogout() {
            this.yesNoModal = {
                action: "logout",
                status: "warning",
                title: "Logout Confirmation",
                message: "Are you sure you want to logout?",
                show: true,
            };
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
        this.user = JSON.parse(localStorage.getItem("user"));
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


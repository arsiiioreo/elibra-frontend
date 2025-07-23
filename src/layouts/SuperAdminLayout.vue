<template>
    <div class="d-flex d-sm-none justify-content-center align-items-center w-100" style="height: 100vh">Sorry, this page is not accessible on mobile devices.</div>
    <div class="overflow-hidden d-none d-sm-flex" id="admin-layout" style="max-height: 100vh; min-height: 100vh">
        <!-- Sidebar -->
        <!-- Main Sidebar -->
        <nav id="sidebar" class="bg-black d-flex flex-column text-white p-3" style="width: 230px; height: 100vh">
            <!-- Logo/Header -->
            <a href="/sup-ad/dashboard" class="d-flex justify-content-center align-items-center mb-md-0 me-md-auto text-decoration-none text-prime">
                <img src="@/assets/LOGO.png" alt="" style="width: 50px; height: 50px" class="me-2" />
                <span class="fs-5 fw-bold">e-Libra</span>
            </a>

            <hr class="mb-5" />

            <!-- TOP ROUTES -->
            <div class="flex-grow-1 overflow-auto">
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
        <div class="flex-grow-1 d-flex flex-column">
            <!-- Top navbar -->
            <header class="navbar d-flex align-items-center w-100 bg-black shadow p-3 text-light">
                <nav style="--bs-breadcrumb-divider: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22%236c757d%22/%3E%3C/svg%3E')" aria-label="breadcrumb">
                    <ol class="breadcrumb m-0 align-items-center" style="font-size: 0.85rem">
                        <i class="bi bi-house-fill"></i>
                        <p class="mx-2 mb-0" style="background: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22%236c757d%22/%3E%3C/svg%3E') no-repeat center; width: 10px; height: 8px"></p>
                        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item text-light" :class="{ active: !crumb.to }">
                            <router-link v-if="crumb.to" :to="crumb.to" class="text-decoration-none text-prime">{{ crumb.text }}</router-link>
                            <span v-else class="fw-semibold">{{ crumb.text }}</span>
                        </li>
                    </ol>
                </nav>
                <div class="d-flex gap-2" style="font-size: 0.85rem">
                    <span class="px-3 border-end">Hey there, {{ user.name }}</span>
                    <span class="px-1">Super Admin</span>
                </div>
            </header>

            <!-- Page content -->
            <main class="flex-grow-1 overflow-auto bg-secondary-subtle p-3">
                <div class="d-flex justify-content-start align-items-center mb-3">
                    <span class="p-2 bg-light border border-success-subtle rounded shadow-sm me-3">
                        <img src="@/assets/book-green.png" alt="" style="width: 25px; height: auto" />
                    </span>
                    <div style="font-size: 0.85rem">
                        <h5 class="fw-bold mb-0">{{ pageTitle }}</h5>
                        <p class="mb-0">So refreshing!</p>
                    </div>
                </div>
                <router-view />
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
            user: {
                name: "",
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
                    name: "Dashboard",
                    path: "SuperAdminDashboard",
                    icon: "bi bi-speedometer2",
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
        this.pageTitle = this.$route.meta.title || "Super Admin";

        this.user = JSON.parse(localStorage.getItem("user"));

        // if (user && user.role !== 2) {
        //     this.$router.push({ name: "PageUnauthorized" });
        // }
    },
};
</script>

<style scoped>
#sidebar {
    min-height: 100vh;
    max-width: 100vh;
    transition: all 0.3s;
}

/* .nav-link:hover {
  background-color: #0b964c !important;
} */

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


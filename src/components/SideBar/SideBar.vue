<template>
    <!-- Sidebar -->
    <aside id="sidebar" class="d-flex flex-column h-100 bg-white border-end sidebar overflow-hidden" :class="{ open: sideBarOpen }">
        <!-- Logo/Header -->
        <router-link :to="{ name: 'landing' }" class="d-flex align-items-center p-3 text-decoration-none text-black w-100" :class="{ 'justify-content-center': !sideBarOpen }">
            <img src="@/assets/logo.png" alt="Logo" style="width: 30px; height: 30px" />
            <span class="fw-bold sidebar-text ms-2 text-prime" v-if="sideBarOpen"> e-Libra </span>
        </router-link>

        <!-- User Profile -->
        <div class="d-flex align-items-center p-2 sidebar-profile overflow-hidden" :class="[{ open: sideBarOpen }, sideBarOpen ? 'd-flex' : 'd-none']">
            <div class="avatar rounded-circle me-3 ms-2 border border-success p-1 overflow-hidden" style="width: 45px; height: 45px">
                <img :src="profilePic" alt="Profile Picture" class="rounded-circle" style="background-position: center" />
            </div>
            <div class="d-flex flex-column sidebar-text">
                <span class="small text-dark">Welcome!</span>
                <span class="fs-5 text-prime fw-bold pe-1 text-nowrap">{{ user?.first_name }}</span>
            </div>
        </div>

        <hr class="text-secondary mb-0" />

        <!-- Navigation Links -->
        <nav class="overflow-auto h-100 flex-grow-1 pb-5">
            <div class="nav flex-column" v-for="route in sideBarRoutes" :key="route.name">
                <small class="text-secondary fw-bold sidebar-text pb-2" v-if="sideBarOpen" style="padding: 10px">
                    {{ route.name }}
                </small>

                <router-link class="nav-link d-flex align-items-center w-100 p-3 text-secondary" active-class="active text-success fw-bold bg-secondary-subtle border-end border-4 border-success" v-for="r in route.child" :key="r.path" :to="{ name: r.path }" exact data-bs-container="body" :data-bs-toggle="!sideBarOpen ? 'popover' : null" :data-bs-trigger="!sideBarOpen ? 'hover' : null" data-bs-placement="right" :data-bs-content="r.name">
                    <i :class="[r.icon, sideBarOpen ? 'mx-3' : 'mx-auto']"></i>
                    <span class="text-truncate sidebar-text" v-if="sideBarOpen">
                        {{ r.name }}
                    </span>
                </router-link>
            </div> 
        </nav>
    </aside>
</template>

<script>
import { Popover } from "bootstrap";
import profile_default from "@/assets/profile_default.png";
import { routesByRole } from "./SidebarRoutes";

export default {
    props: {
        user: {
            type: Object,
            default: () => ({}),
        },
        sideBarOpen: {
            type: Boolean,
            default: localStorage.getItem("sba-state") === "true",
        },
    },
    computed: {
        profilePic() {
            return this.user?.profile_picture || profile_default;
        },
        sideBarRoutes() {
            return routesByRole[this.user.role] || {};
        },
    },
    methods: {
        toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("d-none");
        },
        isActiveGroup(route) {
            if (!route.child) return false;
            const children = Object.values(route.child);
            return children.some((child) => child.path === this.$route.name);
        },
        initPopovers() {
            // Dispose all old popovers
            document.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => {
                if (el._popover) {
                    el._popover.dispose();
                    el._popover = null;
                }
            });

            // Reinitialize popovers ONLY if sidebar is closed
            if (!this.sideBarOpen) {
                document.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => {
                    el._popover = new Popover(el, {
                        trigger: "hover", // Only show on hover
                        placement: "right",
                        delay: { show: 100, hide: 100 },
                    });
                });
            }
        },
    },
    mounted() {
        this.$nextTick(() => this.initPopovers());
    },
    watch: {
        sideBarOpen() {
            this.$nextTick(() => this.initPopovers());
        },
    },
};
</script>

<style scoped>
/* Base Sidebar */
.sidebar {
    min-width: 75px;
    transition: all 0.3s ease;
}

.sidebar.open {
    transition: all 0.3s ease;
    min-width: 300px;
}

/* Sidebar profile transition */
.sidebar-profile {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.sidebar-profile.open {
    opacity: 1;
}

/* Sidebar text smoothly hides/shows */
.sidebar-text {
    opacity: 0;
    transition: opacity 0.2s ease;
}
.sidebar.open .sidebar-text {
    opacity: 1;
}

/* Avatar sizing */
.sidebar-profile .avatar {
    width: 50px;
    height: 50px;
}
.sidebar-profile .avatar img {
    width: 100%;
    height: auto;
}

.nav-link:hover {
    background-color: #e2e3e5 !important;
}

/* Mobile - slide in/out */
@media (max-width: 768px) {
    .sidebar {
        position: fixed;
        z-index: 1030;
        top: 0;
        left: 0;
        transform: translateX(-100%);
        width: 250px;
    }
    .sidebar.open {
        transform: translateX(0);
    }
}
</style>

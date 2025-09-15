<template>
    <!-- Logo/Header -->
    <aside id="sidebar" class="d-flex flex-column text-white vh-100 bg-white border-end sidebar" :class="{ open: sideBarOpen }">
        <!-- Logo/Header -->
        <router-link :to="{ name: 'login' }" class="d-flex align-items-center p-3 text-decoration-none text-black w-100" :class="{ 'justify-content-center': !sideBarOpen }">
            <img src="@/assets/logo.png" alt="Logo" style="width: 30px; height: auto" />
            <span class="fw-bold sidebar-text ms-2" v-if="sideBarOpen">e-Libra</span>
        </router-link>

        <!-- User Profile -->
        <div class="d-flex align-items-center border-bottom overflow-hidden p-3 sidebar-profile" :class="[{ open: sideBarOpen }, sideBarOpen ? 'd-flex' : 'd-none']">
            <div class="avatar rounded-circle overflow-hidden me-3 ms-2 border border-success p-1">
                <img :src="profilePic" alt="Profile Picture" class="rounded-circle" />
            </div>
            <div class="d-flex flex-column sidebar-text">
                <span class="small text-dark">Welcome!</span>
                <span class="text-prime fw-bold">{{ user?.name }}</span>
            </div>
        </div>

        <!-- Navigation Links -->
        <nav class="overflow-auto flex-grow-1">
            <div class="nav flex-column" v-for="route in sideBarRoutes" :key="route.name">
                <small class="text-secondary fw-bold sidebar-text mt-2 pb-2" v-if="sideBarOpen" style="padding: 10px">{{ route.name }}</small>
                <router-link class="nav-link d-flex align-items-center w-100 p-3 text-secondary" active-class="active text-success fw-bold bg-secondary-subtle border-end border-4 border-success" v-for="r in route.child" :key="r.path" :to="{ name: r.path }" exact>
                    <i :class="[r.icon, sideBarOpen ? 'mx-3' : 'mx-auto']"></i>
                    <span class="text-truncate sidebar-text" v-if="sideBarOpen">{{ r.name }}</span>
                </router-link>
            </div>
        </nav>
    </aside>
</template>

<script>
import profile_default from "@/assets/profile_default.png";
import { routesByRole } from "./SidebarRoutes.js";

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
    data() {},
    methods: {
        toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("d-none");
        },

        isActiveGroup(route) {
            if (!route.child) return false;
            // convert child object to array
            const children = Object.values(route.child);
            return children.some((child) => child.path === this.$route.name);
        },
    },
};
</script>

<style scoped>
/* Base Sidebar */
.sidebar {
    width: 75px;
    transition: width 0.3s ease, transform 0.3s ease;
    overflow: hidden;
    white-space: nowrap;
}

.sidebar.open {
    width: 300px;
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
        height: 100vh;
        transform: translateX(-100%);
        width: 250px;
    }
    .sidebar.open {
        transform: translateX(0);
    }
}
</style>

<template>
    <div class="d-flex flex-column vh-100 overflow-hidden">
        <div class="page-header d-flex justify-content-between align-items-center bg-white p-2 px-3 border-bottom" style="z-index: 1">
            <div class="d-flex align-items-center">
                <span class="p-2 py-1 bg-light border rounded me-3 text-prime" @click="setSideBarState" style="cursor: pointer">
                    <i class="bi bi-list"></i>
                </span>
                <img class="me-3" :src="isu" alt="" width="30" height="auto" />
                <div style="font-size: 0.85rem">
                    <h5 class="fw-bold mb-0">{{ "Isabela State University - " + (user.campus?.name || "Global") + (user.branch?.name ? " (" + user.branch?.name + ")" : "") }}</h5>
                </div>
            </div>
            <div class="d-flex gap-2 align-items-center" style="font-size: 0.85rem">
                <!-- Profile Card Dropdown -->
                <div class="btn-group">
                    <button type="button" class="btn d-flex align-items-center dropdown-toggle border" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                        <span class="px-1 me-2">{{ user.role === "0" ? "Admin" : "Librarian" }}</span>
                        <img class="me-2 rounded-circle p-1 border border-success" :src="user.profile_picture || profile_default" alt="logo" style="width: 30px; height: 30px" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end mt-2" style="width: 300px; z-index: 9999">
                        <div class="container">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="d-flex text-prime mb-3">
                                        <small class="fw-bold me-auto">Profile Card</small>
                                    </div>
                                    <img class="p-1 rounded-circle border border-success mb-3" :src="user.profile_picture || profile_default" alt="profile_logo" style="width: 75px; height: 75px" />
                                    <h6 class="card-title fs-5 fw-bold mb-0">{{ user.name }}</h6>
                                    <small class="card-subtitle mb-2 text-body-secondary">{{ user.role === "0" ? "Admin" : "Librarian" }}</small>
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
        <header class="navbar d-flex align-items-center w-100 bg-body-tertiary p-2 text-dark border-bottom">
            <nav style="--bs-breadcrumb-divider: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22%236c757d%22/%3E%3C/svg%3E')" aria-label="breadcrumb">
                <ol class="breadcrumb m-0 align-items-center" style="font-size: 0.85rem !important">
                    <i class="bi bi-house-fill ms-2"></i>
                    <p class="mx-2 mb-0" style="background: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22%236c757d%22/%3E%3C/svg%3E') no-repeat center; width: 10px; height: 8px"></p>
                    <!-- breadcrumbs -->
                    <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item text-dark" :class="{ active: !crumb.to }">
                        <router-link v-if="crumb.to" :to="crumb.to" class="text-decoration-none text-black">{{ crumb.text }}</router-link>
                        <span v-else>{{ crumb.text }}</span>
                    </li>
                </ol>
            </nav>
        </header>

        <div class="d-flex w-100 p-0 h-100 overflow-hidden">
            <SideBar :user="user" :sideBarOpen="sideBarOpen" />
            <div class="d-flex flex-column h-100 bg-white overflow-hidden w-100">
                <div class="d-flex justify-content-between align-items-center p-4 mb-0 border-bottom">
                    <div class="">
                        <h2 class="fw-semibold pb-0 mb-0">{{ page.title }}</h2>
                        <p class="mb-0">{{ page.description }}</p>
                    </div>
                    <div class="text-end">
                        <h2 class="fw-semibold pb-0 mb-0">{{ page.time }}</h2>
                        <p class="mb-0">{{ page.date }}</p>
                    </div>
                </div>
                <main class="container-fluid overflow-hidden h-100 p-1 bg-body-secondary">
                    <router-view />
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import { justLoggedIn, thisIsMe, token, user } from "@/stores/auth";
import SideBar from "@/components/sidebar/SideBar.vue";
import isu from "@/assets/isu.png";
import { jwtDecode } from "jwt-decode";
import profile_default from "@/assets/profile_default.png";

export default {
    name: "AdminLayout",
    async created() {
        this.loadUser();
    },
    components: {
        SideBar,
        // AdminHeader,
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
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                this.page.title = to.meta.title || "Title";
                this.page.description = to.meta.description || "Description";
            },
        },
        timeNow: {
            immediate: true,
            handler() {
                setInterval(() => {
                    this.page.time = new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    });
                }, 1000);
            },
        },
    },
    data() {
        return {
            user: {
                name: null,
                role: null,
            },
            profile_default: profile_default,
            isu: isu,
            sideBarOpen: localStorage.getItem("sba-state") === "true",
            page: {
                title: "",
                description: "",
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                }),
                time: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }),
            },
            routesByRole: {
                0: {
                    profile: { name: "Profile", path: "AdminProfile", icon: "bi bi-person" },
                    settings: { name: "Settings", path: "AdminConfiguration", icon: "bi bi-gear" },
                },
                1: {
                    profile: { name: "Profile", path: "LibrarianProfile", icon: "bi bi-person" },
                    settings: { name: "Settings", path: "LibrarianSettings", icon: "bi bi-gear" },
                },
            },
        };
    },
    methods: {
        async loadUser() {
            this.user = await thisIsMe();
            const u = jwtDecode(token.value);
            this.user.role = u.role;
        },

        setSideBarState() {
            this.sideBarOpen = !this.sideBarOpen;
            localStorage.setItem("sba-state", this.sideBarOpen);
        },

        welcome() {
            if (justLoggedIn.value) {
                this.$toast.info("Welcome back, " + user.value.first_name + "!", {
                    closeOnClick: true,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false,
                });
            }
            justLoggedIn.value = false;
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

        this.welcome();
    },
};
</script>

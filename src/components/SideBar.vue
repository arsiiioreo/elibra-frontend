<template>
    <!-- Logo/Header -->
    <nav id="sidebar" class="d-flex flex-column text-white vh-100" :class="[sideBarOpen ? 'p-3' : 'p-0', user.role === '0' ? 'bg-black' : 'bg-prime-secondary']" :style="sideBarOpen ? 'width: 300px;' : 'width: 0px;'">
        <a href="/sup-ad/dashboard" class="d-flex align-items-center mb-md-3 me-md-auto text-decoration-none text-light">
            <img src="@/assets/LOGO-white.png" alt="" style="width: 25px; height: auto" class="me-2" />
            <span class="me-2 fw-bold" style="font-size: 0.85rem">e-Libra</span>
        </a>

        <div class="d-flex me-auto">
            <div class="avatar rounded-circle overflow-hidden me-3 ms-2 border border-light p-1" style="height: 50px; width: 50px">
                <img :src="profilePic" alt="" class="rounded-circle" style="width: 100%; height: auto" />
            </div>
            <div class="d-flex flex-column justify-content-center" style="font-size: 0.85rem">
                <span class="small text-white-50">Welcome!</span>
                <span>{{ user?.name }}</span>
            </div>
        </div>

        <hr />

        <!-- TOP ROUTES -->
        <div class="accordion w-100 vstack flex-grow-1 overflow-auto overflow-x-hidden rounded-0" id="sidebarAccordion" style="scrollbar-width: none">
            <div class="accordion-item" v-for="(route, key) in sideBarRoutes" :key="key">
                <!-- Accordion Header -->
                <h2 class="accordion-header" :id="'heading' + key">
                    <button class="accordion-button collapsed text-light px-3 py-3 bg-transparent rounded-1" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + key" aria-expanded="false" :aria-controls="'collapse' + key">
                        {{ route.name }}
                    </button>
                </h2>

                <!-- Accordion Body -->
                <div :id="'collapse' + key" class="accordion-collapse collapse ms-3" :class="{ show: isActiveGroup(route) }" :aria-labelledby="'heading' + key" data-bs-parent="#sidebarAccordion">
                    <div class="accordion-body p-0">
                        <ul class="nav flex-column mb-auto">
                            <li v-if="!route.child || route.child.length === 0" class="nav-item">
                                <p class="nav-link p-3 mb-0 rounded-0 text-light">No selections to show</p>
                            </li>
                            <li v-else class="nav-item" v-for="(child, index) in route.child" :key="index">
                                <router-link :to="{ name: child.path }" class="nav-link p-3" :class="[$route.name === child.path ? 'active text-light' : 'text-light']" exact style="border-radius: 5px">
                                    <i class="mx-2" :class="child.icon"></i>
                                    {{ child.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import profile_default from "@/assets/profile_default.png";

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
            return this.routesByRole[this.user.role] || {};
        },
    },
    data() {
        return {
            routesByRole: {
                0: {
                    general: {
                        name: "General",
                        child: {
                            dashboard: { name: "Dashboard", path: "AdminDashboard", icon: "bi bi-house" },
                            reports: { name: "Reports", path: "AdminReports", icon: "bi bi-file-earmark-text" },
                        },
                    },
                    management: {
                        name: "Management",
                        child: {
                            users: { name: "Users", path: "AdminUsers", icon: "bi bi-people" },
                            campus: { name: "Campus", path: "AdminCampus", icon: "bi bi-building" },
                        },
                    },
                },
                1: {
                    Dashboard: {
                        name: "Dashboard",
                        child: {
                            dashboard: { name: "Overview", path: "LibrarianDashboardOverview", icon: "bi bi-house" },
                            profile: { name: "Notifications", path: "LibrarianDashboardNotifications", icon: "bi bi-bell" },
                        },
                    },

                    users: {
                        name: "User Management",
                        child: {
                            patrons: { name: "Patrons", path: "LibrarianPatrons", icon: "bi bi-person-badge" },
                            staffs: { name: "Library Staffs", path: "LibrarianStaffs", icon: "bi bi-people" },
                        },
                    },

                    catalog: {
                        name: "Catalog Management",
                        child: {
                            items: { name: "Items", path: "LibrarianItems", icon: "bi bi-archive" },
                            books: { name: "Books & Resources", path: "LibrarianBooks", icon: "bi bi-book" },
                            serials: { name: "Serials", path: "LibrarianSerials", icon: "bi bi-journal" },
                            thesis: { name: "Thesis", path: "LibrarianThesis", icon: "bi bi-mortarboard" },
                        },
                    },

                    circulation: {
                        name: "Circulation",
                        child: {
                            borrow: { name: "Borrow", path: "LibrarianBorrow", icon: "bi bi-box-arrow-in-right" },
                            returns: { name: "Returns", path: "LibrarianReturns", icon: "bi bi-box-arrow-left" },
                        },
                    },

                    attendance: {
                        name: "Attendance",
                        child: {
                            studentLogs: { name: "Student Logs", path: "LibrarianStudentLogs", icon: "bi bi-card-checklist" },
                        },
                    },

                    finance: {
                        name: "Finance",
                        child: {
                            payroll: { name: "Payroll", path: "LibrarianPayroll", icon: "bi bi-cash" },
                            budget: { name: "Budget Allocation", path: "LibrarianBudget", icon: "bi bi-wallet" },
                            expenses: { name: "Expense Tracking", path: "LibrarianExpenses", icon: "bi bi-receipt" },
                        },
                    },

                    reports: {
                        name: "Reports & Analytics",
                        child: {
                            circulation: { name: "Circulation Reports", path: "LibrarianCirculationReports", icon: "bi bi-arrow-left-right" },
                            inventory: { name: "Inventory Reports", path: "LibrarianInventoryReports", icon: "bi bi-box-seam" },
                            patron: { name: "Patron Reports", path: "LibrarianPatronReports", icon: "bi bi-person-lines-fill" },
                            finance: { name: "Finance Reports", path: "LibrarianFinanceReports", icon: "bi bi-cash-stack" },
                            audit: { name: "Audit Logs", path: "LibrarianAuditLogs", icon: "bi bi-shield-lock" },
                        },
                    },

                    settings: {
                        name: "Settings",
                        child: {
                            roles: { name: "Roles & Permission", path: "LibrarianRoles", icon: "bi bi-person-gear" },
                            information: { name: "Library Information", path: "LibrarianInformation", icon: "bi bi-info-circle" },
                            hours: { name: "Operating Hours & Holidays", path: "LibrarianOperatingHours", icon: "bi bi-clock" },
                            penalty: { name: "Penalty", path: "LibrarianPenalty", icon: "bi bi-exclamation-triangle" },
                        },
                    },

                    backup: {
                        name: "Backup",
                        child: {
                            backup: { name: "Backup", path: "LibrarianBackup", icon: "bi bi-cloud-arrow-down" },
                        },
                    },
                },
            },
        };
    },
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
* {
    --bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
    --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m2 11 6-6 6 6'/%3e%3c/svg%3e");
    --bs-accordion-btn-icon-size: 0.85em;
}

.accordion-button::after,
.accordion-button:not(.collapsed)::after {
    width: var(--bs-accordion-btn-icon-size);
    height: var(--bs-accordion-btn-icon-size);
    background-size: var(--bs-accordion-btn-icon-size) var(--bs-accordion-btn-icon-size);
}

.accordion-button:not(.collapsed)::after {
    box-shadow: none !important;
    transform: rotate(-360deg);
}

.active{
    background-color: #ffffff35 !important;
}

.nav-link:hover,
.accordion-button:hover {
    background-color: #ffffff10 !important;
}

#sidebar {
    overflow: hidden;
    white-space: nowrap;
    min-height: 100vh;
    transition: all 0.3s;
}

.accordion-button:focus,
.accordion-button:not(.collapsed) {
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

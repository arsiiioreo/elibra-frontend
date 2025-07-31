import api from "@/plugins/axios";
import { createRouter, createWebHistory } from "vue-router";
import { user, token, setUser, clearAuth } from "@/stores/auth";
import { showLoading, hideLoading } from "@/services/LoadingService";

const routes = [
    // Public Pages
    {
        path: "/",
        name: "landing",
        redirect: { name: "login" },
        meta: { requiresAuth: false },
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/auth/LoginPage.vue"),
        meta: { title: "Login", requiresAuth: false },
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/auth/RegisterPage.vue"),
        meta: { title: "Register", requiresAuth: false },
    },
    {
        path: "/OPAC",
        name: "OPAC",
        component: () => import("../views/OPAC.vue"),
        meta: { title: "OPAC", requiresAuth: false },
    },
    {
        path: "/practice",
        name: "Practice",
        component: () => import("../views/PracticePage.vue"),
        meta: { title: "Practice", requiresAuth: false },
    },

    // Super Admin Pages
    {
        path: "/sup-ad",
        component: () => import("../layouts/SuperAdminLayout.vue"),
        meta: { requiresAuth: true, breadcrumb: "Super Admin" },

        children: [
            {
                path: "",
                name: "SuperAdmin",
                redirect: { name: "SuperAdminDashboard" },
            },
            {
                path: "dashboard",
                name: "SuperAdminDashboard",
                component: () => import("../pages/super/analytics/DashboardPage.vue"),
                meta: { title: "Dashboard", breadcrumb: "Dashboard" },
            },
            {
                path: "reports",
                name: "SuperAdminReports",
                component: () => import("../pages/super/analytics/ReportsPage.vue"),
                meta: { title: "Reports", breadcrumb: "Reports" },
            },
            {
                path: "campus",
                name: "SuperAdminCampus",
                component: () => import("../pages/super/management/CampusPage.vue"),
                meta: { title: "Campus", breadcrumb: "Campus" },
            },
            {
                path: "users",
                name: "SuperAdminUsers",
                component: () => import("../pages/super/management/UsersPage.vue"),
                meta: { title: "Users", breadcrumb: "Users" },
            },
            {
                path: "my-profile",
                name: "SuperAdminProfile",
                component: () => import("../pages/super/ProfilePage.vue"),
                meta: { title: "My Profile", breadcrumb: "My Profile" },
            },
            {
                path: "settings",
                name: "SuperAdminSettings",
                component: () => import("../pages/super/SettingsPage.vue"),
                meta: { title: "Settings", breadcrumb: "Settings" },
            },
        ],
    },

    // Admin Pages
    {
        path: "/a",
        component: () => import("../layouts/AdminLayout.vue"),
        meta: { requiresAuth: true, breadcrumb: "Admin" },

        children: [
            {
                path: "",
                name: "Admin",
                redirect: { name: "AdminDashboard" },
            },
            {
                path: "dashboard",
                name: "AdminDashboard",
                component: () => import("../pages/admin/DashboardPage.vue"),
                meta: { requiresAuth: true, title: "Dashboard", breadcrumb: "Dashboard" },
            },
        ],
    },

    // User Pages
    {
        path: "/s",
        component: () => import("../layouts/StudentLayout.vue"),
        meta: { requiresAuth: true, breadcrumb: "Student" },

        children: [
            {
                path: "",
                name: "Student",
                redirect: { name: "StudentHome" },
            },
            {
                path: "home",
                name: "StudentHome",
                component: () => import("../pages/student/HomePage.vue"),
                meta: { requiresAuth: true, title: "Home", breadcrumb: "Dashboard" },
            },
        ],
    },

    // Error Pages
    {
        path: "/unauthorized",
        name: "PageUnauthorized",
        component: () => import("../views/error/AccessUnauthorized.vue"),
        meta: { title: "Access Unauthorized" },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/error/NotFound.vue"),
        meta: { title: "Page Not Found" },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const routePrefix = {
    0: ["/sup-ad"], // Super Admin Routes
    1: ["/a"], // Admin Routes
    2: ["/s"], // Student Routes
};

router.beforeEach(async (to, from, next) => {
    if (token.value && user.value === null) {
        try {
            showLoading({ message: "Fetching user data..." });
            const res = await api.get("/user", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            await new Promise((resolve) => {
                setUser(res.data);
                resolve();
            });
        } catch (error) {
            clearAuth();
        } finally {
            hideLoading();
        }
    }

    const isLoggedIn = !(user.value === null);
    const publicPages = ["landing", "login", "register"];
    const isPublicPage = publicPages.includes(to.name);

    document.title = to.meta?.title || "E-Libra";

    // Prevent logged-in users from accessing login/register again
    if (isPublicPage && isLoggedIn) {
        const roleRedirects = {
            0: "SuperAdmin",
            1: "Admin",
            2: "Student",
        };
        const redirectRoute = roleRedirects[user.value.role];
        return next({ name: redirectRoute });
    }

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    // Block access to protected pages for guests
    if (requiresAuth && !isLoggedIn) {
        return next({ name: "login" });
    }

    // Role-based access control
    if (user && requiresAuth) {
        const goingTo = to.fullPath;
        const accessiblePrefix = routePrefix[user.value.role] || [];

        const isAllowed = accessiblePrefix.some((prefix) => {
            return goingTo === prefix || goingTo.startsWith(prefix + "/");
        });

        if (!isAllowed) {
            return next({ name: "PageUnauthorized" });
        }
    }

    return next();
});

export default router;


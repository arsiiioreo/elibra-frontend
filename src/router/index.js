import { createRouter, createWebHistory } from "vue-router";

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
        component: () => import("../pages/auth/LoginPage.vue"),
        meta: { title: "Login", requiresAuth: false },
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../pages/auth/RegisterPage.vue"),
        meta: { title: "Register", requiresAuth: false },
    },
    {
        path: "/OPAC",
        name: "OPAC",
        component: () => import("../views/OPAC.vue"),
        meta: { title: "OPAC", requiresAuth: false },
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
                component: () => import("../pages/super/DashboardPage.vue"),
                meta: { title: "Dashboard", breadcrumb: "Dashboard" },
            },
            {
                path: "campus",
                name: "SuperAdminCampus",
                component: () => import("../pages/super/CampusPage.vue"),
                meta: { title: "Campus", breadcrumb: "Campus" },
            },
            {
                path: "users",
                name: "SuperAdminUsers",
                component: () => import("../pages/super/UsersPage.vue"),
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
    // Super Admin Routes
    0: ["/sup-ad"],

    // Admin Routes
    1: ["/a"],

    // Student Routes
    2: ["/s"],
};

router.beforeEach((to, from, next) => {
    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
        user = null;
    }

    const isLoggedIn = !!user;
    const publicPages = ["landing", "login", "register"];
    const isPublicPage = publicPages.includes(to.name);

    // Set title early (optional)
    document.title = to.meta?.title || "E-Libra";

    // Redirect logged-in users away from login/register
    if (isPublicPage && isLoggedIn) {
        const roleRedirects = {
            0: "SuperAdmin",
            1: "Admin",
            2: "Student",
        };
        const redirectRoute = roleRedirects[user.role];
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
        const accessiblePrefix = routePrefix[user.role] || [];

        const isAllowed = accessiblePrefix.some((prefix) => {
            return (
                goingTo === prefix || // exact match
                goingTo.startsWith(prefix + "/") // child path match
            );
        });

        if (!isAllowed) {
            return next({ name: "PageUnauthorized" }); // 401 page
        }
    }

    return next(); // All clear
});

export default router;


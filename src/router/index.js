import { createRouter, createWebHistory } from "vue-router";
import { librarianRoutes } from "./librarianRoutes";
// import { jwtDecode } from "jwt-decode";
// import { user, token, clearAuth, thisIsMe } from "@/stores/auth";
// import { showLoading, hideLoading } from "@/services/LoadingService";

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

    // Admin Pages
    {
        path: "/a",
        component: () => import("../layouts/SuperAdminLayout.vue"),
        meta: { requiresAuth: true, breadcrumb: "Super Admin" },

        children: [
            {
                path: "",
                name: "Admin",
                redirect: { name: "AdminDashboard" },
            },
            {
                path: "dashboard",
                name: "AdminDashboard",
                component: () => import("../pages/admin/analytics/DashboardPage.vue"),
                meta: { title: "Dashboard", breadcrumb: "Dashboard" },
            },
            {
                path: "reports",
                name: "AdminReports",
                component: () => import("../pages/admin/analytics/ReportsPage.vue"),
                meta: { title: "Reports", breadcrumb: "Reports" },
            },
            {
                path: "campus",
                name: "AdminCampus",
                component: () => import("../pages/admin/management/CampusPage.vue"),
                meta: { title: "Campus", breadcrumb: "Campus" },
            },
            {
                path: "users",
                component: () => import("../pages/admin/management/UsersPage.vue"),
                meta: { breadcrumb: "Users" },
                children: [
                    {
                        path: "",
                        name: "AdminUsers",
                        redirect: { name: "AdminUsersList" },
                    },
                    {
                        path: "list",
                        name: "AdminUsersList",
                        component: () => import("../pages/admin/management/users/ListPage.vue"),
                        meta: { title: "User List", breadcrumb: "User List" },
                    },
                    {
                        path: "approvals",
                        name: "AdminUsersApprovals",
                        component: () => import("../pages/admin/management/users/ApprovalsPage.vue"),
                        meta: { title: "For Approvals", breadcrumb: "For Approvals" },
                    },
                    {
                        path: "roles",
                        name: "AdminUsersRoles",
                        component: () => import("../pages/admin/management/users/RolesPage.vue"),
                        meta: { title: "Roles Distribution", breadcrumb: "Roles Distribution" },
                    },
                ],
            },
            {
                path: "my-profile",
                name: "AdminProfile",
                component: () => import("../pages/admin/ProfilePage.vue"),
                meta: { title: "My Profile", breadcrumb: "My Profile" },
            },
            {
                path: "settings",
                name: "AdminSettings",
                component: () => import("../pages/admin/SettingsPage.vue"),
                meta: { title: "Settings", breadcrumb: "Settings" },
            },
        ],
    },

    // Librarian Pages
    {
        path: "/l",
        component: () => import("../layouts/AdminLayout.vue"),
        meta: { requiresAuth: true, breadcrumb: "Librarian" },

        children: librarianRoutes,  
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

// const routePrefix = {
//     0: ["/a"], // Super Admin Routes
//     1: ["/l"], // Admin Routes
// };

// router.beforeEach(async (to, from, next) => {
//     if (token.value) {
//         if (!user.value) {
//             try {
//                 showLoading({ message: "Fetching user data..." });
//                 await thisIsMe();
//             } catch (error) {
//                 clearAuth();
//             } finally {
//                 hideLoading();
//             }
//         }
//     }

//     const isLoggedIn = !(user.value === null);
//     const publicPages = ["landing", "login", "register"];
//     const isPublicPage = publicPages.includes(to.name);

//     document.title = to.meta?.title || "E-Libra";

//     // Prevent logged-in users from accessing login/register again
//     if (isPublicPage && isLoggedIn) {
//         const roleRedirects = {
//             0: "Admin",
//             1: "Librarian",
//         };
//         const redirectRoute = roleRedirects[user.value.role];
//         return next({ name: redirectRoute });
//     }

//     const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

//     // Block access to protected pages for guests
//     if (requiresAuth && !isLoggedIn) {
//         return next({ name: "login" });
//     }

//     // Role-based access control
//     if (user && requiresAuth) {
//         const goingTo = to.fullPath;
//         const decoded = jwtDecode(token.value);
//         const accessiblePrefix = routePrefix[decoded.role] || [];

//         const isAllowed = accessiblePrefix.some((prefix) => {
//             return goingTo === prefix || goingTo.startsWith(prefix + "/");
//         });

//         if (!isAllowed) {
//             return next({ name: "PageUnauthorized" });
//         }
//     }

//     return next();
// });

export default router;

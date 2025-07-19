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

  // Super Admin Pages
  {
    path: "/sup-ad",
    component: () => import("../layouts/SuperAdminLayout.vue"),
    meta: { requiresAuth: true },

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
        meta: { title: "Dashboard" },
      },
      {
        path: "users",
        name: "SuperAdminUsers",
        component: () => import("../pages/super/UsersPage.vue"),
        meta: { title: "Dashboard" },
      },
      {
        path: "my-profile",
        name: "SuperAdminProfile",
        component: () => import("../pages/super/ProfilePage.vue"),
        meta: { title: "My Profile" },
      },
      {
        path: "settings",
        name: "SuperAdminSettings",
        component: () => import("../pages/super/SettingsPage.vue"),
        meta: { title: "Dashboard" },
      },
    ],
  },

  // User Pages
  {
    path: "/s",
    name: "Student",
    component: () => import("../pages/student/HomePage.vue"),
    meta: { title: "Home", requiresAuth: true },
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

const roleRouteMap = {
  // Super Admin Routes
  0: ["/sup-ad"],

  // Admin Routes
  1: [],

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

  // Block access to protected pages for guests
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: "login" });
  }

  // Role-based access control
  if (user && to.meta.requiresAuth) {
    const allowedPaths = roleRouteMap[user.role] || [];
    const tryingToAccess = to.path;

    const isAllowed = allowedPaths.some((path) => tryingToAccess.startsWith(path));

    if (!isAllowed) {
      return next({ name: "PageUnauthorized" }); // 401 page
    }
  }

  return next(); // All clear
});

export default router;


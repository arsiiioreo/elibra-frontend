import { createRouter, createWebHistory } from "vue-router";
import { librarianRoutes } from "./librarianRoutes";
import { adminRoutes } from "./adminRoutes";
import { jwtDecode } from "jwt-decode";
import { token, verifyExistence, thisIsMe } from "@/stores/auth";

const routes = [
	// Public Pages
	{
		path: "/",
		name: "landing",
		// redirect: { name: "login" },
		component: () => import("../views/HomePage.vue"),
		meta: { title: "Home", requiresAuth: false },
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
		path: "/opac",
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
	{
		path: "/attendance",
		name: "Attendance",
		component: () => import("../views/AttendancePage.vue"),
		meta: { title: "Attendance", requiresAuth: false },
	},

	// Admin Pages
	{
		path: "/a",
		component: () => import("../layouts/AdminLayout.vue"),
		meta: { requiresAuth: true, breadcrumb: "Administrator" },

		children: adminRoutes,
	},

	// Librarian Pages
	{
		path: "/l",
		component: () => import("../layouts/LibrarianLayout.vue"),
		meta: { requiresAuth: true, breadcrumb: "Librarian" },

		children: librarianRoutes,
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
	0: ["/a"], // Super Admin Routes
	1: ["/l"], // Admin Routes
};

// Pages that are publicly accessible but shouldn't be opened when the user is logged in.
const publicPages = ["login", "register"]; // Publicly accessible pages

router.beforeEach(async (to, from, next) => {
	let decodedToken = null;

	try {
		decodedToken = token.value ? jwtDecode(token.value) : null;
	} catch (e) {
		decodedToken = null;
	}

	const isLoggedIn = !(token.value === null); // Check if token exists
	const isPublicPage = publicPages.includes(to.name); // Check if the target page is public

	// Check if the route requires authentication
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	// Block access to protected pages for guests
	if (requiresAuth && !isLoggedIn) {
		return next({ name: "login" });
	}

	if (isLoggedIn) {
		try {
			await verifyExistence();
			if (decodedToken && decodedToken.exp >= Date.now()) {
				await thisIsMe();
			}
		} catch (e) {
			console.log(e);
		}
	}

	// Prevent logged-in users from accessing login/register again
	if (isPublicPage && isLoggedIn) {
		const roleRedirects = {
			0: "Admin",
			1: "Librarian",
		};
		return next({ name: decodedToken ? roleRedirects[decodedToken.role] : "landing" }); // Redirects to role based route, default to landing if role is unknown
	}

	// Set page title
	document.title = to.meta?.title || "E-Libra";

	// Role-based access control
	if (requiresAuth) {
		const goingTo = to.fullPath;
		const decoded = jwtDecode(token.value);
		const accessiblePrefix = routePrefix[decoded.role] || [];

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

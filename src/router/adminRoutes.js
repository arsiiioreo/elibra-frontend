// Routes for Admins
export const adminRoutes = [
    {
        path: "",
        name: "Admin",
        redirect: { name: "AdminDashboard" },
        meta: { description: "Redirects to the Admin Dashboard." },
    },

    // 1. Dashboard
    {
        path: "dashboard",
        name: "AdminDashboard",
        redirect: { name: "AdminDashboardOverview" },
        meta: { requiresAuth: true, title: "Dashboard", breadcrumb: "Dashboard", description: "The main dashboard for administrators." },
        children: [
            {
                path: "overview",
                name: "AdminDashboardOverview",
                component: () => import("@/pages/admin/dashboard/OverviewPage.vue"),
                meta: { title: "Overview", breadcrumb: "Overview", description: "This page displays the overall performance of all the campuses." },
            },
            {
                path: "notifications",
                name: "AdminDashboardNotifications",
                component: () => import("@/pages/admin/dashboard/NotificationsPage.vue"),
                meta: { title: "Notifications", breadcrumb: "Notifications", description: "This page displays the notifications of all the campuses." },
            },
        ],
    },

    // 2. Management (User + Campus)
    {
        path: "management",
        name: "AdminManagement",
        redirect: { name: "AdminItemTypes" },
        meta: { requiresAuth: true, title: "Management", breadcrumb: "Management", description: "Manage users and campuses." },
        children: [
            // Item Types Management
            {
                path: "item-types",
                name: "AdminItemTypes",
                component: () => import("@/pages/admin/management/ItemTypesPage.vue"),
                meta: { title: "Item Types", breadcrumb: "Item Types", description: "Manage types of item for the library." },
            },
            // User Management
            {
                path: "users",
                name: "AdminUsers",
                component: () => import("@/pages/admin/management/UsersPage.vue"),
                meta: { title: "User Management", breadcrumb: "User Management", description: "Manage user accounts, roles, and permissions." },
                children: [
                    {
                        path: "accounts",
                        name: "AdminAccounts",
                        component: () => import("@/pages/admin/management/users/AdminAccountsPage.vue"),
                        meta: { title: "Admin Accounts", breadcrumb: "Admin Accounts", description: "Manage admin accounts." },
                    },
                    {
                        path: "librarians",
                        name: "AdminLibrarians",
                        component: () => import("@/pages/admin/management/users/LibrariansPage.vue"),
                        meta: { title: "Librarians", breadcrumb: "Librarians", description: "Manage librarian accounts." },
                    },
                    {
                        path: "patrons",
                        name: "AdminPatrons",
                        component: () => import("@/pages/admin/management/users/PatronsPage.vue"),
                        meta: { title: "Patrons", breadcrumb: "Patrons", description: "Manage patron accounts." },
                    },
                    {
                        path: "roles",
                        name: "AdminRoles",
                        component: () => import("@/pages/admin/management/users/RolesPage.vue"),
                        meta: { title: "Role-Based Access Control", breadcrumb: "RBAC", description: "Manage roles and permissions for users." },
                    },
                ],
            },

            // Campus Management
            {
                path: "campuses",
                name: "AdminCampuses",
                component: () => import("@/pages/admin/management/CampusPage.vue"),
                meta: { title: "Campus Management", breadcrumb: "Campus Management", description: "Manage campus information and settings." },
            },
        ],
    },

    // 3. System Configuration
    {
        path: "configuration",
        name: "AdminConfiguration",
        redirect: { name: "AdminLibraryInformation" },
        meta: { requiresAuth: true, title: "System Configuration", breadcrumb: "System Configuration", description: "Configure system settings and preferences." },
        children: [
            {
                path: "information",
                name: "AdminLibraryInformation",
                component: () => import("@/pages/admin/configuration/LibraryInformationPage.vue"),
                meta: { title: "Library Information", breadcrumb: "Library Information", description: "Manage library information and details." },
            },
            {
                path: "hours",
                name: "AdminOperatingHours",
                component: () => import("@/pages/admin/configuration/OperatingHoursPage.vue"),
                meta: { title: "Operating Hours & Holidays", breadcrumb: "Operating Hours & Holidays", description: "Set operating hours and holidays for the library." },
            },
            {
                path: "penalty",
                name: "AdminPenaltySettings",
                component: () => import("@/pages/admin/configuration/PenaltySettingsPage.vue"),
                meta: { title: "Penalty Settings", breadcrumb: "Penalty Settings", description: "Configure penalty settings for overdue items." },
            },
        ],
    },

    // 4. Audit & Security
    {
        path: "security",
        name: "AdminSecurity",
        redirect: { name: "AdminAuditLogs" },
        meta: { requiresAuth: true, title: "Audit & Security", breadcrumb: "Audit & Security", description: "Manage audit logs and security settings." },
        children: [
            {
                path: "audit-logs",
                name: "AdminAuditLogs",
                component: () => import("@/pages/admin/security/AuditLogsPage.vue"),
                meta: { title: "Audit Logs", breadcrumb: "Audit Logs", description: "View and manage audit logs." },
            },
            {
                path: "login-attempts",
                name: "AdminLoginAttempts",
                component: () => import("@/pages/admin/security/LoginAttemptsPage.vue"),
                meta: { title: "Login Attempts", breadcrumb: "Login Attempts", description: "Monitor login attempts and security events." },
            },
        ],
    },

    // 5. Reports & Analytics
    {
        path: "reports",
        name: "AdminReports",
        redirect: { name: "AdminSystemUsageReports" },
        meta: { requiresAuth: true, title: "Reports & Analytics", breadcrumb: "Reports & Analytics", description: "View reports and analytics for the system." },
        children: [
            {
                path: "system-usage",
                name: "AdminSystemUsageReports",
                component: () => import("@/pages/admin/reports/SystemUsageReportsPage.vue"),
                meta: { title: "System Usage Reports", breadcrumb: "System Usage Reports", description: "This page displays the report performance of all the campuses." },
            },
            {
                path: "general",
                name: "AdminGeneralReports",
                component: () => import("@/pages/admin/reports/GeneralReportsPage.vue"),
                meta: { title: "Reports", breadcrumb: "Reports", description: "View general reports and analytics." },
            },
        ],
    },

    // 6. Profile
    {
        path: "profile",
        name: "AdminProfile",
        component: () => import("@/pages/admin/profile/ProfilePage.vue"),
        meta: { requiresAuth: true, title: "Profile", breadcrumb: "Profile", description: "This page displays the profile of the user." },
    },
];

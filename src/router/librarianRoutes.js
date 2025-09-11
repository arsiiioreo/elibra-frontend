// Routes for Librarians
export const librarianRoutes = [
    {
        path: "",
        name: "Librarian",
        redirect: { name: "LibrarianDashboard" },
    },

    // 1. Dashboard
    {
        path: "dashboard",
        name: "LibrarianDashboard",
        redirect: { name: "LibrarianDashboardOverview" },
        meta: { requiresAuth: true, title: "Dashboard", breadcrumb: "Dashboard" },
        children: [
            {
                path: "overview",
                name: "LibrarianDashboardOverview",
                component: () => import("@/pages/librarian/dashboard/OverviewPage.vue"),
                meta: { title: "Overview", breadcrumb: "Overview" },
            },
            {
                path: "notifications",
                name: "LibrarianDashboardNotifications",
                component: () => import("@/pages/librarian/dashboard/NotificationsPage.vue"),
                meta: { title: "Notifications", breadcrumb: "Notifications" }, 
            },
        ],
    },

    // 2. User Management
    {
        path: "users",
        name: "LibrarianUsers",
        redirect: { name: "LibrarianPatrons" },
        meta: { requiresAuth: true, title: "User Management", breadcrumb: "User Management" },
        children: [
            {
                path: "patrons",
                name: "LibrarianPatrons",
                component: () => import("@/pages/librarian/user/PatronsPage.vue"),
                meta: { title: "Patrons", breadcrumb: "Patrons" },
            },
            {
                path: "staffs",
                name: "LibrarianStaffs",
                component: () => import("@/pages/librarian/user/LibraryStaffsPage.vue"),
                meta: { title: "Library Staffs", breadcrumb: "Library Staffs" },
            },
        ],
    },

    // 3. Catalog Management
    {
        path: "catalog",
        name: "LibrarianCatalog",
        redirect: { name: "LibrarianItems" },
        meta: { requiresAuth: true, title: "Catalog Management", breadcrumb: "Catalog Management" },
        children: [
            {
                path: "items",
                name: "LibrarianItems",
                component: () => import("@/pages/librarian/catalog/ItemsPage.vue"),
                meta: { title: "Items", breadcrumb: "Items" },
            },
            {
                path: "books",
                name: "LibrarianBooks",
                component: () => import("@/pages/librarian/catalog/BooksPage.vue"),
                meta: { title: "Books & Resources", breadcrumb: "Books & Resources" },
            },
            {
                path: "serials",
                name: "LibrarianSerials",
                component: () => import("@/pages/librarian/catalog/SerialsPage.vue"),
                meta: { title: "Serials", breadcrumb: "Serials" },
            },
            {
                path: "thesis",
                name: "LibrarianThesis",
                component: () => import("@/pages/librarian/catalog/AcademicReourcesPage.vue"),
                meta: { title: "Thesis", breadcrumb: "Thesis" },
            },
        ],
    },

    // 4. Circulation
    {
        path: "circulation",
        name: "LibrarianCirculation",
        redirect: { name: "LibrarianBorrow" },
        meta: { requiresAuth: true, title: "Circulation", breadcrumb: "Circulation" },
        children: [
            {
                path: "borrow",
                name: "LibrarianBorrow",
                component: () => import("@/pages/librarian/circulation/BorrowPage.vue"),
                meta: { title: "Borrow", breadcrumb: "Borrow" },
            },
            {
                path: "returns",
                name: "LibrarianReturns",
                component: () => import("@/pages/librarian/circulation/ReturnsPage.vue"),
                meta: { title: "Returns", breadcrumb: "Returns" },
            },
        ],
    },

    // 5. Attendance
    {
        path: "attendance",
        name: "LibrarianAttendance",
        redirect: { name: "LibrarianStudentLogs" },
        meta: { requiresAuth: true, title: "Attendance", breadcrumb: "Attendance" },
        children: [
            {
                path: "student-logs",
                name: "LibrarianStudentLogs",
                component: () => import("@/pages/librarian/attendance/StudentLogsPage.vue"),
                meta: { title: "Student Logs", breadcrumb: "Student Logs" },
            },
        ],
    },

    // 6. Finance
    {
        path: "finance",
        name: "LibrarianFinance",
        redirect: { name: "LibrarianPayroll" },
        meta: { requiresAuth: true, title: "Finance", breadcrumb: "Finance" },
        children: [
            {
                path: "payroll",
                name: "LibrarianPayroll",
                component: () => import("@/pages/librarian/finance/PayrollPage.vue"),
                meta: { title: "Payroll", breadcrumb: "Payroll" },
            },
            {
                path: "budget",
                name: "LibrarianBudget",
                component: () => import("@/pages/librarian/finance/BudgetPage.vue"),
                meta: { title: "Budget Allocation", breadcrumb: "Budget Allocation" },
            },
            {
                path: "expenses",
                name: "LibrarianExpenses",
                component: () => import("@/pages/librarian/finance/ExpensesPage.vue"),
                meta: { title: "Expense Tracking", breadcrumb: "Expense Tracking" },
            },
        ],
    },

    // 7. Reports & Analytics
    {
        path: "reports",
        name: "LibrarianReports",
        redirect: { name: "LibrarianCirculationReports" },
        meta: { requiresAuth: true, title: "Reports & Analytics", breadcrumb: "Reports & Analytics" },
        children: [
            {
                path: "circulation",
                name: "LibrarianCirculationReports",
                component: () => import("@/pages/librarian/reports/CirculationReportsPage.vue"),
                meta: { title: "Circulation Reports", breadcrumb: "Circulation Reports" },
            },
            {
                path: "inventory",
                name: "LibrarianInventoryReports",
                component: () => import("@/pages/librarian/reports/InventoryReportsPage.vue"),
                meta: { title: "Inventory Reports", breadcrumb: "Inventory Reports" },
            },
            {
                path: "patron",
                name: "LibrarianPatronReports",
                component: () => import("@/pages/librarian/reports/PatronReportsPage.vue"),
                meta: { title: "Patron Reports", breadcrumb: "Patron Reports" },
            },
            {
                path: "finance",
                name: "LibrarianFinanceReports",
                component: () => import("@/pages/librarian/reports/FinanceReportsPage.vue"),
                meta: { title: "Finance Reports", breadcrumb: "Finance Reports" },
            },
            {
                path: "audit",
                name: "LibrarianAuditLogs",
                component: () => import("@/pages/librarian/reports/AuditLogsPage.vue"),
                meta: { title: "Audit Logs", breadcrumb: "Audit Logs" },
            },
        ],
    },

    // 8. Settings
    {
        path: "settings",
        name: "LibrarianSettings",
        redirect: { name: "LibrarianRoles" },
        meta: { requiresAuth: true, title: "Settings", breadcrumb: "Settings" },
        children: [
            {
                path: "roles",
                name: "LibrarianRoles",
                component: () => import("@/pages/librarian/settings/RolesPage.vue"),
                meta: { title: "Roles & Permission", breadcrumb: "Roles & Permission" },
            },
            {
                path: "information",
                name: "LibrarianInformation",
                component: () => import("@/pages/librarian/settings/InformationPage.vue"),
                meta: { title: "Library Information", breadcrumb: "Library Information" },
            },
            {
                path: "hours",
                name: "LibrarianOperatingHours",
                component: () => import("@/pages/librarian/settings/OperatingHoursPage.vue"),
                meta: { title: "Operating Hours & Holidays", breadcrumb: "Operating Hours & Holidays" },
            },
            {
                path: "penalty",
                name: "LibrarianPenalty",
                component: () => import("@/pages/librarian/settings/PenaltyPage.vue"),
                meta: { title: "Penalty", breadcrumb: "Penalty" },
            },
        ],
    },

    // 9. Backup
    {
        path: "backup",
        name: "LibrarianBackup",
        component: () => import("@/pages/librarian/backup/BackupPage.vue"),
        meta: { requiresAuth: true, title: "Backup", breadcrumb: "Backup" },
    },

    // 10. Profile
    {
        path: "profile",
        name: "LibrarianProfile",
        component: () => import("@/pages/librarian/profile/ProfilePage.vue"),
        meta: { requiresAuth: true, title: "Profile", breadcrumb: "Profile" },
    },
];


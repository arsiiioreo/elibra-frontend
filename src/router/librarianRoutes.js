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
        meta: { requiresAuth: true, title: "Dashboard", breadcrumb: "Dashboard", description: "Main hub for librarian activities and insights" },
        children: [
            {
                path: "overview",
                name: "LibrarianDashboardOverview",
                component: () => import("@/pages/librarian/dashboard/OverviewPage.vue"),
                meta: { title: "Overview", breadcrumb: "Overview", description: "Quick summary of library performance and activities" },
            },
            {
                path: "notifications",
                name: "LibrarianDashboardNotifications",
                component: () => import("@/pages/librarian/dashboard/NotificationsPage.vue"),
                meta: { title: "Notifications", breadcrumb: "Notifications", description: "System alerts and important updates for librarians" },
            },
        ],
    },

    // 2. User Management
    {
        path: "users",
        name: "LibrarianUsers",
        redirect: { name: "LibrarianPatrons" },
        meta: { requiresAuth: true, title: "User Management", breadcrumb: "User Management", description: "Manage patrons and library staff records" },
        children: [
            {
                path: "patrons",
                name: "LibrarianPatrons",
                component: () => import("@/pages/librarian/user/PatronsPage.vue"),
                meta: { title: "Patrons", breadcrumb: "Patrons", description: "Manage library users such as students and guests" },
            },
            {
                path: "staffs",
                name: "LibrarianStaffs",
                component: () => import("@/pages/librarian/user/LibraryStaffsPage.vue"),
                meta: { title: "Library Staffs", breadcrumb: "Library Staffs", description: "Manage librarian and staff accounts" },
            },
        ],
    },

    // 3. Catalog Management
    {
        path: "catalog",
        name: "LibrarianCatalog",
        redirect: { name: "LibrarianBooks" },
        meta: { requiresAuth: true, title: "Catalog Management", breadcrumb: "Catalog Management", description: "Manage library collections and resources" },
        children: [
            {
                path: "cataloging",
                name: "LibrarianCataloging",
                component: () => import("@/pages/librarian/catalog/CatalogingPage.vue"),
                meta: { title: "Cataloging", breadcrumb: "Cataloging", description: "Add new items for the collection" },
            },
            {
                path: "acquisition",
                name: "LibrarianAcquisition",
                component: () => import("@/pages/librarian/catalog/AcquisitionPage.vue"),
                meta: { title: "Acquisition", breadcrumb: "Acquisition", description: "Add new items for the collection" },
            },
            {
                path: "books",
                name: "LibrarianBooks",
                component: () => import("@/pages/librarian/catalog/BooksPage.vue"),
                meta: { title: "Books & Resources", breadcrumb: "Books & Resources", description: "Manage physical and digital book collections" },
            },
            {
                path: "serials",
                name: "LibrarianSerials",
                component: () => import("@/pages/librarian/catalog/SerialsPage.vue"),
                meta: { title: "Serials", breadcrumb: "Serials", description: "Manage periodicals such as journals, newspapers, and magazines" },
            },
            {
                path: "thesis",
                name: "LibrarianThesis",
                component: () => import("@/pages/librarian/catalog/AcademicReourcesPage.vue"),
                meta: { title: "Thesis", breadcrumb: "Thesis", description: "Manage academic resources like theses and dissertations" },
            },
            {
                path: "archives",
                name: "LibrarianArchives",
                component: () => import("@/pages/librarian/catalog/ArchivesPage.vue"),
                meta: { title: "Archives", breadcrumb: "Archives", description: "Preserve and manage historical documents and archives" },
            },
        ],
    },

    // 4. Circulation
    {
        path: "circulation",
        name: "LibrarianCirculation",
        redirect: { name: "LibrarianBorrow" },
        meta: { requiresAuth: true, title: "Circulation", breadcrumb: "Circulation", description: "Handle borrowing and returning of library items" },
        children: [
            {
                path: "borrow",
                name: "LibrarianBorrow",
                component: () => import("@/pages/librarian/circulation/BorrowPage.vue"),
                meta: { title: "Borrow", breadcrumb: "Borrow", description: "Track and manage borrowed library items" },
            },
            {
                path: "returns",
                name: "LibrarianReturns",
                component: () => import("@/pages/librarian/circulation/ReturnsPage.vue"),
                meta: { title: "Returns", breadcrumb: "Returns", description: "Manage returned items and overdue fines" },
            },
        ],
    },

    // 5. Attendance
    {
        path: "attendance",
        name: "LibrarianAttendance",
        redirect: { name: "LibrarianStudentLogs" },
        meta: { requiresAuth: true, title: "Attendance", breadcrumb: "Attendance", description: "Monitor attendance of students and staff" },
        children: [
            {
                path: "student-logs",
                name: "LibrarianStudentLogs",
                component: () => import("@/pages/librarian/attendance/StudentLogsPage.vue"),
                meta: { title: "Student Logs", breadcrumb: "Student Logs", description: "Track student visits and attendance records" },
            },
        ],
    },

    // 6. Finance
    {
        path: "finance",
        name: "LibrarianFinance",
        redirect: { name: "LibrarianPayroll" },
        meta: { requiresAuth: true, title: "Finance", breadcrumb: "Finance", description: "Manage financial operations of the library" },
        children: [
            {
                path: "payroll",
                name: "LibrarianPayroll",
                component: () => import("@/pages/librarian/finance/PayrollPage.vue"),
                meta: { title: "Payroll", breadcrumb: "Payroll", description: "Handle payroll records for staff" },
            },
            {
                path: "budget",
                name: "LibrarianBudget",
                component: () => import("@/pages/librarian/finance/BudgetPage.vue"),
                meta: { title: "Budget Allocation", breadcrumb: "Budget Allocation", description: "Plan and allocate library budget" },
            },
            {
                path: "expenses",
                name: "LibrarianExpenses",
                component: () => import("@/pages/librarian/finance/ExpensesPage.vue"),
                meta: { title: "Expense Tracking", breadcrumb: "Expense Tracking", description: "Record and track library expenses" },
            },
        ],
    },

    // 7. Reports & Analytics
    {
        path: "reports",
        name: "LibrarianReports",
        redirect: { name: "LibrarianCirculationReports" },
        meta: { requiresAuth: true, title: "Reports & Analytics", breadcrumb: "Reports & Analytics", description: "Generate and analyze library reports" },
        children: [
            {
                path: "circulation",
                name: "LibrarianCirculationReports",
                component: () => import("@/pages/librarian/reports/CirculationReportsPage.vue"),
                meta: { title: "Circulation Reports", breadcrumb: "Circulation Reports", description: "Analyze borrowing and returning trends" },
            },
            {
                path: "inventory",
                name: "LibrarianInventoryReports",
                component: () => import("@/pages/librarian/reports/InventoryReportsPage.vue"),
                meta: { title: "Inventory Reports", breadcrumb: "Inventory Reports", description: "Generate reports on library collections" },
            },
            {
                path: "patron",
                name: "LibrarianPatronReports",
                component: () => import("@/pages/librarian/reports/PatronReportsPage.vue"),
                meta: { title: "Patron Reports", breadcrumb: "Patron Reports", description: "Review patron usage and borrowing patterns" },
            },
            {
                path: "finance",
                name: "LibrarianFinanceReports",
                component: () => import("@/pages/librarian/reports/FinanceReportsPage.vue"),
                meta: { title: "Finance Reports", breadcrumb: "Finance Reports", description: "Financial analysis and budget performance reports" },
            },
            {
                path: "audit",
                name: "LibrarianAuditLogs",
                component: () => import("@/pages/librarian/reports/AuditLogsPage.vue"),
                meta: { title: "Audit Logs", breadcrumb: "Audit Logs", description: "View audit trail of system activities" },
            },
        ],
    },

    // 8. Settings
    {
        path: "settings",
        name: "LibrarianSettings",
        redirect: { name: "LibrarianRoles" },
        meta: { requiresAuth: true, title: "Settings", breadcrumb: "Settings", description: "Configure system preferences and policies" },
        children: [
            {
                path: "roles",
                name: "LibrarianRoles",
                component: () => import("@/pages/librarian/settings/RolesPage.vue"),
                meta: { title: "Roles & Permission", breadcrumb: "Roles & Permission", description: "Manage roles and access permissions" },
            },
            {
                path: "information",
                name: "LibrarianInformation",
                component: () => import("@/pages/librarian/settings/InformationPage.vue"),
                meta: { title: "Library Information", breadcrumb: "Library Information", description: "Edit basic library details and contact info" },
            },
            {
                path: "hours",
                name: "LibrarianOperatingHours",
                component: () => import("@/pages/librarian/settings/OperatingHoursPage.vue"),
                meta: { title: "Operating Hours & Holidays", breadcrumb: "Operating Hours & Holidays", description: "Set library hours and holiday schedules" },
            },
            {
                path: "penalty",
                name: "LibrarianPenalty",
                component: () => import("@/pages/librarian/settings/PenaltyPage.vue"),
                meta: { title: "Penalty", breadcrumb: "Penalty", description: "Configure fines and penalties for overdue items" },
            },
        ],
    },

    // 9. Backup
    {
        path: "backup",
        name: "LibrarianBackup",
        component: () => import("@/pages/librarian/backup/BackupPage.vue"),
        meta: { requiresAuth: true, title: "Backup", breadcrumb: "Backup", description: "Backup and restore library data" },
    },

    // 10. Profile
    {
        path: "profile",
        name: "LibrarianProfile",
        component: () => import("@/pages/librarian/profile/ProfilePage.vue"),
        meta: { requiresAuth: true, title: "Profile", breadcrumb: "Profile", description: "Manage librarian profile and account settings" },
    },
];

export const routesByRole = {
  0: {
    general: {
      name: "Dashoard",
      child: {
        overview: { name: "Overview", path: "AdminDashboard", icon: "bi bi-house" },
        reports: { name: "Reports", path: "AdminReports", icon: "bi bi-file-earmark-text" },
        profile: { name: "Profile", path: "AdminProfile", icon: "bi bi-person-circle" },
      },
    },
    management: {
      name: "Management",
      child: {
        itemTypes: { name: "Item Types", path: "AdminItemTypes", icon: "bi bi-wallet" },
        users: { name: "User Management", path: "AdminUsers", icon: "bi bi-people" },
        campus: { name: "Campus Management", path: "AdminCampuses", icon: "bi bi-building" },
      },
    },
    configuration: {
      name: "System Configuration",
      child: {
        libraryInfo: { name: "Library Information", path: "AdminLibraryInformation", icon: "bi bi-info-circle" },
        operatingHours: { name: "Operating Hours", path: "AdminOperatingHours", icon: "bi bi-clock" },
        penaltySettings: { name: "Penalty Settings", path: "AdminPenaltySettings", icon: "bi bi-exclamation-triangle" },
      },
    },
    security: {
      name: "Audit & Security",
      child: {
        auditLogs: { name: "Audit Logs", path: "AdminAuditLogs", icon: "bi bi-shield-lock" },
        loginAttempts: { name: "Login Attempts", path: "AdminLoginAttempts", icon: "bi bi-door-open" },
      },
    },
  },
  1: {
    dashboard: {
      name: "Dashboard",
      child: {
        dashboard: { name: "Overview", path: "LibrarianDashboardOverview", icon: "bi bi-house" },
        profile: { name: "Notifications", path: "LibrarianDashboardNotifications", icon: "bi bi-bell" },
        activities: { name: "Activities", path: "LibrarianDashboardActivities", icon: "bi bi-list-check" },
      },
    },
    catalog: {
      name: "Catalog Management",
      child: {
        cataloging: { name: "Cataloging", path: "LibrarianCataloging", icon: "bi bi-folder" },
        acquisition: { name: "Acquisition", path: "LibrarianAcquisition", icon: "bi bi-folder" },
        // books: { name: "Books & Resources", path: "LibrarianBooks", icon: "bi bi-book" },
        // serials: { name: "Serials", path: "LibrarianSerials", icon: "bi bi-journal" },
        // thesis: { name: "Thesis", path: "LibrarianThesis", icon: "bi bi-mortarboard" },
        // archive: { name: "Archive", path: "LibrarianArchives", icon: "bi bi-archive" },
      },
    },

    // users: {
    //     name: "User Management",
    //     child: {
    //         patrons: { name: "Patrons", path: "LibrarianPatrons", icon: "bi bi-person-badge" },
    //         staffs: { name: "Library Staffs", path: "LibrarianStaffs", icon: "bi bi-people" },
    //     },
    // },

    // circulation: {
    //     name: "Circulation",
    //     child: {
    //         borrow: { name: "Borrow", path: "LibrarianBorrow", icon: "bi bi-box-arrow-in-right" },
    //         returns: { name: "Returns", path: "LibrarianReturns", icon: "bi bi-box-arrow-left" },
    //     },
    // },

    // attendance: {
    //     name: "Attendance",
    //     child: {
    //         studentLogs: { name: "Student Logs", path: "LibrarianStudentLogs", icon: "bi bi-card-checklist" },
    //     },
    // },

    // finance: {
    //     name: "Finance",
    //     child: {
    //         payroll: { name: "Payroll", path: "LibrarianPayroll", icon: "bi bi-cash" },
    //         budget: { name: "Budget Allocation", path: "LibrarianBudget", icon: "bi bi-wallet" },
    //         expenses: { name: "Expense Tracking", path: "LibrarianExpenses", icon: "bi bi-receipt" },
    //     },
    // },

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
};

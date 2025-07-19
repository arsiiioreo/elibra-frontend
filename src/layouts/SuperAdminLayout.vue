<template>
  <div class="d-flex overflow-hidden" id="admin-layout" style="max-height: 100vh; min-height: 100vh">
    <!-- Sidebar -->
    <nav id="sidebar" class="bg-dark flex-shrink-0 p-3 text-white h-100" style="width: 230px">
      <a href="/sup-ad/dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none" style="color: #0eb55c">
        <img src="@/assets/LOGO.png" alt="" style="width: 50px; height: 50px" class="me-2" />
        <span class="fs-5 fw-bold">e-Libra</span>
      </a>

      <hr class="hr" />

      <div class="d-flex h-100 w-100 flex-column justify-content-between">
        <ul class="nav flex-column mb-auto h-100">
          <li class="nav-item" v-for="(route, key) in sideBarRoutes" :key="key">
            <router-link :to="{ name: route.path }" class="nav-link text-white mb-2 rounded" active-class="active" exact style="font-size: 0.85rem">
              <i class="me-2" :class="route.icon"></i>
              {{ route.name }}
            </router-link>
          </li>
        </ul>

        <hr />

        <ul class="nav flex-column mb-auto h-100">
          <li class="nav-item" v-for="(route, key) in lowerRoutes" :key="key">
            <router-link :to="{ name: route.path }" class="nav-link text-white mb-2 rounded" active-class="active" exact style="font-size: 0.85rem">
              <i class="me-2" :class="route.icon"></i>
              {{ route.name }}
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" class="nav-link text-white mb-2" style="font-size: 0.85rem">
              <i class="bi bi-door-open me-2"></i>
              Logout
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main content -->
    <div class="flex-grow-1 d-flex flex-column">
      <!-- Top navbar -->
      <header class="navbar navbar-dark bg-primary flex-shrink-0 p-2">
        <div class="container-fluid">
          <button class="btn btn-primary d-md-none" @click="toggleSidebar" aria-label="Toggle sidebar">
            <i class="bi bi-list"></i>
          </button>
          <span class="navbar-brand mb-0 h1">Admin Dashboard</span>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-grow-1 overflow-auto p-4 bg-light">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  data() {
    return {
      sideBarRoutes: {
        dashboard: {
          name: "Dashboard",
          path: "SuperAdminDashboard",
          icon: "bi bi-speedometer2",
        },
        users: {
          name: "Users",
          path: "SuperAdminUsers",
          icon: "bi bi-people",
        },
      },
      lowerRoutes: {
        profile: {
          name: "Profile",
          path: "SuperAdminProfile",
          icon: "bi bi-person",
        },
        settings: {
          name: "Settings",
          path: "SuperAdminSettings",
          icon: "bi bi-gear",
        },
      },
    };
  },
  methods: {
    toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("d-none");
    },
  },
};
</script>

<style scoped>
#sidebar {
  min-height: 100vh;
  max-width: 100vh;
  transition: all 0.3s;
}

.nav-link.active {
  background-color: #0eb55c;
}

/* .nav-link:hover {
  background-color: #0b964c !important;
} */

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


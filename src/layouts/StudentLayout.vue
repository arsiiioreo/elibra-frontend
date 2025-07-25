<template>
    <!-- MOBILE WARNING -->
    <div class="d-flex d-sm-none justify-content-center align-items-center w-100" style="height: 100vh">Sorry, this page is not accessible on mobile devices.</div>

    <!-- MAIN LAYOUT (Desktop only) -->
    <div class="d-none d-sm-flex flex-column vh-100">
        <!-- Top App Bar -->
        <header class="d-flex justify-content-between align-items-center bg-white shadow-sm px-4 py-3 flex-shrink-0">
            <div class="d-flex align-items-center gap-3">
                <img src="@/assets/LOGO.png" alt="logo" style="width: 30px; height: auto" />
                <h6 class="mb-0 fw-bold">{{ pageTitle }}</h6>
            </div>
            <div class="d-flex align-items-center gap-2">
                <div class="btn-group">
                    <button type="button" class="btn d-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                        <img class="me-2 rounded-circle p-1 border border-success" :src="student.profile" alt="logo" style="width: 30px; height: auto" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end mt-2" style="width: 300px">
                        <div class="container">
                            <div class="card">
                                <div class="card-body text-center">
                                    <div class="d-flex text-prime mb-3">
                                        <small class="fw-bold me-auto">Profile Card</small>
                                    </div>
                                    <img class="p-1 rounded-circle border border-success mb-3" :src="student.profile" alt="" style="width: 75px; height: 75px" />
                                    <h6 class="card-title fw-bold mb-1">{{ student.name }}</h6>
                                    <small class="card-subtitle mb-2 text-body-secondary">Student</small>
                                </div>
                            </div>
                        </div>
                        <li class="p-2">
                            <h6 class="dropdown-header ms-1 ps-0">Actions</h6>
                            <button class="dropdown-item p-2 py-3 rounded" type="button" @click="$logout">
                                <span class="p-2 bg-secondary text-light mx-2 rounded-1">
                                    <i class="bi bi-door-open"></i>
                                </span>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-grow-1 overflow-auto bg-light">
            <div class="p-4">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "StudentLayout",
    data() {
        return {
            pageTitle: "",
            student: {
                name: "Student",
            },
        };
    },
    mounted() {
        this.pageTitle = this.$route.meta.title || "Student Portal";
        const storedUser = localStorage.getItem("user");
        if (storedUser) this.student = JSON.parse(storedUser);
    },
    watch: {
        $route(to) {
            this.pageTitle = to.meta.title || "Student Portal";
        },
    },
    methods: {},
};
</script>

<style scoped>
main {
    scrollbar-width: thin;
}

.dropdown-item:hover {
    background-color: #e0e0e0 !important;
}
</style>


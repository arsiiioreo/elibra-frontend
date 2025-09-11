<template>
    <div class="d-flex flex-column w-100 rounded-top overflow-hidden h-100 bg-white">
        <div class="nav align-items-center justify-content-between p-3">
            <div class="d-flex flex-column">
                <strong>Manage Users</strong>
                <small>View list, approve registration requests, and manage role distribution.</small>
            </div>
            <div class="btn-group" role="group" aria-label="Routes">
                <router-link v-for="(tab, index) in tabRoutes" :key="index" :to="{ name: tab.path }" class="btn btn-sm btn-outline-primary px-3" active-class="btn-primary text-light" exact>
                    {{ tab.name }}
                </router-link>
            </div>
        </div>

        <div class="flex-grow-1 overflow-hidden bg-body-secondary" style="scrollbar-width: thin">
            <div class="h-100">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabRoutes: [
                { name: "User List", path: "AdminUsersList" },
                { name: "For Approvals", path: "AdminUsersApprovals" },
                { name: "Role Distribution", path: "AdminUsersRoles" },
            ],
        };
    },
};
</script>

<style scoped>
.nav-link {
    color: rgba(0, 0, 0, 0.35);
}
.nav-link:hover {
    color: rgba(0, 0, 0, 0.5);
    border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}
</style>


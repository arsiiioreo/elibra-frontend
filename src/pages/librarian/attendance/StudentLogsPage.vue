<template>
    <!-- Search, Sort, and Filter Controls -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <input v-model="searchQuery" type="text" class="form-control w-50" placeholder="Search by name or ID..." />
        <select v-model="selectedFilter" class="form-select w-25">
            <option value="">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
        </select>
        <button @click="toggleSortOrder" class="btn btn-outline-primary">
            Sort by Date
            <i :class="sortOrder === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
        </button>
    </div>

    <!-- Attendance Logs Table -->
    <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead class="table-primary">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(log, index) in filteredLogs" :key="log.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ log.name }}</td>
                    <td>{{ log.id }}</td>
                    <td>{{ log.status }}</td>
                    <td>{{ log.date }}</td>
                </tr>
                <tr v-if="filteredLogs.length === 0">
                    <td colspan="5" class="text-center text-muted">No records found</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            selectedFilter: "",
            sortOrder: "asc",
            logs: [
                { id: "001", name: "John Doe", status: "Present", date: "2023-10-01" },
                { id: "002", name: "Jane Smith", status: "Absent", date: "2023-10-02" },
                { id: "003", name: "Alice Johnson", status: "Present", date: "2023-10-03" },
                { id: "004", name: "Bob Brown", status: "Absent", date: "2023-10-04" },
            ],
        };
    },
    computed: {
        filteredLogs() {
            let filtered = this.logs;

            // Filter by status
            if (this.selectedFilter) {
                filtered = filtered.filter((log) => log.status === this.selectedFilter);
            }

            // Search by name or ID
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter((log) => log.name.toLowerCase().includes(query) || log.id.toLowerCase().includes(query));
            }

            // Sort by date
            filtered = filtered.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return this.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            });

            return filtered;
        },
    },
    methods: {
        toggleSortOrder() {
            this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>

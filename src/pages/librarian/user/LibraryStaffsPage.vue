<template>
    <!-- Search, Filter, and Sort Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="input-group w-50">
            <input type="text" class="form-control" placeholder="Search staff..." v-model="searchQuery" />
            <button class="btn btn-outline-secondary" @click="searchStaff">Search</button>
        </div>
        <div class="hstack gap-1">
            <select class="form-select" v-model="filterStatus">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <select class="form-select" v-model="sortOption">
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Joining Date</option>
            </select>
        </div>
    </div>

    <!-- Staff Table -->
    <table class="table table-bordered table-hover">
        <thead class="table-light">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Joining Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(staff, index) in filteredAndSortedStaff" :key="staff.id">
                <td>{{ index + 1 }}</td>
                <td>{{ staff.name }}</td>
                <td>{{ staff.email }}</td>
                <td>{{ staff.status }}</td>
                <td>{{ staff.joiningDate }}</td>
            </tr>
            <tr v-if="filteredAndSortedStaff.length === 0">
                <td colspan="5" class="text-center">No staff found</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            filterStatus: "",
            sortOption: "name",
            staff: [
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", joiningDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", joiningDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", joiningDate: "2023-03-05" },
                // Add more staff as needed
            ],
        };
    },
    computed: {
        filteredAndSortedStaff() {
            let result = this.staff;

            // Filter by status
            if (this.filterStatus) {
                result = result.filter((staff) => staff.status === this.filterStatus);
            }

            // Search by name or email
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter((staff) => staff.name.toLowerCase().includes(query) || staff.email.toLowerCase().includes(query));
            }

            // Sort by selected option
            if (this.sortOption === "name") {
                result = result.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortOption === "date") {
                result = result.sort((a, b) => new Date(a.joiningDate) - new Date(b.joiningDate));
            }

            return result;
        },
    },
    methods: {
        searchStaff() {
            // Triggered when the search button is clicked
            // This method is optional since the computed property handles the filtering
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: auto;
}
</style>

<template>
    <!-- Search, Filter, and Sort Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="input-group w-50">
            <input type="text" class="form-control" placeholder="Search patrons..." v-model="searchQuery" />
            <button class="btn btn-outline-secondary" @click="searchPatrons">Search</button>
        </div>
        <div class="hstack gap-1">
            <select class="form-select" v-model="filterStatus">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <select class="form-select" v-model="sortOption">
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Registration Date</option>
            </select>
        </div>
    </div>

    <!-- Patrons Table -->
    <table class="table table-bordered table-hover">
        <thead class="table-light">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Registration Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(patron, index) in filteredAndSortedPatrons" :key="patron.id">
                <td>{{ index + 1 }}</td>
                <td>{{ patron.name }}</td>
                <td>{{ patron.email }}</td>
                <td>{{ patron.status }}</td>
                <td>{{ patron.registrationDate }}</td>
            </tr>
            <tr v-if="filteredAndSortedPatrons.length === 0">
                <td colspan="5" class="text-center">No patrons found</td>
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
            patrons: [
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                { id: 1, name: "John Doe", email: "john@example.com", status: "active", registrationDate: "2023-01-15" },
                { id: 2, name: "Jane Smith", email: "jane@example.com", status: "inactive", registrationDate: "2023-02-10" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com", status: "active", registrationDate: "2023-03-05" },
                // Add more patrons as needed
            ],
        };
    },
    computed: {
        filteredAndSortedPatrons() {
            let result = this.patrons;

            // Filter by status
            if (this.filterStatus) {
                result = result.filter((patron) => patron.status === this.filterStatus);
            }

            // Search by name or email
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter((patron) => patron.name.toLowerCase().includes(query) || patron.email.toLowerCase().includes(query));
            }

            // Sort by selected option
            if (this.sortOption === "name") {
                result = result.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortOption === "date") {
                result = result.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate));
            }

            return result;
        },
    },
    methods: {
        searchPatrons() {
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


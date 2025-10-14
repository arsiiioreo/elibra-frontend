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
                <th>Section</th>
                <th>Joining Date</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(staff, index) in staffs" :key="staff.id">
                <td>{{ index + 1 }}</td>
                <td>{{ staff.user.name }}</td>
                <td>{{ staff.user.email }}</td>
                <td>{{ staff.sections.name }}</td>
                <td>{{ new Date(staff.user.created_at).toUTCString() }}</td>
            </tr>
            <tr v-if="staffLength.length === 0">
                <td colspan="5" class="text-center">No staff found</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import api from '@/plugins/axios';
import { token } from '@/stores/auth';

export default {
    created() {
        this.fetchStaffs();
    },
    data() {
        return {
            staffs: [],
            isFetchingStaff: false,
        };
    },
    computed: {
        staffLength() {
            return this.staffs;
        },
    },
    methods: {
        async fetchStaffs() {
            this.isFetchingStaff = true;
            this.staffs = [];

            try {
                const librarianData = await api.get("/all-librarians", {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                });

                this.staffs = librarianData.data.data;
            } catch (error) {
                console.log(error);
            } finally {
                this.isFetchingStaff = false;
            }
        },

        searchStaff() {
            setTimeout(() => {
                this.fetchStaffs();
            }, 500);
        },
    },
};
</script>

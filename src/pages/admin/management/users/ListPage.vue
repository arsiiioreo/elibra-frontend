<template>
    <table class="table table-hover table-striped table-responsive overflow-auto align-middle">
        <thead class="position-sticky top-0">
            <tr>
                <th class="tdh px-4">#</th>
                <th class="w-50">Name</th>
                <th>Role</th>
                <th>Status</th>
                <th class="text-center" style="width: 10%">Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- show placeholder when loading -->
            <tr v-if="fetching">
                <td colspan="5">
                    <p class="placeholder-glow mb-0">
                        <span class="placeholder col-12"></span>
                    </p>
                </td>
            </tr>

            <!-- show users -->
            <tr v-else-if="users && users.length" v-for="(user, index) in users" :key="user.id">
                <td>{{ index + 1 }}</td>
                <td class="hstack gap-3">
                    <div class="hstack">
                        <img :src="pfp" alt="" class="rounded-5" style="width: 45px" />
                    </div>
                    <div class="vstack">
                        <span>
                            {{ user.last_name }}, {{ user.first_name }}
                            {{ user.middle_initial ? user.middle_initial + "." : "" }}
                        </span>
                        <small class="text-muted">{{ user.email }}</small>
                    </div>
                </td>
                <td>{{ user.roleText || user.role || "Human" }}</td>
                <!-- <td>{{ user.status === "0" ? "Active" : user.status === "1" ? "For Approval" : "Inactive" }}</td> -->
                <td>{{ user.pending_registration_approval === "1" ? "Pending Approval" : user.status }}</td>
                <td>
                    <div class="hstack justify-content-center gap-2">
                        <!-- <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userInformation" @click="details">Details</button> -->
                        <button class="btn btn-primary" @click="details(user.id)">Details</button>
                    </div>
                </td>
            </tr>

            <!-- show empty message -->
            <tr v-else>
                <td colspan="5" class="text-center text-muted py-3">No data to show.</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import pfp from "@/assets/logo.png";

export default {
    props: {
        users: Array,
        fetching: Boolean,
    },
    data() {
        return {
            pfp,
            data: [],
        };
    },
    methods: {
        details(id) {
            this.$emit("selected-id", id);
        },
    },
    mounted() {
        console.log(this.fetching);
    },
};
</script>

<style>
.tdh {
    width: 1%;
}

td:first-child,
th:first-child {
    text-align: center;
}
</style>

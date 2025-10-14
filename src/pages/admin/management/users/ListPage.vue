<template>
    <table class="table table-hover table-striped table-responsive overflow-auto align-middle">
        <thead class="position-sticky top-0">
            <tr>
                <th class="tdh px-4">#</th>
                <th class="w-50">Name</th>
                <th>Role</th>
                <th class="text-center" style="width: 10%">Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- show placeholder when loading -->
            <tr v-if="fetching">
                <td colspan="4">
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
                <td>
                    <div class="hstack justify-content-center gap-2">
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userInformation" @click="data = user">Details</button>
                    </div>
                </td>
            </tr>

            <!-- show empty message -->
            <tr v-else>
                <td colspan="4" class="text-center text-muted py-3">No data to show.</td>
            </tr>
        </tbody>
    </table>
    <div class="modal fade" id="userInformation">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="mb-0"><i class="bi bi-person me-2 fs-5"></i>{{ data?.first_name + " " + (data?.middle_initial ? data?.middle_initial + "." : "") + data?.last_name + "'s Information" }}</h5>
                    <button class="btn btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4 overflow-auto" style="max-height: 500px">
                    <UserInformationPage :user="data" />
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pfp from "@/assets/logo.png";
import UserInformationPage from "./UserInformationPage.vue";

export default {
    props: {
        users: Array,
        fetching: Boolean,
    },
    components: { UserInformationPage },
    data() {
        return {
            pfp,
            data: [],
        };
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

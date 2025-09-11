<template>
    <div class="h-100 d-flex justify-content-center">
        <div class="container p-4">
            <div class="card h-100">
                <div class="card-body p-4 d-flex flex-column flex-md-row gap-3 overflow-hidden">
                    <!-- Left: Campus List -->
                    <div class="left col-12 col-md-4 h-100 bg-secondary-subtle rounded-3 overflow-hidden">
                        <div class="list-group h-100 overflow-auto rounded-0 border">
                            <div class="fw-bold p-3 bg-prime text-white">Campuses</div>
                            <a
                                v-for="c in allCampuses"
                                :key="c.id"
                                href="#"
                                class="list-group-item list-group-item-action border-0 border-bottom"
                                :class="{ active: activeCampus === c.id }"
                                @click.prevent="
                                    activeCampus = c.id;
                                    allAdminUsers(c.id);
                                ">
                                <div class="d-flex w-100 justify-content-between align-items-center py-2">
                                    <h6 class="mb-0">{{ c.campus }}</h6>
                                    <small>{{ c.abbrev || "" }}</small>
                                </div>
                            </a>
                        </div>
                    </div>

                    <!-- Right: Users/Admins -->
                    <div class="right col-12 col-md-8 bg-secondary-subtle rounded-2 border overflow-auto">
                        <div class="h-100 d-flex align-items-center justify-content-center" v-if="!activeCampus">No campus selected.</div>

                        <div class="h-100 d-flex align-items-center justify-content-center" v-else-if="isEmpty(isAllUsers)">No admins in this campus.</div>

                        <div class="accordion accordion-flush" :id="'adminsInTheCampus' + activeCampus" v-else>
                            <div class="accordion-item" v-for="(a, i) in isAllUsers" :key="a.id">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#admin' + a.id" aria-expanded="false" :aria-controls="'admin' + a.id">{{ i + 1 }}. {{ a.name }}</button>
                                </h2>
                                <div :id="'admin' + a.id" class="accordion-collapse collapse" :data-bs-parent="'#adminsInTheCampus' + activeCampus">
                                    <div class="accordion-body">
                                        <div class="hstack justify-content-between align-items-center">
                                            <label for="section" class="small">Section</label>
                                            <select class="form-select form-select-sm" style="width: 200px">
                                                <option value="" selected>Assign to a section</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Left -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchCampuses, fetchUsers } from "@/stores/apiCache";
import { filter } from "@/utilities/dataManipulation";
import { isEmpty } from "@/utilities/dataMap";

export default {
    name: "RolesPage",
    computed: {
        isAllUsers() {
            return this.allUsers;
        },
    },
    setup() {
        return { isEmpty };
    },
    data() {
        return {
            allCampuses: [],
            allUsers: [],
            activeCampus: null,
        };
    },
    methods: {
        async allAdminUsers(campusId) {
            const users = await fetchUsers();
            this.allUsers = filter(users, { role: "1", "campus.id": campusId });
        },
    },
    async mounted() {
        this.allCampuses = await fetchCampuses();
    },
};
</script>


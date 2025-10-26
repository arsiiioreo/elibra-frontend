<template>
    <div class="h-100 w-100 vstack overflow-hidden">
        <div class="card p-2 mb-1">
            <div class="hstack gap-2 justify-content-end">
                <div class="hstack gap-2">
                    <label for="date">Filter Date</label>
                    <input type="date" class="form-control" id="date" name="date" v-model="date" style="width: 150px" :max="today" />
                </div>
                <button class="btn btn-outline-secondary" @click="refresh">Refresh</button>
            </div>
        </div>
        <div class="card h-100 w-100 overflow-hidden">
            <div class="card-header">Your Activity Logs</div>

            <!-- Loading Placeholder -->
            <div v-if="!data" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 text-muted">Fetching activities...</p>
            </div>

            <!-- Activity List -->
            <div v-else-if="data.length > 0" class="list-group rounded-0 overflow-auto">
                <div v-for="activity in data" :key="activity.id" class="list-group-item list-group-item-action d-flex align-items-start p-3 border-0 border-bottom">
                    <div class="me-3">
                        <i class="bi bi-clock-history fs-3 text-primary"></i>
                    </div>
                    <div class="flex-fill">
                        <div class="d-flex justify-content-between">
                            <h6 class="mb-1 fw-bold">{{ activity.title }}</h6>
                            <small class="text-muted">
                                {{ formatDate(activity.created_at) }}
                            </small>
                        </div>
                        <p class="mb-0 text-secondary">{{ activity.description }}</p>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="alert alert-info text-center">
                <i class="bi bi-info-circle me-2"></i>
                No activities found.
            </div>
        </div>
    </div>
</template>

<script>
import { getActivities, storage } from "@/stores/librarianCache";

export default {
    data() {
        return {
            data: null,
            date: null,
            timer: null,
        };
    },
    computed: {
        today() {
            const date = new Date();
            return date.toISOString().split("T")[0]; // returns YYYY-MM-DD
        },
    },
    created() {
        this.fetchActivities();
    },
    watch: {
        date() {
            clearTimeout(this.timer);

            this.timer = setTimeout(() => {
                this.refresh();
            }, 1000);
        },
    },
    methods: {
        async fetchActivities() {
            this.data = null;
            this.data = await getActivities({ date: this.date });
        },
        refresh() {
            storage.activities = null;
            this.fetchActivities();
        },
        formatDate(date) {
            const d = new Date(date);
            return d.toLocaleString();
        },
    },
};
</script>

<style scoped>
.list-group-item {
    transition: background 0.2s ease;
}
.list-group-item:hover {
    background: #f8f9fa;
}
</style>

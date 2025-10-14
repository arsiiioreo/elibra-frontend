<template>
    <div class="d-flex flex-column align-items-center justify-content-start bg-light text-dark overflow-auto">
        <div v-if="notifications.length" class="w-100 h-100">
            <div v-for="(notification, index) in notifications" :key="index" class="notification-item p-3 mb-3 border rounded shadow-sm bg-white" :class="{ 'bg-light': notification.read }" @click="openNotification(notification)">
                <h5 class="fw-bold">
                    {{ notification.title }}
                    <span v-if="!notification.read" class="badge bg-danger ms-2">Unread</span>
                </h5>
                <p class="mb-1">{{ notification.message }}</p>
                <small class="text-muted">{{ notification.date }}</small>
            </div>
        </div>
        <div v-else class="text-center text-muted">
            <i class="bi bi-bell-slash display-1"></i>
            <p class="mt-3">No notifications to display.</p>
        </div>

        <!-- Modal -->
        <div v-if="selectedNotification" class="modal-backdrop">
            <div class="modal-content p-4">
                <h3>{{ selectedNotification.title }}</h3>
                <p>{{ selectedNotification.message }}</p>
                <small class="text-muted">{{ selectedNotification.date }}</small>
                <div class="mt-4">
                    <button class="btn btn-secondary" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationsPage",
    data() {
        return {
            notifications: [
            { title: "New Book Added", message: "The book 'JavaScript: The Good Parts' has been added to the library.", date: "2023-10-01", read: false, },
            { title: "Overdue Reminder", message: "The book 'Clean Code' is overdue. Please return it as soon as possible.", date: "2023-09-28", read: false, },
            { title: "New Book Added", message: "The book 'JavaScript: The Good Parts' has been added to the library.", date: "2023-10-01", read: false, },
            { title: "Overdue Reminder", message: "The book 'Clean Code' is overdue. Please return it as soon as possible.", date: "2023-09-28", read: false, },
            { title: "New Book Added", message: "The book 'JavaScript: The Good Parts' has been added to the library.", date: "2023-10-01", read: false, },
            { title: "Overdue Reminder", message: "The book 'Clean Code' is overdue. Please return it as soon as possible.", date: "2023-09-28", read: false, },
            { title: "New Book Added", message: "The book 'JavaScript: The Good Parts' has been added to the library.", date: "2023-10-01", read: false, },
            { title: "Overdue Reminder", message: "The book 'Clean Code' is overdue. Please return it as soon as possible.", date: "2023-09-28", read: false, },
            { title: "New Book Added", message: "The book 'JavaScript: The Good Parts' has been added to the library.", date: "2023-10-01", read: false, },
            { title: "Overdue Reminder", message: "The book 'Clean Code' is overdue. Please return it as soon as possible.", date: "2023-09-28", read: false, },
            { title: "New Book Added", message: "The book 'JavaScript: The Good Parts' has been added to the library.", date: "2023-10-01", read: false, },
            { title: "Overdue Reminder", message: "The book 'Clean Code' is overdue. Please return it as soon as possible.", date: "2023-09-28", read: false, },
            ],
            selectedNotification: null,
        };
    },
    methods: {
        openNotification(notification) {
            this.selectedNotification = notification;
            this.markAsRead();
        },
        closeModal() {
            this.selectedNotification = null;
        },
        markAsRead() {
            if (this.selectedNotification) {
                this.selectedNotification.read = true;
            }
        },
    },
};
</script>

<style scoped>
.notification-item {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
}
.notification-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
}
.modal-content {
    background: white;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>


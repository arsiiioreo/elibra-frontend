<template>
    <transition name="fade">
        <div v-if="show" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5)" @click.self="$emit('close')">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content text-center p-4 shadow rounded-4 border-0">
                    <div class="my-4">
                        <i :class="['display-1', iconColorClass, 'bi', iconMap[status] || 'bi-info-circle']"></i>
                    </div>

                    <h5 class="modal-title fs-3 fw-bold">{{ title }}</h5>
                    <p class="text-secondary mt-2">{{ message }}</p>

                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-outline-danger px-4" @click="$emit('answer', false)">Cancel</button>
                        <button class="btn btn-primary px-4" @click="$emit('answer', true)">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            default: "info",
        },
        title: {
            type: String,
            default: "Are you sure?",
        },
        message: {
            type: String,
            default: "Do you want to proceed with this action?",
        },
    },
    computed: {
        iconMap() {
            return {
                success: "bi-check-circle",
                error: "bi-x-circle",
                warning: "bi-exclamation-triangle",
                info: "bi-info-circle",
            };
        },
        iconColorClass() {
            return (
                {
                    success: "text-success",
                    error: "text-danger",
                    warning: "text-warning",
                    info: "text-primary",
                }[this.status] || "text-primary"
            );
        },
    },
    emits: ["close", "answer"],
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>


<template>
  <div
    v-if="show"
    class="modal fade show d-block"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-center p-4 shadow rounded-4 border-0">
        <div class="my-3">
          <i
            :class="[
              'display-1',
              iconColorClass,
              'bi',
              iconMap[status] || 'bi-info-circle',
            ]"
          ></i>
        </div>

        <h5 class="modal-title fs-3 fw-bold">{{ title }}</h5>
        <p class="text-secondary mt-2">{{ message }}</p>
      </div>
    </div>
  </div>
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
      default: "Heads up!",
    },
    message: {
      type: String,
      default: "This is a sample message popup.",
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
};
</script>

<style scoped>
.modal {
  backdrop-filter: blur(3px);
  z-index: 1055;
}
</style>


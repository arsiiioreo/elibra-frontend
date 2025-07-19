<!-- 
    This modal only handles loading updates.
    It only displays the loading state and message. 
    It does not handle any other actions or states.
    It is used to indicate that a process is ongoing.
-->

<template>
  <div
    v-if="show"
    class="modal fade show d-block"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div
        class="modal-content text-center d-flex flex-column justify-content-center align-items-center p-4 border-0 bg-light text-dark"
      >
        <div class="d-flex gap-2 my-5">
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-success" role="status"></div>
        </div>
        <p class="fs-5">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "Loading, please wait...",
    },
  },
};
</script>

<style scoped>
.modal {
  backdrop-filter: blur(3px);
  z-index: 1050;
}
</style>


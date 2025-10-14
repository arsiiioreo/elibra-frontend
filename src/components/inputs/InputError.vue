<template>
    <div class="alert mb-0 mt-2 alert-danger" role="alert" v-if="error"><i class="bi bi-error"></i>{{ error }}</div>
</template>
<script>
export default {
    props: {
        error: String,
    },
};
</script>


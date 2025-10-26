<template>
    <div class="position-relative overflow-hidden" style="width: 350px">
        <!-- Search Icon (only when query is empty) -->
        <i v-if="query === ''" class="bi bi-search position-absolute mt-2 start-0" :style="{ marginLeft: searchFocused ? '0.75rem' : '-2rem' }"></i>

        <!-- Input -->
        <input id="query" name="query" type="search" class="form-control search" placeholder="Search user..." :style="{ paddingLeft: searchFocused ? '2.5rem' : '0.75rem' }" v-model="internalQuery" @focus="searchFocused = false" @blur="searchFocused = true" />
    </div>
</template>

<script>
export default {
    props: { query: String },
    emits: ["update:query"],
    data() {
        return {
            searchFocused: true,
            internalQuery: this.query, // internal copy of prop
        };
    },
    watch: {
        internalQuery(val) {
            this.$emit("update:query", val);
        },
        query(newVal) {
            // sync when parent updates the prop
            this.internalQuery = newVal;
        },
    },
};
</script>

<style>
.bi-search,
.bi-x-lg,
.form-control {
    transition: all 0.25s ease;
}
</style>


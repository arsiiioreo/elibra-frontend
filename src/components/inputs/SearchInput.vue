<template>
    <div class="position-relative overflow-hidden w-100">
        <!-- Search Icon (only when query is empty) -->
        <i v-if="query === ''" class="bi bi-search position-absolute mt-2 start-0" :style="{ marginLeft: searchFocused ? '0.75rem' : '-2rem' }"></i>

        <!-- Close Icon (only when query has value) -->
        <i v-if="query !== ''" class="bi bi-x-lg position-absolute mt-2 end-0 me-2" @click="clearSearch"></i>

        <!-- Input -->
        <input type="text" class="form-control pe-3 w-100" placeholder="Search user..." :style="{ paddingLeft: searchFocused ? '2.5rem' : '0.75rem' }" v-model="internalQuery" @focus="searchFocused = false" @blur="searchFocused = true" />
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
    methods: {
        clearSearch() {
            this.internalQuery = "";
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


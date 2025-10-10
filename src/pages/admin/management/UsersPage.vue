<template>
    <div class="card w-100 h-100">
        <div class="card-header hstack justify-content-between align-items-center p-3">
            <h4 class="mb-0"><i class="bi bi-person-circle me-2 fs-4"></i>All Users</h4>
            <div class="hstack gap-2">
                <!-- <div class="position-relative overflow-hidden">
                    <i class="bi bi-search position-absolute mt-2 start-0" :style="{ marginLeft: searchFocused ? '0.75rem' : '-2rem' }"></i>
                    <input type="text" class="form-control" placeholder="Search user..." style="width: 350px" :style="{ paddingLeft: searchFocused ? '2.5rem' : '0.75rem' }" @focus="searchFocused = false" @blur="searchFocused = true" />
                </div> -->
                <SearchInput v-model:query="params.query" />
                <button class="btn btn-outline-secondary"><i class="bi bi-filter me-2"></i>Filter</button>
                <button class="btn btn-primary"><i class="bi bi-plus me-2"></i>Add User</button>
            </div>
        </div>
        <div class="card-body">
            <div class="">
                {{ params.query }}
            </div>
        </div>
    </div>
</template>

<script>
import SearchInput from "@/components/inputs/SearchInput.vue";
export default {
    name: "LibraryInformationPage",
    data() {
        return {
            params: {
                query: "",
            },
        };
    },
    components: { SearchInput },
};
</script>

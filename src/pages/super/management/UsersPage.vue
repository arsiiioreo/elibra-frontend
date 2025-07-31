<template>
    <div class="d-flex align-items-center gap-2 justify-content-end">
        <form class="hstack gap-2 w-50">
            <select name="campus" id="campus" class="form-select" v-for="campus in campuses" :key="campus.id" v-bind="c">
                <option :value="campus.id">{{ campus.name }}</option>
            </select>
            <select name="campus" id="campus" class="form-select" v-bind="u">
                <option value="1">Admins</option>
                <option value="2">Students</option>
            </select>
        </form>
        <button class="btn btn-primary">
            <i class="bi bi-plus me-1"></i>
            <span>Generate Users</span>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            c: "",
            u: "",
            campuses: [
                {
                    id: "1",
                    name: "Echague Campus",
                },
            ],
        };
    },
};
</script>


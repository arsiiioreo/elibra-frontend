<template>
    <table class="table table-sm table-striped text-center m-0">
        <thead class="table-dark">
            <tr>
                <th v-for="(col, i) in columns" :key="i" :style="col.style">
                    {{ col.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="isFetchingCampuses">
                <td v-for="n in columnCount" :key="n">
                    <p class="placeholder-glow mb-0">
                        <span class="placeholder col-12"></span>
                    </p>
                </td>
            </tr>

            <tr v-if="isEmpty(campuses) && !isFetchingCampuses">
                <td :colspan="columnCount">No data to show.</td>
            </tr>

            <tr v-else v-for="(campus, index) in campuses" :key="campus.id">
                <td>{{ index + 1 }}</td>
                <td>{{ campus.abbrev }}</td>
                <td>{{ campus.campus }}</td>
                <td>{{ campus.address }}</td>
                <td>
                    <select name="activated" :id="'activated' + campus.id" class="form-select form-select-sm" v-model="campus.is_active">
                        <option value="1">{{ getLabel("campusStatus", 1) }}</option>
                        <option value="0">{{ getLabel("campusStatus", 0) }}</option>
                    </select>
                </td>
                <td>
                    <button
                        class="btn btn-sm btn-warning"
                        @click="
                            thisCampus = campus;
                            isEditing = true;
                            editingCampusId = campus.id;
                        "
                        data-bs-toggle="modal"
                        data-bs-target="#addCampus">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <p>{{ columnCount }}</p>
</template>

<script>
import { getLabel, isEmpty } from "@/utilities/dataMap";

export default {
    name: "CampusTable",
    props: {
        campuses: { type: Array, required: true },
        isFetchingCampuses: { type: Boolean, required: true },
    },
    data() {
        return {
            columns: [{ label: "No.", style: "width: 75px" }, { label: "Code" }, { label: "Campus" }, { label: "Address" }, { label: "Status" }, { label: "Action" }],
        };
    },
    computed: {
        columnCount() {
            return this.columns.length;
        },
    },
    methods: {
        isEmpty,
        getLabel,
    },
};
</script>


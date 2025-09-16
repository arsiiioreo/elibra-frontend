<template>
    <div class="container-fluid p-1">
        <div class="hstack justify-content-between align-items-center">
            <div class="hstack gap-2">
                <input type="text" class="form-control" v-model="query" placeholder="Search campus..." style="max-width: 300px" />
                <button type="button" class="btn btn-danger" @click="query = ''">Clear</button>
            </div>
            <button type="button" class="btn btn-primary"><i class="bi bi-plus me-2"></i>Add New Campus</button>
        </div>
        <hr />
        <CampusTable :isFetchingCampuses="isFetchingCampuses" :campuses="campuses" />
    </div>
</template>

<script>
import CampusTable from "@/components/pages/admin/management/campus/CampusTable.vue";

export default {
    name: "CampusPage",
    components: { CampusTable },
    data() {
        return {
            query: "",
            campuses: [],
            isFetchingCampuses: true, // Initially true
        };
    },
    mounted() {
        this.fetchCampuses();
    },
    methods: {
        fetchCampuses() {
            // Simulate an API call
            setTimeout(() => {
                this.campuses = [
                    { id: 1, abbrev: "ISU-Main", campus: "Echague", address: "San Fabian, Echague, Isabela", is_active: 1 },
                    { id: 2, abbrev: "ISU-SF", campus: "San Fabian", address: "San Fabian, San Fabian, Pangasinan", is_active: 1 },
                    { id: 3, abbrev: "ISU-VC", campus: "VC", address: "VC, VC, VC", is_active: 0 },
                    { id: 4, abbrev: "ISU-LP", campus: "Luna", address: "Luna, Luna, La Union", is_active: 1 },
                    { id: 5, abbrev: "ISU-AL", campus: "Alaminos", address: "Alaminos, Alaminos, Pangasinan", is_active: 1 },
                    { id: 6, abbrev: "ISU-MC", campus: "Manaoag", address: "Manaoag, Manaoag, Pangasinan", is_active: 0 },
                    { id: 7, abbrev: "ISU-SC", campus: "Santiago City", address: "Santiago City, Santiago City, Isabela", is_active: 1 },
                    { id: 8, abbrev: "ISU-CF", campus: "Cauayan Foundation", address: "Cauayan Foundation, Cauayan City, Isabela", is_active: 1 },
                ];
                this.isFetchingCampuses = false; // Set to false after data is loaded
            }, 1000); // Simulate a delay
        },
    },
};
</script>

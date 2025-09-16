<template>
    <div class="modal fade" id="addCampus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ isEditing ? "Edit" : "Add" }} Campus</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
                </div>
                <div class="modal-body">
                    <form class="w-100" @submit.prevent="">
                        <div class="mb-3">
                            <label for="code" class="form-label">Campus Code</label>
                            <input id="code" name="code" type="text" class="form-control" placeholder="e.g. ISU-Main" v-model="thisCampus.abbrev" required />
                        </div>
                        <div class="mb-3">
                            <label for="code" class="form-label">Campus Name</label>
                            <input id="name" name="name" type="text" class="form-control" placeholder="e.g. Echague" v-model="thisCampus.campus" required />
                        </div>
                        <div class="mb-3">
                            <label for="code" class="form-label">Campus Address</label>
                            <input id="location" name="location" type="text" class="form-control" placeholder="e.g. San Fabian, Echague, Isabela" v-model="thisCampus.address" required />
                        </div>
                        <hr />
                        <div class="d-100 hstack justify-content-end gap-2">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetForm">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">{{ isEditing ? "Update" : "Add" }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CampusModal',
    props: {
        isEditing: { type: Boolean, required: true },
        editingCampusId: { type: [Number, null], required: false },
        thisCampus: { type: Object, required: true },
    },
}
</script>
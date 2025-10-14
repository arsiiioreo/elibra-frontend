<template>
    <div class="card">
        <div class="card-body p-4">
            <form class="w-100">
                <h4 class="fw-bold mb-3">New Item's Information</h4>
                <div class="row">
                    <!-- Item's Title -->
                    <BaseInput class="col-12 col-lg-6" label="Book Title" placeholder="Enter Book Title" v-model="item.title" :r="true" />
                    <!-- Item's Authors -->
                    <BaseInput class="col-12 col-lg-6" label="Book Authors" placeholder="Enter Book Authors" v-model="item.authors" :r="true" :readonly="true" data-bs-toggle="modal" data-bs-target="#authorsModal" />

                    <div class="modal fade" id="authorsModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add Authors</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>

                                <div class="modal-body">
                                    <!-- Add input + button -->
                                    <div class="vstack gap-1">
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="newAuthor" placeholder="Enter author name" />
                                            <button class="btn btn-success" @click="addAuthor" type="button">Add</button>
                                        </div>
                                        <p class="small text-danger"><i class="bi bi-info-circle me-2"></i>Last Name, First Name, Middle Initial (e.x. Dela Cruz, Juan A.)</p>
                                    </div>

                                    <!-- List of authors -->
                                    <h6>Authors</h6>
                                    <ul class="list-group">
                                        <li v-for="(author, index) in authors" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                                            <span v-if="editIndex !== index">{{ author }}</span>
                                            <input v-else type="text" class="form-control me-2" v-model="editAuthor" />

                                            <div>
                                                <div v-if="editIndex !== index">
                                                    <button class="btn btn-sm btn-warning me-2" @click="startEdit(index, author)">Edit</button>
                                                    <button class="btn btn-sm btn-danger" @click="deleteAuthor(index)">Delete</button>
                                                </div>
                                                <div v-else>
                                                    <button class="btn btn-sm btn-success" @click="saveEdit(index)">Save</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div v-if="deletedAuthors.length" class="mt-3">
                                        <h6>Recently Deleted</h6>
                                        <ul class="list-group">
                                            <li v-for="(author, index) in deletedAuthors" :key="'deleted-' + index" class="list-group-item d-flex justify-content-between align-items-center text-muted">
                                                <span>{{ author }}</span>
                                                <button class="btn btn-sm btn-info" @click="restoreAuthor(index)">Undo</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveAuthors">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- Item's Publisher -->
                    <BaseInput class="col-12 col-lg-8" label="Publisher" placeholder="Enter Publisher" v-model="item.publisher" :r="true" />
                    <!-- Item's ISBN -->
                    <BaseInput class="col-12 col-lg-4" label="Year of Publication" placeholder="Enter Year" type="year" v-model="item.year" :r="true" :max="new Date().toISOString().split('T')[0]" />
                </div>
                <div class="row">
                    <!-- Item's ISBN/ISSN -->
                    <BaseInput class="col-12 col-lg-6" label="ISBN" placeholder="Enter ISBN" v-model="item.isbn" :r="true" />
                    <!-- Item's Call Number -->
                    <BaseInput class="col-12 col-lg-6" label="Call Number" placeholder="Enter Call Number" v-model="item.callNumber" :r="true" />
                </div>
                <div class="row">
                    <!-- Item's Location -->
                    <BaseSelect class="col-12 col-lg-6" label="Location" placeholder="Select Location" v-model="item.location" :options="campuses" :r="true" />
                    <BaseSelect class="col-12 col-lg-6" label="Branch" placeholder="Select Section" v-model="item.branch" :options="sections" :r="true" />
                </div>

                <h4 class="fw-bold mb-3">Acquisition Information</h4>

                <div class="row">
                    <!-- Mode of Acquisition -->
                    <BaseSelect class="col-12 col-lg-6" label="Mode of Acquisition" placeholder="Enter mode of acquisition" v-model="item.acquisition_mode" :options="modesOfAcquisition" :r="true" />
                    <BaseInput class="col-12 col-lg-6" label="Date of Acquisition" placeholder="Select Date" type="year" v-model="item.year" :r="true" :max="new Date().toISOString().split('T')[0]" />
                </div>
                <div class="row">
                    <BaseInput class="col-12 col-lg-3" label="Unit Price" placeholder="Enter Quantity" type="number" v-model="item.quantity" :r="true" min="1" />
                    <BaseInput class="col-12 col-lg-3" label="Discount" placeholder="Enter Discount Price" type="number" v-model="item.quantity" :r="true" min="1" />
                    <BaseInput class="col-12 col-lg-3" label="Net Price" placeholder="Enter Net Price" type="number" v-model="item.total_cost" :r="true" min="1" />
                    <BaseInput class="col-12 col-lg-3" label="Copies" placeholder="Enter Quantity" type="number" v-model="item.quantity" :r="true" min="1" />
                </div>
                <div class="row">
                    <BaseInput class="col-12 col-lg-12" label="Received By" :placeholder="user.name" type="number" v-model="item.received_by" :r="true" min="1" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseSelect from "@/components/inputs/BaseSelect.vue";
import { user } from "@/stores/auth";

export default {
    components: { BaseInput, BaseSelect },
    data() {
        return {
            item: {
                title: "",
                authors: "",
                year: "",
                publisher: "",
                publication: "",
                isbn: "",
                callNumber: "",
                quantity: "",
            },
            campuses: [
                { value: "0", label: "Echague Campus" },
                { value: "1", label: "Angadanan Campus" },
            ],
            sections: [
                { value: "0", label: "Serials" },
                { value: "1", label: "Thesis" },
            ],
            modesOfAcquisition: [
                { value: "purchased", label: "Purchased" },
                { value: "donated", label: "Donated" },
                { value: "gift", label: "Gift" },
                { value: "exchanged", label: "Exchanged" },
            ],

            // 🔥 Modal-specific state
            authors: [], // temporary list inside modal
            newAuthor: "", // input for new author
            editIndex: null, // track editing row
            editAuthor: "", // editing text
            deletedAuthors: [],
            user: user.value,
        };
    },

    methods: {
        addAuthor() {
            if (!this.newAuthor.trim()) return;
            this.authors.push(this.newAuthor.trim());
            this.newAuthor = "";
        },
        startEdit(index, author) {
            this.editIndex = index;
            this.editAuthor = author;
        },
        saveEdit(index) {
            if (!this.editAuthor.trim()) return;
            this.authors[index] = this.editAuthor.trim();
            this.editIndex = null;
            this.editAuthor = "";
        },
        deleteAuthor(index) {
            const removed = this.authors.splice(index, 1)[0]; // tanggalin sa main list
            if (removed) {
                this.deletedAuthors.push(removed); // ilagay sa deleted list
            }
        },
        restoreAuthor(index) {
            const restored = this.deletedAuthors.splice(index, 1)[0];
            if (restored) {
                this.authors.push(restored); // balik sa main list
            }
        },

        saveAuthors() {
            this.item.authors = this.authors.join("; ");
            this.deletedAuthors = []; // clear deleted list after saving
        },
    },
};
</script>


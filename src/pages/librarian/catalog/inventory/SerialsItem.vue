<template>
    <div class="d-flex justify-content-center">
        <form class="p-4 col-12 col-md-6 card">
            <h4 class="fw-bold mb-3">New Book Information</h4>
            <div class="row">
                <BaseInput class="col-12 col-lg-6" label="Book Title" placeholder="Enter Book Title" v-model="book.title" :r="true" />
                <BaseInput class="col-12 col-lg-6" label="Book Authors" placeholder="Enter Book Authors" v-model="book.authors" :r="true" :readonly="true" data-bs-toggle="modal" data-bs-target="#authorsModal" />

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
                <BaseInput class="col-12 col-lg-5" label="Publisher" placeholder="Enter Publisher" v-model="book.publisher" :r="true" />
                <BaseInput class="col-12 col-lg-4" label="Publication" placeholder="Enter Publication" v-model="book.publication" :r="true" />
                <BaseInput class="col-12 col-lg-3" label="Year of Publication" placeholder="Enter Year" type="date" v-model="book.year" :r="true" :max="new Date().toISOString().split('T')[0]" />
            </div>
            <div class="row">
                <BaseInput class="col-12 col-lg-6" label="ISBN" placeholder="Enter ISBN" v-model="book.isbn" :r="true" />
                <BaseInput class="col-12 col-lg-6" label="Call Number" placeholder="Enter Call Number" v-model="book.callNumber" :r="true" />
            </div>
            <div class="row">
                <BaseSelect class="col-12 col-lg-6" label="Location" placeholder="Select Location" v-model="book.location" :options="campuses" :r="true" />
                <BaseSelect class="col-12 col-lg-6" label="Section" placeholder="Select Section" v-model="book.location" :options="sections" :r="true" />
            </div>

            <h4 class="fw-bold mb-3">Acquisition Information</h4>

            <div class="row">
                <BaseInput class="col-12 col-lg-6" label="Mode of Acquisition" placeholder="Enter Mode" type="number" v-model="book.quantity" :r="true" min="1" />
            </div>
            <div class="row">
                <BaseInput class="col-12 col-lg-6" label="Copies" placeholder="Enter Quantity" type="number" v-model="book.quantity" :r="true" min="1" />
                <BaseInput class="col-12 col-lg-6" label="Discount" placeholder="Enter Discount Price" type="number" v-model="book.quantity" :r="true" min="1" />
            </div>
            <div class="row">
                <BaseInput class="col-12 col-lg-6" label="Unit Price" placeholder="Enter Quantity" type="number" v-model="book.quantity" :r="true" min="1" />
            </div>
        </form>
    </div>
</template>

<script>
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseSelect from "@/components/inputs/BaseSelect.vue";

export default {
    components: { BaseInput, BaseSelect },
    data() {
        return {
            book: {
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

            // 🔥 Modal-specific state
            authors: [], // temporary list inside modal
            newAuthor: "", // input for new author
            editIndex: null, // track editing row
            editAuthor: "", // editing text
            deletedAuthors: [],
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
            this.book.authors = this.authors.join("; ");
            this.deletedAuthors = []; // clear deleted list after saving
        },
    },
};
</script>


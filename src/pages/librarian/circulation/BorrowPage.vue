<template>
    <div class="mb-3 d-flex justify-content-between align-items-center">
        <div>
            <input type="text" v-model="searchQuery" class="form-control d-inline-block w-auto me-2" placeholder="Search..." />
            <select v-model="sortOption" class="form-select d-inline-block w-auto">
                <option value="bookTitle">Sort by Title</option>
                <option value="borrower">Sort by Borrower</option>
                <option value="dateBorrowed">Sort by Date</option>
            </select>
        </div> 
        <button class="btn btn-primary" @click="showAddBorrowModal = true"><i class="bi bi-plus-circle me-2"></i> Add Borrowing</button>
    </div>
    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Accession Code</th>
                <th>Borrower</th>
                <th>Date Borrowed</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(borrow, index) in borrowedBooks" :key="borrow.id">
                <td>{{ index + 1 }}</td>
                <td>{{ borrow.bookTitle }}</td>
                <td>{{ borrow.accession }}</td>
                <td>{{ borrow.borrower }}</td>
                <td>{{ formatDateTime(borrow.dateBorrowed) }}</td>
                <td>
                    <button class="btn btn-danger btn-sm" @click="removeBorrow(borrow.id)"><i class="bi bi-trash"></i> Remove</button>
                </td>
            </tr>
            <tr v-if="borrowedBooks.length === 0">
                <td colspan="5" class="text-center">No borrowed books found.</td>
            </tr>
        </tbody>
    </table>

    <!-- Add Borrow Modal -->
    <div v-if="showAddBorrowModal" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Borrowing</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addBorrow">
                        <div class="mb-3">
                            <label for="bookTitle" class="form-label">Accession Code</label>
                            <input type="text" id="bookTitle" v-model="newBorrow.accession" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="bookTitle" class="form-label">Book Title</label>
                            <input type="text" id="bookTitle" v-model="newBorrow.bookTitle" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="borrower" class="form-label">Borrower</label>
                            <input type="text" id="borrower" v-model="newBorrow.borrower" class="form-control" required />
                        </div>
                        <div class="mb-3">
                            <label for="dateBorrowed" class="form-label">Date Borrowed</label>
                            <input type="datetime-local" id="dateBorrowed" v-model="newBorrow.dateBorrowed" class="form-control" required />
                        </div>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show" @click="closeModal"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            borrowedBooks: [
                { id: 1, bookTitle: "The Great Gatsby", borrower: "John Doe", accession: 'GT645759', dateBorrowed: "2023-10-01T10:30" },
                { id: 2, bookTitle: "1984", borrower: "Jane Smith", accession: 'GT645759', dateBorrowed: "2023-10-05T14:15" },
            ],
            showAddBorrowModal: false,
            newBorrow: {
                accession: "",
                bookTitle: "",
                borrower: "",
                dateBorrowed: "",
            },
        };
    },
    methods: {
        addBorrow() {
            const newBorrow = { ...this.newBorrow, id: Date.now() };
            this.borrowedBooks.push(newBorrow);
            this.closeModal();
        },
        removeBorrow(id) {
            this.borrowedBooks = this.borrowedBooks.filter((borrow) => borrow.id !== id);
        },
        closeModal() {
            this.showAddBorrowModal = false;
            this.newBorrow = { bookTitle: "", borrower: "", dateBorrowed: "" };
        },
        formatDateTime(dateTime) {
            const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Date(dateTime).toLocaleString(undefined, options);
        },
    },
};
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
}
</style>

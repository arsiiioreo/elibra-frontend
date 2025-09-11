<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
      <input v-model="searchQuery" type="text" class="form-control w-50" placeholder="Search by borrower name or book title..." />
      <select v-model="sortKey" class="form-select w-25">
          <option value="borrower">Sort by Borrower</option>
          <option value="book">Sort by Book</option>
          <option value="date">Sort by Return Date</option>
      </select>
  </div>
  <table class="table table-bordered table-hover">
      <thead class="table-light">
          <tr>
              <th>#</th>
              <th>Accession Code</th>
              <th>Book</th>
              <th>Borrower</th>
              <th>Return Date</th>
              <th class="text-center">Actions</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(item, index) in filteredAndSortedReturns" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.accession }}</td>
              <td>{{ item.book }}</td>
              <td>{{ item.borrower }}</td>
              <td>{{ item.returnDate }}</td>
              <td class="text-center">
                  <button class="btn btn-sm btn-warning" @click="undoReturn(index)">Undo</button>
              </td>
          </tr>
      </tbody>
  </table>
  <p v-if="filteredAndSortedReturns.length === 0" class="text-center text-muted">No returned borrowings found.</p>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            sortKey: "borrower",
            returns: [
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: 'GT000045', returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: 'GT000045', returnDate: "2023-10-02" }, 
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: 'GT000045', returnDate: "2023-10-03" },
            ],
        };
    },
    computed: {
        filteredAndSortedReturns() {
            const filtered = this.returns.filter((item) => item.borrower.toLowerCase().includes(this.searchQuery.toLowerCase()) || item.book.toLowerCase().includes(this.searchQuery.toLowerCase()));

            return filtered.sort((a, b) => {
                if (this.sortKey === "borrower") {
                    return a.borrower.localeCompare(b.borrower);
                } else if (this.sortKey === "book") {
                    return a.book.localeCompare(b.book);
                } else if (this.sortKey === "date") {
                    return new Date(a.returnDate) - new Date(b.returnDate);
                }
            });
        },
    },
    methods: {
        undoReturn(index) {
            const item = this.filteredAndSortedReturns[index];
            // Logic to handle undo action, e.g., moving the item back to borrowing
            alert(`Undoing return for ${item.book} borrowed by ${item.borrower}`);
            // Example: Remove the item from the returns list
            this.returns.splice(this.returns.indexOf(item), 1);
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: auto;
}
</style>

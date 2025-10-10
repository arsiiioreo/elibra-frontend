<template>
    <div class="p-4" ref="dropdownWrapper">
        <div class="card">
            <div class="dropdown">
                <input type="text" class="form-control" v-model="searchQuery" @input="debouncedSearch" @focus="focusOnItem = true" />
                <ul v-show="focusOnItem" class="dropdown-menu w-100 show" style="max-height: 300px; overflow-y: auto">
                    <li><h6 class="dropdown-header">Items List</h6></li>

                    <!-- kapag may results -->
                    <li v-for="(i, index) in filteredReturns" :key="index" class="dropdown-item" @click="selectItem(i)">
                        <div class="vstack">
                            <span class="small mb-0">{{ i.accession }}</span>
                            <h6 class="fw-bold">{{ i.book }}</h6>
                        </div>
                    </li>

                    <!-- kapag walang results -->
                    <li v-if="filteredReturns.length === 0" class="dropdown-item text-muted">No results found</li>
                </ul>
            </div>
        </div>

        <!-- Debug: show selected -->
        <div class="mt-3" v-if="selectedItem"><strong>Selected:</strong> {{ selectedItem.book }} ({{ selectedItem.accession }})</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            focusOnItem: false,
            selectedItem: null,
            searchQuery: "",
            timeout: null,
            returns: [
                { borrower: "Alice Johnson", book: "The Great Gatsby", accession: "GT000045", returnDate: "2023-10-01" },
                { borrower: "Bob Smith", book: "1984", accession: "GT000046", returnDate: "2023-10-02" },
                { borrower: "Charlie Brown", book: "To Kill a Mockingbird", accession: "GT000047", returnDate: "2023-10-03" },
            ],
            filteredReturns: [],
        };
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    methods: {
        handleClickOutside(e) {
            if (!this.$refs.dropdownWrapper.contains(e.target)) {
                this.focusOnItem = false;
            }
        },
        debouncedSearch() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.searchData();
            }, 300);
        },
        searchData() {
            this.filteredReturns = this.returns.filter((item) => {
                if (!this.searchQuery) {
                    return null;
                }

                return item.accession.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        selectItem(item) {
            this.selectedItem = item;
            this.focusOnItem = false; // close dropdown
            this.searchQuery = item.accession; // fill input
            console.log("Selected:", item);
        },
    },
};
</script>

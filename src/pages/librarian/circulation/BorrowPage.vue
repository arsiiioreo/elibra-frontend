<template>
    <div class="card w-100">
        <div class="card-header fw-bold">Borrowing's Information</div>
        <div class="card-body">
            <div class="row gap-3 px-3">
                <input type="text" class="form-control col-12 col-md-5" placeholder="Enter Item's Accession Code" v-model="selectedAccession" @focus="openAccessionModal" readonly />
                <input type="text" class="form-control col-12 col-md-5" placeholder="Enter Student's Borrower Card" v-model="selectedBorrower" @focus="openBorrowerModal" readonly />

                <button class="btn btn-primary col-12 col-md-2" @click="addBorrowing" :disabled="!selectedAccession || !selectedBorrower"><i class="bi bi-plus-circle me-2"></i>Add</button>
            </div>
        </div>
    </div>

    <div class="card mt-3">
        <div class="card-header fw-bold">Borrowing List</div>
        <div class="card-body">
            <div class="table-responsive">
                <BorrowTable :borrowing="borrowing" />
            </div>
        </div>
    </div>

    <!-- Modals -->
    <SearchModal ref="accessionModal" title="Select Accession" :data="allAccessions" :formatItem="(item) => item.code + ' - ' + item.title" @selected="setAccession" />
    <SearchModal ref="borrowerModal" title="Select Borrower" :data="borrower" :formatItem="(item) => item.ebc + ' - ' + item.user.name" @selected="setBorrower" />
</template>

<script>
import BorrowTable from "./components/BorrowTable.vue";
import SearchModal from "./components/SearchModal.vue";

export default {
    components: { BorrowTable, SearchModal },
    data() {
        return {
            borrowing: [],
            selectedAccession: "",
            selectedBorrower: "",
            items: [
                {
                    id: 1,
                    title: "Killing the Mocking Bird",
                    accessions: [
                        { id: 1, code: "GS000001" },
                        { id: 2, code: "GS000002" },
                    ],
                },
                {
                    id: 2,
                    title: "E-Libra: Enhanced Library Integrated Book and Resource Automation System",
                    accessions: [
                        { id: 3, code: "UT000001" },
                        { id: 4, code: "UT000002" },
                    ],
                },
            ],
            borrower: [
                { id: 1, ebc: "S10001ICT", user: { id: 1, name: "Reign Balico" } },
                { id: 2, ebc: "S10002ICT", user: { id: 2, name: "John Doe" } },
            ],
        };
    },
    computed: {
        allAccessions() {
            return this.items.flatMap((item) => item.accessions);
        },
    },
    methods: {
        openAccessionModal() {
            this.$refs.accessionModal.open();
        },
        openBorrowerModal() {
            this.$refs.borrowerModal.open();
        },
        setAccession(accession) {
            this.selectedAccession = accession.code;
        },
        setBorrower(borrower) {
            this.selectedBorrower = `${borrower.ebc} - ${borrower.user.name}`;
        },
        addBorrowing() {
            this.borrowing.push({
                accession: this.selectedAccession,
                borrower: this.selectedBorrower,
            });
            this.selectedAccession = "";
            this.selectedBorrower = "";
        },
    },
};
</script>

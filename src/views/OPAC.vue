<template>
    <div class="w-100 h-100 d-flex flex-column" style="height: 100vh; max-height: 100vh; overflow: hidden">
        <nav class="d-flex align-items-center justify-content-between w-100 p-5" style="height: 10vh">
            <div class="d-flex gap-4 align-items-center">
                <img src="@/assets/LOGO.png" alt="" style="height: 50px; width: auto" />
                <h4 class="text-prime fw-bolder m-0">e-Libra OPAC</h4>
            </div>
            <div v-if="!user.id" class="d-flex gap-3 align-items-center">
                <button type="button" class="btn rounded-pill px-4 text-prime fw-semibold">Login</button>
                <button type="button" class="btn rounded-pill px-4 text-white fw-semibold bg-prime">Register</button>
            </div>
            <div v-if="user.id">
                <div class="d-flex gap-1 align-items-center rounded-5 border p-1 px-2">
                    <img class="logo" src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" style="height: 35px; width: auto" />
                    <small class="me-2">{{ user.name }}</small>
                </div>
            </div>
        </nav>

        <section class="d-flex align-items-center justify-content-center" style="height: 25vh">
            <div class="section-header container-fluid d-flex flex-column align-items-center gap-4">
                <div class="d-flex align-items-center justify-content-center gap-3 mb-3">
                    <img src="@/assets/ISU.png" alt="" style="height: 60px; width: auto" />
                    <h3 v-if="user.name" class="text-prime fw-bolder m-0">ISU Online Public Access Catalogue</h3>
                </div>
                <div class="search-bar w-100">
                    <form class="d-flex align-items-center justify-content-center gap-2">
                        <div class="position-relative w-50">
                            <input type="text" list="datalistOptions" id="searchInput" name="searchInput" class="form-control rounded-pill ps-5 py-3 pe-4 ms-1" placeholder="Search for Books. Publications, etc." style="border: 1px solid #0eb55c" />
                            <datalist id="datalistOptions" class="w-100">
                                <option value="San Francisco"></option>
                                <option value="New York"></option>
                                <option value="Seattle"></option>
                                <option value="Los Angeles"></option>
                                <option value="Chicago"></option>
                            </datalist>

                            <i class="bi bi-search position-absolute top-50 translate-middle-y ms-4 text-muted"></i>
                        </div>
                        <button class="btn bg-prime text-white rounded-5 p-3" style="width: 15%">SEARCH</button>
                    </form>
                </div>
                <p class="text-prime">Recommended: <strong>"Books for an IT", "Research Books for IT Students", "Programming"</strong></p>
            </div>
        </section>

        <nav class="bg-prime p-3 ps-4 d-flex align-items-center text-light" style="height: '5vh'; --bs-breadcrumb-divider: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%228%22 height=%228%22%3E%3Cpath d=%22M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z%22 fill=%22white%22/%3E%3C/svg%3E')" aria-label="breadcrumb">
            <ol class="breadcrumb m-0">
                <li class="breadcrumb-item">
                    <a href="#" class="text-decoration-none text-white">Home</a>
                </li>
                <li class="breadcrumb-item active text-white" aria-current="page">Library</li>
            </ol>
        </nav>

        <main style="height: calc(100vh - 10vh - 25vh - 5vh)" class="overflow-hidden w-100">
            <div class="row h-100">
                <div class="col-3 text-center h-100 pe-0">
                    <form class="d-flex flex-column p-3 text-start h-100">
                        <h5 class="fw-bold mb-4">Search Filters</h5>

                        <div class="d-flex flex-column p-1 mb-2">
                            <p class="fw-bold">Campus</p>
                            <select class="form-select" name="campus" id="campus" v-model="searchFilter.campus">
                                <option value="" selected>Echague Campus</option>
                            </select>
                        </div>
                        <div class="d-flex flex-column p-1 mb-3">
                            <p class="fw-bold">Section</p>
                            <select class="form-select" name="section" id="section" v-model="searchFilter.section">
                                <option value="" selected>Echague Campus</option>
                            </select>
                        </div>
                        <div class="d-flex flex-column p-1 mb-2">
                            <p class="fw-bold">Sort By</p>
                            <select class="form-select" name="sortBy" id="sortBy" v-model="searchFilter.sortBy">
                                <option value="" selected>Echague Campus</option>
                            </select>
                        </div>
                        <p class="fw-bold">Date Published</p>
                        <div class="d-flex gap-2 p-1 mb-3 align-items-center">
                            <p class="mb-0">From</p>
                            <select name="year" id="year" class="form-select" v-model="searchFilter.yearFrom">
                                <option value="" selected>Select Year</option>
                                <option v-for="year in yearRange" :key="year" value="year">{{ year }}</option>
                            </select>

                            <p class="mb-0">To</p>
                            <select name="year" id="year" class="form-select" v-model="searchFilter.yearTo">
                                <option value="" selected>Select Year</option>
                                <option v-for="year in yearRange" :key="year" value="year">{{ year }}</option>
                            </select>
                        </div>

                        <button class="btn bg-prime text-white mt-3 rounded-pill w-100">Apply</button>
                    </form>
                </div>
                <div class="col-6 overflow-auto border-3 border-end border-start h-100 px-0 list-group rounded-0" style="scrollbar-width: thin; -ms-overflow-style: none">
                    <button v-for="(book, index) in books" type="button" class="d-flex align-items-center list-group-item list-group-item-action" :key="index" @click="previewBook(book)">
                        <img :src="book.picture" alt="" class="me-2" style="border-radius: 2px; width: auto; height: 50px" />
                        <div class="d-flex flex-column">
                            <h6 class="fw-bold">{{ parseInt(index) + 1 }}. {{ book.title }}</h6>
                            <small class="m-0 small">Campus: {{ book.campus }}</small>
                        </div>
                    </button>
                </div>
                <div class="col-3 text-center h-100">
                    <div v-if="!preview" class="row align-items-center h-100">
                        <div class="col">Search and click an item to preview.</div>
                    </div>
                    <div v-if="preview" class="row h-100 p-0 pe-3">
                        <div class="col rounded-4 p-0 d-flex flex-column gap-3 p-3">
                            <div class="d-flex align-items-start justify-content-between">
                                <h4 class="fw-bold m-0 text-prime text-break text-start">{{ preview.title }}</h4>
                                <button type="button" class="btn btn-close" aria-label="Close" @click="preview = null"></button>
                            </div>

                            <div class="d-flex gap-3">
                                <img :src="preview.picture" alt="Book Cover" style="width: 120px; height: auto; border-radius: 6px; object-fit: cover" />

                                <div class="d-flex flex-column justify-content-between align-items-start">
                                    <p class="m-0"><strong>Author:</strong> {{ preview.author }}</p>
                                    <p class="m-0"><strong>Published:</strong> {{ preview.date_published }}</p>
                                    <p class="m-0"><strong>Section:</strong> {{ preview.section }}</p>
                                    <p class="m-0"><strong>Campus:</strong> {{ preview.campus }}</p>
                                </div>
                            </div>

                            <div class="text-start border-top pt-2">
                                <p class="mb-1"><strong>Description:</strong></p>
                                <p class="small text-muted" style="text-align: justify">
                                    {{ preview.description || "No description available for this book." }}
                                </p>
                            </div>

                            <button class="btn bg-prime text-white mt-auto rounded-pill w-100">Borrow Book</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                id: "",
            },
            searchFilter: {
                campus: "",
                sortBy: "",
                section: "",
                yearFrom: "",
                yearTo: "",
            },
            books: {},
            preview: null,
            yearRange: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
        };
    },
    methods: {
        me() {
            this.user = JSON.parse(localStorage.getItem("user"));

            for (let i = 0; i <= 10; i++) {
                this.books[i] = {
                    title: "Alone (A True Story) (Based on The Conjuring)",
                    author: "Morgan Maxwell",
                    date_published: "July 7, 2019",
                    section: "General Section",
                    campus: "Echague Campus",
                    picture: "https://d502jbuhuh9wk.cloudfront.net/digital_products/6482a565e4b098303631f447/65468a2c0e152219c9d01b36/cover.jpg?v=2",
                };
            }
        },

        previewBook(book) {
            this.preview = book;
        },
    },
    mounted() {
        this.me();
    },
};
</script>

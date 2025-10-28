<template>
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content border-0 shadow-lg rounded-3">
      <div class="modal-header bg-prime text-white">
        <h5 class="modal-title fw-semibold"><i class="bi bi-list me-3"></i>Item Information</h5>
        <button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>

      <!-- Loading State -->
      <div class="modal-body text-center py-5" v-if="fetchingItem">
        <img src="@/assets/spinner.gif" alt="Loading..." width="75" />
      </div>

      <!-- No Info -->
      <div class="modal-body text-center py-5 text-muted" v-else-if="selectedBook.length <= 0">
        <i class="bi bi-exclamation-circle display-6 d-block mb-3"></i>
        No information available.
      </div>

      <!-- Book Info -->
      <div class="modal-body" v-else>
        <div class="row mb-4">
          <div class="col-md-2 text-center mb-4 mb-md-0 d-flex justify-content-center">
            <div class="border rounded shadow-sm bg-light" style="width: fit-content">
              <a :href="selectedBook?.picture || book_blank" target="_blank">
                <img :src="selectedBook?.picture || book_blank" alt="Book Cover" class="img-fluid rounded" style="max-height: 200px; width: auto; object-fit: cover" />
              </a>
            </div>
          </div>
          <div class="col-md-10">
            <h2 class="fw-bold mb-1">{{ selectedBook.title || "Untitled Book" }}</h2>
            <p class="text-secondary mb-0"><strong>Year Published:</strong> {{ selectedBook.year_published || "Unknown" }}</p>
            <div class="vstack gap-1 text-secondary">
              <label for="remarks"><strong>Description:</strong></label>
              <textarea class="form-control" name="" id="" rows="3" v-model="selectedBook.remarks"></textarea>
            </div>
          </div>
        </div>

        <!-- <hr /> -->

        <div class="row mb-4">
          <div class="col-md-12 hstack justify-content-start gap-2">
            <ul class="nav nav-tabs w-100">
              <li class="nav-item" v-for="p in pages" :key="p.i">
                <a href="#" class="nav-link" :class="{ active: p.i === page }" @click="page = p.i">
                  {{ wellFormed(p.i) }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Material's General Information -->
        <section class="mt-4 vstack gap-3 pb-5" v-if="page == 'description'">
          <h5 class="fw-semibold mb-0">General Information</h5>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label text-muted">Type</label>
              <input type="text" class="form-control" :value="wellFormed(selectedBook.item_type?.name) || 'Unknown'" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label text-muted">Call Number</label>
              <input type="text" class="form-control" :value="selectedBook.call_number || 'Unknown'" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label text-muted">Language</label>
              <input type="text" class="form-control" :value="selectedBook.language?.name || 'Unknown'" readonly />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label text-muted">ISBN/ISSN</label>
              <input type="text" class="form-control" :value="selectedBook.isbn_issn || 'Unknown'" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label text-muted">Edition</label>
              <input type="text" class="form-control" :value="selectedBook.edition || 'Unknown'" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label text-muted">Date Added</label>
              <input type="text" class="form-control" :value="formatDate(selectedBook.created_at) || 'Unknown'" readonly />
            </div>
          </div>

          <hr />

          <h5 class="fw-semibold mb-0">Publication Details</h5>
          <div class="row g-3">
            <div class="col-md-8">
              <label class="form-label text-muted">Publisher</label>
              <input type="text" class="form-control" :value="selectedBook.publisher?.name || 'Unknown'" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label text-muted">Year Published</label>
              <input type="text" class="form-control" :value="selectedBook.year_published || 'Unknown'" readonly />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label text-muted">Place of Publication</label>
              <input type="text" class="form-control" :value="selectedBook.publisher?.publication || 'Unknown'" readonly />
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted">Address</label>
              <input type="text" class="form-control" :value="selectedBook.publisher?.address || 'Unknown'" readonly />
            </div>
          </div>

          <hr />

          <h5 class="fw-semibold mb-0">Location Details</h5>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label text-muted">Campus</label>
              <input type="text" class="form-control" :value="selectedBook.branch?.campus.name || 'Unknown'" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label text-muted">Branch</label>
              <input type="text" class="form-control" :value="selectedBook.branch?.name || 'Unknown'" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label text-muted">Address</label>
              <input type="text" class="form-control" :value="selectedBook.publisher?.address || 'Unknown'" readonly />
            </div>
          </div>
        </section>

        <section class="mt-4 vstack gap-3 pb-5" v-if="page == 'authors'">
          <h5 class="fw-semibold mb-0">Authors</h5>
          <div class="row g-3">
            <div class="col-md-12">
              <input type="text" class="form-control" :value="wellFormed(selectedBook.authors?.name) || 'Unknown'" readonly />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/axios";
import book_blank from "@/assets/book_blank.png";

import { formatDate, wellFormed } from "@/utilities/dataManipulation";

export default {
  props: {
    id: Number,
  },
  watch: {
    id() {
      this.fetchThisItem(this.id);
      this.page = "description";
    },
  },
  setup() {
    return {
      book_blank,
    };
  },
  data() {
    return {
      fetchingItem: false,
      selectedBook: [],
      page: "",
      pages: [{ i: "description" }, { i: "accession" }, { i: "authors" }],
    };
  },
  methods: {
    // Imported Methods
    formatDate,
    wellFormed,

    // Local Methods
    async fetchThisItem(id) {
      this.fetchingItem = true;
      try {
        const res = await api.get(`api/item/get/${id}`);
        this.selectedBook = res.data;
      } catch (e) {
        console.log(e.message);
      } finally {
        this.fetchingItem = false;
      }
    },

    reserve() {
      this.$emit("reserve", this.selectedBook);
    },
  },
};
</script>

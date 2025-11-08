<template>
	<div class="d-flex flex-column justify-content-start vh-100 w-100 bg-body-tertiary overflow-hidden">
		<nav class="w-100 d-flex justify-content-between align-items-center px-md-5 px-1 p-3">
			<!-- E-Libra Logo -->
			<div class="hstack gap-1">
				<img src="@/assets/logo.png" alt="ELibra Logo" width="50" height="auto" />
				<h4 class="fw-bold text-prime">e-Libra</h4>
			</div>
			<router-link :to="{ name: 'landing' }" class="btn rounded-pill btn-outline-prime px-3"><i class="bi bi-house me-2"></i>Home</router-link>
		</nav>

		<!-- Main Body -->
		<div class="d-flex flex-column p-3 pt-0 pb-0 pb-md-2" style="height: fit-content !important">
			<div class="hstack justify-content-center gap-3 mb-3">
				<img src="@/assets/isu.png" alt="ISU Logo" width="40" height="auto" />
				<h4 class="text-prime fw-bolder m-0">ISU Online Public Access Catalogue</h4>
			</div>

			<div class="p-2 w-100 d-flex justify-content-center">
				<form @submit.prevent="fetchItems" class="w-100 hstack justify-content-center gap-2">
					<button type="button" class="filter btn btn-outline-secondary px-4 p-3 rounded-pill hstack gap-2" data-bs-toggle="modal" data-bs-target="#filters"><i class="bi bi-filter"></i><span>Filters</span></button>
					<input type="search" class="form-control shadow-sm border p-3 w-75 rounded-pill ps-4" id="search" placeholder="Search for materials" v-model="params.query" />
					<button type="submit" class="btn btn-prime me-3 px-5 p-3 rounded-pill d-none d-md-block" @click="fetchItems()">Search</button>
				</form>
			</div>
		</div>

		<div class="hstack w-100 h-100 px-3 py-2 gap-2 overflow-hidden">
			<!-- List of Items -->
			<div class="card w-100 h-100 shadow-sm">
				<div class="card-header hstack justify-content-between">
					<h5 class="mb-0"><i class="bi bi-list me-3"></i>Material List</h5>
					<button class="btn btn-outline-secondary rounded-pill" @click="reset"><i class="bi bi-arrow-clockwise me-2"></i>Refresh</button>
				</div>

				<div class="card-body overflow-auto list-group p-0 rounded-0">
					<div class="hstack justify-content-center h-100" v-if="fetchingItems"><img src="@/assets/spinner.gif" alt="" width="75" /></div>

					<div class="hstack justify-content-center h-100" v-else-if="books && books?.length <= 0">No Data to show.</div>
					<button v-for="(book, index) in books" type="button" class="d-flex align-items-center list-group-item list-group-item-action" :key="book.id" @click="selectThis(book)" data-bs-toggle="modal" data-bs-target="#viewItem">
						<div class="me-3 overflow-hidden shadow-sm hstack justify-content-center" style="border-radius: 2px; width: 35px; height: 50px">
							<img :src="book.picture || book_blank" alt="" width="100%" />
						</div>
						<div class="d-flex flex-column">
							<h6 class="fw-bold">{{ parseInt(index) + 1 }}. {{ book.title }}</h6>
							<small class="m-0 small">Campus: {{ book.campus }}</small>
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Search Filter -->
	<div class="modal fade" id="filters" data-bs-backdrop="static">
		<div class="modal-dialog modal-dialog-centered modal-md">
			<div class="modal-content">
				<div class="modal-header bg-prime text-white">
					<div class="modal-title hstack gap-2">
						<i class="bi bi-search me-3"></i>
						<h5 class="m-0">Search Filters</h5>
					</div>
					<button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body">
					<form class="d-flex flex-column text-start gap-3 h-100" @submit.prevent="fetchItems">
						<div class="d-flex flex-column">
							<label class="form-label">Campus</label>
							<select class="form-select" name="campus" id="campus" v-model="params.campus_id">
								<option value="">All</option>
								<option :value="c.name" selected v-for="c in campuses" :key="c.id">{{ c.name }}</option>
							</select>
						</div>
						<div class="d-flex flex-column">
							<label class="form-label">Type</label>
							<select class="form-select" name="type" id="type" v-model="params.type">
								<option value="">All</option>
								<option :value="t.id" selected v-for="t in item_types" :key="t.id">{{ t.name }}</option>
							</select>
						</div>
						<div class="d-flex flex-column">
							<label class="form-label">Section</label>
							<select class="form-select" name="section" id="section" v-model="params.section">
								<option value="">All</option>
							</select>
						</div>
						<div class="d-flex flex-column">
							<label class="form-label">Sort By</label>
							<select class="form-select" name="sortBy" id="sortBy" v-model="params.sort">
								<option value="title" selected>Title</option>
								<option value="year_published">Year Published</option>
								<option value="created_at">Date Added</option>
							</select>
						</div>
						<div class="d-flex flex-column">
							<label class="form-label">Order By</label>
							<select class="form-select" name="sortBy" id="sortBy" v-model="params.order">
								<option value="asc" selected>Ascending</option>
								<option value="desc">Descending</option>
							</select>
						</div>
						<div class="d-flex flex-column">
							<label class="form-label">Date Published</label>
							<div class="d-flex gap-2 p-1 align-items-center">
								<p class="mb-0">From</p>
								<select name="year" id="year" class="form-select" v-model="params.yearFrom">
									<option value="" selected>Select Year</option>
									<option v-for="year in yearRange" :key="year" value="year">{{ year }}</option>
								</select>

								<p class="mb-0">To</p>
								<select name="year" id="year" class="form-select" v-model="params.yearTo">
									<option value="" selected>Select Year</option>
									<option v-for="year in yearRange" :key="year" value="year">{{ year }}</option>
								</select>
							</div>
						</div>

						<div class="hstack gap-2">
							<button class="btn btn-prime mt-3 rounded-pill w-100" type="submit" data-bs-dismiss="modal">Apply</button>
							<button class="btn btn-outline-danger mt-3 rounded-pill w-100" type="button" @click="reset">Reset</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- Material's Information -->
	<div class="modal fade" id="viewItem" tabindex="-1"><information-page :data="selectedBook" @reserve="reserve()" /></div>
	<div class="modal fade" id="reserve" tabindex="-1" v-if="selectedBook"><reservation-page :bookId="selectedBook.id" :data="reservationDetails" /></div>
</template>

<script>
import api from "@/plugins/axios";
import book_blank from "@/assets/book_blank.png";
import InformationPage from "@/views/opac/InformationPage.vue";
import ReservationPage from "@/views/opac/ReservationPage.vue";

import { Modal } from "bootstrap";

export default {
	created() {
		this.fetchItems();
		this.fetchEverythingForFiltering();
	},
	components: { InformationPage, ReservationPage },
	setup() {
		return {
			book_blank,
		};
	},
	data() {
		return {
			fetchingItems: false,

			timer: null,
			params: {
				query: "",
				campus_id: "",
				type: "",
				sort: "title",
				order: "asc",
				section: "",
				yearFrom: "",
				yearTo: "",
			},

			books: [],
			campuses: [],
			item_types: [],
			reservationDetails: [],
			img: null,
			selectedBook: [],
			yearRange: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
		};
	},
	methods: {
		async fetchEverythingForFiltering() {
			try {
				const res = await api.get("api/all-c");
				this.campuses = res.data.data;

				const types = await api.get("api/item-type/get");
				this.item_types = types.data;
			} catch (e) {
				console.log(e.message);
			}
		},

		selectThis(book) {
			this.selectedBook = book;
			// console.log(this.selectedBook);
		},

		reset() {
			this.params.query = "";
			this.params.campus = "";
			this.params.sort = "title";
			this.params.type = "";
			this.params.order = "asc";
			this.params.section = "";
			this.params.yearFrom = "";
			this.params.yearTo = "";
			this.fetchItems();
		},

		async fetchItems() {
			this.books = null;
			this.fetchingItems = true;
			try {
				const res = await api.get("api/item/get", { params: { ...this.params, paginate: false } });
				this.books = res.data.data;
			} catch (e) {
				console.log(e.message);
			} finally {
				this.fetchingItems = false;
			}
		},

		reserve(args) {
			this.reservationDetails = args;
			console.log(args);

			this.$nextTick(() => {
				const modal = new Modal(document.getElementById("reserve"));
				modal.show();
			});
		},
	},
	watch: {
		"params.query"() {
			if (this.params.query === "") {
				this.fetchItems();
			}
		},

		"params.page"() {
			this.fetchItems();
		},
	},
};
</script>

<style scoped>
.form-label {
	margin-bottom: 8px !important;
}
</style>

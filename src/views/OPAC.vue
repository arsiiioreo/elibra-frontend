<template>
	<div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-white overflow-hidden">
		<div class="position-absolute top-0 start-0 w-100 h-100 gradient-bg"></div>

		<div class="card fade-in overflow-hidden" v-if="d.title" style="width: 85%; max-width: 1000px; height: 90vh; max-height: 90vh">
			<!-- Information Page -->
			<information-page :data="d" @back="d = {}" />
		</div>

		<!-- MAIN CARD -->
		<div class="card glass-card p-3 fade-in rounded-3 d-flex overflow-hidden" style="width: 85%; max-width: 1300px; height: 90vh; max-height: 90vh" v-else>
			<h4 class="fw-bold text-prime">
				<img src="@/assets/logo.png" alt="" width="50" height="50" />
				ISU Online Public Access Catalog - {{ campus.name }}
			</h4>

			<div class="hstack gap-3 h-100 overflow-hidden">
				<!-- Filters Section -->
				<div class="card h-100" style="width: 30%">
					<div class="card-header">Additional Filters</div>
					<div class="card-body vstack">
						<!-- Filters Directly Here -->
						<div class="filter-group down">
							<small class="fw-bold">Publication</small>

							<div class="filter-item">
								<label for="location"><i class="bi bi-map me-2"></i>Location</label>
								<input type="text" class="form-control" placeholder="Default" data-bs-toggle="modal" data-bs-target="#locationSelection" readonly />
							</div>

							<div class="filter-item">
								<label for="year"><i class="bi bi-calendar me-2"></i>Year Published</label>
								<div class="hstack gap-2">
									<label for="from">From</label>
									<select name="from" id="from" class="form-select" v-model="params.year_from">
										<option value="">Default</option>
										<option v-for="y in fromYear" :key="y" :value="y">{{ y }}</option>
									</select>
									<label for="to">To</label>
									<select name="to" id="to" class="form-select" v-model="params.year_to">
										<option value="">Default</option>
										<option v-for="y in yearRange" :key="y" :value="y">{{ y }}</option>
									</select>
								</div>
							</div>
						</div>

						<hr />

						<div class="filter-group down">
							<small class="fw-bold">Organize</small>
							<div class="filter-item">
								<label for="type"><i class="bi bi-list me-2"></i>Material Type</label>
								<select name="type" id="type" class="form-select" v-model="params.type">
									<option value="" v-if="item_types.length == 0">Loading item types, please wait...</option>
									<option value="" v-else>All</option>
									<option :value="i.id" v-for="(i, index) in item_types" :key="index" :selected="i.id">{{ i.name }}</option>
								</select>
							</div>
							<div class="filter-item">
								<label for="sort"><i class="bi bi-list me-2"></i>Sort By</label>
								<select name="sort" id="sort" class="form-select" v-model="params.sort">
									<option value="title">Title</option>
									<option value="year_published">Year Published</option>
								</select>
							</div>
							<div class="filter-item">
								<label for="order"><i class="bi bi-arrow-up me-2" v-if="params.order == 'asc'"></i><i class="bi bi-arrow-down me-2" v-else></i>Order</label>
								<select name="order" id="order" class="form-select" v-model="params.order">
									<option value="asc">Ascending</option>
									<option value="desc">Descending</option>
								</select>
							</div>
						</div>

						<div class="ms-auto mt-auto hstack gap-2">
							<button class="btn btn-outline-danger" @click="resetFilters">Reset</button>
							<button class="btn btn-outline-prime" @click="fetchItems">Apply</button>
						</div>
					</div>
				</div>

				<!-- Main Tab -->
				<div class="w-100 card h-100 overflow-hidden">
					<div class="card-header">Materials Table</div>
					<div class="card-body d-flex flex-column overflow-auto h-100">
						<!-- Search -->
						<div class="row g-0 mb-3">
							<div class="ms-auto hstack gap-2">
								<div class="w-100 position-relative">
									<div class="position-absolute top-100 start-0 w-100 shadow-sm border border-success rounded bg-light z-3 mt-2" v-show="dropDownRecentSearches" @mousedown.prevent>
										<div class="text-muted p-3 fw-bold small"><i class="bi bi-arrow-clockwise me-1 small"></i> Recent Searches</div>
										<div class="text-muted p-5 text-center small" v-if="recentSearches.length === 0">No recent searches.</div>
										<div class="hstack dropdown-item p-2 ps-3" v-for="(p, index) in recentSearches" :key="index" @mousedown.prevent="selectRecent(p)" style="cursor: pointer">
											<p class="mb-0 me-auto">{{ p.query }}</p>
											<small class="text-muted small">{{ timeAgo(p.time) }}</small>
											<button type="button" class="btn small" @mousedown.stop.prevent="removeRecent(p)">
												<i class="bi bi-x"></i>
											</button>
										</div>
									</div>

									<input type="text" class="form-control" placeholder="Search" autocomplete="off" v-model="params.query" @focus="dropDownRecentSearches = true" @click="dropDownRecentSearches = true" @blur="handleBlur" @keyup.enter="performSearch" />

									<button
										class="btn position-absolute end-0 bottom-0"
										v-if="params.query"
										@click="
											params.query = '';
											fetchItems();
										"
									>
										<i class="bi bi-x"></i>
									</button>
								</div>

								<button class="btn btn-prime" @click="performSearch"><i class="bi bi-search me-2"></i>Search</button>
								<button class="btn btn-outline-secondary" @click="refresh"><i class="bi bi-arrow-clockwise me-2"></i>Refresh</button>
							</div>
						</div>

						<!-- Table -->
						<div class="table-responsive border rounded bg-body-secondary overflow-auto h-100">
							<list-page :items="items" :loading="fetchingItems" @selectedItem="d = $event" @loadMore="loadMore()" :loadingMore="loading_more" :atLastPage="disable_load_more" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="modal fade" id="viewItem" tabindex="-1">
			<information-page :data="d" />
		</div> -->

		<footer class="text-center mt-4 small opacity-75 position-absolute bottom-0 end-0 start-0 mb-3">© {{ new Date().getFullYear() }} Isabela State University | e-Libra</footer>
	</div>

	<!-- Modals Here -->

	<!-- Modals -->
	<div class="modal fade" id="locationSelection" tabindex="-1">
		<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md">
			<div class="modal-content">
				<location-selection-modal />
			</div>
		</div>
	</div>

	<!-- Reservation Modal -->
	<div class="modal fade" id="reserveModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
		<ReservationPage :data="d" />
	</div>
</template>

<script>
import api from "@/plugins/axios";
import ListPage from "./opac/components/ListPage.vue";

// Modals
import LocationSelectionModal from "./opac/modals/LocationSelectionModal.vue";
import InformationPage from "./opac/components/InformationPage.vue";
import ReservationPage from "./opac/modals/ReservationPage.vue";

import { timeAgo } from "@/utilities/dataManipulation";
import { confirm } from "@/services/YesNoService";
import { item_types } from "@/utilities/selectOptions";

export default {
	name: "OPAC",
	components: { ListPage, LocationSelectionModal, InformationPage, ReservationPage },

	data() {
		return {
			campus: { name: "Echague" },
			recentSearches: [],
			dropDownRecentSearches: false,
			items: [],
			d: {},
			fetchingItems: false,

			// Data for loading more
			next_page: null,
			last_page: null,
			loading_more: false,
			disable_load_more: false,

			params: {
				query: "",
				campus_id: "",
				branch_id: "",
				section_id: "",
				year_to: "",
				year_from: "",
				sort: "title",
				order: "asc",
				type: "",
				page: 1,
			},

			// Need for filtering
			item_types: [],
			yearRange: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
			fromYear: Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i),
		};
	},

	methods: {
		timeAgo,
		performSearch() {
			this.saveRecentSearch(this.params.query);
			this.fetchItems();
			this.dropDownRecentSearches = false;
		},

		async loadMore() {
			this.loading_more = true;

			const i = await api.get("api/opac", { params: { ...this.params, page: this.next_page } });

			this.loading_more = false;
			this.items = [...this.items, ...i.data.data];
			this.last_page = i.data.last_page;

			this.next_page += 1;
		},

		async fetchItems() {
			this.fetchingItems = true;
			this.items = [];
			this.params.page = 1;
			try {
				const res = await api.get("api/opac", { params: { ...this.params } });

				this.next_page = 2;
				this.last_page = res.data.last_page;

				this.items = res.data.data;
			} catch (e) {
				console.error(e.message);
			}
			this.fetchingItems = false;
		},

		async fetchEverythingForFiltering() {
			this.item_types = item_types;
		},

		async refresh() {
			const ok = await confirm({ title: "Refresh", message: "This will remove all filters. Proceed?" });
			if (ok) {
				this.params = { query: "", campus_id: "", branch_id: "", section_id: "", year_to: "", year_from: "", sort: "title", order: "asc" };
				this.fetchItems();
			}
		},

		resetFilters() {
			this.params.to = "";
			this.params.from = "";
			this.params.sort = "title";
			this.params.order = "asc";
		},

		saveRecentSearch(query) {
			if (!query || !query.trim()) return;
			let stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
			stored = stored.filter((i) => i.query !== query);
			stored.unshift({ query, time: new Date().toISOString() });
			if (stored.length > 10) stored.pop();
			localStorage.setItem("recentSearches", JSON.stringify(stored));
			this.recentSearches = stored;
		},

		selectRecent(p) {
			this.params.query = p.query;
			this.performSearch();
		},

		async removeRecent(p) {
			const ok = await confirm({ title: "Remove?", message: `Remove ${p.query}?` });
			if (ok) {
				this.recentSearches = this.recentSearches.filter((i) => i !== p);
				localStorage.setItem("recentSearches", JSON.stringify(this.recentSearches));
			}
		},

		handleBlur() {
			setTimeout(() => {
				this.dropDownRecentSearches = false;
			}, 120);
		},
	},

	watch: {
		next_page() {
			if (this.next_page > this.last_page) {
				this.disable_load_more = true;
			}
		},
	},

	mounted() {
		this.recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
		this.fetchItems();
		this.fetchEverythingForFiltering();
	},
};
</script>

<style scoped>
.gradient-bg {
	background: radial-gradient(circle at top left, rgba(34, 215, 152, 0.4), transparent 40%), radial-gradient(circle at bottom right, rgba(129, 200, 31, 0.3), transparent 40%), #054a3d;
	filter: blur(30px);
	z-index: 0;
}

.glass-card {
	animation: float 5s ease-in-out infinite alternate;
}
.fade-in {
	animation: fadeIn 0.25s ease forwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes float {
	0% {
		transform: translateY(0px);
	}
	100% {
		transform: translateY(-10px);
	}
}

.filter-group {
	display: flex;
	flex-direction: column;
}
.filter-group small {
	margin-left: -0.5rem;
	margin-bottom: 0.5rem;
	font-weight: bold;
	color: #0eb55c;
}
.filter-item {
	display: flex;
	flex-direction: column;
	margin-bottom: 0.75rem;
}
.filter-item > label {
	margin-bottom: 0.75rem;
}
</style>

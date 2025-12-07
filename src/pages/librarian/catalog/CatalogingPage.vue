<template>
	<div class="w-100 h-100 vstack overflow-hidden">
		<div class="card w-100 mb-2" v-if="!showDetails">
			<div class="card-header">Data Management</div>
			<div class="card-body hstack gap-2 justify-content-end">
				<button class="btn btn-outline-secondary me-auto" data-bs-toggle="modal" data-bs-target="#catalogFilter"><i class="bi bi-sliders"></i> Filters</button>
				<input type="search" name="search" id="search" class="form-control w-50" placeholder="Search..." />
				<router-link :to="{ name: 'LibrarianAddNewCataloging' }" class="btn btn-outline-success">Add New Item</router-link>
				<button class="btn btn-outline-secondary" @click="fetchItems(true)"><i class="bi bi-clockwise"></i>Refresh</button>
			</div>
		</div>
		<div class="card w-100 h-100 overflow-hidden" v-if="!showDetails">
			<div class="card-header">
				<div class="hstack">All Library Items</div>
			</div>
			<div class="card-body overflow-auto p-0">
				<table class="table table-hover table-striped mb-0 text-center">
					<thead class="table-light">
						<tr>
							<th>No</th>
							<th>Title</th>
							<th>Year Published</th>
							<th>Call Number</th>
							<th>Item Type</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="fetching">
							<td colspan="6">Loading, please wait...</td>
						</tr>

						<tr v-else-if="data && data.length <= 0">
							<td colspan="6">No data found.</td>
						</tr>

						<tr class="clickable" v-else v-for="(d, index) in data" :key="d.id" @click="viewThisItem(d)">
							<td>{{ index + 1 }}</td>
							<td>{{ d.title }}</td>
							<td>{{ d.year_published }}</td>
							<td>{{ d.call_number }}</td>
							<td>{{ types[d.item_type].name }}</td>
							<td><button class="btn btn-sm btn-primary" @click="viewThisItem(d)">Full Details</button></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="card-footer hstack gap-2 justify-content-between">
				<!-- Pagination -->
				<div class="hstack gap-2" style="width: fit-content">
					<span>Show Page</span>
					<select name="page" id="page" class="form-select w-auto" v-model="params.page" @change="fetchItems">
						<option :value="i + 1" v-for="(v, i) in pages" :key="v">{{ v }}</option>
					</select>
				</div>
				<!-- Entries -->
				<div class="hstack gap-2" style="width: fit-content">
					<span>Show</span>
					<select name="page" id="page" class="form-select w-auto" v-model="params.entries" @change="fetchItems">
						<option value="25">25</option>
						<option value="75">75</option>
						<option value="150">150</option>
						<option value="250">250</option>
					</select>
					<span>entries</span>
				</div>
			</div>
		</div>
		<div class="card h-100 w-100" v-if="showDetails">
			<!-- <button class="btn btn-sm btn-primary" @click="showDetails = false">Back</button> -->
			<item-information :thisItem="selectedItem" @back="showItemDetails" />
		</div>
	</div>

	<div class="modal fade" id="addNewItem" data-bs-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
			</div>
		</div>
	</div>

	<!-- Catalog Filter -->
	<div class="modal fade" id="catalogFilter" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
		<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitleId">Catalog Filters</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<!-- Category Filter -->
					<div class="mb-3">
						<label for="filterCategory" class="form-label">Type</label>
						<select class="form-select" id="filterCategory">
							<option value="">All</option>
							<option :value="type.id" v-for="type in types" :key="type.id">{{ type.name }}</option>
						</select>
					</div>

					<!-- Price Range Filter -->
					<div class="mb-3">
						<label for="filterPrice" class="form-label">Price Range</label>
						<div class="d-flex gap-2">
							<input type="number" class="form-control" id="minPrice" placeholder="Min" />
							<input type="number" class="form-control" id="maxPrice" placeholder="Max" />
						</div>
					</div>

					<!-- Availability Filter -->
					<div class="mb-3">
						<label class="form-label">Availability</label>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" id="inStock" />
							<label class="form-check-label" for="inStock">In Stock</label>
						</div>
						<div class="form-check">
							<input class="form-check-input" type="checkbox" id="preOrder" />
							<label class="form-check-label" for="preOrder">Pre-order</label>
						</div>
					</div>

					<!-- Rating Filter -->
					<div class="mb-3">
						<label for="filterRating" class="form-label">Minimum Rating</label>
						<select class="form-select" id="filterRating">
							<option value="">Any</option>
							<option value="1">★ and up</option>
							<option value="2">★★ and up</option>
							<option value="3">★★★ and up</option>
							<option value="4">★★★★ and up</option>
						</select>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Apply</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ItemInformation from "./inventory/ItemInformation.vue";

import { showStatus } from "@/services/StatusService";
import { getItems, storage } from "@/stores/librarianCache";
import { item_types } from "@/utilities/selectOptions";

export default {
	created() {
		this.fetchItems();
	},
	components: { ItemInformation },
	data() {
		return {
			fetching: false,
			data: null,

			//   For viewing item details
			showDetails: false,
			selectedItem: null,
			types: item_types,

			params: {
				page: 1,
				entries: 25,
				paginate: true,
			},

			pages: null,
		};
	},
	methods: {
		showItemDetails(bool) {
			this.showDetails = bool;
		},

		viewThisItem(item) {
			this.showItemDetails(true);

			this.selectedItem = item;
		},

		async fetchItems(refresh = false) {
			this.fetching = true;
			if (refresh) storage.items = null;
			try {
				const res = await getItems(this.params);

				this.data = res.data;
				this.pages = res.last_page;
				console.log(this.data);
			} catch (e) {
				showStatus({ status: "error", title: "Error", message: e.message });
			} finally {
				this.fetching = false;
			}
		},
	},
};
</script>

<style scoped>
th:nth-child(2),
td:nth-child(2) {
	text-align: start;
}
</style>

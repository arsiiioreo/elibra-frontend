<template>
	<div class="w-100 h-100 vstack overflow-hidden">
		<div class="card w-100 mb-2" v-if="!showDetails">
			<div class="card-header">Data Management</div>
			<div class="card-body">
				<button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#addNewItem">Add New Item</button>
			</div>
		</div>
		<div class="card w-100 h-100 overflow-hidden" v-if="!showDetails">
			<div class="card-header">
				<div class="hstack gap-2 justify-content-between">
					All Library Items
					<button class="btn btn-outline-secondary" @click="fetchItems(true)"><i class="bi bi-clockwise"></i>Refresh</button>
				</div>
			</div>
			<div class="card-body overflow-auto p-0">
				<table class="table table-hover table-striped mb-0">
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
							<td>{{ d.item_type.name }}</td>
							<td><button class="btn btn-sm btn-primary" @click="viewThisItem(d)">Full Details</button></td>
						</tr>
					</tbody>
				</table>
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
</template>

<script>
import { showStatus } from "@/services/StatusService";
import { getItems, storage } from "@/stores/librarianCache";
import ItemInformation from "./inventory/ItemInformation.vue";

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

			params: {
				paginate: false,
			},
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
td:last-child {
	text-align: center;
}
</style>

<template>
	<div class="card w-100 p-3 shadow-sm mb-4" v-if="addItem">
		<div class="card-body">
			<h4 class="fw-bold mb-3 text-primary"><i class="bi bi-tags me-3"></i>Add New Item Type</h4>

			<form @submit.prevent="addItemType" class="d-flex gap-2">
				<input type="text" class="form-control" v-model.trim="itemType" placeholder="Enter new item type..." required />
				<button class="btn btn-success px-4" type="submit" :disabled="itemType.length < 2"><i class="bi bi-plus-circle me-2"></i>Add</button>
			</form>
		</div>
	</div>

	<div class="card shadow-sm w-100">
		<div class="card-header bg-light d-flex justify-content-between align-items-center">
			<h5 class="m-0 fw-bold text-secondary"><i class="bi bi-list-ul me-3"></i>Item Type List</h5>
			<button class="btn btn-outline-secondary btn-sm" @click="fetchRecord"><i class="bi bi-arrow-clockwise me-1"></i>Refresh</button>
		</div>

		<div class="card-body p-0">
			<table class="table table-hover align-middle mb-0">
				<thead class="table-light">
					<tr>
						<th style="width: 75px" class="text-center">#</th>
						<th class="text-start">Name</th>
						<th style="width: 250px" class="text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="!itemTypes || itemTypes.length === 0">
						<td colspan="3" class="text-center py-4 text-muted"><i class="bi bi-inbox"></i> No Data Found.</td>
					</tr>
					<tr v-for="(type, index) in itemTypes" :key="type.id">
						<td class="text-center">{{ index + 1 }}</td>
						<td class="text-start text-capitalize">{{ type.name }}</td>
						<td>
							<div class="hstack gap-2 justify-content-center">
								<button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editItemTypeModal" @click="startEdit(type)" v-if="!type.deleted_at"><i class="bi bi-pencil me-2"></i> Edit</button>
								<button class="btn btn-primary btn-sm" @click="restoreItemType(type)" v-else><i class="bi bi-arrow-counterclockwise"></i> Restore</button>
								<button class="btn btn-danger btn-sm" @click="deleteItemType(type)"><i class="bi bi-trash me-2"></i> Delete</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<!-- Edit Modal -->
	<div class="modal fade" id="editItemTypeModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content border-0 shadow">
				<div class="modal-header bg-primary text-white">
					<h5 class="modal-title"><i class="bi bi-pencil-square me-2"></i>Edit Item Type</h5>
					<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
				</div>
				<div class="modal-body p-4">
					<form @submit.prevent="updateItemType">
						<label class="form-label fw-bold">New Name</label>
						<input type="text" class="form-control" v-model.trim="editItemType.name" required />
						<div class="d-flex justify-content-end mt-4 gap-2">
							<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
							<button type="submit" class="btn btn-primary" :disabled="editItemType.name.length < 2" data-bs-dismiss="modal"><i class="bi bi-floppy me-1"></i> Save</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from "sweetalert2";
import { reactive } from "vue";
import { showLoading, hideLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { getRequest, postRequest, putRequest, deleteRequest } from "@/stores/requestService";
import { storage } from "@/stores/adminCache";
import { toTitleCase } from "@/utilities/dataManipulation";

export default {
	created() {
		this.fetchRecord();
	},
	computed: {
		itemTypes() {
			return storage.item_type;
		},
	},
	data() {
		return {
			itemType: "",
			addItem: false,
			editItemType: reactive({
				id: null,
				name: "",
				oldName: "",
			}),
		};
	},
	methods: {
		async fetchRecord() {
			showLoading({});
			try {
				const res = await getRequest("item-type/get");
				storage.item_type = res.data;
			} catch (err) {
				showStatus({ status: "error", title: "Error", message: "Failed to fetch data." });
			} finally {
				hideLoading();
			}
		},

		async addItemType() {
			const res = await Swal.fire({
				title: "Add Item Type",
				text: `Add "${this.itemType}" as a new item type?`,
				icon: "question",
				showCancelButton: true,
				confirmButtonColor: "green",
				confirmButtonText: "Yes, Add",
				cancelButtonText: "Cancel",
			});

			if (!res.isConfirmed) return;

			showLoading({ message: "Adding item type..." });
			try {
				const response = await postRequest("item-type/add", { name: this.itemType.toLowerCase() });
				if (response.data.status === "success") {
					storage.item_type.push(response.data.data); // Directly update list
					this.itemType = "";
					hideLoading();
					showStatus({ status: "success", title: "Success", message: "Item type added successfully!" });
				}
			} catch {
				showStatus({ status: "error", title: "Error", message: "Unable to add item type." });
			} finally {
				hideLoading();
			}
		},

		startEdit(type) {
			this.editItemType.id = type.id;
			this.editItemType.name = type.name;
			this.editItemType.oldName = type.name;
		},

		async updateItemType() {
			showLoading({ message: "Updating item type..." });
			try {
				const response = await putRequest("item-type/edit", {
					id: this.editItemType.id,
					name: this.editItemType.name.toLowerCase(),
				});
				if (response.data.status === "success") {
					const idx = storage.item_type.findIndex((i) => i.id === this.editItemType.id);
					if (idx !== -1) storage.item_type[idx].name = this.editItemType.name;
					showStatus({ status: "success", title: "Updated", message: "Item type updated successfully!" });
				}
			} catch {
				showStatus({ status: "error", title: "Error", message: "Unable to update item type." });
			} finally {
				hideLoading();
			}
		},

		async deleteItemType(type) {
			let res = null;

			if (type.deleted_at !== null) {
				res = await Swal.fire({
					icon: "warning",
					title: "Delete Item Type Permanently",
					text: `Are you sure you want to delete "${toTitleCase(type.name)}"? This will permanently delete the item type in the database.`,
					showCancelButton: true,
					confirmButtonText: "Yes, Delete permanently",
					reverseButtons: true,
				});
			} else {
				res = await Swal.fire({
					icon: "warning",
					title: "Delete Item Type",
					text: `Are you sure you want to delete "${toTitleCase(type.name)}"?`,
					showCancelButton: true,
					confirmButtonText: "Yes, Delete",
					reverseButtons: true,
				});
			}

			if (!res.isConfirmed) return;

			showLoading({ message: "Deleting item type..." });
			try {
				const response = await deleteRequest(`item-type/delete/${type.id}`);
				if (response.data.status === "success") {
					const idx = storage.item_type.findIndex((i) => i.id === type.id);
					if (type.deleted_at !== null) {
						storage.item_type = storage.item_type.filter((i) => i.id !== type.id);
					} else {
						if (idx !== -1) storage.item_type[idx].deleted_at = new Date();
					}
					showStatus({ status: "success", title: "Deleted", message: "Item type removed!" });
				}
			} catch {
				showStatus({ status: "error", title: "Error", message: "Failed to delete item type." });
			} finally {
				hideLoading();
			}
		},

		async restoreItemType(type) {
			const res = await Swal.fire({
				icon: "question",
				title: "Restore Item Type",
				text: `Do you want to restore "${type.name}"?`,
				showCancelButton: true,
				confirmButtonText: "Yes, Restore",
				reverseButtons: true,
			});

			if (!res.isConfirmed) return;

			showLoading({ message: "Restoring item type..." });
			try {
				const response = await putRequest(`item-type/restore/${type.id}`);
				if (response.data.status === "success") {
					const idx = storage.item_type.findIndex((i) => i.id === type.id);
					if (idx !== -1) storage.item_type[idx].deleted_at = null;
					showStatus({ status: "success", title: "Restored", message: "Item type restored!" });
				}
			} catch {
				showStatus({ status: "error", title: "Error", message: "Failed to restore item type." });
			} finally {
				hideLoading();
			}
		},
	},
};
</script>

<style scoped>
.table td,
.table th {
	vertical-align: middle;
}

.btn {
	width: 100px;
}
</style>

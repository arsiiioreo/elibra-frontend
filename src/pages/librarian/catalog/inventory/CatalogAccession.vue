<template>
	<div class="vstack w-100 h-100 overflow-auto">
		<!-- Accession Record -->
		<div class="table-container overflow-y-auto">
			<table class="table table-hover clickable text-center table-fixed">
				<thead class="position-sticky top-0 w-100 table-light">
					<tr>
						<th>Copy No.</th>
						<th>Accession Code</th>
						<th>Shelf Location</th>
						<th>Origin</th>
						<th>Date Added</th>
						<th class="text-center">Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(acc, index) in item" :key="acc.id" data-bs-toggle="modal" data-bs-target="#viewAccessionInfo" @click="selectedItem = acc">
						<td>{{ index + 1 }}</td>
						<td :class="acc.accession_number ?? 'text-muted'">{{ acc.accession_number || "Unassigned" }}</td>
						<td>{{ acc.shelf_location }}</td>
						<td>{{ `${acc.section.name}, ${acc.section.branch.name}` }}</td>
						<td>{{ formatShortDate(acc.created_at) }}</td>
						<td class="text-center">
							<span class="badge bg-secondary-subtle text-black d-flex align-items-center gap-1" style="width: fit-content">
								<span class="p-1 rounded-circle" :class="stat(acc.status).dot" style="height: 5px; width: 5px"></span>
								{{ stat(acc.status).text }}
							</span>
						</td>
						<td class="hstack gap-2">
							<button class="btn btn-sm btn-light border text-primary" data-bs-toggle="modal" data-bs-target="#viewAccessionInfo" @click="selectedItem = acc"><i class="bi bi-eye"></i></button>
							<button
								class="btn btn-sm btn-light border text-warning"
								data-bs-toggle="modal"
								data-bs-target="#viewAccessionInfo"
								@click="
									selectedItem = acc;
									editing = true;
								"
							>
								<i class="bi bi-pencil"></i>
							</button>
							<button class="btn btn-sm btn-light border text-danger"><i class="bi bi-trash"></i></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="modal fade" id="viewAccessionInfo" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
		<div class="modal-dialog modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitleId">Editing</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="row g-2">
						<div class="col-md-6">
							<label for="accession_number" class="form-label">Accession Number</label>
							<input type="text" class="form-control" :readonly="!editing" :value="selectedItem?.accession_number" placeholder="Enter Accession Number" />
						</div>
						<div class="col-md-6">
							<label for="accession_number" class="form-label">Shelf Location</label>
							<input type="text" class="form-control" :readonly="!editing" :value="selectedItem?.shelf_location" />
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { formatShortDate } from "@/utilities/dataManipulation";

export default {
	props: {
		item: Object,
	},

	data() {
		return {
			selectedItem: null,
			editing: false,
		};
	},

	methods: {
		formatShortDate,

		stat(status) {
			switch (status) {
				case "available":
					return {
						text: "Available",
						dot: "bg-prime",
					};
				case "reserved":
					return {
						text: "Reserved",
						dot: "bg-warning",
					};
				case "missing":
					return {
						text: "Missing",
						dot: "bg-danger",
					};
			}
		},
	},

	mounted() {
		const el = document.getElementById("viewAccessionInfo");

		el.addEventListener("shown.bs.modal", () => {
			console.log("Showing:", this.selectedItem);
		});

		el.addEventListener("hidden.bs.modal", () => {
			console.log("Hidden, showing:", this.selectedItem);
		});
	},
};
</script>

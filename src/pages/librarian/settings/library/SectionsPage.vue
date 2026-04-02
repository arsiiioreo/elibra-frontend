<template>
	<div class="vstack h-100 w-100">
		<div class="p-4 hstack justify-content-between">
			<div>
				<h5 class="fw-bold">Library Sections</h5>
				<p class="small mb-0">{{ `Here are the list of available sections in the  ${user?.librarian?.section?.branch?.name} of the Isabela State University.` }}</p>
			</div>
			<div class="hstack gap-2">
				<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewSection"><i class="bi bi-plus"></i>Add New</button>
				<button class="btn btn-outline-secondary" @click="fetchSections"><i class="bi bi-arrow-clockwise me-1"></i>Refresh</button>
			</div>
		</div>

		<div class="card-body p-3">
			<div class="h-100 w-100 hstack justify-content-center" v-if="loading">
				<img src="@/assets/spinner.gif" alt="" width="50" />
			</div>

			<div class="h-100 w-100 hstack justify-content-center gap-1" v-else-if="!sections">
				<i class="bi bi-building"></i>
				No sections listed in this branch. <a href="#" data-bs-toggle="modal" data-bs-target="#addNewSection">Add Now.</a>
			</div>

			<table class="table" v-else>
				<thead>
					<tr>
						<th>Name</th>
						<th>Date Added</th>
						<!-- <>Actions<//th> -->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(section, index) in sections" :key="index">
						<td>{{ section.name }}</td>
						<td>{{ formatDate(section.created_at) }}</td>
						<!-- <td class="hstack gap-2">
                            <button class="btn bg-light border">Edit</button>
                            <button class="btn bg-light border">Delete</button>
                        </td> -->
					</tr>
				</tbody>
			</table>
		</div>
		<!-- <div class="card rounded-0 h-100">
		</div> -->
	</div>

	<!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
	<div class="modal fade" id="addNewSection" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
		<div class="modal-dialog modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalTitleId">Add New Section</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form action="" class="vstack gap-3">
						<div class="row g-3">
							<div class="col-md-12">
								<label for="name" class="form-label">Name</label>
								<input type="text" class="form-control" placeholder="Enter section name" />
							</div>
						</div>
						<div class="hstack justify-content-end gap-2">
							<button type="button" class="btn btn-outline-secondary">Cancel</button>
							<button type="submit" class="btn btn-primary">Add</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";
import { getSections, storage } from "@/stores/librarianCache";
import { formatDate } from "@/utilities/dataManipulation";

export default {
	data() {
		return {
			user: null,
			sections: null,
			loading: false,
		};
	},

	methods: {
		formatDate,
		async fetchSections() {
			storage.section = null;
			this.loading = true;
			this.sections = await getSections();
			this.loading = false;
		},
	},

	async mounted() {
		this.user = await thisIsMe();
		this.sections = await getSections();
	},
};
</script>

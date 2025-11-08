<template>
	<nav class="hstack p-3 gap-2 border-bottom">
		<button class="btn btn-outline-secondary me-auto" @click="this.$emit('back', false)"><i class="bi bi-chevron-left"></i></button>
		<button class="btn btn-outline-primary">Update Information</button>
		<button class="btn btn-danger" @click="deleteItem(item?.title)">Delete</button>
	</nav>
	<div class="hstack p-2 h-100 overflow-hidden" v-if="item">
		<!-- Item Image -->
		<div class="h-100 p-3" style="max-width: 400px">
			<div class="border overflow-auto border-success rounded-2">
				<img :src="item.cover || book_blank" alt="Resource Cover" width="100%" height="auto" />
			</div>
		</div>
		<!-- Item Information -->
		<div class="vstack gap-1 w-100 h-100 px-2 p-3 overflow-auto">
			<h1 class="fw-bold">{{ item?.title }}</h1>
			<h5>{{ item?.publisher?.name || "-" }}</h5>

			<!-- General Information -->
			<div class="w-100 mt-4">
				<h5 class="text-primary"><i class="bi bi-exclamation-circle me-2"></i>Information</h5>
				<table class="table table-hover clickable">
					<tbody>
						<tr>
							<th>Title</th>
							<td>{{ item?.title || "Unknown" }}</td>
						</tr>
						<tr>
							<th>ISSN/ISBN</th>
							<td>{{ item?.isbn_issn || "-" }}</td>
						</tr>
						<tr>
							<th>Edition</th>
							<td>{{ item?.edition || "-" }}</td>
						</tr>
						<tr>
							<th>Call Number</th>
							<td>{{ item?.call_number || "-" }}</td>
						</tr>
						<tr>
							<th>Item Type</th>
							<td>{{ item?.item_type?.name || "-" }}</td>
						</tr>
						<tr>
							<th>Language</th>
							<td>{{ item?.language?.name || "-" }}</td>
						</tr>
						<tr>
							<th>Date Added</th>
							<td>{{ formatDate(item?.created_at) || "-" }}</td>
						</tr>
						<tr>
							<th>Last Modified</th>
							<td>{{ formatDate(item?.updated_at) || "-" }}</td>
						</tr>
						<tr>
							<th>Date Deleted</th>
							<td>{{ formatDate(item?.deleted_at) || "-" }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Publication Information -->
			<div class="w-100 mt-4">
				<h5 class="text-primary"><i class="bi bi-buildings me-2"></i>Publication</h5>
				<table class="table table-hover clickable">
					<tbody>
						<tr>
							<th>Publisher</th>
							<td>{{ item?.publisher?.name || "-" }}</td>
						</tr>
						<tr>
							<th>Place of Publication</th>
							<td>{{ item?.publisher?.address || "-" }}</td>
						</tr>
						<tr>
							<th>Year Published</th>
							<td>{{ item?.year_published || "-" }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Author Information -->
			<div class="w-100 mt-4">
				<h5 class="text-primary"><i class="bi bi-feather me-2"></i>Authors</h5>
				<table class="table table-hover clickable">
					<tbody>
						<tr v-if="!authors">
							<td colspan="2">No Authors for this item</td>
						</tr>
						<tr v-else>
							<th>Author</th>
							<td>{{ item?.authors.name || "-" }}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Description -->
			<div class="w-100 mt-4">
				<h5 class="text-primary"><i class="bi bi-pen me-2"></i>Description</h5>
				<textarea class="form-control" name="description" id="description" style="max-height: 300px" v-model="item.remarks"></textarea>
			</div>
		</div>
	</div>

	<section v-else class="text-center py-5 text-muted">
		<i class="bi bi-book fs-1 mb-3 d-block opacity-50"></i>
		<p class="mb-0 fs-5">No item selected</p>
	</section>
</template>

<script>
import book_blank from "@/assets/book_blank.png";
import { confirm } from "@/services/YesNoService";
import { formatDate } from "@/utilities/dataManipulation";
// import Swal from "sweetalert2";

export default {
	name: "SelectedItemCard",
	props: {
		thisItem: { type: Object, default: null },
	},
	setup() {
		return { book_blank };
	},
	data() {
		return {
			item: this.thisItem || { remarks: "" },
		};
	},
	methods: {
		formatDate,
		deleteItem(item) {
			// const ans = Swal.fire({ title: "Delete", text: `Are you sure you want to delete ${item}?`, icon: "error", backdrop: true,  });
			const ans = confirm({ title: "Delete", message: `Are you sure you want to delete ${item}?` });
			if (ans) {
				console.log(ans);
			}
		},
	},
	watch: {
		item(newVal) {
			console.log("📘 Selected item:", newVal?.title || "(none)");
		},
	},
};
</script>

<style scoped>
th {
	width: 25%;
}
</style>

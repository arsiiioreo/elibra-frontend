<template>
	<div class="row overflow-y-auto h-100 p-3">
		<div class="col-lg-3">
			<img src="@/assets/book_blank.png" alt="" width="100%" class="border border-success p-2 rounded" />
		</div>
		<div class="col-lg-9">
			<div class="vstack w-100">
				<!-- General Information -->
				<div class="w-100 mt-4">
					<h5 class="text-primary"><i class="bi bi-exclamation-circle me-2"></i>Bibliography</h5>
					<table class="table table-hover clickable">
						<tbody>
							<tr>
								<th>Title</th>
								<td>{{ item?.title || "Unknown" }}</td>
							</tr>
							<tr v-if="item?.item_type === 'book' || item?.item_type === 'serial' || item?.item_type === 'periodical' || item?.item_type === 'electronic'">
								<th>ISSN/ISBN</th>
								<td>
									{{ item?.item_type === "book" ? item?.book?.isbn_issn : item?.item_type === "serial" ? item?.serial?.isbn_issn : item?.item_type === "periodical" ? item?.periodical?.isbn_issn : item?.item_type === "electronic" ? item?.electronic?.isbn_issn : "-" }}
								</td>
							</tr>
							<tr v-if="item?.item_type === 'book'">
								<th>Category</th>
								<td>{{ categories[item?.book?.category]?.name || "-" }}</td>
							</tr>
							<tr>
								<th>Edition</th>
								<td>{{ item?.book?.edition || "-" }}</td>
							</tr>
							<tr>
								<th>Call Number</th>
								<td>{{ item?.call_number || "-" }}</td>
							</tr>
							<tr>
								<th>Item Type</th>
								<td>{{ item_types[item?.item_type]?.name || "-" }}</td>
							</tr>
							<tr>
								<th>Language</th>
								<td>{{ item?.language?.name || "-" }}</td>
							</tr>
							<tr v-if="item?.item_type === 'book'">
								<th>Pages</th>
								<td>{{ item?.book?.pages ? `${item?.book?.pages} page(s)` : "-" }}</td>
							</tr>
							<tr>
								<th>Description</th>
								<td>{{ item?.description || "-" }}</td>
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
								<th>Publisher Address</th>
								<td>{{ item?.publisher?.address || "-" }}</td>
							</tr>
							<tr>
								<th>Place of Publication</th>
								<td>{{ item?.place_of_publication || "-" }}</td>
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
					<h5 class="text-primary"><i class="bi bi-feather me-2"></i>Ownership</h5>
					<table class="table table-hover clickable">
						<tbody>
							<tr v-if="!item?.authors?.length">
								<td colspan="2">No Authors for this item</td>
							</tr>
							<tr v-else v-for="(a, index) in item?.authors" :key="a.id">
								<th>Owner {{ index + 1 }}</th>
								<td>
									{{ `${a.last_name}, ${a.first_name} ${a.middle_initial}` }} <span class="text-capitalize">({{ a.pivot.role }})</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- Description -->
				<div class="w-100 mt-4">
					<h5 class="text-primary"><i class="bi bi-pen me-2"></i>Additional Information</h5>
					<table class="table table-hover clickable">
						<tbody>
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
			</div>
		</div>
	</div>
</template>

<script>
import { formatDate } from "@/utilities/dataManipulation";
import { categories, item_types } from "@/utilities/selectOptions";
export default {
	props: {
		item: Object,
	},

	data() {
		return {
			categories: categories,
			item_types: item_types,
		};
	},

	methods: {
		formatDate,
	},
};
</script>

<style scoped>
th {
	width: 40%;
}
td {
	width: 60%;
}
</style>

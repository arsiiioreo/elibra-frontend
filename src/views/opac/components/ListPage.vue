<template>
	<table class="table table-hover mb-0 position-relative">
		<thead class="table-light position-sticky top-0">
			<tr>
				<th scope="col" style="width: 50%">Title</th>
				<th scope="col" style="width: 35%">Identifier</th>
				<th scope="col" class="text-center" style="width: 15%">Year Published</th>
			</tr>
		</thead>
		<tbody>
			<tr class="text-center" v-if="loading">
				<td class="loading" colspan="3">
					<img src="@/assets/spinner.gif" alt="" width="75" />
				</td>
			</tr>

			<tr class="text-center" v-else-if="items.length == 0">
				<td colspan="3" class="loading p-5">No material found.</td>
			</tr>

			<!-- <tr v-else class="" v-for="(item, index) in items" :key="index" data-bs-toggle="modal" data-bs-target="#viewItem" @click="$emit('selectedItem', item)" style="cursor: pointer"> -->
			<tr v-else class="" v-for="(item, index) in items" :key="index" @click="$emit('selectedItem', item)" style="cursor: pointer">
				<td scope="row">{{ index + 1 + ". " + item.title }}</td>
				<td>{{ item.call_number }}</td>
				<td class="text-center">{{ item.year_published }}</td>
			</tr>

			<tr v-if="atLastPage && items.length > 0" class="text-center">
				<td colspan="3" class="text-bg-success">You're already at the last page.</td>
			</tr>

			<tr v-else-if="!loading && items.length > 0" class="" style="cursor: pointer" @click="$emit('loadMore')">
				<td colspan="3" class="text-center" v-if="loadingMore">
					<img src="@/assets/spinner.gif" alt="" width="50" />
				</td>
				<td colspan="3" class="text-center text-bg-primary" v-else><i class="bi bi-arrow-clockwise me-2"></i>Load More</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: {
		atLastPage: Boolean,
		items: Array,
		loading: Boolean,
		loadingMore: Boolean,
	},
};
</script>

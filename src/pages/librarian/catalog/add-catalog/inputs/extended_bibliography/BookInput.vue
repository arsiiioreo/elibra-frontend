<template>
	<!-- ISBN / ISSN -->
	<div class="col-lg-4">
		<label for="isbn_issn" class="form-label required">ISBN/ISSN</label>
		<input type="text" class="form-control" id="isbn_issn" placeholder="Enter ISBN or ISSN" required :value="modelValue.isbn_issn" @input="updateInfo('isbn_issn', $event.target.value)" />
	</div>

	<!-- Category (if item_type == 1) -->
	<div class="col-lg-4">
		<label for="category" class="form-label required">Category</label>
		<select class="form-select" id="category" :value="modelValue.category" @change="updateInfo('category', $event.target.value)" required>
			<option value="" disabled>Select Category</option>
			<option v-for="value in categories" :key="value.id" :value="value.id">
				{{ value.name }}
			</option>
		</select>
	</div>

	<!-- Edition -->
	<div class="col-lg-4">
		<label for="edition" class="form-label">Edition</label>
		<input type="text" class="form-control" id="edition" placeholder="Enter Edition" :value="modelValue.edition" @input="updateInfo('edition', $event.target.value)" />
	</div>

	<!-- Pages -->
	<div class="col-lg-4">
		<label for="pages" class="form-label">Pages</label>
		<input type="text" class="form-control" id="pages" placeholder="Enter Pages" :value="modelValue.pages" @input="updateInfo('pages', $event.target.value)" />
	</div>
</template>

<script>
import { categories } from "@/utilities/selectOptions";

export default {
	props: {
		modelValue: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			categories: categories,
		};
	},
	methods: {
		updateInfo(key, value) {
			this.$emit("update:modelValue", {
				...this.modelValue,
				[key]: value,
			});
		},
	},
};
</script>

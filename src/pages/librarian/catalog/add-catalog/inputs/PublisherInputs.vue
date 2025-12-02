<template>
	<div class="row g-2 mb-5">
		<!-- Header -->
		<div class="vstack">
			<h5 class="fw-bold text-primary"><i class="bi bi-buildings me-2"></i>Publisher's Information</h5>
			<small class="text-muted">Please enter the correct details for the item's bibliography.</small>
		</div>

		<!-- Pulisher -->
		<div class="col-lg-9">
			<label for="publisher" class="form-label">Publisher</label>
			<input type="text" class="form-control" id="publisher" placeholder="Select publisher" :value="modelValue?.publisher?.name ?? 'Select publisher'" readonly required @click="$emit('toggle:modal', true)" />
		</div>

		<!-- Year of Publication -->
		<div class="col-lg-3">
			<label for="date_of_publication" class="form-label">Year of Publication</label>
			<input type="number" class="form-control" id="date_of_publication" placeholder="Enter year (1920-2025)" min="1920" max="2025" required @input="updateInfo('year', $event.target.value)" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		modelValue: {
			type: Object,
			required: true,
		},
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

<template>
	<div class="row g-2 mb-5">
		<!-- Header -->
		<div class="hstack justify-content-between align-items-start">
			<div class="vstack">
				<h5 class="fw-bold text-primary"><i class="bi bi-feather me-2"></i>Author's Information</h5>
				<small class="text-muted">Please enter the correct details for the item's authors.</small>
			</div>
			<button type="button" class="btn btn-outline-primary" @click="$emit('toggle:modal', true)"><i class="bi bi-person-plus me-2"></i>Add Author</button>
		</div>

		<div class="col-lg-12" v-if="modelValue.length === 0">
			<div class="alert alert-primary text-center" role="alert">No authors yet, add now.</div>
		</div>

		<!-- Authors Lists -->
		<div class="col-lg-4" v-else v-for="(a, i) in modelValue" :key="a.id">
			<label for="publisher" class="form-label">Author {{ i + 1 }}</label>
			<input type="text" class="form-control" id="publisher" placeholder="Select publisher" :value="a.name ?? 'Select publisher'" required readonly />
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

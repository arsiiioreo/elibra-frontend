<template>
	<div class="row g-2 mb-5">
		<!-- Header -->
		<div class="vstack">
			<h5 class="fw-bold text-primary"><i class="bi bi-geo-alt me-2"></i>Location's Information</h5>
			<small class="text-muted">Please enter the correct details for the item's authors.</small>
		</div>

		<!-- Campus -->
		<div class="col-lg-6">
			<label for="campus" class="form-label">Campus</label>
			<input type="text" class="form-control" id="campus" placeholder="No campus selected" :value="modelValue.campus.name ?? 'No campus, please login'" required readonly disabled />
		</div>

		<!-- Address -->
		<div class="col-lg-6">
			<label for="address" class="form-label">Address</label>
			<input type="text" class="form-control" id="address" placeholder="This campus has no address" :value="modelValue.campus.address ?? 'This campus has no address'" required readonly disabled />
		</div>

		<!-- Branch -->
		<div class="col-lg-6">
			<label for="branch" class="form-label">Branch</label>
			<input type="text" class="form-control" id="branch" placeholder="No branch selected" :value="modelValue.branch.name ?? 'No branch, please login'" required readonly disabled />
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

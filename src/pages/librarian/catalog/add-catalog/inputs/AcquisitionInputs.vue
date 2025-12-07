<template>
	<div class="row g-2 mb-5">
		<!-- Header -->
		<div class="vstack">
			<h5 class="fw-bold text-primary"><i class="bi bi-journal-arrow-down me-2"></i>Acquisition's Information</h5>
			<small class="text-muted">Please enter the correct details for the item's acquisition.</small>
		</div>

		<!-- Acquisition Mode -->
		<div class="col-lg-4">
			<label for="acquisition_mode" class="form-label">Acquisition Mode</label>
			<select name="acquisition_mode" id="" class="form-control" :value="modelValue.mode" @input="updateInfo('mode', $event.target.value)" required>
				<option value="" disabled selected>Select Acquisition Mode</option>
				<option :value="modelValue.id" v-for="(mode, index) in acquisition_modes" :key="index">{{ mode.name }}</option>
			</select>
		</div>

		<!-- Donor -->
		<div class="col-lg-4">
			<label for="donor" class="form-label">Donor</label>
			<input type="text" class="form-control" id="donor" placeholder="Enter Donor's Name" :value="modelValue.donor" @input="updateInfo('donor', $event.target.value)" required />
		</div>

		<!-- Acquisition Date -->
		<div class="col-lg-4">
			<label for="acquisition_date" class="form-label">Acquisition Date</label>
			<input type="date" class="form-control" id="acquisition_date" placeholder="Enter Acquisition's Date" :value="modelValue.date" @input="updateInfo('date', $event.target.value)" required />
		</div>

		<!-- Copies -->
		<div class="col-lg-4">
			<label for="copies" class="form-label">Quantity</label>
			<input type="number" class="form-control" id="copies" placeholder="Enter Copies" min="1" max="199" :value="modelValue.copies" @input="updateInfo('copies', Number($event.target.value))" required />
		</div>

		<!-- Price -->
		<div class="col-lg-4">
			<label for="price" class="form-label">Price</label>
			<input type="number" class="form-control" id="price" placeholder="Enter Price" min="0" :value="modelValue.price" @input="updateInfo('price', Number($event.target.value))" required />
		</div>

		<!-- Total -->
		<div class="col-lg-4" v-if="modelValue.copies && modelValue.price">
			<label for="total_price" class="form-label">Total Price</label>
			<input type="text" class="form-control text-end" id="total_price" :value="formattedTotal" readonly />
		</div>
	</div>
</template>

<script>
import { acquisition_modes } from "@/utilities/selectOptions";

export default {
	props: {
		modelValue: {
			type: Object,
			required: true,
		},
	},

	setup() {
		return {
			acquisition_modes,
		};
	},

	computed: {
		formattedTotal() {
			const total = (this.modelValue.copies || 0) * (this.modelValue.price || 0);
			return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(total);
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

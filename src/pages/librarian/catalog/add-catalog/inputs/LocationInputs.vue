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

		<!-- Section -->
		<div class="col-lg-6">
			<label for="section" class="form-label">Section</label>
			<select name="section" id="section" class="form-select" :value="modelValue?.section?.id" @change="updateInfo('section.id', $event.target.value)">
				<option value="" disabled selected>Select Section</option>
				<option :value="s.id" v-for="(s, index) in sections" :key="index">{{ s.name }}</option>
			</select>
		</div>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";
import { getRequest } from "@/stores/requestService";

export default {
	props: {
		modelValue: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			sections: [],
			me: null,
		};
	},

	methods: {
		updateInfo(path, value) {
			const keys = path.split(".");
			const updated = { ...this.modelValue };
			let pointer = updated;

			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];

				// Make sure nested object exists
				pointer[key] = pointer[key] ? { ...pointer[key] } : {};
				pointer = pointer[key];
			}

			pointer[keys[keys.length - 1]] = value;

			this.$emit("update:modelValue", updated);
		},

		async fetchSections() {
			const s = await getRequest(`sections/${this.me?.librarian?.section?.branch?.id}`);
			this.sections = s.data.data;
		},
	},

	async mounted() {
		this.me = await thisIsMe();
		if (this.me?.librarian?.section?.branch?.id) {
			this.fetchSections();
		}
		console.log(this.me);
	},
};
</script>

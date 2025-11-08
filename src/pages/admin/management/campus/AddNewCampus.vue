<template>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="m-0"><i class="bi bi-building me-2"></i> Add New Campus</h5>
				<button class="btn-close" data-bs-dismiss="modal"></button>
			</div>
			<div class="modal-body">
				<form class="vstack gap-3" @submit.prevent="addCampus">
					<div class="">
						<label class="mb-2" for="name">Campus Name</label>
						<input type="text" class="form-control" id="name" placeholder="Echague Campus" v-model="campus.name" required />
					</div>
					<div class="">
						<label class="mb-2" for="name">Campus Abbreviation</label>
						<input type="text" class="form-control" id="name" placeholder="ISU-AC" v-model="campus.abbrev" required />
					</div>
					<div class="">
						<label class="mb-2" for="name">Campus Address</label>
						<input type="text" class="form-control" id="name" placeholder="Full address of the Campus" v-model="campus.address" required />
					</div>
					<div class="hstack justify-content-end gap-2 mt-3">
						<button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
						<button type="submit" class="btn btn-success">Save</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { postRequest } from "@/stores/requestService";

export default {
	data() {
		return {
			campus: { name: "", abbrev: "", address: "" },
		};
	},
	methods: {
		async addCampus() {
			showLoading({ message: "Adding, please wait" });

			try {
				const res = await postRequest("addCampus", this.campus);
				if (res.data.status === "success") {
					showStatus({ status: "success", title: "Success", message: res.data.message });
				}
			} catch (e) {
				showStatus({ status: "error", title: "Failed", message: e.message });
			} finally {
				this.$emit("add:campus", this.campus);
			}
		},
	},
};
</script>

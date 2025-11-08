<template>
	<div class="h-100 w-100 overflow-hidden">
		<div class="card w-100 mb-2">
			<div class="card-header d-flex justify-content-between align-items-center">Data Management</div>

			<div class="card-body">
				<button class="btn btn-outline-primary ms-auto" data-bs-toggle="modal" data-bs-target="#createRequest">New Request</button>
			</div>
		</div>
		<div class="card w-100 h-100">
			<div class="card-header">
				<!-- <span>{{  }}</span> -->
				<ul class="nav nav-underline">
					<li class="nav-item" v-for="n in navs" :key="n" @click="active = n.name">
						<a class="nav-link" :class="{ active: active === n.name }" aria-current="page" href="#">{{ wellFormed(n.name) }}</a>
					</li>
				</ul>
			</div>
			<div class="card-body overflow-auto p-0">
				<AcquisitionRequestList v-if="active === 'requests'" />
			</div>
		</div>
	</div>

	<!-- Create Acquisition Request -->
	<div class="modal fade" id="createRequest" data-bs-backdrop="static">
		<create-request />
	</div>
</template>

<script>
import CreateRequest from "./acquisition/CreateRequest.vue";
import AcquisitionRequestList from "./acquisition/AcquisitionRequestList.vue";
import { wellFormed } from "@/utilities/dataManipulation";
import { getAcquisitionRequest } from "@/stores/librarianCache";
import { toast } from "@/services/ToastService";

export default {
	components: { CreateRequest, AcquisitionRequestList },
	setup() {
		return {
			wellFormed,
		};
	},
	data() {
		return {
			active: "requests",
			navs: [{ name: "requests" }, { name: "acquired" }, { name: "rejected" }],
			requests: null,
		};
	},
	methods: {
		async fetchAcquisitionRequests() {
			const res = await getAcquisitionRequest();
			try {
				if (res.status == "success") {
					this.requests = res.data;
				}
			} catch (e) {
				toast.error(e.message);
			}
		},
	},
};
</script>

<style scoped>
button.btn-success {
	transition: 0.2s ease;
}

button.btn-success:hover {
	transform: scale(1.03);
}
</style>

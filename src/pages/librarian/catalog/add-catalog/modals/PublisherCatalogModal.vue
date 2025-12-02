<template>
	<div class="modal-dialog modal-dialog-scrollable" role="document">
		<div class="modal-content">
			<!-- Add New User -->
			<div class="modal-body p-4" v-if="addNewPublisher">
				<div class="d-flex">
					<div class="vstack mb-3">
						<h5 class="fw-bold" id="modalTitleId">Add New Publisher</h5>
						<small>Please fill up the form with correct details.</small>
					</div>
					<button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="card">
					<div class="card-header hstack">
						<h6 class="mb-0"><i class="bi bi-person-add me-2"></i>Add New Publisher</h6>
						<button type="button" class="btn btn-sm btn-danger ms-auto" @click="resetNewPublisherInfo" :disabled="!newPublisher.name && !newPublisher.address"><i class="bi bi-arrow-clockwise me-2"></i>Reset Input</button>
					</div>
					<div class="card-body vstack">
						<form @submit.prevent="createNewPublisher">
							<div class="mb-3">
								<label for="publisher-name" class="form-label">Name</label>
								<input type="text" name="publisher-name" id="publisher-name" class="form-control" placeholder="Enter publisher's company name" v-model="newPublisher.name" />
							</div>
							<div class="mb-3">
								<label for="publisher-address" class="form-label">Address</label>
								<input type="text" name="publisher-address" id="publisher-address" class="form-control" placeholder="Enter publisher's company address" v-model="newPublisher.address" />
							</div>
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="" id="publisher-true" v-model="newPublisher.set" />
								<label class="form-check-label" for="publisher-true"> Set this as this item's publisher</label>
							</div>

							<div class="hstack justify-content-end gap-2 mt-4">
								<button type="button" class="btn btn-outline-danger" @click="addNewPublisher = false">Back</button>
								<button type="submit" class="btn btn-outline-primary" :disabled="!newPublisher.name || !newPublisher.address">Add</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<!-- Publisher List -->
			<div class="modal-body p-4" v-else>
				<div class="d-flex">
					<div class="vstack mb-3">
						<h5 class="fw-bold" id="modalTitleId">Select Publisher</h5>
						<small>Search and select if the publisher exists, if not, add publisher information.</small>
					</div>
					<button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="hstack gap-2 mb-4">
					<input type="text" id="publisher-search" class="form-control w-100" v-model="publisher_search" placeholder="Search for publishers..." />
					<button class="btn btn-outline-success">Search</button>
					<button class="btn btn-outline-primary" @click="aNP">Add New</button>
				</div>

				<div class="card" v-if="publisher_search && !addNewPublisher">
					<div class="card-header"><i class="bi bi-person me-2"></i>Publishers List</div>
					<div class="vstack justify-content-start">
						<img src="@/assets/spinner.gif" alt="Spinner" width="50" class="mx-auto" v-if="loading" />

						<div v-else-if="publishers.length">
							<div class="list-group">
								<a
									href="#"
									class="list-group-item list-group-item-action flex-column align-items-start"
									:class="[selectedPublisher?.id === p.id || selectedPublisherFromParent?.id === p?.id ? 'active text-white' : '']"
									aria-current="true"
									v-for="(p, index) in publishers"
									:key="p?.id"
									@click="
										selectedPublisher = p;
										selectedPublisherFromParent = null;
									"
								>
									<div class="d-flex w-100 justify-content-between">
										<h6 class="mb-1">{{ index + 1 }}. {{ p?.name }}</h6>
									</div>
									<small class="text-muted">{{ p?.address ?? "No address saved." }}</small>
								</a>
							</div>
						</div>

						<div class="text-center p-3" v-else>No publisher found? <a href="#" @click="aNP">Add Publisher</a></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary" @click="selectThisPublisher()" :disabled="!selectedPublisher?.id">Save</button>
			</div>
		</div>
	</div>
</template>

<script>
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { getRequest, postRequest } from "@/stores/requestService";
import { Modal } from "bootstrap";

export default {
	props: {
		d: Object,
		modalActive: Boolean,
	},
	mounted() {
		this.addNewPublisher = false;
	},
	data() {
		return {
			publisher_search: null,
			publishers: [],
			newPublisher: {
				name: "",
				address: "",
				set: true,
			},
			selectedPublisherFromParent: this.d,
			selectedPublisher: null,
			addNewPublisher: false,
			loading: false,
			timer: null,
		};
	},

	methods: {
		aNP() {
			this.addNewPublisher = true;

			this.newPublisher = {
				name: this.publisher_search,
			};

			this.publisher_search = "";
		},

		async searchPublisher() {
			this.loading = true;

			this.publishers = (await getRequest("publisher", { query: this.publisher_search })).data.data;
			this.loading = false;
		},

		selectThisPublisher() {
			this.$emit("selected:publisher", this.selectedPublisher);
			const el = Modal.getInstance(document.getElementById("publisherModal"));
			if (el) el.hide();
		},

		async createNewPublisher() {
			showLoading({ message: "Adding new publisher to the database" });
			const a = await postRequest("publisher/create", this.newPublisher);

			if (a.data.status === "success") {
				showStatus({ status: a.data.status, title: "Success", message: "Added successfully" });
				if (this.newPublisher.set) {
					this.selectedPublisher = a.data.data;
					this.selectThisPublisher();
				}
				this.resetNewPublisherInfo();
			} else {
				showStatus({ status: "error", title: "Error", message: "Added unsuccessfully" });
			}
		},

		resetNewPublisherInfo() {
			this.newPublisher = {
				name: "",
				address: "",
				set: false,
			};
		},
	},

	watch: {
		modalActive() {
			this.addNewPublisher = false;
		},

		publisher_search() {
			clearTimeout(this.timer);

			this.timer = setTimeout(() => {
				this.searchPublisher();
			}, 500);
		},
	},
};
</script>

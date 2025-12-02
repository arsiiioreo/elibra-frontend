<template>
	<div class="w-100 h-100 vstack overflow-x-hidden overflow-y-auto">
		<div class="row py-2">
			<div class="card col-md-12 col-lg-10 mx-auto">
				<div class="card-body">
					<form class="vstack p-3 pt-4" @submit.prevent="addNewItem">
						<div class="hstack align-items-start mb-5">
							<div class="d-flex flex-column align-items-start me-auto">
								<h1 class="fw-bold">Cataloging Form</h1>
								<p>Please fill all required fields with (<span class="text-danger">*</span>) mark.</p>
								<router-link class="btn btn-primary" :to="{ name: 'LibrarianCatalog' }">Return</router-link>
							</div>
							<img src="@/assets/logo.png" alt="" width="75" />
						</div>

						<!-- Item's Bibliography -->
						<BibliographyInputs v-model="item" />

						<!-- Item's Location -->
						<LocationInputs v-model="item" />

						<!-- Author's Bibliography -->
						<AuthorInputs v-model="item.authors" @toggle:modal="toggleModal('authorModal', $event)" />

						<!-- Publisher's Bibliography -->
						<PublisherInputs v-model="item" @toggle:modal="toggleModal('publisherModal', $event)" />

						<!-- Acquisition's Bibliography -->
						<AcquisitionInputs v-model="item.acquisition" />

						<div class="hstack gap-2 justify-content-end">
							<button class="btn btn-primary px-4">Add Item</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- Modals -->

	<!-- Author Modal -->
	<div class="modal fade" id="authorModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
		<AuthorsCatalogModal @selected:authors="item.authors = $event" :modalActive="modal.author" />
	</div>

	<!-- Publisher Modal -->
	<div class="modal fade" id="publisherModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
		<PublisherCatalogModal @selected:publisher="item.publisher = $event" :d="item?.publisher" :modalActive="modal.publisher" />
	</div>
</template>

<script>
import PublisherCatalogModal from "./add-catalog/modals/PublisherCatalogModal.vue";
import AuthorsCatalogModal from "./add-catalog/modals/AuthorsCatalogModal.vue";

import BibliographyInputs from "./add-catalog/inputs/BibliographyInputs.vue";
import LocationInputs from "./add-catalog/inputs/LocationInputs.vue";
import AuthorInputs from "./add-catalog/inputs/AuthorInputs.vue";
import PublisherInputs from "./add-catalog/inputs/PublisherInputs.vue";
import AcquisitionInputs from "./add-catalog/inputs/AcquisitionInputs.vue";

import { showLoading } from "@/services/LoadingService";
import { confirm } from "@/services/YesNoService";
import { postRequest } from "@/stores/requestService";
import { showStatus } from "@/services/StatusService";
import { thisIsMe } from "@/stores/auth";
import { Modal } from "bootstrap";

export default {
	components: { PublisherCatalogModal, AuthorsCatalogModal, BibliographyInputs, LocationInputs, AuthorInputs, AcquisitionInputs, PublisherInputs },
	data() {
		return {
			item: {
				title: "Crimson Academy",
				item_type: "",
				year_published: "",
				isbn_issn: "",
				language: "",
				category: "",
				call_number: "",
				remarks: "",
				pages: "",

				volume: "",
				issue: "",

				serial: {
					doi: "",
				},

				newspaper: {
					date: "",
					edition: "",
				},

				publisher: null,
				acquisition: {
					copies: "1",
					price: "",
				},

				authors: [],
				campus: [],
				branch: [],

				audio: {
					format: "",
					duration: {
						hours: "",
						minutes: "",
						seconds: "",
					},
					producer: "Default Produces",
				},

				academic: {
					advisor: "Desiray Nayga",
					researchers: [],
					program_id: "",
				},
			},

			modal: {
				publisher: false,
				author: false,
			},
		};
	},
	async mounted() {
		const a = await thisIsMe();

		this.item.campus = a.campus;
		this.item.branch = a.librarian.section.branch;

		const modalKeys = Object.keys(this.modal);

		modalKeys.forEach((key) => {
			const el = document.getElementById(`${key}Modal`);
			if (!el) return;

			el.addEventListener("shown.bs.modal", () => {
				this.modal[key] = true;
			});

			el.addEventListener("hidden.bs.modal", () => {
				this.modal[key] = false;
			});
		});
	},

	methods: {
		toggleModal(key, state) {
			const el = document.getElementById(key);
			if (!el) return;

			let modal = Modal.getInstance(el);

			// if no instance exists, create one
			if (!modal) modal = new Modal(el);

			// toggle
			state ? modal.show() : modal.hide();
		},

		async addNewItem() {
			const a = await confirm({ title: "Confirm Addition", message: "Please check your inputs if correct before proceeding" });

			if (a) {
				showLoading({ message: "Adding item, please wait..." });
				const b = await postRequest("item/add", {
					title: this.item.title,
					publisher_id: this.item.publisher.id,
					year_published: this.item.year_published,
					isbn_issn: this.item.isbn_issn,
					call_number: this.item.call_number,
					item_type: this.item.item_type,
					language_id: this.item.language,
					remarks: this.item.title,

					// Audio Parameters
					format: this.item.audio.format,
					duration: this.item.audio.duration.hours + ":" + this.item.audio.duration.minutes + ":" + this.item.audio.duration.seconds,
				});

				if (b.data.status === "success") {
					showStatus({ status: "success", title: "Success", message: "Item added successfully" });
				} else if (b.data.status === "error") {
					showStatus({ status: "error", title: "Error", message: b.data.message });
				}
			}

			console.log(this.item);
		},
	},

	watch: {
		"item.item_type"() {
			this.item.category = "";
		},
	},
};
</script>

<template>
	<div class="w-100 h-100 vstack overflow-x-hidden overflow-y-auto">
		<div class="row py-2">
			<div class="card col-md-12 col-lg-10 mx-auto">
				<div class="card-body">
					<form class="vstack p-3 pt-4" @submit.prevent="itemId ? updateItemInfo() : addNewItem()">
						<div class="hstack align-items-start mb-5">
							<div class="d-flex flex-column align-items-start me-auto">
								<h1 class="fw-bold">{{ itemId ? "Updating " + item.title : "Cataloging Form" }}</h1>
								<p>Please fill all required fields with (<span class="text-danger">*</span>) mark.</p>
								<button type="button" class="btn btn-primary" @click="goBack">Return</button>
							</div>
							<img src="@/assets/logo.png" alt="" width="75" />
						</div>

						<!-- Item's Bibliography -->
						<BibliographyInputs v-model="item" />

						<!-- Item's Location -->
						<LocationInputs v-model="item" v-if="!itemId" />

						<!-- Author's Bibliography -->
						<AuthorInputs v-model="item.authors" @toggle:modal="toggleModal('authorModal', $event)" />

						<!-- Publisher's Bibliography -->
						<PublisherInputs v-model="item" @toggle:modal="toggleModal('publisherModal', $event)" />

						<!-- Acquisition's Bibliography -->
						<AcquisitionInputs v-model="item.acquisition" />

						<div class="hstack gap-2 justify-content-end">
							<button type="submit" class="btn btn-primary px-4">{{ itemId ? "Update" : "Add Item" }}</button>
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

import { hideLoading, showLoading } from "@/services/LoadingService";
import { confirm } from "@/services/YesNoService";
import { getRequest, postRequest } from "@/stores/requestService";
import { showStatus } from "@/services/StatusService";
import { thisIsMe } from "@/stores/auth";
import { Modal } from "bootstrap";

export default {
	components: {
		BibliographyInputs,
		PublisherCatalogModal,
		AuthorsCatalogModal,
		LocationInputs,
		AuthorInputs,
		AcquisitionInputs,
		PublisherInputs,
	},

	data() {
		return {
			itemId: null,
			item: {
				title: "Book 1",
				publisher: null,
				call_number: "123456789",
				year_published: "2021",
				place_of_publication: "Isabela",
				item_type: "book",
				language: "",
				description: "Sample for Book",

				book: {
					isbn_issn: "123456789",
					category: "novel",
					edition: "1",
					pages: "100",
				},

				academic: {
					abstract: "",
					advisor: "Desiray Nayga",
					researchers: ["Reign Balico", "Eugene Tobias"],
					program_id: "",
					program: "",
				},

				audio: {
					format: "",
					duration: {
						hours: "",
						minutes: "",
						seconds: "",
					},
					producer: "Default Produces",
				},

				serial: {
					isbn_issn: "",
					volume: "",
					issue: "",
					pages: "",
					doi: "",
				},

				periodicals: {
					isbn_issn: "",
					volume: "",
					issue: "",
					pages: "",
				},

				electronics: {
					isbn_issn: "",
					file_size: "",
					access_url: "",
				},

				vertical: {
					organization: "",
					location: "",
					notes: "",
				},

				newspaper: {
					date: "",
					edition: "",
					pages: "",
				},

				authors: [],

				acquisition: {
					mode: "",
					date: "",
					dealer: "",
					remarks: "",

					copies: "",
					price: "",
					discount: "",
					net_price: "",
				},

				campus: [],
				branch: [],
				section: {
					id: "",
				},
			},

			modal: {
				publisher: false,
				author: false,
			},
		};
	},

	async mounted() {
		try {
			showLoading({ message: "Loading, please wait..." });
			const a = await thisIsMe();
			(this.itemId = null), (this.itemId = this.$route.params.id ?? null);

			if (this.itemId) {
				this.getToUpdate(this.itemId);
			}

			this.item.campus = a.campus;
			this.item.branch = a.librarian.section.branch;
			this.item.branch_id = a.librarian.section.branch.id;

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
		} finally {
			hideLoading();
		}
	},

	methods: {
		goBack() {
			this.$router.back();
		},
		toggleModal(key, state) {
			const el = document.getElementById(key);
			if (!el) return;

			let modal = Modal.getInstance(el);

			// if no instance exists, create one
			if (!modal) modal = new Modal(el);

			// toggle
			state ? modal.show() : modal.hide();
		},

		async getToUpdate(id) {
			showLoading({ message: "Fetching item information..." });
			try {
				const res = await getRequest(`item/get/${id}`);
				if (!res.data || !res.data.data) return;

				const q = res.data.data;

				document.title = `Updating ${q.title}`;

				this.item = {
					title: q.title ?? "",
					publisher: q.publisher ?? null,
					call_number: q.call_number ?? "",
					year_published: q.year_published ?? "",
					place_of_publication: q.place_of_publication ?? "",
					item_type: q.item_type ?? "",
					language: q.language.id ?? "",
					description: q.description ?? "",

					book: {
						isbn_issn: q.book.isbn_issn,
						category: q.book.category,
						edition: q.book.edition,
						pages: q.book.pages,
					},

					authors: q.authors ?? [],

					acquisition: {
						mode: q.acquisition?.[0].acquisition_mode,
						date: q.acquisition?.[0].acquisition_date,
						dealer: q.acquisition?.[0].dealer,
						description: q.acquisition?.[0].description,

						copies: q.acquisition?.[0].acquisition_lines.quantity,
						price: q.acquisition?.[0].acquisition_lines.unit_price,
						discount: q.acquisition?.[0].acquisition_lines.discount,
						net_price: q.acquisition?.[0].acquisition_lines.net_price,
					},

					campus: q.campus ?? [],
					branch: q.branch ?? [],

					section: {
						id: q.section?.id ?? "",
					},
				};

				console.log(`Category: ${q?.book?.category}`);

				console.log("Fetched item:", this.item);
			} catch (e) {
				console.error(e);
				showStatus({
					status: "error",
					title: "Error",
					message: "Failed to fetch item data",
				});
			}
			hideLoading();
		},

		getDefaultItem() {
			this.item = {
				title: "",
				publisher: null,
				call_number: "",
				year_published: "",
				place_of_pulication: "",
				item_type: "",
				language: "",
				description: "",

				book: {
					isbn_issn: "",
					category: "",
					edition: "",
					pages: "",
				},

				academic: {
					abstract: "",
					advisor: "Desiray Nayga",
					researchers: ["Reign Balico", "Eugene Tobias"],
					program_id: "",
					program: "",
				},

				audio: {
					format: "",
					duration: {
						hours: "",
						minutes: "",
						seconds: "",
					},
					producer: "Default Produces",
				},

				serial: {
					isbn_issn: "",
					volume: "",
					issue: "",
					pages: "",
					doi: "",
				},

				periodicals: {
					isbn_issn: "",
					volume: "",
					issue: "",
					pages: "",
				},

				electronics: {
					isbn_issn: "",
					file_size: "",
					access_url: "",
				},

				vertical: {
					organization: "",
					location: "",
					notes: "",
				},

				newspaper: {
					date: "",
					edition: "",
					pages: "",
				},

				authors: [],

				acquisition: {
					mode: "",
					date: "",
					dealer: "",
					remarks: "",

					copies: "",
					price: "",
					discount: "",
					net_price: "",
				},

				campus: [],
				branch: [],
				section: {
					id: "",
				},
			};
		},

		async updateItemInfo() {
			const a = await confirm({ title: "Confirm Update", message: "Please check your inputs if correct before proceeding" });

			if (a) {
				showLoading({ message: "Updating item, please wait..." });
				const payload = {
					title: this.item.title,
					publisher_id: this.item.publisher?.id,
					call_number: this.item.call_number,
					year_published: this.item.year_published,
					place_of_publication: this.item.place_of_publication,
					item_type: this.item.item_type,
					language_id: this.item.language,
					description: this.item.description,
					authors: this.item.authors,
					section_id: this.item.section.id,
				};

				if (this.item.item_type === "book") {
					payload.book = this.item.book;
				}

				payload.acquisition = {
					// Acquisition Parameters
					acquisition_mode: this.item.acquisition.mode,
					acquisition_date: this.item.acquisition.date,
					dealer: this.item.acquisition.dealer,
					acquisition_remarks: this.item.acquisition.remarks,

					copies: this.item.acquisition.copies,
					price: this.item.acquisition.price,
					discount: this.item.acquisition.discount,
					net_price: this.item.acquisition.net_price,
				};

				console.log(payload);

				const b = await postRequest(`item/update/${this.itemId}`, payload);

				if (b.data.status === "success") {
					showStatus({ status: "success", title: "Success", message: b.data.message });
					this.getDefaultItem();
					this.itemId = null;
					// this.$router.push({ name: "LibrarianCatalog" });
					this.$router.back();
				} else if (b.data.status === "error") {
					showStatus({ status: "error", title: "Error", message: b.data.message });
				}
			}
		},

		async addNewItem() {
			const a = await confirm({ title: "Confirm Addition", message: "Please check your inputs if correct before proceeding" });

			if (a) {
				showLoading({ message: "Adding item, please wait..." });
				const payload = {
					title: this.item.title,
					publisher_id: this.item.publisher.id,
					call_number: this.item.call_number,
					year_published: this.item.year_published,
					place_of_publication: this.item.place_of_publication,
					item_type: this.item.item_type,
					language_id: this.item.language,
					description: this.item.description,
					authors: this.item.authors,
					section_id: this.item.section.id,
				};

				if (this.item.item_type === "book") {
					payload.book = this.item.book;
				}

				payload.acquisition = {
					// Acquisition Parameters
					acquisition_mode: this.item.acquisition.mode,
					acquisition_date: this.item.acquisition.date,
					dealer: this.item.acquisition.dealer,
					acquisition_remarks: this.item.acquisition.remarks,

					copies: this.item.acquisition.copies,
					price: this.item.acquisition.price,
					discount: this.item.acquisition.discount,
					net_price: this.item.acquisition.net_price,
				};

				console.log(payload);

				const b = await postRequest("item/add", payload);

				if (b.data.status === "success") {
					showStatus({ status: "success", title: "Success", message: "Item added successfully" });
					this.$router.replace({ name: "LibrarianCatalog" });
				} else if (b.data.status === "error") {
					showStatus({ status: "error", title: "Error", message: b.data.message });
				}
			}

			// console.log(this.item);
		},

		computeNet() {
			const c = Number(this.acquisition.copies) || 0;
			const p = Number(this.acquisition.price) || 0;
			const d = Number(this.acquisition.discount) || 0;

			this.acquisition.net_price = c * p - d;
		},
	},

	watch: {
		item() {
			console.log(this.item);
		},
		"acquisition.copies": "computeNet",
		"acquisition.price": "computeNet",
		"acquisition.discount": "computeNet",
	},
};
</script>

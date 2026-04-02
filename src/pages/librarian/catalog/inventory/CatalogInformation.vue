<template>
	<div class="card h-100 w-100">
		<nav class="hstack p-3 gap-2">
			<div class="hstack gap-3 me-auto">
				<button class="btn btn-outline-secondary" @click="this.$router.push({ name: 'LibrarianCataloging' })"><i class="bi bi-chevron-left"></i></button>
				<h3 class="fw-bold mb-0">{{ item?.title }}</h3>
			</div>
		</nav>

		<div class="hstack h-100 overflow-hidden" v-if="item">
			<!-- Item Information -->
			<div class="vstack gap-1 w-100 h-100 overflow-hidden">
				<ul class="nav nav-pills gap-2 p-3 shadow-sm">
					<li class="nav-item" v-for="page in pages" :key="page" @click="selectedPage = page.id">
						<a class="btn btn-outline-primary rounded-pill" :class="[selectedPage === page.id ? 'active shadow' : ' border border-primary']" aria-current="page" href="#">{{ page.name }}</a>
					</li>

					<div class="hstack ms-auto gap-2">
						<router-link class="btn btn-outline-primary ms-auto rounded-pill" aria-current="page" :to="{ name: 'LibrarianAddNewCataloging', params: { id: item?.id } }" v-if="selectedPage === pages?.[0].id"><i class="bi bi-pencil me-2"></i>Update Information</router-link>
						<button class="btn btn-outline-primary ms-auto rounded-pill" data-bs-toggle="modal" data-bs-target="#addNewCopies" v-if="selectedPage === pages?.[1].id"><i class="bi bi-plus-circle me-2"></i>New Acquisition</button>
						<button class="btn btn-secondary rounded-pill" @click="getItem()"><i class="bi bi-arrow-clockwise me-1"></i>Refresh</button>
					</div>
				</ul>

				<CatalogBibliography :item="item" v-if="selectedPage === pages?.[0].id" />

				<CatalogAcquisition :item="item?.acquisition" v-if="selectedPage === pages?.[1].id" />

				<CatalogAccession :item="item?.accession" v-if="selectedPage === pages?.[2].id" />
			</div>
		</div>

		<section v-else class="text-center py-5 text-muted vstack h-100 justify-content-center align-items-center">
			<!-- <i class="bi bi-book fs-1 mb-3 d-block opacity-50"></i> -->
			<img src="@/assets/book-green.png" alt="" srcset="" width="75" />
			<p class="mb-0 fs-5">No item selected</p>
		</section>
	</div>

	<!-- Add New Copies Modal -->
	<div class="modal fade" id="addNewCopies" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true" data-bs-backdrop="static">
		<NewAcquisitionModal :item-id="selectedId" />
	</div>
</template>

<script>
import { hideLoading, showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { confirm } from "@/services/YesNoService";
// import { getItems } from "@/stores/librarianCache";
import { getRequest } from "@/stores/requestService";
import { formatDate } from "@/utilities/dataManipulation";
import { categories, item_types } from "@/utilities/selectOptions";

import book_blank from "@/assets/book_blank.png";
import CatalogBibliography from "./CatalogBibliography.vue";
import CatalogAcquisition from "./CatalogAcquisition.vue";
import CatalogAccession from "./CatalogAccession.vue";
import NewAcquisitionModal from "./NewAcquisitionModal.vue";

export default {
	name: "SelectedItemCard",
	props: {
		thisItem: { type: Object, default: null },
	},
	components: {
		CatalogBibliography,
		CatalogAcquisition,
		CatalogAccession,
		NewAcquisitionModal,
	},
	emits: ["back"],
	setup() {
		return { book_blank };
	},
	data() {
		return {
			selectedId: null,
			item: null,
			categories: categories,
			item_types: item_types,
			pages: {
				0: { id: "bibliography", name: "Bibliography" },
				1: { id: "acquisition", name: "Acquisition Record" },
				2: { id: "copies", name: "Copies" },
				3: { id: "citation", name: "Citation" },
			},
			selectedPage: "bibliography",
		};
	},
	methods: {
		formatDate,
		deleteItem(item) {
			// const ans = Swal.fire({ title: "Delete", text: `Are you sure you want to delete ${item}?`, icon: "error", backdrop: true,  });
			const ans = confirm({ title: "Delete", message: `Are you sure you want to delete ${item}?` });
			if (ans) {
				console.log(ans);
			}
		},
		async getItem() {
			try {
				showLoading({ message: "Fetching item info..." });
				const i = await getRequest(`item/get/${this.$route.params.id}`);
				// this.item = i.data.find((a) => Number(a.id) === Number(this.selectedId));
				this.item = i.data.data;
				hideLoading();
			} catch (e) {
				this.$router.replace({ name: "LibrarianCataloging" });
				showStatus({ status: "error", title: "Error", message: "An error has occured." });
			}
		},
	},
	async mounted() {
		let route = this.$route;
		let page = route.query.page;

		if (!route.params.id) {
			return this.$router.push({ name: "LibrarianCataloging" });
		} else {
			this.selectedId = route.params.id;
		}

		if (!page || page === "") {
			page = this.pages[0].id;
			this.$router.replace({ query: { ...this.$route.query, page: page } });
		}

		this.selectedPage = page;
		this.getItem();
	},
	watch: {
		selectedPage(val) {
			this.$router.replace({
				query: {
					...this.$route.query,
					page: val,
				},
			});
		},
	},
};
</script>

<style scoped>
th {
	width: 25%;
}
</style>

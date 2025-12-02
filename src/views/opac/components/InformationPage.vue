<template>
	<!-- Header -->
	<div class="card-header hstack gap-2">
		<button class="btn" @click="$emit('back')">
			<i class="bi bi-chevron-left"></i>
		</button>
		{{ d?.title || "Item" }}'s Details
	</div>

	<div class="modal-body text-center py-5 text-muted" v-if="!d || !d.id">
		<i class="bi bi-exclamation-circle display-6 d-block mb-3"></i>
		No information available.
	</div>

	<div class="card-body hstack overflow-hidden p-0">
		<div class="vstack overflow-hidden overflow-y-auto p-4">
			<div class="hstack mb-3">
				<div class="hstack justify-content-center w-auto me-2" style="height: 150px; width: 85px">
					<img :src="d?.picture || book_blank" alt="Book Cover" class="img-fluid rounded-3 border border-dark shadow-sm" style="height: 90%; max-width: auto; object-fit: cover; cursor: pointer" />
				</div>

				<div class="vstack p-2 align-items-start">
					<div class="ps-0">
						<p class="text-muted mb-2">{{ d?.item_type?.name }}</p>
						<h2 class="fw-bold">{{ d?.title || "Untitled Book" }}</h2>
						<p>{{ d?.remarks }}</p>
					</div>
					<div class="mt-auto mb-1 hstack gap-2">
						<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reserveModal"><i class="bi bi-book me-2"></i>Reserve</button>
					</div>
				</div>
			</div>

			<section class="vstack gap-3 pb-5">
				<div class="mb-3">
					<h6 class="fw-semibold mb-3 text-primary">General Information</h6>
					<div class="row p-0 g-3">
						<div class="col-md-6">
							<small class="fw-bold">Item Type</small>
							<span class="text-muted mb-2">{{ wellFormed(d?.item_type?.name) || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Call Number</small>
							<span class="text-muted mb-2">{{ d?.call_number || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Language</small>
							<span class="text-muted mb-2">{{ d?.language?.name || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">ISBN/ISSN</small>
							<span class="text-muted mb-2">{{ d?.isbn_issn || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Edition</small>
							<span class="text-muted mb-2">{{ d?.book?.edition || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Date Added</small>
							<span class="text-muted mb-2">{{ formatDate(d?.created_at) || "Unknown" }}</span>
						</div>
					</div>
				</div>

				<div class="mb-3">
					<h6 class="fw-semibold mb-3 text-primary">Publication Details</h6>
					<div class="row p-0 g-3">
						<div class="col-md-6">
							<small class="fw-bold">Publisher</small>
							<span class="text-muted mb-2">{{ wellFormed(d?.publisher?.name) || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Year Published</small>
							<span class="text-muted mb-2">{{ d?.year_published || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Place of Publication</small>
							<span class="text-muted mb-2">{{ d?.publisher?.address || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Address</small>
							<span class="text-muted mb-2">{{ d?.publisher?.address || "Unknown" }}</span>
						</div>
					</div>
				</div>

				<div class="mb-3">
					<h6 class="fw-semibold mb-3 text-primary">Item's Location Details</h6>
					<div class="row p-0 g-3">
						<div class="col-md-6">
							<small class="fw-bold">Campus</small>
							<span class="text-muted mb-2">{{ d?.accession?.[0]?.branch?.campus.name || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Library Branch</small>
							<span class="text-muted mb-2">{{ d?.accession?.[0]?.branch?.name || "Unknown" }}</span>
						</div>
						<div class="col-md-6">
							<small class="fw-bold">Address</small>
							<span class="text-muted mb-2">{{ d?.accession?.[0]?.branch?.campus?.address || "Unknown" }}</span>
						</div>
					</div>
				</div>

				<div class="mb-3">
					<h6 class="fw-semibold mb-3 text-primary">Authors</h6>
					<div class="row p-0 g-3">
						<div class="col-md-12" v-if="!d?.authors">
							<span class="text-muted mb-2">Unknown</span>
						</div>
						<div class="col-md-6" v-else v-for="(a, index) in d.authors" :key="index">
							<small class="fw-bold">Author {{ index + 1 }}</small>
							<span class="text-muted mb-2">{{ wellFormed(a.author?.name) }}</span>
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- Material's General Information -->
	</div>
</template>

<script>
import book_blank from "@/assets/book_blank.png";
import { wellFormed } from "@/utilities/dataManipulation";
import { formatDate } from "@/utilities/dataManipulation";

export default {
	props: {
		data: Object,
	},
	setup() {
		return { book_blank };
	},
	data() {
		return {
			d: this.data,
		};
	},

	methods: {
		wellFormed,
		formatDate,
	},
};
</script>

<style scoped>
section .row .col-md-6 {
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	align-self: stretch;
	gap: 0.5rem !important;
	border-bottom: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
}

/* Optional: subtle hover effect on image */
img {
	transition: all 0.3s ease;
}
img:hover {
	border: 1px solid black !important;
	transform: scale(1.02);
}
</style>

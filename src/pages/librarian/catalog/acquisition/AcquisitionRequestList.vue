<template>
	<!-- Loading Spinner -->
	<div v-if="fetching" class="text-center py-5">
		<div class="spinner-border text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
		<p class="mt-2 text-muted">Fetching data...</p>
	</div>

	<!-- Table -->
	<table v-else class="table table-hover align-middle mb-0">
		<thead class="table-light text-center">
			<tr>
				<th>#</th>
				<th>Title</th>
				<th>Unit Price</th>
				<th>Quantity</th>
				<th>Dealer</th>
				<th>Status</th>
				<th>Date Ordered</th>
				<th>Review</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(req, index) in acquisitionRequests" :key="req.id">
				<td class="text-center">{{ index + 1 }}</td>
				<td>{{ req.title }}</td>
				<td class="text-end">₱{{ req.estimated_unit_price.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
				<td class="text-center">{{ req.quantity }}</td>
				<td>{{ req.dealer }}</td>
				<td class="text-center">
					<span
						class="badge px-3 py-2 text-capitalize"
						:class="{
							'bg-warning text-dark': req.status === 'pending',
							'bg-success': req.status === 'approved',
							'bg-danger': req.status === 'rejected',
							'bg-info': req.status === 'request',
						}"
					>
						{{ wellFormed(req.status) }}
					</span>
				</td>
				<td class="text-center">{{ formatShortDate(req.date_ordered) }}</td>
				<td class="text-center">
					<button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#viewRequest" @click="reviewRequest(req)"><i class="bi bi-eye me-1"></i> Review</button>
				</td>
			</tr>
		</tbody>
	</table>

	<!-- Empty State -->
	<div v-if="!fetching && acquisitionRequests && acquisitionRequests.length === 0" class="text-center py-5 text-muted">
		<p>No acquisition requests found 😢</p>
	</div>

	<!-- AI Review Modal -->
	<div class="modal fade" id="viewRequest" tabindex="-1">
		<div class="modal-dialog modal-lg modal-dialog-scrollable">
			<div class="modal-content border-0 shadow-lg rounded-3">
				<div class="modal-header bg-primary text-white">
					<h5 class="mb-0"><i class="bi bi-book me-3"></i>Acquisition Request Details</h5>
					<button class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
				</div>

				<div class="modal-body">
					<!-- Request Info -->
					<div v-if="view">
						<div class="alert alert-light border-2" role="alert">
							<!-- Action Buttons -->
							<div class="hstack justify-content-end gap-2">
								<strong class="me-auto">Accept or Reject item request</strong>
								<button class="btn btn-danger" @click="updateStatus('rejected')"><i class="bi bi-x-circle me-2"></i>Reject</button>
								<button class="btn btn-success" @click="updateStatus('approved')"><i class="bi bi-check-circle me-2"></i>Grant</button>
							</div>
						</div>
						<h2>{{ view.title }}</h2>

						<h5 class="mb-2">Item Details</h5>

						<!-- Info Grid -->
						<div class="table-responsive mb-4">
							<table class="table table-sm table-borderless">
								<tbody>
									<tr>
										<th class="w-25 text-secondary">Author</th>
										<td>{{ view.author }}</td>
									</tr>
									<tr>
										<th class="text-secondary">Publisher</th>
										<td>{{ view.publisher }}</td>
									</tr>
									<tr>
										<th class="text-secondary">Edition</th>
										<td>{{ view.edition }}</td>
									</tr>
									<tr>
										<th class="text-secondary">Quantity</th>
										<td>{{ view.quantity }}</td>
									</tr>
									<tr>
										<th class="text-secondary">Unit Price</th>
										<td>₱{{ view.estimated_unit_price.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
									</tr>
									<tr>
										<th class="text-secondary">Expected Total</th>
										<td>₱{{ (view.estimated_unit_price * view.quantity).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
									</tr>
									<tr>
										<th class="text-secondary">Dealer</th>
										<td>{{ view.dealer }}</td>
									</tr>
									<tr>
										<th class="text-secondary">Date Ordered</th>
										<td>{{ formatShortDate(view.date_ordered) }}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- AI Review Section -->
						<div class="p-3 rounded bg-light border">
							<div class="d-flex justify-content-between align-items-center mb-2">
								<h6 class="fw-semibold mb-0"><i class="bi bi-stars me-1"></i>Recommendation</h6>
								<button class="btn btn-sm btn-outline-secondary" @click="generateAIReview(view)" :disabled="aiLoading">
									<i class="bi bi-arrow-repeat" v-if="aiLoading"></i>
									<span v-else>Re-run Analysis</span>
								</button>
							</div>

							<div v-if="aiLoading" class="text-center py-3 text-muted">
								<img src="@/assets/spinner.gif" alt="Loading" width="35" />
							</div>

							<div v-else-if="analyzed" class="text-dark">
								<div class="table-responsive mb-4">
									<table class="table table-sm table-borderless bg-none">
										<tbody>
											<tr>
												<td>Google Books</td>
												<td :class="aiReview.digital.status">
													<i
														class="bi me-2"
														:class="{
															'bi-check-circle': aiReview.digital.status === 'success',
															'bi-x-circle': aiReview.digital.status === 'error',
															'bi-hourglass-split': aiReview.digital.status === 'loading',
														}"
													></i>
													<i>{{ aiReview.digital.message }}</i>
												</td>
											</tr>

											<tr>
												<td>Crossref</td>
												<td :class="aiReview.physical.status">
													<i
														class="bi me-2"
														:class="{
															'bi-check-circle': aiReview.physical.status === 'success',
															'bi-x-circle': aiReview.physical.status === 'error',
															'bi-hourglass-split': aiReview.physical.status === 'loading',
														}"
													></i>
													<i>{{ aiReview.physical.message }}</i>
												</td>
											</tr>

											<tr>
												<td>OpenAlex</td>
												<td :class="aiReview.academic.status">
													<i
														class="bi me-2"
														:class="{
															'bi-check-circle': aiReview.academic.status === 'success',
															'bi-x-circle': aiReview.academic.status === 'error',
															'bi-hourglass-split': aiReview.academic.status === 'loading',
														}"
													></i>
													<i>{{ aiReview.academic.message }}</i>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<p class="text-muted fst-italic">{{ recommendationStatus }}</p>
							</div>

							<div v-else class="text-muted fst-italic">
								<p>No analysis yet. Click “Re-run Analysis” to evaluate this request.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { showStatus } from "@/services/StatusService";
import { getAcquisitionRequest } from "@/stores/librarianCache";
import { formatShortDate, wellFormed } from "@/utilities/dataManipulation";
import axios from "axios";

export default {
	name: "AcquisitionRequests",
	data() {
		return {
			acquisitionRequests: [],
			view: null,
			fetching: false,
			analyzed: false,
			aiReview: {
				digital: { status: "", message: "" },
				physical: { status: "", message: "" },
				academic: { status: "", message: "" },
			},

			aiLoading: false,
			recommendationScore: 0,
			recommendationStatus: "",
		};
	},

	setup() {
		return { wellFormed };
	},

	created() {
		this.requests();
	},

	methods: {
		formatShortDate,

		async requests() {
			this.fetching = true;
			try {
				this.acquisitionRequests = await getAcquisitionRequest();
			} catch (e) {
				showStatus({
					status: "error",
					title: "Error Fetching Requests",
					message: e.message || "Something went wrong while loading data.",
				});
			} finally {
				this.fetching = false;
			}
		},

		reviewRequest(req) {
			this.view = req;
			this.analyzed = false;
			this.recommendationScore = 0;
			this.recommendationStatus = "";
			this.aiReview = {
				digital: { status: "", message: "" },
				physical: { status: "", message: "" },
				academic: { status: "", message: "" },
			};
		},

		async generateAIReview(data) {
			this.aiLoading = true;
			this.analyzed = false;
			this.recommendationScore = 0;

			// Reset review structure
			this.aiReview = {
				digital: { status: "", message: "" },
				physical: { status: "", message: "" },
				academic: { status: "", message: "" },
			};

			try {
				// Prepare query for all APIs
				const query = `${data.title} ${data.author}`.trim().replace(/\s+/g, "+");

				// Immediately set loading indicators
				this.aiReview.digital.status = "loading";
				this.aiReview.digital.message = "Checking Google Books...";
				this.aiReview.physical.status = "loading";
				this.aiReview.physical.message = "Querying Crossref database...";
				this.aiReview.academic.status = "loading";
				this.aiReview.academic.message = "Analyzing academic presence...";

				// Fire all APIs in parallel
				const [google, crossref, openalex] = await Promise.allSettled([axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`), axios.get(`https://api.crossref.org/works?query=${query}`), axios.get(`https://api.openalex.org/works?filter=title.search:${query}`)]);

				// ========== GOOGLE BOOKS ==========
				if (google.status === "fulfilled") {
					const total = google.value.data.totalItems || 0;
					if (total > 0) {
						this.aiReview.digital.status = "success";
						this.aiReview.digital.message = "Possible match found in Google Books’ catalog.";
						this.recommendationScore += 1;
					} else {
						this.aiReview.digital.status = "error";
						this.aiReview.digital.message = "No matching item found in Google Books.";
					}
				} else {
					this.aiReview.digital.status = "error";
					if (google.reason?.response?.status === 429) {
						this.aiReview.digital.message = "Google Books API rate limit reached. Try again later.";
					} else {
						this.aiReview.digital.message = "Failed to reach Google Books API.";
					}
				}

				// ========== CROSSREF ==========
				if (crossref.status === "fulfilled") {
					const items = crossref.value.data?.message?.items || [];
					if (items.length > 0) {
						this.aiReview.physical.status = "success";
						this.aiReview.physical.message = "Possible bibliographic match found in Crossref.";
						this.recommendationScore += 1;
					} else {
						this.aiReview.physical.status = "error";
						this.aiReview.physical.message = "No bibliographic records found in Crossref.";
					}
				} else {
					this.aiReview.physical.status = "error";
					if (crossref.reason?.response?.status === 429) {
						this.aiReview.physical.message = "Crossref API rate limit reached. Try again later.";
					} else {
						this.aiReview.physical.message = "Failed to reach Crossref API.";
					}
				}

				// ========== OPENALEX ==========
				if (openalex.status === "fulfilled") {
					const results = openalex.value.data?.results || [];
					if (results.length > 0) {
						const first = results[0];
						this.aiReview.academic.status = "success";
						this.aiReview.academic.message = `Academic work found: “${first.display_name}” (${first.publication_year || "N/A"}).`;
						this.recommendationScore += 1;
					} else {
						this.aiReview.academic.status = "error";
						this.aiReview.academic.message = "No academic records found in OpenAlex.";
					}
				} else {
					this.aiReview.academic.status = "error";
					if (openalex.reason?.response?.status === 429) {
						this.aiReview.academic.message = "OpenAlex API rate limit reached. Try again later.";
					} else {
						this.aiReview.academic.message = "Failed to reach OpenAlex API.";
					}
				}

				// ========== FINAL RECOMMENDATION ==========
				if (this.recommendationScore >= 2) {
					this.recommendationStatus = "This item has strong indicators of digital and academic existence.";
				} else if (this.recommendationScore === 1) {
					this.recommendationStatus = "This item may exist in limited or partial catalogs. Further verification recommended.";
				} else {
					this.recommendationStatus = "This item might not exist digitally or academically. Check local or physical suppliers before approval.";
				}
			} catch (err) {
				console.error("AI Review failed:", err);
				this.aiReview = {
					digital: { status: "error", message: "AI analysis failed." },
					physical: { status: "error", message: "AI analysis failed." },
					academic: { status: "error", message: "AI analysis failed." },
				};
				this.recommendationStatus = "Unable to complete AI recommendation. Please try again.";
			} finally {
				this.aiLoading = false;
				this.analyzed = true;
			}
		},

		async updateStatus(status) {
			try {
				showStatus({
					status: "success",
					title: `Request ${status === "approved" ? "Granted" : "Rejected"}`,
					message: `The acquisition request has been ${status}.`,
				});
				this.view.status = status;
			} catch (e) {
				showStatus({
					status: "error",
					title: "Action Failed",
					message: e.message || "Could not update request status.",
				});
			}
		},
	},
};
</script>

<style scoped>
li strong {
	margin-right: 2rem;
}

.success {
	color: #28a745;
}
.error {
	color: #dc3545;
}
</style>

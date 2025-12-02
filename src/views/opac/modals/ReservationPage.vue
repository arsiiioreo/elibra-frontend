<template>
	<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md">
		<div class="modal-content border-0 shadow-lg rounded-3">
			<div class="modal-body p-4">
				<div class="hstack align-items-start justify-content-start">
					<div class="hstack justify-content-between mb-4">
						<div class="vstack justify-content-start align-items-start">
							<h4 class="fw-bold">{{ page === 1 ? "Reservation Page" : page === 2 ? "Select a Copy" : "Confirm Reservation" }}</h4>
							<small> {{ page === 1 ? "Login using your account to reserve an item from the libraries." : page === 2 ? "Select a " + data?.title + " variant to reserve." : "Please confirm and make sure the below details is correct." }} </small>
						</div>
					</div>
					<button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close" @click="changePage(1)"></button>
				</div>

				<div class="vstack">
					<div v-if="page === 1">
						<div class="mb-3">
							<label for="reservation_user" class="form-label">Username/ID Number/Email</label>
							<input type="text" id="reservation_user" class="form-control" autocomplete="new-password" />
						</div>
						<div class="mb-3">
							<label for="user-secret">Password</label>
							<input type="password" id="user-secret" name="user-secret" class="form-control" autocomplete="one-time-code" />
						</div>

						<div class="mt-3 vstack gap-3">
							<button class="btn btn-success" @click="changePage(2)">Login</button>
							<span class="text-center">Doesn't have an account yet? <router-link :to="{ name: 'register' }" class="text-success">Create an account</router-link></span>
						</div>
					</div>

					<div v-if="page === 2">
						<table class="table table-hover table-bordered text-center">
							<thead>
								<tr>
									<td>Copy No.</td>
									<td class="text-start">Accession Number</td>
									<td>Status</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in data?.accession" :key="item.id" style="cursor: pointer" @click="selectAccession(item)" :class="{ 'table-success': selectedAccession?.id === item.id }">
									<td>{{ index + 1 }}</td>
									<td class="text-start">{{ item.accession_number }}</td>
									<td class="text-capitalize">{{ item.status }}</td>
								</tr>
							</tbody>
						</table>

						<div class="hstack justify-content-end">
							<button class="btn btn-success" :disabled="!selectedAccession?.id" @click="changePage(3)">Confirm</button>
						</div>
					</div>

					<div v-if="page === 3">
						<div class="row g-2 mb-4">
							<small class="col-md-12 fw-bold text-success">Patron's Information</small>
							<div class="col-md-6 label">Name</div>
							<div class="col-md-6">{{ patron?.name }}</div>
							<div class="col-md-6 label">Email</div>
							<div class="col-md-6">{{ patron?.email }}</div>
							<div class="col-md-6 label">Patron Type</div>
							<div class="col-md-6 text-capitalize">{{ patron?.type }}</div>
							<div class="col-md-6 label">e-Borrower's Card</div>
							<div class="col-md-6">{{ patron?.ebc }}</div>
						</div>

						<div class="row g-2 mb-4">
							<small class="col-md-12 fw-bold text-success">Item's Information</small>
							<div class="col-md-6 label">Name</div>
							<div class="col-md-6">{{ data?.title }}</div>
							<div class="col-md-6 label">Accession Number</div>
							<div class="col-md-6">{{ selectedAccession?.accession_number }}</div>
							<div class="col-md-6 label">Price</div>
							<div class="col-md-6">{{ selectedAccession?.price || new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(0) }}</div>
						</div>
						<div class="hstack justify-content-end mt-3 gap-2">
							<button class="btn btn-danger" @click="changePage(2)">Back</button>
							<button class="btn btn-success">Confirm</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		bookId: Number,
		data: Object,
	},

	data() {
		return {
			page: 1,
			patron: {
				name: "Patron's Name",
				ebc: "ISUE-09560964897",
				type: "Student",
				email: "email@example.isu.edu.ph",
			},
			selectedAccession: null,
		};
	},

	methods: {
		changePage(n) {
			this.page = n;
		},

		selectAccession(item) {
			if (this.selectedAccession?.id == item.id) {
				this.selectedAccession = null;
			} else {
				this.selectedAccession = item;
			}
		},
	},
};
</script>

<style scoped>
.row .col-md-6 {
	border-bottom: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
	padding: 0.5rem;
}

.row .col-md-6.label {
	font-weight: bold;
}
</style>

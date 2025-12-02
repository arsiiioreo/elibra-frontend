<template>
	<div class="row">
		<div class="col-md-3 mb-4" v-for="(card, index) in cards" :key="index">
			<div class="card shadow-sm border h-100">
				<div class="card-body d-flex flex-column justify-content-between">
					<h6 class="text-capitalize mb-3">{{ card.title }}</h6>
					<div class="hstack w-100 gap-3 justify-content-between">
						<div class="me-3" :style="{ color: card.iconColor || '#0eb55c' }">
							<i :class="card.iconClass"></i>
						</div>
						<div class="d-flex justify-content-center align-items-center" v-if="fetching">
							<div class="spinner-border text-primary spinner-border-sm" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
						<h4 class="fs-2 fw-bold mb-0 text-end" v-else>{{ card.value }}</h4>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "OverviewComponent",
	props: {
		data: {
			type: Object,
			required: false,
			default: () => ({}),
		},
		fetching: Boolean,
	},
	computed: {
		cards() {
			return [
				{ title: "Total Campuses", value: this.data.campuses, iconClass: "bi bi-buildings-fill fs-1", iconColor: "blue" },
				{ title: "Total Users", value: this.data.users, iconClass: "bi bi-person-fill fs-1", iconColor: "green" },
				{ title: "Total Librarians", value: this.data.librarians, iconClass: "bi bi-currency-dollar fs-1", iconColor: "" },
				{ title: "Total Patrons", value: this.data.patrons, iconClass: "bi bi-chat-dots-fill fs-1", iconColor: "lightblue" },
			];
		},
	},
};
</script>

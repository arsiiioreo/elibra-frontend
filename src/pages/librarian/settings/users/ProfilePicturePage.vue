<template>
	<div class="row g-2">
		<div class="col-12 position-relative">
			<div class="position-absolute top-0 start-0 w-100 rounded-top" style="height: 7rem" :class="[user?.role == 0 ? 'bg-dark' : user?.role == 1 ? 'bg-info' : 'bg-prime']"></div>

			<!-- Profile picture (in front of banner) -->
			<div class="d-flex align-items-center mb-3 shadow-sm rounded-circle border position-relative" :class="[user?.pending_registration_approval == 1 ? 'border-info' : 'border-success']" style="width: 100px; height: 100px; z-index: 2; margin-top: 3rem; background: white">
				<img :src="user?.profile_picture" class="rounded-circle" style="width: 100%; height: 100%; object-fit: contain" />
				<span class="position-absolute bottom-0 end-0 me-2 badge bg-info rounded-circle p-1" title="Verified" v-if="user?.email_verified_at"><i class="bi bi-check fw-bold fs-5"></i></span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
};
</script>

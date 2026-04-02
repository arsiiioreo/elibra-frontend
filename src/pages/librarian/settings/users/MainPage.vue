<template>
	<div class="d-flex h-100 w-100 overflow-hidden border-top">
		<!-- Sidebar -->
		<aside class="border-end h-100" style="min-width: 250px">
			<ul class="nav nav-pills flex-column">
				<li class="nav-item" v-for="page in pages" :key="page.name">
					<RouterLink :to="page.to" class="nav-link p-4 text-dark rounded-0" active-class="bg-secondary-subtle">
						<i class="bi me-2" :class="page.icon"></i>
						{{ page.name }}
					</RouterLink>
				</li>
			</ul>
		</aside>

		<!-- Content -->
		<main class="h-100 flex-grow-1 overflow-auto bg-body-secondary">
			<RouterView />
		</main>
	</div>
</template>

<script>
export default {
	computed: {
		pages() {
			return [
				{ name: "Profile", icon: "bi-person-vcard", to: { name: "LibrarianSettingsUserProfile" } },
				{ name: "Account", icon: "bi-person-fill-lock", to: { name: "LibrarianSettingsUserAccount" } },
				{ name: "Profile Photos", icon: "bi-person-circle", to: { name: "LibrarianSettingsUserProfilePicture" } },
			];
		},
	},
};
</script>

<template>
	<div class="d-flex h-100 w-100 overflow-hidden border-top">
		<!-- Sidebar -->
		<aside class="border-end h-100" style="width: 250px">
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
		<main class="h-100 flex-grow-1 overflow-auto">
			<RouterView :user="user" />
		</main>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";

export default {
	data() {
		return {
			user: null,
		};
	},
	computed: {
		pages() {
			return [
				{ name: "Sections", icon: "bi-person-vcard", to: { name: "LibrarianSettingsLibrarySections" } },
				{ name: "Information", icon: "bi-building", to: { name: "LibrarianSettingsLibraryInformation" } },
			];
		},
	},

	async mounted() {
		this.user = await thisIsMe();
	},
};
</script>

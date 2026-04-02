<template>
	<div class="p-4">
		<div class="row g-3">
			<div v-for="setting in settings" :key="setting.name" class="col-md-6">
				<router-link :to="{ name: setting.path }" class="card h-100 border-0 shadow-sm text-decoration-none settings-card">
					<div class="card-body d-flex gap-3 align-items-start">
						<div class="icon-box">
							<i class="bi" :class="setting.icon"></i>
						</div>

						<div>
							<h6 class="mb-1 text-dark fw-semibold">
								{{ setting.name }}
							</h6>
							<p class="mb-0 text-muted small">
								{{ setting.description }}
							</p>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			settings: {
				user: { icon: "bi-person-gear", name: "User Settings", description: "Account info, security, and preferences", path: "LibrarianSettingsUser" },
				library: { icon: "bi-buildings", name: "Library Settings", description: "Library details, sections, and configurations", path: "LibrarianSettingsLibrary" },
				system: { icon: "bi-gear", name: "System Settings", description: "System setting and configuration.", path: "LibrarianSettingsSystem" },
			},
		};
	},
};
</script>

<style scoped>
.settings-card {
	transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.settings-card:hover {
	transform: translateY(-2px);
	background-color: #0eb55c;
	box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.18);
}

.settings-card:hover h6,
.settings-card:hover p {
	color: white !important;
}

.icon-box {
	width: 42px;
	height: 42px;
	border-radius: 0.5rem;
	background: var(--bs-secondary-bg);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--bs-secondary);
	font-size: 1.25rem;
}
</style>

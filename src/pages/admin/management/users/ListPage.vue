<template>
	<table class="table table-hover table-striped table-responsive overflow-auto align-middle table-bordered">
		<thead class="position-sticky top-0 mt-0">
			<tr class="p-0 m-0">
				<th class="tdh px-4">#</th>
				<th>Full Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Account Status</th>
			</tr>
		</thead>
		<tbody>
			<!-- show placeholder when loading -->
			<tr v-if="fetching">
				<td colspan="5">
					<p class="placeholder-glow mb-0">
						<span class="placeholder col-12"></span>
					</p>
				</td>
			</tr>

			<!-- show users -->
			<tr
				v-else-if="users && users.length"
				v-for="(user, index) in users"
				:key="user.id"
				@click="
					details(user.id);
					selectedUser(user);
				"
			>
				<td>{{ index + 1 }}</td>
				<td class="hstack gap-2">
					<div class="logo">
						<img :src="pfp" alt="" class="rounded-circle" style="width: 25px" />
					</div>
					<span>{{ `${user.last_name}, ${user.first_name} ${user.middle_initial ? user.middle_initial + "." : ""}` }}</span>
				</td>
				<td>{{ user.email }}</td>
				<td>{{ user.roleText || user.role || "Human" }}</td>
				<!-- <td>{{ user.status === "0" ? "Active" : user.status === "1" ? "For Approval" : "Inactive" }}</td> -->
				<td>
					<span class="badge bg-secondary-subtle text-black d-flex align-items-center gap-1" style="width: fit-content">
						<span class="p-1 rounded-circle" :class="stat(user).dot" style="height: 5px; width: 5px"></span>
						{{ stat(user).text }}
					</span>
				</td>
			</tr>

			<!-- show empty message -->
			<tr v-else>
				<td colspan="5" class="text-center text-muted py-3">No data to show.</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import pfp from "@/assets/logo.png";

export default {
	props: {
		users: Array,
		fetching: Boolean,
	},
	data() {
		return {
			pfp,
			data: [],
		};
	},

	methods: {
		details(id) {
			this.$emit("selected-id", id);
		},

		selectedUser(d) {
			this.$emit("selected:user", d);
		},

		stat(user) {
			if (user.pending_registration_approval === "1") {
				return {
					text: "Pending Approval",
					dot: "bg-primary",
				};
			} else {
				switch (user.status) {
					case "0":
						return {
							text: "Active",
							dot: "bg-prime",
						};
					case "1":
						return {
							text: "Expired",
							dot: "bg-danger",
						};
				}
			}
		},
	},
	mounted() {
		console.log(this.fetching);
	},
};
</script>

<style>
.tdh {
	width: 1%;
}

td:first-child,
th:first-child {
	text-align: center;
}
</style>

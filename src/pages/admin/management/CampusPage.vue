<template>
	<div class="hstack gap-3 h-100 align-items-center justify-content-start w-100">
		<div class="d-flex flex-column align-items-center justify-content-start text-dark h-100 w-100 gap-2 overflow-auto">
			<div class="card w-100" v-if="page === 1">
				<div class="card-header">Data Management</div>
				<div class="card-body hstack justify-content-between">
					<div class="btn-group">
						<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i class="bi bi-filter me-2"></i><span class="me-2">Sort</span></button>
						<ul class="dropdown-menu dropdown-menu-end" id="sortBtn" style="width: 300px">
							<div class="container vstack p-3 gap-2">
								<h6 class="fw-bold">Sort Option</h6>
								<div class="vstack gap-2">
									<label for="sort" class="m-0">Sort By:</label>
									<select name="sort" id="sort" class="form-select" v-model="params.sort" @change="fetchCampuses">
										<option value="">Sort By</option>
										<option value="name">Name</option>
										<option value="created_at">Date Added</option>
									</select>
								</div>
								<div class="vstack gap-2">
									<label for="order" class="m-0">Order By:</label>
									<select name="order" id="order" class="form-select" v-model="params.order" @change="fetchCampuses">
										<option value="">Order By</option>
										<option value="asc">Ascending</option>
										<option value="desc">Descending</option>
									</select>
								</div>
								<div class="vstack gap-2">
									<label for="status" class="m-0">Status:</label>
									<select name="status" id="status" class="form-select" v-model="params.status" @change="fetchCampuses">
										<option value="" selected>All</option>
										<option value="0">Inactive</option>
										<option value="1">Active</option>
									</select>
								</div>
								<div class="hstack justify-content-end gap-2 mt-2">
									<button class="btn btn-success" data-bs-dismiss="dropdown" @click="applySort">Apply</button>
								</div>
							</div>
						</ul>
					</div>
					<div class="hstack gap-2">
						<input type="search" class="form-control" v-model="params.query" placeholder="Search campus..." style="width: 350px" />
						<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewCampus"><i class="bi bi-building-add me-2"></i>Add Campus</button>
					</div>
				</div>
			</div>

			<div class="card w-100 h-100 overflow-auto">
				<!-- HEADER -->
				<div class="card-header hstack justify-content-between" v-if="page === 1">
					<h5 class="m-0"><i class="bi bi-building ms-2 me-3"></i>Campus List</h5>
					<div class="hstack gap-2">
						<button class="btn btn-outline-dark" style="width: 100px" @click="refresh()"><i class="bi bi-arrow-clockwise me-2"></i>Refresh</button>
					</div>
				</div>

				<div class="card-header p-3 hstack" v-else>
					<button class="btn btn-transparent" @click="goBack">
						<i class="bi bi-chevron-left"></i>
					</button>
					<h5 class="m-0"><i class="bi bi-building ms-2 me-3"></i>{{ selectedCampus.name }}</h5>
				</div>

				<!-- BODY -->
				<div class="card-body overflow-hidden position-relative p-0" style="height: 100%; min-height: 400px">
					<div
						class="slider-wrapper d-flex transition-all"
						:style="{
							transform: page === 1 ? 'translateX(0%)' : 'translateX(-100%)',
						}"
					>
						<!-- PAGE 1 -->
						<div class="page w-100 flex-shrink-0">
							<!-- TABLE -->
							<table class="table table-hover align-middle mb-0 table-bordered">
								<thead class="table-light">
									<tr>
										<th v-for="(col, i) in columns" :key="i" :style="col.style">
											{{ col.label }}
										</th>
									</tr>
								</thead>
								<tbody>
									<tr v-if="fetchingCampuses">
										<td :colspan="columnCount">
											<p class="placeholder-glow mb-0">
												<span class="placeholder col-12"></span>
											</p>
										</td>
									</tr>

									<tr v-else-if="campuses && campuses.length" v-for="(campus, index) in campuses" :key="campus.id">
										<td>{{ index + 1 }}</td>
										<td>{{ campus.abbrev }}</td>
										<td>{{ campus.name }}</td>
										<td>{{ campus.address }}</td>
										<td>
											<button class="btn btn-sm btn-primary" @click="goToDetails(campus)">Details</button>
										</td>
									</tr>

									<tr v-else class="text-center">
										<td :colspan="columnCount">No data to show.</td>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- PAGE 2 -->
						<div class="page w-100 flex-shrink-0">
							<ul class="nav nav-tabs gap-1">
								<li class="nav-item"><button class="nav-link" :class="{ active: infoPage == 1 }" @click="infoPage = 1">Campus Information</button></li>
								<li class="nav-item"><button class="nav-link" :class="{ active: infoPage == 2 }" @click="infoPage = 2">Branches</button></li>
								<li class="nav-item"><button class="nav-link" :class="{ active: infoPage == 3 }" @click="infoPage = 3">Departments</button></li>
							</ul>
							<div class="w-100 h-100 p-3">
								<div v-if="infoPage === 1">
									<CampusEditor :campus="selectedCampus" />
								</div>
								<div v-else-if="infoPage === 2">
									<CampusBranches :campus_id="selectedCampus?.id" />
								</div>
								<div v-else-if="infoPage === 3">
									<DepartmentPage :campus_id="selectedCampus?.id" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="modal fade" id="addNewCampus">
					<AddNewCampus @add:campus="addCampus" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchCampuses, storage } from "@/stores/adminCache";
import { getLabel, isEmpty } from "@/utilities/dataMap";
import { Modal } from "bootstrap";

import AddNewCampus from "./campus/AddNewCampus.vue";
import CampusEditor from "./campus/CampusEditorPage.vue";
import CampusBranches from "./campus/CampusBranchesPage.vue";
import DepartmentPage from "./campus/DepartmentPage.vue";

export default {
	components: { AddNewCampus, CampusEditor, CampusBranches, DepartmentPage },
	computed: {
		columnCount() {
			return this.columns.length;
		},
	},
	mounted() {
		this.fetchCampuses();
	},
	data() {
		return {
			page: 1,
			infoPage: 1,
			debounceTimer: null,
			selectedCampus: { name: null },
			columns: [{ label: "No.", style: "width: 75px" }, { label: "Code" }, { label: "Campus" }, { label: "Address" }, { label: "Action" }],
			params: {
				query: "",
				sort: "name",
				order: "asc",
				status: "",
			},
			fetchingCampuses: false,
			campuses: [],
		};
	},
	watch: {
		"params.query"() {
			clearTimeout(this.debounceTimer);

			this.debounceTimer = setTimeout(() => {
				this.fetchCampuses();
			}, 500);
		},
	},
	methods: {
		isEmpty,
		getLabel,

		refresh() {
			storage.campus = null;
			this.reset();
			this.fetchCampuses();
		},

		reset() {
			this.query = "";
			this.sort = "";
			this.order = "";
			this.status = "";
		},

		addCampus() {
			const modal = Modal.getInstance(document.getElementById("addNewCampus"));
			modal.hide();
			this.refresh();
		},

		async fetchCampuses() {
			this.fetchingCampuses = true;

			try {
				const res = await fetchCampuses(this.params);
				this.campuses = res.data;
			} catch (e) {
				this.fetchingCampuses = false;
				console.log(e);
			} finally {
				this.fetchingCampuses = false;
			}
		},

		goToDetails(campus) {
			this.selectedCampus = campus;
			this.page = 2;
		},
		goBack() {
			this.page = 1;
			this.infoPage = 1;
		},
	},
};
</script>

<style scoped>
th:first-child,
th:nth-child(5),
th:last-child,
td:first-child,
td:last-child {
	text-align: center;
	justify-content: center;
}

/* Sliding container */
.slider-wrapper {
	width: 100%; /* 2 pages side by side */
	transition: transform 0.15s cubic-bezier(0.2, 0, 0.1, 0.5);
}

.page {
	width: 100%;
	padding: 1rem 1rem;
}
</style>

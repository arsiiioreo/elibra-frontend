<template>
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content" style="height: 450px">
			<div class="modal-body p-4 vstack overflow-hidden">
				<div class="d-flex">
					<div class="vstack mb-3">
						<h5 class="fw-bold" id="modalTitleId">Add Author</h5>
						<small>Please fill up the form with correct details.</small>
					</div>
					<button type="button" class="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="hstack gap-2 mb-4">
					<div class="position-relative w-100">
						<input
							type="search"
							id="publisher-search"
							class="form-control w-100"
							v-model="query"
							placeholder="Search for author..."
							autocomplete="off"
							@focus="
								showQuerySuggestions = true;
								createNewAuthor = false;
							"
						/>

						<ul class="dropdown-menu w-100 position-absolute mt-2 overflow-y-auto" :class="{ show: showQuerySuggestions && query }" style="z-index: 5555; top: 100%; max-height: 200px">
							<li v-if="loading">
								<div class="dropdown-item hstack justify-content-center p-4">
									<img src="@/assets/spinner.gif" alt="Spinner" width="50" />
								</div>
							</li>

							<li v-else-if="authors.length < 1 && query">
								<div class="dropdown-item hstack justify-content-center p-4 text-center">No found author, add them now.</div>
							</li>

							<li v-for="a in authors" :key="a.id">
								<button
									class="dropdown-item hstack justify-content-between p-3"
									:disabled="isSelected(a)"
									@mousedown="
										if (!isSelected(a)) {
											selectedAuthors.push(a);
										}
										showQuerySuggestions = false;
									"
								>
									{{ a.name }}

									<i class="bi" :class="[isSelected(a) ? 'bi-check-circle-fill text-success' : 'bi-plus-circle']"></i>
								</button>
							</li>
						</ul>
					</div>

					<button class="btn btn-outline-success">Search</button>
					<button class="btn" :class="[createNewAuthor ? 'btn-danger' : 'btn-outline-primary']" @click="createNewAuthor = !createNewAuthor"><i class="bi me-2" :class="[createNewAuthor ? 'bi-x' : 'bi-person-add']"></i>{{ createNewAuthor ? "Close Form" : "New Author" }}</button>
				</div>

				<form @submit.prevent="" class="card mb-3" v-if="createNewAuthor">
					<div class="card-header">Create New Author</div>
					<div class="card-body">
						<form @submit.prevent="createAuthor">
							<label for="name" class="form-label required">Name</label>
							<div class="hstack gap-2">
								<input type="text" class="form-control" id="name" placeholder="Ex. Juan Dela Cruz" required v-model="newAuthor" />
								<button type="submit" class="btn btn-success"><i class="bi bi-plus"></i>Add</button>
							</div>
						</form>
					</div>
				</form>

				<div class="card h-100 overflow-hidden">
					<div class="card-header">Authors List</div>
					<div class="card-body p-0 d-flex overflow-hidden">
						<div class="my-auto mx-auto" v-if="selectedAuthors.length < 1">No authors yet, add one now.</div>

						<ol class="list-group list-group-numbered list-group-flush w-100 overflow-y-auto" v-else>
							<li class="list-group-item hstack justify-content-end border-bottom" v-for="a in selectedAuthors" :key="a?.id">
								<div class="ms-2 me-auto">{{ a?.name }}</div>
								<button class="btn btn-sm btn-danger" @click="deleteAuthor(a)"><i class="bi bi-trash"></i></button>
							</li>
						</ol>
					</div>
					<div class="card-footer text-end">
						<button class="btn btn-danger me-2" :disabled="selectedAuthors.length < 1" @click="selectedAuthors = []">Clear</button>
						<button class="btn btn-primary" :disabled="selectedAuthors.length < 1" @click="$emit('selected:authors', selectedAuthors)" data-bs-dismiss="modal">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";
import { confirm } from "@/services/YesNoService";
import { getRequest, postRequest } from "@/stores/requestService";

export default {
	props: {
		modalActive: Boolean,
	},
	data() {
		return {
			query: "",
			authors: [],
			selectedAuthors: [],
			newAuthor: null,

			loading: false,
			createNewAuthor: false,
			showQuerySuggestions: false,
			timer: null,
		};
	},

	methods: {
		isSelected(a) {
			return this.selectedAuthors.some((x) => x.id === a.id);
		},

		async searchAuthor() {
			this.loading = true;

			const a = await getRequest("author", { query: this.query });

			if (a.data.status === "success") {
				this.authors = a.data.data;
			}

			this.loading = false;
		},

		async createAuthor() {
			const a = await confirm({ title: "Add Author?", message: `Are you sure you want to add ${this.newAuthor} as an author?` });

			if (a) {
				showLoading({ message: "Adding author, please wait..." });
				const b = await postRequest("author/create", { name: this.newAuthor });

				if (b.data.status == "success") {
					this.selectedAuthors.push(b.data.data);
					showStatus({ status: "success", title: "Success", message: "Author added successfully!" });
				}
			}
		},

		async deleteAuthor(a) {
			const b = await confirm({ title: "Delete Author", message: `Are you sure you want to delete this ${a.name} from the list?` });

			if (b) {
				this.selectedAuthors = this.selectedAuthors.filter((c) => c.id !== a.id);
			}
		},
	},

	watch: {
		query() {
			if (this.query) {
				clearTimeout(this.timer);

				this.timer = setTimeout(() => {
					this.searchAuthor();
				}, 500);
			}
		},

		modalActive() {
			this.createNewAuthor = false;
			this.newAuthor = null;
		},
	},
};
</script>

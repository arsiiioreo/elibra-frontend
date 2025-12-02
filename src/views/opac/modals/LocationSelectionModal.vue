<template>
	<div class="modal-header">
		<h5 class="modal-title" id="modalTitleId">Select Location</h5>

		<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	</div>
	<div class="modal-body">
		<div class="vtsack mb-3">
			<!-- <small class="text-muted">Changing location details will change the materials list. Only those materials from your selected location will be shown.<span class="text-danger">*</span></small> -->
			<small class="text-muted"><span class="text-danger">Note. </span>Changing location details will change the materials list. Only those materials from your selected location will be shown.</small>
		</div>
		<div class="mb-3">
			<label for="campus" class="mb-2">Campus</label>
			<select name="campus" id="campus" class="form-select">
				<option value="">All</option>
			</select>
		</div>
		<div class="mb-3">
			<label for="branch" class="mb-2">Branch</label>
			<select name="branch" id="branch" class="form-select">
				<option value="">All</option>
			</select>
		</div>
		<div class="mb-3">
			<label for="section" class="mb-2">Section</label>
			<select name="section" id="section" class="form-select">
				<option value="">All</option>
			</select>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		<button type="button" class="btn btn-primary">Apply</button>
	</div>
</template>

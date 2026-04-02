<template>
	<div class="h-100 w-100 vstack overflow-hidden p-5">
		<div class="vstack mb-5">
			<h2 class="fw-bold">Circulation</h2>
			<small>View the history of item circulation in this secion.</small>
		</div>
		<div class="row h-100 g-2">
			<div class="col-md-6">
				<div class="card h-100">
					<div class="card-header">Circulation Record</div>
					<div class="card-body">
						<table class="table">
							<thead>
								<tr>
									<th>Accession Number</th>
									<th>Title</th>
									<th>Borrowed By</th>
									<th>Date Borrowed</th>
									<th>Expected Return</th>
									<th>Date Returned</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>29057029511</td>
									<td>Book of the damned.</td>
									<td>Reign</td>
									<td>December 15, 2025</td>
									<td>Betsie</td>
									<td>December 18</td>
									<td>Not Yet</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="col-md-6">
				<div class="card h-100 overflow-hidden">
					<div class="card-header">Circulation App</div>
					<div class="card-body overflow-hidden">
						<div class="hstack gap-2 w-100 mb-4">
							<button class="btn btn-secondary"><i class="bi bi-sliders me-1"></i>Filter</button>
							<input type="text" class="form-control" style="width: 100%" placeholder="Search by Title, Author, Accesssion Number" />
							<button class="btn btn-prime">Search</button>
						</div>
						<div class="p-4 bg-body-secondary h-100 text-center">No Data yet</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

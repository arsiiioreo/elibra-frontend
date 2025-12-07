<template>
	<section id="features" class="p-5 vh-100">
		<div class="mb-5 text-center">
			<h1 class="mx-auto text-prime fw-bold">{{ title }}</h1>
			<p>{{ description }}</p>
		</div>
		<div class="row g-5 justify-content-center mx-auto" style="width: 85%">
			<div class="col-lg-4" v-for="(card, index) in cardsData" :key="index">
				<div class="card h-100 text-center mx-auto" style="width: 250px">
					<div class="card-body">
						<img src="@/assets/logo.png" alt="" width="150" class="my-5" />
						<h4 class="fw-bold">{{ card.title }}</h4>
						<p>{{ card.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			title: "Features",
			description: "The system offers various features for users",
			cardsData: [
				{ title: "Admin", description: "Lorem ipsum docor donor getum ay di onoe." },
				{ title: "Librarian", description: "Lorem ipsum docor donor getum ay di onoe." },
				{ title: "Patron", description: "Lorem ipsum docor donor getum ay di onoe." },
			],
		};
	},
};
</script>

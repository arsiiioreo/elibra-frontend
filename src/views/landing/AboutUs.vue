<template>
	<section id="about" class="p-5">
		<h1 class="mx-auto text-prime fw-bold mb-5">{{ title }}</h1>
		<div class="row g-4 justify-content-center mx-auto w-75">
			<div class="col-md-3" v-for="(card, index) in cardsData" :key="index">
				<div class="card h-100 text-center" style="width: 250px">
					<div class="card-body">
						<img src="@/assets/logo.png" alt="" width="150" class="my-5" />
						<h4>{{ card.title }}</h4>
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
			title: "About Us",
			cardsData: [
				{ title: "Centralized", description: "Lorem ipsum docor donor getum ay di onoe." },
				{ title: "Centralized", description: "Lorem ipsum docor donor getum ay di onoe." },
				{ title: "Centralized", description: "Lorem ipsum docor donor getum ay di onoe." },
				{ title: "Centralized", description: "Lorem ipsum docor donor getum ay di onoe." },
				{ title: "Centralized", description: "Lorem ipsum docor donor getum ay di onoe." },
				{ title: "Centralized", description: "Lorem ipsum docor donor getum ay di onoe." },
			],
		};
	},
};
</script>

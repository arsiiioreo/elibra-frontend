<template>
	<main class="vstack mx-auto overflow-hidden w-100 h-100 p-4 px-0">
		<div class="text-center w-50 mx-auto mt-5 mb-3">
			<div class="hstack">
				<h1 class="fw-bold display-4">
					<span class="display-2 fw-bold text-prime-gradient">e-Libra:</span>
					Enhanced Library Integrated Book and Resources Automation
				</h1>
			</div>
			<p class="fs-5">A centralized library management system for universities—streamlining cataloging, circulation, inventory, and analytics in one secure platform.</p>
			<router-link :to="{ name: 'OPAC' }" class="btn bg-prime-gradient fs-5 px-4 mt-3 fw-bold" style="padding-block: 0.75rem">Browse OPAC</router-link>
		</div>
		<ImageCarousel />
	</main>
</template>

<script>
import ImageCarousel from "./ImageCarousel.vue";

export default {
	components: { ImageCarousel },
};
</script>

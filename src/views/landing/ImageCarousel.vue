<template>
	<div class="slider-wrapper position-relative vstack align-items-center justify-content-center">
		<!-- <div class="skewer top z-1"></div> -->
		<div class="slider-track z-0">
			<div class="slide" v-for="(image, index) in images" :key="index">
				<img :src="image" alt="" />
			</div>
			<!-- Duplicate for seamless loop -->
			<div class="slide shadow" v-for="(image, index) in images" :key="'clone-' + index">
				<img :src="image" alt="" />
			</div>
		</div>
		<!-- <div class="skewer bottom z-1"></div> -->
	</div>
</template>

<script>
import images from "@/assets/carousel";

export default {
	data() {
		return {
			images: images,
		};
	},
};
</script>

<style>
.slider-wrapper {
	width: 100%;
	max-height: 400px;
	overflow: hidden;
	position: relative;

	/* REAL SUBTRACTION */
	-webkit-mask-image: linear-gradient(black, black), radial-gradient(120% 60% at 50% -15%, transparent 60%, black 61%), radial-gradient(120% 60% at 50% 115%, transparent 60%, black 61%);
	-webkit-mask-composite: destination-out;
	-webkit-mask-repeat: no-repeat;

	mask-image: linear-gradient(black, black), radial-gradient(120% 60% at 50% -15%, transparent 60%, black 61%), radial-gradient(120% 60% at 50% 115%, transparent 60%, black 61%);
	mask-composite: exclude;
	mask-repeat: no-repeat;
}

.skewer {
	height: 125px;
	background: #fff;
	position: absolute;
	width: 110%;
}

.skewer.top {
	top: -10%;
	border-bottom-left-radius: 100%;
	border-bottom-right-radius: 100%;
}

.skewer.bottom {
	bottom: -10%;
	border-top-left-radius: 100%;
	border-top-right-radius: 100%;
}

.slider-track {
	display: flex;
	width: max-content;
	animation: scroll-left 70s linear infinite;
}

.slide {
	flex: 0 0 auto;
	padding-right: 10px;
}

.slide img {
	height: 400px;
	width: auto;
	display: block;
	transition: transform 0.2s ease;
}

/* .slide img:hover {
	transform: scale(1.02);
	z-index: 5;
}

.slider-track:hover {
	animation-play-state: paused;
	transition: animation-play-state 0s linear 1s;
} */

/* Animation */
@keyframes scroll-left {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}
</style>

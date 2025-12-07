<template>
	<div id="app" class="position-relative">
		<img src="@/assets/ISU-Gate-Copy.jpg" alt="" class="w-100 position-absolute top-0" style="opacity: 0.1" />
		<div class="page vstack overflow-x-hidden">
			<div class="scroll-trigger" style="height: 10px"></div>
			<!-- NAVBAR -->
			<div class="d-flex w-100 top-0 position-fixed bg-white bg-opacity-75" style="z-index: 99">
				<nav class="navbar hstack justify-content-between w-75 p-md-4 px-md-5 mx-auto">
					<div class="hstack gap-md-3 gap-2 align-items-center">
						<img src="@/assets/logo.png" alt="E-Libra Logo" width="40" />
						<h2 class="nav-title text-prime-gradient">e-Libra</h2>
					</div>

					<ul class="nav gap-2 ms-5">
						<li class="nav-item">
							<a class="nav-link" href="#introduction">Introduction</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#about">About</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#features">Features</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#contact">Contact Us</a>
						</li>
						<li class="nav-item" v-if="!token">
							<router-link :to="{ name: 'login' }" class="nav-link text-white btn px-3 bg-prime"> Login </router-link>
						</li>
					</ul>

					<ul class="nav gap-2" v-if="token">
						<li class="nav-item">
							<router-link class="nav-link" :to="{ name: user?.role == 0 ? 'AdminDashboard' : user?.role == 1 ? 'LibrarianDashboard' : '' }"><i class="bi bi-columns-gap me-2"></i>Dashboard</router-link>
						</li>
						<li class="nav-item">
							<button @click="$logout" class="nav-link text-white btn px-3 bg-prime">Logout</button>
						</li>
					</ul>
				</nav>
			</div>
			<section class="section-1 h-auto align-items-center position-relative overflow-hidden mt-5 pt-4">
				<MainSection />
			</section>
		</div>

		<IntroductionSection />
		<AboutUs />
		<FeaturesSection />
		<section id="contact"></section>
		<FooterSection />

		<div class="position-fixed bottom-0 end-0 card border-0 me-2 rounded-bottom-0 support-card bg-transparent" @mouseenter="openCustomerSupport = true" @mouseleave="!hasSupportInput && (openCustomerSupport = false)">
			<div class="d-flex justify-content-end bg-transparent">
				<div class="card-header bg-prime text-white hstack border-0 clickable p-2 px-4">
					<h6 class="mb-0"><i class="bi bi-headset me-2"></i>Customer Support</h6>
					<i class="bi ms-5" :class="[openCustomerSupport ? 'bi-chevron-up' : ' bi-chevron-down']"></i>
				</div>
			</div>

			<div class="card-body support-body p-0 bg-white rounded-top rounded-end-0" :class="{ 'support-body-hovered shadow border-dark-subtle': openCustomerSupport }" style="width: 350px">
				<form class="p-4">
					<h4 class="fw-bold mb-4"><i class="bi bi-headset fs-3 me-1"></i> Customer Support</h4>
					<div class="mb-2">
						<label for="" class="form-label">Name</label>
						<input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Enter Name" v-model="support.name" />
					</div>
					<div class="mb-2">
						<label for="" class="form-label required">Email</label>
						<input type="email" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Enter Email" v-model="support.email" />
					</div>
					<div class="mb-2">
						<label for="" class="form-label required">Description/Inquiry</label>
						<textarea name="" id="" rows="5" class="form-control" placeholder="Enter inquiry" style="resize: none" v-model="support.inquiry"></textarea>
						<p class="form-text text-end" :class="{ 'text-danger': support.inquiry.length > 255 }" v-if="support.inquiry">{{ support.inquiry.length }}/255</p>
					</div>
					<div class="hstack justify-content-end mt-3 gap-2">
						<button type="button" class="btn btn-outline-secondary" v-if="support.name || support.email || support.inquiry" @click="cancelSupportQuery">Cancel</button>
						<button type="submit" class="btn btn-success">Submit</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import MainSection from "./landing/MainSection.vue";
import IntroductionSection from "./landing/IntroductionSection.vue";
import AboutUs from "./landing/AboutUs.vue";
import FeaturesSection from "./landing/FeaturesSection.vue";
import FooterSection from "./landing/FooterSection.vue";
import { thisIsMe, token } from "@/stores/auth";

export default {
	components: { MainSection, IntroductionSection, AboutUs, FeaturesSection, FooterSection },
	async mounted() {
		this.user = await thisIsMe();
	},
	data() {
		return {
			openCustomerSupport: false,
			support: {
				name: "",
				email: "",
				inquiry: "",
			},
			token: token,
			user: null,
		};
	},

	methods: {
		cancelSupportQuery() {
			this.support = {
				name: "",
				email: "",
				inquiry: "",
			};
			this.openCustomerSupport = false;
		},
	},

	computed: {
		hasSupportInput() {
			return this.support.name || this.support.email || this.support.inquiry;
		},
	},
};
</script>

<style scoped src="@/css/landing.css"></style>
<style scoped>
* {
	scroll-margin-top: 10vh;
}
</style>

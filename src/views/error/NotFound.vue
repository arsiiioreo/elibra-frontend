<template>
	<div style="height: 100vh" class="position-relative">
		<div class="d-flex w-100 top-0 position-fixed bg-white" style="z-index: 99">
			<nav class="navbar hstack justify-content-between w-75 p-md-4 px-md-5 mx-auto">
				<div class="hstack gap-md-3 gap-2 align-items-center">
					<img src="@/assets/logo.png" alt="E-Libra Logo" width="40" />
					<h2 class="nav-title text-prime-gradient">e-Libra</h2>
				</div>

				<ul class="nav gap-2 ms-5" v-if="!token">
					<li class="nav-item">
						<router-link :to="{ name: 'login' }" class="nav-link text-white btn px-3 bg-prime"> Login </router-link>
					</li>
				</ul>

				<ul class="nav gap-2" v-if="token">
					<li class="nav-item">
						<router-link class="nav-link text-black" :to="{ name: user?.role == 0 ? 'AdminDashboard' : 'LibrarianDashboard' }"><i class="bi bi-columns-gap me-2"></i>Dashboard</router-link>
					</li>
					<li class="nav-item">
						<button @click="$logout" class="nav-link text-white btn px-3 bg-prime">Logout</button>
					</li>
				</ul>
			</nav>
		</div>

		<main style="height: 100%">
			<div class="row d-flex justify-content-center align-items-center h-75">
				<div class="col-4 d-flex justify-content-center">
					<img src="https://cdn-icons-png.flaticon.com/512/29/29302.png" alt="Bookshelf" class="mb-4" style="width: 50%; opacity: 0.7" />
				</div>
				<div class="col-4">
					<h1 class="display-1 fw-bold text-prime">404</h1>
					<p class="fs-3"><span class="text-prime">Oops!</span> You got lost in the stacks.</p>
					<p class="lead">
						The book you're looking for isn't on this shelf.<br />
						Maybe it was misplaced... or never written.
					</p>

					<router-link to="/" class="btn bg-prime px-4 py-2 mt-3 text-white"> 📚 Back to Home </router-link>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: {},
		};
	},
	mounted() {
		this.user = JSON.parse(localStorage.getItem("user")) || {};
	},
};
</script>

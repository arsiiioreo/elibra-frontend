<template>
	<router-view :class="themeClass[theme]" />
</template>

<script>
export default {
	data() {
		return {
			theme: localStorage.getItem("theme") || null,
			themeClass: {
				light: "mode-light",
			},
		};
	},
	mounted() {
		if (!this.theme) {
			localStorage.setItem("theme", "light");
		}
	},
};
</script>

<style src="@/css/theme.css"></style>

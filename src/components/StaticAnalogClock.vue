<template>
	<div class="clock" :style="{ width: size + 'px', height: size + 'px' }">
		<!-- Numbers -->
		<div v-for="n in 12" :key="n" class="number" :style="getNumberStyle(n)">
			{{ n }}
		</div>

		<!-- Tick marks -->
		<div v-for="t in 60" :key="t" class="tick" :style="getTickStyle(t)"></div>

		<!-- Clock hands -->
		<div class="hand hour" :style="hourStyle"></div>
		<div class="hand minute" :style="minuteStyle"></div>
		<div class="center"></div>
	</div>
</template>

<script>
export default {
	name: "StaticAnalogClock",
	props: {
		time: { type: String, required: true }, // "HH:MM:SS"
		size: { type: Number, default: 220 },
		hourColor: { type: String, default: "#222" },
		minuteColor: { type: String, default: "#444" },
		tickColor: { type: String, default: "#666" },
		numberColor: { type: String, default: "#111" },
	},
	computed: {
		hourStyle() {
			const [h, m] = this.time.split(":").map(Number);
			return {
				transform: `rotate(${(h % 12) * 30 + m * 0.5}deg)`,
				backgroundColor: this.hourColor,
				height: `${this.size * 0.25}px`,
				width: `${this.size * 0.05}px`,
				borderRadius: "6px",
				boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
			};
		},
		minuteStyle() {
			const [, m] = this.time.split(":").map(Number);
			return {
				transform: `rotate(${m * 6}deg)`,
				backgroundColor: this.minuteColor,
				height: `${this.size * 0.35}px`,
				width: `${this.size * 0.025}px`,
				borderRadius: "6px",
				boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
			};
		},
	},
	methods: {
		getNumberStyle(n) {
			const angle = (n * 30 - 90) * (Math.PI / 180);
			const radius = (this.size / 2) * 0.78;
			return {
				position: "absolute",
				top: `${this.size / 2 + radius * Math.sin(angle)}px`,
				left: `${this.size / 2 + radius * Math.cos(angle)}px`,
				transform: "translate(-50%, -50%)",
				color: this.numberColor,
				fontSize: `${this.size * 0.1}px`,
				fontFamily: "'Times New Roman', serif",
				fontWeight: "bold",
			};
		},
		getTickStyle(t) {
			const angle = t * 6;
			const isHourTick = t % 5 === 0;
			return {
				position: "absolute",
				top: "50%",
				left: "50%",
				width: isHourTick ? `${this.size * 0.04}px` : `${this.size * 0.015}px`,
				height: isHourTick ? `${this.size * 0.12}px` : `${this.size * 0.06}px`,
				backgroundColor: this.tickColor,
				transform: `rotate(${angle}deg) translateY(-${this.size / 2 - (isHourTick ? this.size * 0.14 : this.size * 0.08)}px)`,
				transformOrigin: "center bottom",
				borderRadius: "2px",
			};
		},
	},
};
</script>

<style scoped>
.clock {
	position: relative;
	border: 6px solid #333;
	border-radius: 50%;
	margin: auto;
	background: radial-gradient(circle, #fdfdfd 70%, #e0e0e0 100%);
	box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hand {
	position: absolute;
	top: 50%;
	left: 50%;
	transform-origin: bottom center;
}

.center {
	width: 18px;
	height: 18px;
	background: radial-gradient(circle, #333 40%, #111 100%);
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.clock {
	background: #fff;
	border: 2px solid #000;
	border-radius: 50%;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.hand {
	background-color: #000;
	border-radius: 4px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.center {
	background-color: #000;
	width: 12px;
	height: 12px;
	border-radius: 50%;
}

.number {
	text-align: center;
}

.tick {
	background-color: #666;
}
</style>

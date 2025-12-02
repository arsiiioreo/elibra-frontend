<template>
	<div class="row g-2 mb-5">
		<!-- Header -->
		<div class="vstack">
			<h5 class="fw-bold text-primary"><i class="bi bi-card-list me-2"></i>Item's Bibliography</h5>
			<small class="text-muted">Please enter the correct details for the item's bibliography.</small>
		</div>

		<!-- Title -->
		<div class="col-lg-6">
			<label for="title" class="form-label required">Title</label>
			<input type="text" class="form-control" id="title" placeholder="Enter Title" required :value="modelValue.title" @input="updateInfo('title', $event.target.value)" />
		</div>

		<!-- Call Number -->
		<div class="col-lg-6">
			<label for="call_number" class="form-label required">Call Number</label>
			<input type="text" class="form-control" id="call_number" placeholder="Enter Call Number" required :value="modelValue.call_number" @input="updateInfo('call_number', $event.target.value)" />
		</div>

		<!-- Item Type -->
		<div :class="[modelValue.item_type == 1 ? 'col-lg-3' : 'col-lg-6']">
			<label for="item_type" class="form-label required">Item Type</label>
			<select class="form-select" id="item_type" :value="modelValue.item_type" @change="updateInfo('item_type', $event.target.value)" required>
				<option value="" disabled>Select Item Type</option>
				<option v-for="value in item_types" :key="value.id" :value="value.id">
					{{ value.name }}
				</option>
			</select>
		</div>

		<!-- Category (if item_type == 1) -->
		<div class="col-lg-3" v-if="modelValue.item_type === 'book'">
			<label for="category" class="form-label required">Category</label>
			<select class="form-select" id="category" :value="modelValue.category" @change="updateInfo('category', $event.target.value)" required>
				<option value="" disabled>Select Category</option>
				<option v-for="value in categories" :key="value.id" :value="value.id">
					{{ value.name }}
				</option>
			</select>
		</div>

		<!-- Language -->
		<div :class="[modelValue.item_type === 'book' ? 'col-lg-3' : 'col-lg-6']">
			<label for="language" class="form-label required">Language</label>
			<select class="form-select" id="language" :value="modelValue.language" @change="updateInfo('language', $event.target.value)" required>
				<option value="" disabled>Select Language</option>
				<option v-for="value in languages" :key="value.id" :value="value.id">
					{{ value.name }}
				</option>
			</select>
		</div>

		<!-- Audio Inputs -->
		<div class="col-12" v-if="modelValue.item_type === 'audio'">
			<div class="row g-2">
				<!-- Format -->
				<div class="col-lg-3">
					<label for="format" class="form-label">Format</label>
					<select class="form-select" id="format" :value="modelValue.audio.format" @change="updateInfo('audio.format', $event.target.value)" required>
						<option value="" disabled>Select Format</option>
						<option value="mp3">MP3</option>
						<option value="mp4">MP4</option>
						<option value="m4a">M4A</option>
					</select>
				</div>

				<!-- Duration -->
				<div class="col-lg-6">
					<label for="Duration" class="form-label">Duration</label>
					<div class="hstack gap-2">
						<label for="hour">Hours</label>
						<select name="hour" id="hour" class="form-select" :value="modelValue.audio.duration.hours" @change="updateInfo('audio.duration.hours', $event.target.value)">
							<option :value="index" v-for="(v, index) in 60" :key="index">{{ index }}</option>
						</select>
						<label for="minutes">Minute</label>
						<select name="minutes" id="minutes" class="form-select" :value="modelValue.audio.duration.minutes" @change="updateInfo('audio.duration.minutes', $event.target.value)">
							<option :value="index" v-for="(v, index) in 60" :key="index">{{ index }}</option>
						</select>
						<label for="seconds">Seconds</label>
						<select name="seconds" id="seconds" class="form-select" :value="modelValue.audio.duration.seconds" @change="updateInfo('audio.duration.seconds', $event.target.value)">
							<option :value="index" v-for="(v, index) in 60" :key="index">{{ index }}</option>
						</select>
						<!-- <input type="time" class="form-control" id="Duration" placeholder="Enter Duration" :value="modelValue.audio.duration" @input="updateInfo('audio.duration', $event.target.value)" /> -->
					</div>
				</div>

				<!-- Producer -->
				<div class="col-lg-3">
					<label for="Producer" class="form-label">Producer</label>
					<input type="text" class="form-control" id="Producer" placeholder="Enter Producer" :value="modelValue.audio.producer" @input="updateInfo('audio.producer', $event.target.value)" />
				</div>
			</div>
		</div>

		<!-- Book, Newspaper, Periodical, Serial Inputs -->

		<!-- Pages -->
		<div class="col-lg-4" v-if="modelValue.item_type === 'book' || modelValue.item_type === 'serial' || modelValue.item_type === 'periodical' || modelValue.item_type === 'newspaper'">
			<label for="pages" class="form-label">Pages</label>
			<input type="text" class="form-control" id="pages" placeholder="Enter Pages" :value="modelValue.pages" @input="updateInfo('pages', $event.target.value)" />
		</div>

		<div class="col-12" v-if="modelValue.item_type === 'book' || modelValue.item_type === 'serial' || modelValue.item_type === 'periodical' || modelValue.item_type === 'newspaper'">
			<div class="row g-2"></div>

			<!-- ISBN / ISSN -->
			<div :class="[modelValue.item_type === 'book' ? 'col-lg-3' : 'col-lg-4']">
				<label for="isbn_issn" class="form-label required">ISBN/ISSN</label>
				<input type="text" class="form-control" id="isbn_issn" placeholder="Enter ISBN or ISSN" required :value="modelValue.isbn_issn" @input="updateInfo('isbn_issn', $event.target.value)" />
			</div>
			<!-- Volume and Issue -->
			<div class="row g-2" v-if="modelValue.item_type == 5 || modelValue.item_type == 6">
				<!-- Volume -->
				<div class="col-lg-3">
					<label for="Volume" class="form-label">Volume</label>
					<input type="text" class="form-control" id="Volume" placeholder="Enter Volume" :value="modelValue.pages" @input="updateInfo('volume', $event.target.value)" />
				</div>

				<!-- Issue -->
				<div class="col-lg-3">
					<label for="Issue" class="form-label">Issue</label>
					<input type="text" class="form-control" id="Issue" placeholder="Enter Issue" :value="modelValue.pages" @input="updateInfo('issue', $event.target.value)" />
				</div>
			</div>

			<!-- DOI -->
			<div class="row g-2" v-if="modelValue.item_type == 5">
				<!-- DOI -->
				<div class="col-lg-3">
					<label for="Volume" class="form-label">Volume</label>
					<input type="text" class="form-control" id="Volume" placeholder="Enter Volume" :value="modelValue.pages" @input="updateInfo('volume', $event.target.value)" />
				</div>
			</div>

			<!-- Newspaper Clippings -->
			<div class="row g-2" v-if="modelValue.item_type == 9">
				<!-- date -->
				<div class="col-lg-3">
					<label for="date" class="form-label">Date</label>
					<input type="date" class="form-control" id="date" placeholder="Enter Date" :value="modelValue.pages" @input="updateInfo('newspaper.date', $event.target.value)" />
				</div>

				<!-- Edition -->
				<div class="col-lg-3">
					<label for="edition" class="form-label">Edition</label>
					<input type="text" class="form-control" id="edition" placeholder="Enter Edition" :value="modelValue.pages" @input="updateInfo('newspaper.edition', $event.target.value)" />
				</div>
			</div>
		</div>

		<!-- Academic Research Serial Inputs -->
		<div class="col-12" v-if="modelValue.item_type == 2 || modelValue.item_type == 3">
			<div class="row g-2">
				<!-- Advisor -->
				<div class="col-lg-3">
					<label for="Advisor" class="form-label">Advisor</label>
					<input type="text" class="form-control" id="Advisor" placeholder="Enter Advisor" :value="modelValue.academic.advisor" @input="updateInfo('academic.advisor', $event.target.value)" />
				</div>

				<!-- Advisor -->
				<div class="col-lg-3">
					<label for="Researchers" class="form-label">Researchers</label>
					<input type="text" class="form-control" id="Researchers" placeholder="Enter Researchers" :value="modelValue.academic.researchers" @input="updateInfo('academic.researchers', $event.target.value)" />
				</div>

				<!-- Program -->
				<div class="col-lg-6">
					<label for="Program" class="form-label">Program</label>
					<select class="form-select" id="Program" :value="modelValue.academic.program_id" @change="updateInfo('academic.program_id', $event.target.value)" required>
						<option value="" disabled>Select Program</option>
						<option :value="p.id" v-for="p in programs" :key="p.id">{{ p.name }}</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Description -->
		<div class="col-lg-12">
			<label for="description" class="form-label">Description/Abstract</label>
			<textarea class="form-control" id="description" placeholder="Enter a short description of the item..." maxlength="255" :value="modelValue.remarks" @input="updateInfo('remarks', $event.target.value)"></textarea>
		</div>
	</div>
</template>

<script>
import { thisIsMe } from "@/stores/auth";
import { getLanguages } from "@/stores/librarianCache";
import { getRequest } from "@/stores/requestService";
import { categories, item_types } from "@/utilities/selectOptions";

export default {
	props: {
		modelValue: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			// Dynamic
			item_types: item_types,
			categories: categories,
			languages: null,
			programs: null,
		};
	},

	methods: {
		updateInfo(path, value) {
			const keys = path.split(".");
			const updated = { ...this.modelValue };
			let pointer = updated;

			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];

				// Make sure nested object exists
				pointer[key] = pointer[key] ? { ...pointer[key] } : {};
				pointer = pointer[key];
			}

			pointer[keys[keys.length - 1]] = value;

			this.$emit("update:modelValue", updated);
		},
	},

	async mounted() {
		this.languages = await getLanguages();

		const me = await thisIsMe();
		this.programs = (await getRequest(`program/read/from-campus/${me?.campus?.id}`)).data?.data;
	},
};
</script>

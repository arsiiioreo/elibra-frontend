import { reactive } from "vue";
import { getRequest } from "./requestService";

export const storage = reactive({
	activities: null,
	items: null,
	// item_type: null,
	acquisition_request: null,
	language: null,
	category: null,
});

export const preloadLibrarianCache = async () => {
	await getActivities();
	await getItems();
	await getLanguages();
	await getAcquisitionRequest();
};

export const getActivities = async (params) => {
	if (storage.activities) return storage.activities;

	try {
		const res = await getRequest("my-activity", params);

		storage.activities = res.data;
		return storage.activities;
	} catch (e) {
		console.error("Failed to fetch activities:", e);
	}
};

export const getItems = async (params = {}) => {
	if (storage.items) return storage.items;

	const defaultParams = {
		query: params.query ?? "",
		sort: params.sort ?? "title",
		order: params.order ?? "asc",
		type: params.type ?? "",
		language_id: params.language_id ?? "",
		year_from: params.year_from ?? "",
		year_to: params.year_to ?? "",
		page: params.page ?? "1",
		entries: params.entries ?? "25",
		paginate: params.paginate ?? false,
	};

	try {
		const res = await getRequest("item/get", defaultParams);
		storage.items = res.data;
		return storage.items;
	} catch (e) {
		console.error("Failed to fetch items:", e);
		throw e; // para hindi silent error
	}
};

export const getLanguages = async () => {
	if (storage.language) return storage.language;

	try {
		const res = await getRequest("language");

		storage.language = res.data;
		return storage.language;
	} catch (e) {
		console.error("Failed to fetch activities:", e);
	}
};

export const getAcquisitionRequest = async () => {
	if (storage.acquisition_request) return storage.acquisition_request;

	try {
		const res = await getRequest("acquisition/get");

		storage.acquisition_request = res.data.data;
		return storage.acquisition_request;
	} catch (e) {
		console.error("Failed to fetch activities:", e);
	}
};

export const clearCache = () => {
	storage.activities = null;
	storage.items = null;
};

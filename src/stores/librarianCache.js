import { reactive } from "vue";
import { getRequest } from "./requestService";

export const storage = reactive({
	activities: null,
	items: null,
	item_type: null,
	acquisition_request: null,
});

export const preloadLibrarianCache = async () => {
	await getActivities();
	await getItems();
	await getItemType();
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

export const getItems = async (params) => {
	if (storage.items) return storage.items;

	try {
		const res = await getRequest("item/get", params);

		storage.items = res.data;
		return storage.items;
	} catch (e) {
		console.error("Failed to fetch activities:", e);
	}
};

export const getItemType = async () => {
	if (storage.item_type) return storage.item_type;

	try {
		const res = await getRequest("item-type/get");

		storage.item_type = res.data;
		return storage.item_type;
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

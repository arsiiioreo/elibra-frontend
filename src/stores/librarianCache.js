import { reactive } from "vue";
import { getRequest } from "./requestService";

export const storage = reactive({
    activities: null,
    items: null,
    item_type: null,
});

export const getActivities = async (payload) => {
    if (storage.activities) return storage.activities;

    try {
        const res = await getRequest("my-activity", payload);

        storage.activities = res.data;
        return storage.activities;
    } catch (e) {
        console.error("Failed to fetch activities:", e);
    }
};

export const getItems = async () => {
    if (storage.items) return storage.items;

    try {
        const res = await getRequest("item/get");

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

export const clearCache = () => {
    storage.activities = null;
    storage.items = null;
};


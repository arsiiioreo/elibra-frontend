import { reactive } from "vue";
import api from "@/plugins/axios";

// Booleans for loading data
export const loading = reactive({
    campuses: false,
    users: false,
});

// Variable Storage
export const storage = reactive({
    campus: null,
    users: null,
});

// Fetch all the campuses and save it cache
export const fetchCampuses = async () => {
    if (storage.campus) return storage.campus;

    loading.campuses = true;
    try {
        const res = await api.get("/all-c");
        storage.campus = res.data;
        return storage.campus;
    } catch (err) {
        console.error("[fetchCampuses]", err);
    } finally {
        loading.campuses = false;
    }
};

// Fetch all the uusers and save it to cache
export const fetchUsers = async () => {
    if (storage.users) return storage.users;

    loading.users = true;
    try {
        const res = await api.get("/all-users");

        storage.users = res.data;
        return storage.users;
    } catch (err) {
        console.error("[fetchUsers]", err);
    } finally {
        loading.users = false;
    }
};

export const clearCache = () => {
    storage.users = null;
    storage.campus = null;
};


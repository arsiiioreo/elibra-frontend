import { reactive } from "vue";

// Booleans for loading data
export const loading = reactive({
    campuses: false,
    users: false,
});

// Variable Storage
export const storage = reactive({
    campus: null,
    users: null,
    item_type: null,
});

export const clearCache = () => {
    storage.users = null;
    storage.campus = null;
};

import { reactive } from "vue";
import { getRequest } from "./requestService";

// Booleans for loading data
export const loading = reactive({
	campuses: false,
	users: false,
});

// Preloads Cache
export const preload = () => {
	fetchCampuses();
	fetchUsers();
	fetchItemTypes();
	fetchActivities();
	fetchPatronTypes();
};

// Variable Storage
export const storage = reactive({
	campus: null,
	users: null,
	item_type: null,
	activities: null,
	patron_type: null,
	branch: null,
	department: null,
	program: null,
});

export const fetchCampuses = async (params) => {
	if (storage.campus) return storage.campus;

	try {
		const res = await getRequest("all-c", params);
		storage.campus = res.data;
		return storage.campus;
	} catch (e) {
		return e.message;
	}
};

export const fetchUsers = async (params) => {
	if (storage.users) return storage.users;

	try {
		const res = await getRequest("a/users", params);
		storage.users = res.data;
		return storage.users;
	} catch (e) {
		return e.message;
	}
};

export const fetchItemTypes = async (params) => {
	if (storage.item_type) return storage.item_type;

	try {
		const res = await getRequest("item-type/get", params);
		storage.item_type = res.data;
		return storage.item_type;
	} catch (e) {
		return e.message;
	}
};

export const fetchActivities = async (params) => {
	if (storage.activities) return storage.activities;

	try {
		const res = await getRequest("my-activity", params);
		storage.activities = res.data;
		return storage.activities;
	} catch (e) {
		return e.message;
	}
};

export const fetchPatronTypes = async (params) => {
	if (storage.patron_type) return storage.patron_type;

	try {
		const res = await getRequest("patron-types", params);
		storage.patron_type = res.data;
		return storage.patron_type;
	} catch (e) {
		return e.message;
	}
};

export const fetchBranches = async (params) => {
	if (storage.branch) return storage.branch;

	try {
		const res = await getRequest("branch/all", params);
		storage.branch = res.data;
		return storage.branch;
	} catch (e) {
		return e.message;
	}
};

export const fetchDepartment = async ({ params = {}, id = null }) => {
	if (storage.department) return storage.department;

	try {
		const res = await getRequest(`department/read/${id}`, params);
		storage.department = res.data;
		return storage.department;
	} catch (e) {
		return e.message;
	}
};

export const fetchProgram = async ({ params = {}, id = null }) => {
	if (storage.program) return storage.program;

	try {
		const res = await getRequest(`program/read/${id}`, params);
		storage.program = res.data;
		return storage.program;
	} catch (e) {
		return e.message;
	}
};

export const clearCache = () => {
	storage.users = null;
	storage.campus = null;
};

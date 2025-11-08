// import Fuse from "fuse.js";

// Helper to get nested array value
// const getValue = (obj, path) => {
//     return path.split(".").reduce((acc, key) => acc?.[key], obj);
// };

export const wellFormed = (data) => {
	if (!data) return null;

	return data.charAt(0).toUpperCase() + data.slice(1);
};

export const toTitleCase = (data) => {
	return data
		.toLowerCase()
		.split(" ")
		.map((d) => {
			return d.charAt(0).toUpperCase() + d.slice(1);
		})
		.join(" ");
};

export const formatShortDate = (date) => {
	if (!date) return "-";
	const d = new Date(date);
	return d.toLocaleDateString("en-PH", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const formatDate = (date) => {
	if (!date) return null;
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
};

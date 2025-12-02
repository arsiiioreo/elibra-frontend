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
	console.log(date);

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

	const d = new Date(date);
	return d.toLocaleDateString("en-PH", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const timeAgo = (t) => {
	if (!t) return null;

	const now = new Date();
	const past = new Date(t);
	const diff = Math.floor((now - past) / 1000); // difference in seconds

	if (diff < 60) return `${diff} sec${diff !== 1 ? "s" : ""} ago`;
	if (diff < 3600) return `${Math.floor(diff / 60)} min${Math.floor(diff / 60) !== 1 ? "s" : ""} ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)} hr${Math.floor(diff / 3600) !== 1 ? "s" : ""} ago`;
	return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) !== 1 ? "s" : ""} ago`;
};

export const formatHour = (time) => {
	if (!time) return "N/A";

	const [h, m] = time.split(":").map(Number);

	const ampm = h >= 12 ? "PM" : "AM";
	const hour12 = h % 12 || 12;

	return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
};

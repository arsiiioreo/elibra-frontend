import Fuse from "fuse.js";

// Helper to get nested array value
const getValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const search = (query, data, keys = []) => {
    const q = query.trim();
    if (!q) return data;

    const fuse = new Fuse(data, {
        keys: keys,
        threshold: 0.6,
        ignoreLocation: true,
        useExtendedSearch: true, // para sa multi-word matching
    });

    const terms = q
        .split(/\s+/)
        .map((word) => `'${word}`)
        .join(" ");
    return fuse.search(terms).map((result) => result.item);
};

export const filter = (data, category = {}) => {
    return data.filter((item) => {
        return Object.entries(category).every(([key, value]) => {
            if (value === null || value === "" || value === undefined) return true;
            return getValue(item, key) == value;
        });
    });
};

export const sort = (data = [], keys = {}) => {
    return [...data].sort((a, b) => {
        for (const [key, order] of Object.entries(keys)) {
            const aVal = getValue(a, key);
            const bVal = getValue(b, key);

            if (aVal == null || bVal == null) continue; // Skip comparison if either is null

            let result = 0;

            if (typeof aVal === "string" && typeof bVal === "string") {
                result = aVal.localeCompare(bVal);
            } else {
                result = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            }

            if (result !== 0) {
                return order === "desc" ? -result : result;
            }
        }

        return 0; // all keys equal
    });
};


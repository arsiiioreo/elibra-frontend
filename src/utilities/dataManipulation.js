// import Fuse from "fuse.js";

// Helper to get nested array value
// const getValue = (obj, path) => {
//     return path.split(".").reduce((acc, key) => acc?.[key], obj);
// };

export const toWellFormed = (data) => {
    return data;
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


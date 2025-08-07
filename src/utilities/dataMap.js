const dataMap = {
    campusStatus: {
        0: "Not Active",
        1: "Active",
    },
    sex: {
        0: "Female",
        1: "Male",
    },
    roles: {
        0: "Super Admin",
        1: "Admin",
        2: "Student",
    },
};

// Checks if an array is empty
export const isEmpty = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
};
// Counts an array is empty
export const countArray = (arr) => {
    const count = Array.isArray(arr) ? arr.length : 0;

    return count;
};

export const getLabel = (type, key) => {
    return dataMap[type]?.[key] ?? "Unknown";
};


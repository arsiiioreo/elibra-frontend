// requestService.js
import api from "@/plugins/axios";
import { token, verifyExistence } from "@/stores/auth";

export const storageRequest = async (route, params = {}) => {
    await verifyExistence();
    return await api.get(`storage/${route}`, { params });
};

export const getRequest = async (route, params = {}) => {
    await verifyExistence(); // check + refresh if needed
    return await api.get(`api/${route}`, { params });
};

export const postRequest = async (route, payload = {}, options = {}) => {
    if (token.value) {
        await verifyExistence(); // check + refresh if needed
    }
    return await api.post(`api/${route}`, payload, options);
};

export const putRequest = async (route, payload = {}, options = {}) => {
    await verifyExistence();
    return await api.put(`api/${route}`, payload, options);
};

export const deleteRequest = async (route, options = {}) => {
    await verifyExistence();
    return await api.delete(`api/${route}`, options);
};


import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust based on your Spring Boot port

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
};

export const createData = async (endpoint, data) => {
    try {
        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error(`Error creating ${endpoint}:`, error);
        throw error;
    }
};

export const updateData = async (endpoint, id, data) => {
    try {
        const response = await api.put(`${endpoint}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating ${endpoint}:`, error);
        throw error;
    }
};

export const deleteData = async (endpoint, id) => {
    try {
        const response = await api.delete(`${endpoint}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting ${endpoint}:`, error);
        throw error;
    }
};

export default api;

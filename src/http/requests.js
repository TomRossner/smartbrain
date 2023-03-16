import axios from "axios";

const BASE_URL = "http://localhost:5001";

export const login = async (credentials) => {
    const {email, password} = credentials
    const {data} = await axios.post(`${BASE_URL}/smartbrain/auth/login`, {email, password});
    return data;
}

export const loginWithGoogle = async () => {
    return await axios.post(`${BASE_URL}/smartbrain/auth/google-login`)
}

export const register = async (data) => {
    return await axios.post(`${BASE_URL}/smartbrain/auth/users`, data);
}

export const updateUser = async (updatedUser) => {
    return await axios.put(`${BASE_URL}/smartbrain/auth/update-user/${updatedUser.email}`, updatedUser);
}

export async function predict(url) {
    return await axios.post(`${BASE_URL}/smartbrain/predict`, {url});
}
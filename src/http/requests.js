import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'https://tomrossner.dev:5001';

export const login = async (credentials) => {
    const {email, password} = credentials;
    const {data} = await axios.post(`/smartbrain/auth/login`, {email, password});
    return data;
}

export const loginWithGoogle = async () => {
    return await axios.post(`/smartbrain/auth/google-login`)
}

export const register = async (data) => {
    return await axios.post(`/smartbrain/auth/users`, data);
}

export const updateUser = async (updatedUser) => {
    return await axios.put(`/smartbrain/auth/update-user/${updatedUser.email}`, updatedUser);
}

export const updateProfileImg = async (userEmail, imgUrl) => {
    return await axios.put(`/smartbrain/auth/update-profile-img/${userEmail}`, {imgUrl});
}

export async function predict(url) {
    return await axios.post(`/smartbrain/predict`, {url});
}
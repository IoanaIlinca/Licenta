import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const currentUser = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user) ?
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null;
const TOKEN = currentUser ? currentUser.accessToken : null;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});
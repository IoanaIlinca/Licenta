import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = currentUser?.accessToken;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjY4NWRlZmQyMDIzMWJjMmZiNTE2MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTI0MDA5MSwiZXhwIjoxNjUxMzI2NDkxfQ.sgJXV0bv4FaQpj8dOTUk-CmAwjgmgsUyyw2rsQTne0o";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});
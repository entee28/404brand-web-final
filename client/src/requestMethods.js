import axios from "axios";

const TOKEN = localStorage.getItem("token");

export const userRequest = axios.create({
    headers: { Authorization: `Bearer ${TOKEN}` }
})
import axios from "axios";

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTgzYzkzMjUyN2NiYzUwYTIzNDQwOSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDI2NDY4ODgsImV4cCI6MTY0MjkwNjA4OH0.n3ZdsIBK7ozpzQc7rU17zTKcxl98CWHJ6OPwNuvO46Q';

export const userRequest = axios.create({
    headers: { token: `Bearer ${TOKEN}` }
})
import axios from 'axios'

const MODE = import.meta.env.MODE
const PROD_BASE_URL = import.meta.env.VITE_BASE_URL
const PROTOCOL = document.location.protocol
const HOST = document.location.hostname
const DEV_BASE_URI = PROTOCOL + '//' + HOST + ':5000'
const baseURL = MODE === 'development' ? DEV_BASE_URI : PROD_BASE_URL

export const axiosInstance = axios.create({
    withCredentials: true, baseURL, headers: {
        'Content-Type': 'application/json'
    }
})
export const axiosInstance2 = axios.create({
    withCredentials: true, baseURL, headers: {
        'Content-Type': 'application/json'
    }
})
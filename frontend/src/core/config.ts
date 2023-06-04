const MODE = import.meta.env.MODE
const PROD_BASE_URL = import.meta.env.VITE_BASE_URL
const PROTOCOL = document.location.protocol
const HOST = document.location.hostname
const DEV_PORT = 5000
const PATH = 'api'
const DEV_BASE_URI = `${PROTOCOL}//${HOST}:${DEV_PORT}/${PATH}/`
export const baseURL = MODE === 'development' ? DEV_BASE_URI : PROD_BASE_URL
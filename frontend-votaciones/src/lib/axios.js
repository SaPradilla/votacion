import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.76:5650/api'
})

export default api
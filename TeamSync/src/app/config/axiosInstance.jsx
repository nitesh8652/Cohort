import axios from 'axios'

let axiosInstance = axios.create({
    baseURL:'https://dummyjson.com/products',
    withCredentials:true
})
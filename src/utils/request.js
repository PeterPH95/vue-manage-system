import axios from 'axios'
import Cookie from "js-cookie";

// 封装axios的基础路径
const http = axios.create({
    // 每次请求都会带的基础路径
    baseURL: '/api',
    timeout: 10000,
})

// 封装拦截器
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = Cookie.get('token')
    // 判断是否有token，有则让每个请求携带token
    if (token) {
        config.headers['Authorization'] = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log('响应拦截器：', response);
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http
import Vant from "vant";
//引入axios组件
import axios from 'axios'
//vue3 引入element-plus组件
// import { ElLoading, ElMessage } from 'element-plus';
import { Loading, showLoadingToast, showToast } from "vant";
import { useCounterStore } from "@/stores/counter";
// import Cookies from "js-cookie"


//vue2 引入element-ui组件
//import{Loading,Message} from 'element-ui';

//2. 创建axios实例
const instance = axios.create({
    // baseURL: "http://1.94.14.36:6008/",
    baseURL: "http://1.94.14.36/api/",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        // "Access-Control-Allow-Origin": true
        // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    timeout: 30000
})

let toast;
//3.配置请求拦截器
instance.interceptors.request.use((config) => {
    toast = showLoadingToast({
        message: "加载中...",
        // duration: 100
    });
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = window.localStorage.getItem('token');
    // token && (config.headers.Authorization = "Bearer " + token);
    token && (config.headers.Authorization = token);
    const store = useCounterStore();
    const order = store.order;
    console.log("order : " + order);
    if(order){
        config.headers["Content-Type"] = "application/json;charset=utf-8";
    }else {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    }
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    return config;
}, (err) => Promise.reject(err))
//4.配置响应拦截器
instance.interceptors.response.use((res) => {
    // Loading(0);
    // hideLoading()
    return res.data;
}, (error) => {
    console.log(error)
    //响应错误
    if (error.response && error.response.status) {
        const status = error.response.status
        let message = ''
        switch (status) {
            case 400:
                message = '请求错误';
                break;
            case 401:
                message = '请求错误';
                break;
            case 404:
                message = '请求地址出错';
                break;
            case 408:
                message = '请求超时';
                break;
            case 500:
                message = '服务器内部错误!';
                break;
            case 501:
                message = '服务未实现!';
                break;
            case 502:
                message = '网关错误!';
                break;
            case 503:
                message = '服务不可用!';
                break;
            case 504:
                message = '网关超时!';
                break;
            case 505:
                message = 'HTTP版本不受支持';
                break;
            default:
                message = '请求失败'
        }
        //vue2请使用Message，不是ElMessage
        showToast({
            message: message
        })
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export default instance;
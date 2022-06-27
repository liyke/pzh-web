import request from "axios"
import {message} from 'ant-design-vue'
import router from '../router/index'

const token = localStorage.getItem("token")

const service = request.create({
    baseURL: 'http://localhost:80',
    timeout: 50000,
    headers: {'Authorization': token}
});

service.interceptors.response.use(
    response => {

        const res = response.data;

        //判断response状态
        if (!res.flag) message.error('请求错误: ' + res.message)

        // if (res.code === 403) router.push("/403")

        return res
    },

    error => {
        message.error(error)
        router.push('/500')
        return Promise.reject(error)
    }
);

export default service
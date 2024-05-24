import request from "@/utils/axios";
export function login(data){
    return request({
        url : "/api/login",
        method: "post",
        data: data
    })
};
export function userinfo(){
    return request({
        url : "/api/userinfo",
        method: "get"
    })
};
export default {
    login
};
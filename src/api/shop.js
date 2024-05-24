import request from "@/utils/axios";

export function register(data){
    return request({
        url: "/register",
        method: "post",
        data: data
    });
};
export function login(data){
    return request({
        url: "/login",
        method: "post",
        data: data
    });
};
export function checkLogin(){
    return request({
        url: "/user",
        method: "get"
    });
};
export function getBannerList(){
    return request({
        url: "/imglist",
        method: "get"
    });
};
export function getShop(data){
    return request({
        url: "/shopcart?ids=" + data,
        method: "get"
    });
};
export function getGoodsInfo(data){
    return request({
        url: "/goodsinfo?id=" + data,
        method: "get"
    });
};
export function getNewsList(){
    return request({
        url: "/news/list",
        method: "get"
    });
};
export function getKinds(){
    return request({
        url: "/category",
        method: "get"
    });
};
export function getGoodsList(data){
    return request({
        url: "/goodslist?category_id=" + data,
        method: "get"
    });
};
export function getNewsInfo(id){
    return request({
        url: "/news/show?id=" + id,
        method: "get"
    });
};
export function addAddress(data){
    return request({
        url: "/address/save",
        method: "post",
        data: data
    });
};
export function getAddressList(){
    return request({
        url: "/address",
        method: "get"
    });
};
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
    // console.log(data);
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
export function deleteAddress(data){
    return request({
        url: "/address/del",
        method: "post",
        data: data
    });
};
export function getOrders(){
    return request({
        url: "/order/list",
        method: "get"
    });
};
export function getOrderInfo(data){
    return request({
        url: "/order/show?id=" + data,
        method: "get"
    });
};
export function deleteOrder(data){
    return request({
        url: "/order/cancel",
        method: "post",
        data: data
    });
};
export function getDefaultAddress(){
    return request({
        url: "/address/def",
        method: "get"
    });
};
export function makeOrder(data){
    return request({
        url: "/order/create",
        method: "post",
        data: data
    });
};
export function getImageCategory(){
    return request({
        url: "/photo/getimgcategory",
        method: "get"
    });
};
export function getImageList(id){
    return request({
        url: "/photo/getimages?id=" + id,
        method: "get"
    });
};
export function getImageInfo(id){
    return request({
        url: "photo/getimageInfo?id=" + id,
        method: "get"
    });
};
export function getIList(id){
    return request({
        url: "/photo/getthumimages?id=" + id,
        method: "get"
    });
}
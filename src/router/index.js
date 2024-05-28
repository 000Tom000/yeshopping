import { checkLogin } from '@/api/shop';
import { useCounterStore } from '@/stores/counter';

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Test from '@/components/Test.vue';
import Login from '@/components/Login.vue';
import Kinds from '@/components/Kinds.vue';
import NewsInfo from '@/components/NewsInfo.vue';
import Me from '@/components/Me.vue';
import Shopcart from '@/components/Shopcart.vue';
import GoodsList from '@/components/GoodsList.vue';
import GoodsInfo from '@/components/GoodsInfo.vue';
import Register from '@/components/Register.vue';
import Address from '@/components/Address.vue';
import Orders from '@/components/Orders.vue';
import Orderss from '@/components/Orderss.vue';
import MakeOrder from '@/components/MakeOrder.vue';
import News from '@/components/News.vue';
import ImageInfo from '@/components/ImageInfo.vue';

const list0 = ["/home", "/news", "/kinds", "/shopcart", "/me"];
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      name: "主页"
    },
    {
      path: "/test",
      component: Test,
      name: "测试"
    },
    {
      path: "/login",
      component: Login,
      name: "登录"
    },
    {
      path: "/kinds",
      component: Kinds,
      name: "分类"
    },
    {
      path: "/newsInfo/:id",
      component: NewsInfo,
      name: "新闻详情"
    },
    {
      path: "/me",
      component: Me,
      name: "我的"
    },
    {
      path: "/shopcart",
      component: Shopcart,
      name: "购物车"
    },
    {
      path: "/goodslist/:contain",
      component: GoodsList,
      name: "商品列表"
    },
    {
      path: "/goodsInfo/:id/:image",
      component: GoodsInfo,
      name: "商品详情"
    },
    {
      path: "/register",
      component: Register,
      name: "注册"
    },
    {
      path: "/address",
      component: Address,
      name: "收货地址"
    },
    {
      path: "/orderss",
      component: Orderss,
      name: "我的所有订单"
    },
    {
      path: "/orders/:id",
      component: Orders,
      name: "订单详情"
    },
    {
      path: "/makeOrder",
      component: MakeOrder,
      name: "创建订单"
    },
    {
      path: "/news",
      component: News,
      name: "新闻资讯"
    },
    {
      path: "/imageInfo/:id",
      component: ImageInfo,
      name: "资讯详情"
    }
  ]
});
router.beforeEach(async (to,from,next)=>{
  const store = useCounterStore();
  // console.log("to " + to.path);
  if(to.path == "/login" || to.path == "/register"){
    store.state = to.path == "/login" ? -1 : -2 ;
    next();
  } else {
    store.state = list0.indexOf(to.path) == -1 ? 1 : 0 ;
    const res = await checkLogin();
    if(res.code != 1){
      store.state = -1 ;
    }
    console.log("state : " + store.state);
    if(store.state == -1){
      next("/login");
    }else {
      next();
    }
  }
});

export default router;

<template>
  <div class="flex-1" :id="state == 0 ? 'type0' : 'type1'">
    <van-nav-bar id="nav" :title="header" style="width: 100%;" left-arrow left-text="返回" @click-left="back"
      :left-disabled="state == -1" />
    <router-view></router-view>
    <van-tabbar v-model="active" @change="shut" v-show="state == 0">
      <van-tabbar-item v-for="(item, index) in tabList" :icon="active == index ? item.Aicon : item.icon" :key="index">{{
    item.name }}</van-tabbar-item>
      <!-- <van-tabbar-item badge="3">
        <span>自定义</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script setup>
// import { useStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import { useCounterStore } from "./stores/counter";
import { useRouter } from "vue-router";

const router = useRouter();
// const route = useRoute();
const tabList = [
  {
    Aicon: "wap-home",
    icon: "wap-home-o",
    name: "首页"
  }, {
    Aicon: "wap-home",
    icon: "wap-home-o",
    name: "新闻咨询"
  }, {
    Aicon: "shop",
    icon: "shop-o",
    name: "商品分类"
  }, {
    Aicon: "cart",
    icon: "cart-o",
    name: "购物车"
  }, {
    Aicon: "contact",
    icon: "contact-o",
    name: "我的"
  }
];
const pathList = ["/home", "/news", "/kinds", "/shopcart", "/me"];
const active = ref(0);
const store = useCounterStore();
const state = computed(() => {
  return store.state;
});
const header = computed(() => {
  return store.currentRoute.name;
});

onMounted(() => {
  store.initShopCart();
});
const shut = () => {
  router.replace(pathList[active.value]);
};
const back = () => {
  if (state.value > 0) {
    history.back();
  }
  if (state.value == -2) {
    store.state = -1;
    history.back();
  }
}
// const store = useStore();

</script>

<style>
#tab {
  position: fixed;
  bottom: 0;
  left: 0;
}

#nav {
  position: fixed;
  top: 0;
  left: 0;
}

#type0 {
  height: auto;
  width: 100vw;
  padding-top: 45px;
  padding-bottom: 50px;
}

#type1 {
  height: auto;
  width: 100vw;
  padding-top: 45px;
}

.all-page {
  height: 100vh;
  width: 100vw;
}

.container {
  height: 100%;
  width: 100%;
  background-color: #eaeaea;
  padding-bottom: 5px;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.item {
  margin: 5px 5px 0;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  padding: 5px;
}

.text {
  text-align: center;
  font-size: 13px;
}
</style>
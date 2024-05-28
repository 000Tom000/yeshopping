<template>
    <div class="container">
        <div class="item">
            <div class="flex">
                <van-search v-model="searchText" placeholder="搜索商品" style="padding: 0;margin: 0;" />
                <van-button type="primary" @click="search">搜索</van-button>
            </div>
        </div>
        <div class=" item">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in bannerList" :key="item">
                    <img class="banner" :src="item.img">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="item green title" style="margin-bottom: 2px;">
            商品推荐
        </div>
        <div class="item">
            <van-grid :column-num="2">
                <van-grid-item v-for="item in two" :key="item" @click="goodsInfo(item)">
                    <img class="icon" :src="item.image">
                </van-grid-item>
            </van-grid>
            <div class="flex">
                <div class="text" v-for="item in two" :key="item" style="width: 50%;margin-top: 10px;">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="item green title" style="margin-bottom: 2px;">
            新闻
        </div>
        <div class="item flex" v-for="item in newsList" :key="item" @click="newsInfo(item.id)">
            <div style="width: 40%;">
                <img class="icon" :src="item.img_url" alt="">
            </div>
            <div class="flex-1" style="width: 60%;height: 100px;">
                <div class="title" style="font-size: 18px;">
                    {{ item.title }}
                </div>
                <div class="text">
                    {{ item.zhaiyao }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getBannerList, getShop, getNewsList } from "@/api/shop";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const router = useRouter();
const searchText = ref("");
const bannerList = ref([]);
const two = ref([]);
const newsList = ref([]);

onMounted(async () => {
    getBanner();
    getTwo();
    getNews();
});

const getBanner = async () => {
    const res = await getBannerList();
    bannerList.value = res.data;
    // console.log(bannerList.value);
};

const getTwo = async () => {
    two.value = [];
    two.value.push((await getShop(107)).data[0]);
    two.value.push((await getShop(108)).data[0]);
    console.log(two.value);
};
const search = () => {
    store.state = 1;
    router.push({
        name: "商品列表",
        params: {
            contain: searchText.value
        }
    });
};
const getNews = async () => {
    const res = await getNewsList();
    newsList.value = res.message;
    // console.log(newsList.value);
};
const newsInfo = (id) => {
    store.state = 1;
    router.push({
        name: "新闻详情",
        params: {
            id: id
        }
    });
};
const goodsInfo = (item) => {
    store.state = 1;
    router.push({
        name: "商品详情",
        params: {
            id: item.id,
            image: item.image
        }
    });
};
</script>

<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
}

.banner {
    width: 100%;
}

.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

.green {
    color: green;
}

.icon {
    width: 100px;
    height: 100px;
}
</style>
<template>
    <div class="container">
        <div class="item">
            <div class="title">
                {{ info.name }}
            </div>
            <div>
                单价&nbsp;￥{{ info.price }}
            </div>
            <div style="text-align: center">
                <img class="icon" :src="info.image">
            </div>
            <div>
                {{ info.sell_point }}
            </div>
        </div>
        <div class="item flex-1" style="height: 70px;padding: 20px;">
            <div class="flex" style="width: 70%;">
                <div>
                    选择数量
                </div>
                <div class="flex" style="width: 90px">
                    <van-stepper v-model="count" theme="round" button-size="22" disable-input />
                    <!-- <van-button type="default" class="small"
                        @click="count = count > 1 ? count - 1 : count">-</van-button>
                    <van-field v-model="count" class="small"
                        style="border: 1px gray solid;border-radius: 3px;text-align: center;" />
                    <van-button type="default" class="small" @click="count++">+</van-button> -->
                </div>
            </div>
            <div class="flex" style="width: 70%;">
                <div>
                    总价格
                </div>
                <div class="flex" style="width: 90px">
                    ￥{{ totalPrice }}
                </div>
            </div>
            <!-- <div class="flex" style="width: 90%;">
                <van-button type="primary" class="btn" @click="enter">加入购物车</van-button>
                <van-button type="primary" class="btn" @click="buy">购买</van-button>
            </div> -->
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="chat-o" text="客服" />
            <van-action-bar-icon icon="shop-o" text="店铺" />
            <van-action-bar-button color="#be99ff" type="warning" @click="enter" text="加入购物车" />
            <van-action-bar-button color="#7232dd" type="danger" @click="buy" text="立即购买" />
        </van-action-bar>
    </div>
</template>

<script setup>
// "http://1.94.14.36/static/uploads/goods/goods_album/2024/04/24/d700d2c351dd4f51ed294801b89e3b93.jpg"
// "http://1.94.14.36/static/uploads/goods/goods_image/2024/04/24/8f216d12b13341fa231c23bd050b8acc.jpg"
import { getGoodsInfo } from "@/api/shop";
import { useCounterStore } from "@/stores/counter";
import { showToast } from "vant";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const store = useCounterStore();
const info = ref({});
const route = useRoute();
// const baseUrl = "http://1.94.14.36/static/uploads/";
const count = ref(1);
const totalPrice = computed(() => {
    return eval(info.value.price) * eval(count.value);
});

onMounted(() => {
    getInfo();
});

const getInfo = async () => {
    const res = await getGoodsInfo(route.params.id);
    info.value = res.data;
    info.value.image = route.params.image;
    console.log(info.value);
};

const enter = () => {
    store.setGoodsIntoShopCart({
        id: info.value.id,
        number: count.value,
        name: info.value.name,
        image: info.value.image,
        price: info.value.price
    });
    showToast({
        message: "加入成功"
    });
};
const buy = () => {
    store.setGoodsList([{
        id: info.value.id,
        image: info.value.image,
        name: info.value.name,
        number: count.value,
        price: info.value.price
    }]);
    router.push({
        name: "创建订单"
    });
};
</script>

<style scoped>
.icon {
    height: 200px;
    width: 200px;
}

.container {
    height: 100vh;
    width: 100vw;
}

.title {
    font-size: 20px;
    font-weight: bold;
}

.small {
    height: 25px;
    width: 25px;
    font-size: 20px;
    padding: 0;
}

.btn {
    height: 40px;
    width: 110px;
}

.item>div {
    margin: 10px;
}
</style>
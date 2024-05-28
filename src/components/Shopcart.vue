<template>
    <div class="container">
        <div class="item" v-for="item in shopcart" :key="item">
            <van-swipe-cell>
                <div class="flex" @click="goodsInfo(item)">
                    <div class="icon">
                        <img class="icon" :src="item.image">
                    </div>
                    <div class="flex-1" style="width: 50%;height: 60px;">
                        <div class="title">
                            {{ item.name }}
                        </div>
                        <div class="content">
                            x{{ item.number }}
                        </div>
                        <div class="total">
                            ￥{{ item.total }}
                        </div>
                    </div>
                </div>
                <template #right>
                    <van-button square text="减少" type="danger" class="delete-button" style="height: 100%;width: 55px;"
                        @click="subGood(item)" />
                    <van-button square text="增加" type="primary" class="delete-button" style="height: 100%;width: 55px;"
                        @click="addGood(item)" />
                </template>
            </van-swipe-cell>
        </div>
        <div v-if="shopcart.length != 0">
            <div class="totalT">
                总金额&nbsp;￥{{ totalPrice }}
            </div>
            <div class="item" style="text-align: center;padding: 0;">
                <van-button type="primary" style="width: 100%;height: 35px;" @click="buy">清空购物车</van-button>
            </div>
        </div>
        <div v-if="shopcart.length == 0"
            style="background-color: white;margin-bottom: -10px;text-align: center;color: gray;font-weight: bold;padding-top: 10px;">
            购物车暂无物品
        </div>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const store = useCounterStore();
const totalPrice = computed(() => {
    var sum = 0;
    shopcart.value.forEach(item => {
        sum += eval(item.total);
    });
    return (sum).toFixed(2);
});
const shopcart = computed(() => {
    const list = store.shopcart;
    list.forEach(item => {
        item["total"] = (eval(item.number) * eval(item.price)).toFixed(2);
    });
    return list;
});

const addGood = (item) => {
    // console.log(item);
    store.addGoodIntoShopcart({
        name: item.name,
        number: 1,
        image: item.image
    });
    // console.log(item.image);
};
const subGood = (item) => {
    // console.log(item);
    store.subGoodIntoShopcart({
        name: item.name,
        number: 1,
        image: item.image
    });
    // console.log(item.image);
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
const buy = () => {
    store.setGoodsList(store.shopcart);
    router.push({
        name: "创建订单"
    });
};
</script>

<style scoped>
.icon {
    height: 150px;
    width: 150px;
}

.title {
    font-size: 17px;
    font-weight: bold;
}

.total {
    font-size: 15px;
    color: gray;
    width: 80%;
    text-align: end;
    margin-top: 30px;
}

.content {
    margin: 5px
}

.totalT {
    font-size: 17px;
    color: gray;
    width: 100%;
    text-align: end;
}
</style>
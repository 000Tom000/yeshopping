<template>
    <div class="container">
        <div class="item">
            <div class="title">
                {{ info.name }}
            </div>
            <div class="icon">
                <img class="icon" :src="info.iamge">
            </div>
            <div>
                {{ info.sell_point }}
            </div>
        </div>
        <div class="item flex-1" style="height: 100px;padding: 20px;">
            <div class="flex" style="width: 70%;">
                <div>
                    选择数量
                </div>
                <div class="flex" style="width: 90px">
                    <van-button type="default" class="small"
                        @click="count = count > 1 ? count - 1 : count">-</van-button>
                    <van-field v-model="count" class="small"
                        style="border: 1px gray solid;border-radius: 3px;text-align: center;" />
                    <van-button type="default" class="small" @click="count++">+</van-button>
                </div>
            </div>
            <div class="flex" style="width: 90%;">
                <van-button type="primary" class="btn" @click="enter">加入购物车</van-button>
                <van-button type="primary" class="btn" @click="buy">购买</van-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getGoodsInfo } from "@/api/shop";
import { useCounterStore } from "@/stores/counter";
import { showToast } from "vant";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const store = useCounterStore();
const info = ref({});
const route = useRoute();
const baseUrl = "http://1.94.14.36/static/uploads/";
const count = ref(1);

onMounted(() => {
    getInfo();
});

const getInfo = async () => {
    const res = await getGoodsInfo(route.params.id);
    info.value = res.data;
    info.value.image = baseUrl + info.value.image;
    console.log(info.value);
};

const enter = () => {
    store.setGoodsIntoShopCart({
        id: info.value.id,
        number: count.value,
        name: info.value.name,
        image: info.value.image
    });
    showToast({
        message: "加入成功"
    });
};
const buy = () => {

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
</style>
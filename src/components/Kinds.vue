<template>
    <div class="container">
        <div class="item">
            <van-tabs v-model:active="c1" style="width: 100%;" @change="change">
                <van-tab v-for="item in k1" :key="item" :title="item.name"></van-tab>
            </van-tabs>
            <van-tabs v-model:active="c2" style="width: 100%;" @change="getList">
                <van-tab v-for="item in k2" :key="item" :title="item.name"></van-tab>
            </van-tabs>
        </div>
        <div class="item" v-for="item in list" :key="item" v-show="state">
            <van-swipe-cell>
                <div class="flex" @click="goodsInfo(item)">
                    <div class="icon">
                        <img class="icon" :src="item.image">
                    </div>
                    <div class="flex-1" style="width: 50%;">
                        <div class="title">
                            {{ item.name }}
                        </div>
                        <div class="content">
                            {{ item.sell_point }}
                        </div>
                    </div>
                </div>
                <template #right>
                    <van-button square text="加入购物车" type="primary" class="delete-button"
                        style="height: 100%;width: 55px;" @click="addGood(item)" />
                </template>
            </van-swipe-cell>
        </div>
        <div v-if="list.length == 0"
            style="background-color: white;margin: 10px 0 -10px;text-align: center;color: gray;font-weight: bold;padding-top: 10px;">
            暂无商品
        </div>
    </div>
</template>

<script setup>
import { getKinds, getGoodsList } from "@/api/shop";
import { ref, onMounted, computed } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useCounterStore();
const k1 = ref([]);
const c1 = ref(0);
const k2 = ref([]);
const c2 = ref(0);
const list = ref([]);
const state = computed(() => {
    return list.value.length != 0;
});

onMounted(async () => {
    await getK1();
    change();
});

const getK1 = async () => {
    const res = await getKinds();
    k1.value = res.data;
    // console.log(k1.value);
};

const change = () => {
    c2.value = 0;
    k2.value = k1.value[c1.value].sub;
    getList();
};

const getList = async () => {
    var id = k2.value[c2.value].id;
    console.log("id : " + id);
    const res = await getGoodsList(id);
    list.value = res.data;
    // console.log(list.value);
};

const addGood = (item) => {
    console.log(item);
    store.addGoodIntoShopcart({
        id: item.id,
        name: item.name,
        number: 1,
        image: item.image,
        price: item.price
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
</style>
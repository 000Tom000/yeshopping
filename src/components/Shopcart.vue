<template>
    <div class="container">
        <!-- <div class="item flex" v-for="item in shopcart" :key="item">
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
            </div>
        </div> -->
        <div class="item" v-for="item in shopcart" :key="item">
            <van-swipe-cell>
                <div class="flex" @click="goodsInfo(item.id)">
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
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useCounterStore();
const shopcart = computed(() => {
    return store.shopcart;
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
const goodsInfo = (id) => {
    store.state = 1;
    router.push({
        name: "商品详情",
        params: {
            id: id
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
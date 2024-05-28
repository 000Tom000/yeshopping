<template>
    <div class="container">
        <div class="item flex" v-for="item in list" :key="item" @click="goodsInfo(item)">
            <div style="width: 40%;">
                <img class="icon" :src="item.image">
            </div>
            <div class="flex-1" style="width: 50%;height: 100px;">
                <div class="title" style="font-size: 18px;">
                    {{ item.name }}
                </div>
                <div class="text">
                    {{ item.sell_point }}
                </div>
            </div>
        </div>
        <!-- <button @click="btn">aaa</button> -->
    </div>
</template>

<script setup>
import { getKinds, getGoodsList } from '@/api/shop';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const list = ref([]);
const route = useRoute();

onMounted(() => {
    getList();
});

const getList = async () => {
    const res = await getKinds();
    await res.data.forEach(item => {
        item.sub.forEach(async (sitem) => {
            const r = await getGoodsList(sitem.id);
            r.data.forEach(ssitem => {
                if (ssitem.name.indexOf(route.params.contain) != -1) {
                    list.value.push(ssitem)
                }
                console.log("searching!");
            });
        });
    });
    // console.log(list);
};
const goodsInfo = (item) => {
    router.push({
        name: "商品详情",
        params: {
            id: item.id,
            image: item.image
        }
    });
};
// const btn = () => {
//     console.log(list.value);
// };
</script>

<style scoped>
.icon {
    height: 150px;
    width: 150px;
}

.title {
    font-size: 17px;
    font-weight: bold;
    text-align: center;
}
</style>
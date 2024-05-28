<template>
    <div class="container">
        <div class="item">
            <div class="title">
                {{ info.title }}
            </div>
            <div v-html="info.content"></div>
            <div v-for="item in list" :key="item">
                <img class="cover" :src="item.src" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { getIList, getImageInfo } from "@/api/shop";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const info = ref({});
const list = ref([]);

onMounted(() => {
    getInfo();
    getImageList();
});

const getInfo = async () => {
    const res = await getImageInfo(route.params.id);
    info.value = res.message[0];
    console.log(info.value);
};
const getImageList = async () => {
    const res = await getIList(route.params.id);
    list.value = res.message;
    console.log(list.value);
};
</script>

<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
}
</style>
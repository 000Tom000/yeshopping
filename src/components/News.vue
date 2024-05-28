<template>
    <div class="container">
        <van-tabs v-model:active="Dindex" @change="change">
            <van-tab v-for="item in list" :key="item" :title="item.text" />
        </van-tabs>
        <div class="item" v-for="item in imageList" :key="item" @click="info(item.id)">
            <div class="title">
                {{ item.title }}
            </div>
            <div style="text-align: center;">
                <img class="icon" :src="item.img_url" alt="">
            </div>
            <div class="content">
                {{ item.zhaiyao }}
            </div>
        </div>
        <div v-if="imageList.length == 0"
            style="background-color: white;margin-bottom: -10px;text-align: center;color: gray;font-weight: bold;padding-top: 10px;">
            暂无资讯
        </div>
        <!-- <van-tree-select @click="change" v-model:main-active-index="Dindex" :items="list" style="height: 100%;">
            <template #content>
                <div class="item" v-for="item in imageList" :key="item">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div>
                        <img class="icon" :src="item.img_url" alt="">
                    </div>
                    <div class="content">
                        {{ item.zhaiyao }}
                    </div>
                </div>
            </template>
</van-tree-select> -->
    </div>
</template>

<script setup>
import { getImageCategory, getImageList } from "@/api/shop";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const list = ref([]);
const Dindex = ref(0);
const imageList = ref([]);

onMounted(() => {
    getCategory();
});

const getCategory = async () => {
    const res = await getImageCategory();
    list.value = res.message.map(item => {
        return {
            text: item.title,
            id: item.id
        }
    });
    getList();
    // console.log(list.value);
};
const change = () => {
    getList();
};
const getList = async () => {
    const res = await getImageList(list.value[Dindex.value].id);
    imageList.value = res.message;
    // console.log(imageList.value);
};
const info = (id) => {
    router.push({
        name: "资讯详情",
        params: {
            id: id
        }
    });
};
</script>

<style scoped>
.icon {
    height: 100px;
    width: 100px;
}

.title {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin: 5px 0;
}
</style>
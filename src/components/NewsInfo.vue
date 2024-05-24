<template>
    <div class="container">
        <div class="item">
            <div class="title">
                {{ info.title }}
            </div>
            <div id="content"></div>
        </div>
    </div>
</template>

<script setup>
import { getNewsInfo } from "@/api/shop";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = computed(() => {
    return route.params.id;
});
const info = ref({});

const getInfo = async () => {
    const res = await getNewsInfo(route.params.id);
    info.value = res.message[0];
    // console.log(info.value);
};
onMounted(async () => {
    await getInfo();
    document.querySelector("#content").innerHTML = info.value.content;
});
</script>

<style scoped>
.title {
    font-size: 17px;
    font-weight: bold;
    text-align: center;
}
</style>
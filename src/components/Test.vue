<template>
    <div>
        <h1>测试</h1>
        <h2>count:{{ count }}</h2>
        <button @click="add">+</button>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { login, userinfo } from "@/api/login";
import { useCounterStore } from "@/stores/counter";
// import Cookies from "js-cookie";

// const { count, doubleCount, increment } = storeToRefs(store);
const store = useCounterStore();
const count = computed(() => {
    return store.count;
});

const data = {
    username: "15000536100",
    password: "123456"
};
onMounted(async () => {
    // const res = await login(data);
    // console.log(res);
    // localStorage.setItem("token", res.data.token);
    // const res2 = await userinfo();
    // console.log(res2);
    // console.log(obj.value);
});

const add = () => {
    store.add();
};
</script>

<style scoped></style>
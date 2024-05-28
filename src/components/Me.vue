<template>
    <div class="container flex-1">
        <div class="item flex">
            <div style="width: 60%;text-align: center;">
                <img class="icon" src="/avatar.png">
            </div>
            <div class="title" style="width: 35%;">
                {{ user }}
            </div>
        </div>
        <div class="item">
            <van-cell title="我的收货地址" @click="address" />
            <van-cell title="我的订单" @click="orders" />
        </div>
        <div style="text-align: center;padding-top: 225px;padding-bottom: 5px;">
            <van-button type="danger" style="width: 80%;height: 35px;" @click="logout">退出登录</van-button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { checkLogin } from "@/api/shop";
import { onMounted, ref } from "vue";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const router = useRouter();
const user = ref("");

onMounted(() => {
    getUser();
});
const logout = () => {
    showToast({
        message: "已退出登录"
    });
    localStorage.clear("token");
    router.replace("/login");
};
const getUser = async () => {
    const res = await checkLogin();
    user.value = res.data.username;
    console.log(user.value);
};
const address = () => {
    store.state = 1;
    router.push("/address");
};
const orders = () => {
    store.state = 1;
    router.push("/orderss");
};
</script>

<style scoped>
div {
    display: block;
}

.icon {
    height: 150px;
    width: 150px;
}

.title {
    font-size: 25px;
    font-weight: bold;
}

.flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

/* .cell {
    display: inline;
} */
</style>
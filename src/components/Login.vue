<template>
    <div class="container">
        <div class="item" style="text-align: center;">
            <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" />
            <van-field v-model="form.password" label="密码" placeholder="请输入密码" type="password" />
            <van-button type="primary" style="width: 80%;height: 30px;" @click="submit">登录</van-button>
        </div>
        <div style="text-align: center;">
            没有账号?
            <span class="toRe" @click="re">注册一个</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { login } from "@/api/shop";
import { showToast } from "vant";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const router = useRouter();
const form = ref({
    username: "Tom",
    password: "123456"
});

onMounted(() => {
    // localStorage.clear("token");
});

const submit = async () => {
    localStorage.clear("token");
    const res = await login(form.value);
    showToast({
        message: res.msg
    });
    if (res.code == 1) {
        localStorage.setItem("token", res.data.session_id);
        store.state = 0;
        setTimeout(() => {
            router.replace("/home");
        }, 666);
    }
    // console.log(res);
};
const re = () => {
    router.push("/register");
};
</script>

<style scoped>
.container {
    height: 100vh;
    width: 100vw;
    padding-top: 5px;
}

.title {
    font-size: 30px;
    font-weight: bold;
}

.item {
    padding: 20px;
}

.toRe {
    color: rgb(69, 69, 255);
    font-weight: bold;
}
</style>
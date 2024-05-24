<template>
    <div class="container">
        <div class="item" style="text-align: center;">
            <van-field v-model="form.email" label="邮箱" placeholder="请输入邮箱" />
            <van-field v-model="form.username" label="用户名" placeholder="请输入用户名" type="text" />
            <van-field v-model="form.password" label="密码" placeholder="请输入密码" type="password" />
            <van-field v-model="password" label="确认密码" placeholder="重新输入密码" type="password" />
            <van-button type="primary" style="width: 80%;height: 30px;" @click="submit">注册</van-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from "@/api/shop";
import { showToast } from "vant";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const password = ref("");
const form = ref({
    email: "",
    username: "",
    password: ""
});

const submit = async () => {
    if (form.value.password != password.value) {
        showToast({
            message: "两次密码输入不一致"
        });
        return;
    }
    const res = await register(form.value);
    console.log(res);
    if (res.code == 1) {
        showToast({
            message: "注册成功"
        });
        setTimeout(() => {
            showToast({
                message: "即将跳转登录页面"
            });
        }, 666);
        setTimeout(() => {
            back();
        }, 1666);
    } else {
        showToast({
            message: res.msg
        });
    }
};

const back = () => {
    store.state = -1;
    history.back();
};
</script>

<style scoped>
.container {
    height: 100vh;
    width: 100vw;
}
</style>
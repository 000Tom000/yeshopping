<template>
    <div class="container">
        <div class="item green title" style="margin-bottom: 2px;">
            确认地址
        </div>
        <div class="item">
            <van-swipe-cell>
                <van-cell>
                    <div class="flex" style="width: 80%;">
                        <div class="attr">收货人</div>
                        <div class="info">{{ item.name }}</div>
                    </div>
                    <div class="flex" style="width: 80%;">
                        <div class="attr">收货人电话</div>
                        <div class="info">{{ item.tel }}</div>
                    </div>
                    <div class="flex" style="width: 80%;">
                        <div class="attr">收货地址</div>
                        <div class="info">{{ item.area }}</div>
                    </div>
                    <div class="flex" style="width: 80%;">
                        <div class="attr">详情地址</div>
                        <div class="info">{{ item.detail }}</div>
                    </div>
                </van-cell>
            </van-swipe-cell>
        </div>
        <div class="item green title" style="margin-bottom: 2px;">
            商品列表
        </div>
        <div class="item" v-for="item in shopcart" :key="item">
            <van-swipe-cell>
                <div class="flex">
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
                        <div class="total">
                            ￥{{ item.total }}
                        </div>
                    </div>
                </div>
            </van-swipe-cell>
        </div>
        <div class="item">
            <van-swipe-cell>
                <van-cell>
                    <div class="flex" style="width: 80%;">
                        <div class="attr">总金额</div>
                        <div class="info">￥{{ totalPrice }}</div>
                    </div>
                </van-cell>
            </van-swipe-cell>
        </div>
        <div style="text-align: center;margin: 5px">
            <van-button type="primary" style="width: 100%;height: 40px;" @click="make">
                确认创建订单
            </van-button>
        </div>
        <!-- <button @click="test">aaa</button> -->
    </div>
</template>

<script setup>
import { getDefaultAddress, makeOrder } from "@/api/shop";
import { useCounterStore } from "@/stores/counter";
import { showToast } from "vant";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useCounterStore();
const item = ref({});
const totalPrice = computed(() => {
    var sum = 0;
    shopcart.value.forEach(item => {
        sum += eval(item.total);
    });
    return (sum).toFixed(2);
});
const shopcart = computed(() => {
    const list = store.goodsList;
    list.forEach(item => {
        item["total"] = (eval(item.number) * eval(item.price)).toFixed(2);
    });
    return list;
});


onMounted(() => {
    getAddress();
});

const getAddress = async () => {
    const res = await getDefaultAddress();
    item.value = res.data;
    console.log(item.value);
};
const make = async () => {
    const data = {
        address: String(item.value.id),
        note: String(item.value.tel),
        goods: shopcart.value.map(it => {
            return {
                id: String(it.id),
                count: String(it.number),
                selected: true
            }
        })
    };
    store.order = true;
    console.log(data);
    console.log(JSON.stringify(data));
    const res = await makeOrder(JSON.stringify(data));
    console.log(res);
    store.order = true;
    showToast({
        message: res.msg
    });
    store.clearShopcart();
    if (res.code == 1) {
        router.replace({
            name: "订单详情",
            params: {
                id: 0
            }
        })
    }
};
const test = () => {
    console.log(shopcart.value);
};
</script>

<style scoped>
.attr {
    width: 40%;
    text-align: start;
    color: black;
    font-weight: bold;
}

.info {
    width: 50%;
    text-align: start;
}

.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

.green {
    color: green;
}

.total {
    font-size: 15px;
    color: gray;
    width: 80%;
    text-align: end;
    margin-top: 30px;
}

.content {
    margin: 5px
}
</style>
<template>
    <div class="container">
        <div class="item green title" style="margin-bottom: 2px;">
            订单详情
        </div>
        <div class="item">
            <van-cell>
                <div class="flex" style="width: 80%;">
                    <div class="attr">收货人</div>
                    <div class="info">{{ info.address_name }}</div>
                </div>
                <div class="flex" style="width: 80%;">
                    <div class="attr">收货人电话</div>
                    <div class="info">{{ info.address_tel }}</div>
                </div>
                <div class="flex" style="width: 80%;">
                    <div class="attr">收货地址</div>
                    <div class="info">{{ info.address_area }}</div>
                </div>
                <div class="flex" style="width: 80%;">
                    <div class="attr">详细收货地址</div>
                    <div class="info">{{ info.address_detail }}</div>
                </div>
                <div class="flex" style="width: 80%;">
                    <div class="attr">总金额</div>
                    <div class="info">{{ info.price }}&nbsp;元</div>
                </div>
                <div class="flex" style="width: 80%;">
                    <div class="attr">订单创建时间</div>
                    <div class="info">{{ info.create_time }}</div>
                </div>
                <div class="flex" style="width: 80%;">
                    <div class="attr">订单状态</div>
                    <div :class="info.is_cancel == 1 ? 'infoCancel' : 'infoWaiting'">
                        {{ info.is_cancel == 1 ? "已取消" : "待支付" }}
                    </div>
                </div>
            </van-cell>
        </div>
        <div class="item green title" style="margin-bottom: 2px;">
            订单商品
        </div>
        <div class="item" v-for="item in info.user_order_goods" :key="item">
            <van-swipe-cell>
                <div class="flex">
                    <div class="icon">
                        <img class="icon" :src="item.goods_goods.image">
                    </div>
                    <van-cell>
                        <div class="flex">
                            <div class="attr">商品名称</div>
                            <div class="info">{{ item.goods_goods.name }}</div>
                        </div>
                        <div class="flex">
                            <div class="attr">购买数量</div>
                            <div class="info">{{ item.count }}</div>
                        </div>
                        <div class="flex">
                            <div class="attr">总金额</div>
                            <div class="info">{{ item.price }}</div>
                        </div>
                        <div class="flex">
                            <div class="attr">订购时间</div>
                            <div class="info" style="font-size: 10px;">{{ item.create_time }}</div>
                        </div>
                    </van-cell>
                </div>
            </van-swipe-cell>
        </div>
        <div class="flex-1" v-show="info.is_cancel == 0"
            style="text-align: center;padding: 0;height: 80px;margin: 5px 5px 0;">
            <van-button type="primary" style="width: 100%;height: 35px;">
                支付
            </van-button>
            <van-button type="danger" style="width: 100%;height: 35px;" @click="del">
                取消订单
            </van-button>
        </div>
    </div>
</template>

<script setup>
import { deleteOrder, getOrders } from "@/api/shop";
import { showToast } from "vant";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const info = ref({})

onMounted(() => {
    getList();
});
const getList = async () => {
    const res = await getOrders();
    info.value = res.data[route.params.id];
    console.log(res);
    console.log(info.value);
};
const del = async () => {
    const res = await deleteOrder({
        id: info.value.id
    });
    console.log(res);
    showToast({
        message: res.msg
    });
    setTimeout(() => {
        history.back();
    }, 666);
}; 
</script>

<style scoped>
.icon {
    height: 120px;
    width: 120px;
}

.attr {
    width: 50%;
    text-align: start;
    color: black;
    font-weight: bold;
}

.info {
    width: 70%;
    text-align: start;
    font-size: 13px;
}

.title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

.green {
    color: green;
}

.infoCancel {
    width: 70%;
    text-align: start;
    font-size: 13px;
    color: red;
    font-weight: bold;
}

.infoWaiting {
    width: 70%;
    text-align: start;
    font-size: 13px;
    color: rgb(0, 220, 0);
    font-weight: bold;
}

/* .delete-button {
    height: 100%;
} */
</style>
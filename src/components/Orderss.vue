<template>
    <div class="container">
        <div class="item" v-for="(info, index) in list" :key="index" @click="inf(index)">
            <van-swipe-cell>
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
                        <div class="attr">商品数量</div>
                        <div class="info">{{ info.user_order_goods.length }}</div>
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
                <!-- <template #right>
                    <div class="" style="height: 100%;">
                        <van-button square text="取消订单" type="danger" @click="del(info.id)" style="height: 100%;" />
                    </div>
                </template> -->
            </van-swipe-cell>
        </div>
    </div>
</template>

<script setup>
import { getOrders, deleteOrder } from "@/api/shop";
import { showToast } from "vant";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const list = ref([]);

onMounted(() => {
    getList();
});

const getList = async () => {
    const res = await getOrders();
    list.value = res.data;
    console.log(list.value);
};
// const del = async (id) => {
//     const res = await deleteOrder({
//         id: id
//     });
//     console.log(res);
//     showToast({
//         message: res.msg
//     });
//     getList();
// };
const inf = (id) => {
    router.push({
        name: "订单详情",
        params: {
            id: id
        }
    });
};
</script>

<style scoped>
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
</style>
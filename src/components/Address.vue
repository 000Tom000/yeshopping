<template>
    <div class="container">
        <div class="item" v-for="item in list " :key="item">
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
                <template #right>
                    <div class="flex-1" style="height: 100%;">
                        <van-button square text="删除" type="danger" class="delete-button" @click="del(item.id)" />
                        <van-button square text="修改" type="primary" class="delete-button" @click="write(item)" />
                    </div>
                </template>
            </van-swipe-cell>
        </div>
        <div class="item" style="text-align: center;color: rgb(39, 39, 255);padding: 10px;" v-if="state"
            @click="state = !state">
            <van-icon name="plus" />新增收货地址
        </div>
        <div class="item" style="text-align: center;" v-if="!state">
            <h3 style="padding: 0;margin: 5px;text-align: center;">新增收货地址</h3>
            <van-cell>
                <van-form>
                    <van-field v-model="insertForm.name" label="收货人" placeholder="请输入收货人" />
                    <van-field v-model="insertForm.tel" label="收货人电话" placeholder="请输入收货人电话" />
                    <van-field v-model="insertForm.area" label="收货地址" placeholder="请输入收货地址" />
                    <van-field v-model="insertForm.detail" label="详情地址" placeholder="请输入详情地址" />
                </van-form>
            </van-cell>
            <van-button type="primary" @click="add" style="height: 40px;">添加收货地址</van-button>
        </div>
        <van-dialog v-model:show="show" title="修改收货地址" show-cancel-button @confirm="confirm">
            <van-cell>
                <van-form>
                    <van-field v-model="currentAddress.name" label="收货人" placeholder="请输入收货人" />
                    <van-field v-model="currentAddress.tel" label="收货人电话" placeholder="请输入收货人电话" />
                    <van-field v-model="currentAddress.area" label="收货地址" placeholder="请输入收货地址" />
                    <van-field v-model="currentAddress.detail" label="详情地址" placeholder="请输入详情地址" />
                </van-form>
            </van-cell>
        </van-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { addAddress, deleteAddress, getAddressList } from "@/api/shop";
import { showDialog, showToast } from "vant";

const list = ref([]);
const insertForm = ref({
    name: "",
    tel: "",
    area: "",
    detail: ""
});
const state = ref(true);
const show = ref(false);
const currentAddress = ref({});

onMounted(() => {
    getList();
});

const getList = async () => {
    const res = await getAddressList();
    list.value = res.data.reverse();
    console.log(list.value);
};
const del = (id) => {
    const DO = async () => {
        const res = await deleteAddress({
            id: id
        });
        showToast({
            message: res.msg
        })
        getList();
    };
    showDialog({
        message: "是否确认删除该收货地址？",
        showCancelButton: true
    }).then(() => {
        DO();
    }).catch(() => {
        showToast({
            message: "取消删除"
        });
    });
};
const write = (item) => {
    show.value = !show.value;
    currentAddress.value = item;
};
const confirm = async () => {
    const res = await addAddress(currentAddress.value);
    console.log(res);
    console.log(currentAddress);
};
const add = async () => {
    const res = await addAddress(insertForm.value);
    console.log(res);
    showToast({
        message: res.msg
    });
    getList();
};
</script>

<style scoped>
.attr {
    width: 40%;
    text-align: start;
    /* color: black;
    font-weight: bold; */
}

.info {
    width: 50%;
    text-align: start;
}

.delete-button {
    height: 50%;
    text-align: left;
}
</style>
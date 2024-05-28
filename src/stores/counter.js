import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from "vue-router";

export const useCounterStore = defineStore('counter', () => {
  const goodsList = ref([]);
  const order = ref(false);
  const state = ref(0);
  const count = ref(0);
  const currentRoute = computed(()=>{
    return useRoute();
  });
  const shopcart = ref([]);
  const initShopCart = () => {
    const sc = localStorage.getItem("shopcart");
    if(sc){
      shopcart.value = JSON.parse(sc);
    }
    // shopcart.value.forEach(item=>{
    //   item["total"] = (eval(item.number) * eval(item.price)).toFixed(2);
    // })
    // console.log(shopcart.value);
  };
  const setGoodsIntoShopCart = (good) => {
    var flag = false;
    for(let i = 0; i < shopcart.value.length ;i++){
      if(shopcart.value[i].id == good.id){
        shopcart.value[i].number = Number(shopcart.value[i].number) + Number(good.number);
        flag = true;
        break;
      }
    }
    if(!flag){
      shopcart.value.push(good);
    }
    localStorage.setItem("shopcart", JSON.stringify(shopcart.value));
  };
  const addGoodIntoShopcart = (good) => {
    var flag = false;
    for(let item of shopcart.value){
      if(item.name == good.name){
        item.number ++;
        flag = true;
        break;
      }
    }
    if(!flag){
      shopcart.value.push(good);
    }
    // console.log(shopcart.value);
    localStorage.setItem("shopcart", JSON.stringify(shopcart.value));
  }; 
  const subGoodIntoShopcart = (good) => {
    for(let i = 0; i < shopcart.value.length ;i++){
      if(shopcart.value[i].name == good.name){
        shopcart.value[i].number --;
        if(shopcart.value[i].number == 0){
          shopcart.value.splice(i, 1);
        }
        break;
      }
    }
    // console.log(shopcart.value);
    localStorage.setItem("shopcart", JSON.stringify(shopcart.value));
  }; 
  const clearShopcart = () => {
    localStorage.setItem("shopcart", JSON.stringify([]));
  };
  const setGoodsList = (list) => {
    goodsList.value = list;
  };
  return { 
    goodsList,
    order,
    count,
    state,
    currentRoute,
    shopcart,
    initShopCart,
    addGoodIntoShopcart,
    subGoodIntoShopcart,
    setGoodsIntoShopCart,
    clearShopcart,
    setGoodsList
  };
});

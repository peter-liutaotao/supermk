import {
  ADD_COUNTER,
  ADD_TO_CHAR,
} from "@/store/mutation-type";


export default {
  addCart(context,payLoad){
    //payLoad新添加的商品
    // let oldProduct=null;
    // for(let item of state.cartList){
    //   if(item.iid===payLoad.iid){
    //     oldProduct=item
    //   }
    // }
    return new Promise(((resolve, reject) => {
      let product=context.state.cartList.find(item=>item.iid === payLoad.iid)
      if(product){
        context.commit('ADD_COUNTER',product)
        resolve('当前的商品数量+1')
      }else {
        payLoad.count=1
        context.commit('ADD_TO_CHAR',payLoad)
        resolve('添加了新的商品')
      }
    }))
  }
}


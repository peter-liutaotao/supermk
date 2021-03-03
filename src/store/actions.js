import {ADD_COUNTER, ADD_TO_CART} from './mutations-type'
export default {
  addCart(context,payload) {
    // let oldProduct = null
    // for(let item  of state.cartList) {
    //   if(item.iid == payload.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => {
        return item.iid == payload.iid
      })
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品已存在购物车中，数目加1')
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('当前商品已添加到购物车')
      }
    })
    
  }
}
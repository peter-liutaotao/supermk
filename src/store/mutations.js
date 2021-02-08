import {
  ADD_COUNTER,
  ADD_TO_CHAR,
} from "@/store/mutation-type";


export default {
  ADD_COUNTER(state,payload){
    payload.count++
  },
  ADD_TO_CHAR(state,payload){
    payload.checked=true
    state.cartList.push(payload)
  }
}

<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center" >购物车({{length}})</div>
    </NavBar>
    <CartList ></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>

import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import NavBar from "@/components/common/navbar/NavBar";

import {mapGetters} from 'vuex'

export default {
name: "Cart",
  components:{
    CartBottomBar,
    NavBar,
    CartList,

  },
  computed:{
  // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  },
}
</script>

<style scoped>
.cart {
  /*position: relative;*/
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}


</style>

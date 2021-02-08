<template>
  <div class="cart">
    <scroll class="content" ref="scroll">
      <CartListItem v-for="(item,index) in list"
                    :key="index"
                    :item-info="item">{{item}}>
      </CartListItem>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll/Scroll";

import CartListItem from "@/views/cart/childComps/CartListItem";

import {mapGetters} from 'vuex'


export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      list: 'cartList'
    })
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.content{
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>

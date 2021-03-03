<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList></CartList>
    <!-- 底部汇总 -->
    <CartBottomBar></CartBottomBar>
    <CartImage v-show='cartLength == 0'></CartImage>
  </div>
</template>

<script>
//子组件
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import CartImage from './childComps/CartImage.vue'
//公共
import NavBar from "components/common/navbar/NavBar";
//外部
import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    CartImage
  },
  created() {
    PubSub.subscribe("del", (del, data) => {
      console.log(data);
    });
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }
    ...mapGetters(["cartLength", "cartList"])
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" scoped>
.cart {
  position: relative;
  height: 100vh;
}
.nav-bar {
  background: #e54346;
  color: #fff;
}
</style>

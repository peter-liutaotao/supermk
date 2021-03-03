<template>
  <div class="cart-image">
    <img src="~assets/img/cart/cart.png" alt="">
    <ul class="cart-ul">
      <li class="cart-text">购物车空空的哦~，去看看心仪的商品吧~</li>
      <li><a href="javascript:;" class="shopping" @click='jump'>去购物 ></a></li>
    </ul>
  </div>
</template>
 
<script>
export default {
  name: "CartImage",
  components: {

  },
  data () {
   return {}
  },
   methods:{
     jump() {
       this.$router.push({
      path: '/home'
    })
     }
   }
}
</script>
 
<style lang="css" scoped>
.cart-image {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-35%,-50%);
}
.cart-image img {
  width: 70%;
}
.cart-ul {
list-style: none;
}
.cart-text {
  font-size: 14px;
}
.shopping {
  font-size: 12px;
  color: #e54346;
  text-decoration-line: underline;
}
</style>
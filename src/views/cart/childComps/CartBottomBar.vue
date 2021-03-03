<template>
  <div class="bottom-bar">
    <div class="check-content">
    <CheckButton class="check-buttom" 
    :isChecked='isSelectAll'
    @click.native = 'checkClick'
    ></CheckButton>
    <span>全选</span>
    </div>

    <div class="total-price">
      合计： {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算：({{calcLength}})
    </div>
  </div>
</template>
 
<script>
import CheckButton from 'components/content/checkButton/CheckButtom.vue'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    calcLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll() {
      //filter方法
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length == 0) {
        return false
      }
      // find方法
      return !this.$store.state.cartList.find(item => !item.checked)

      //遍历方法
      // for(let item of this.$store.state.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    }
  },
  data () {
   return {}
  },
   methods:{
     checkClick() {
       if(this.isSelectAll) {
        this.$store.state.cartList.forEach(element => element.checked = false);
       }else {
         this.$store.state.cartList.forEach(element => element.checked = true);
       }
     },
     calcClick() {
       if(!this.isSelectAll) {
         this.$toast.show('请选择购买的商品', 2000)
       }
       if(this.$store.getters.cartLength == 0 ) {
          this.$toast.show('购物车没有商品喔', 2000)
       }
       
     }
   }
}
</script>
 
<style lang="css" scoped>
.bottom-bar {
  position: relative;
  display: flex;
  background-color: #eee;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
  color: #e2231a;
}
.check-buttom {
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.total-price {
  flex: 1;
  margin-left: 30px;
  color: #e2231a;
  font-family: verdana;
}
.calculate {
  width: 90px;
  color: #fff;
  text-align: center;
  font-family: Microsoft YaHei;
  background: #e54346;
}
</style>
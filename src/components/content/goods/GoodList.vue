<template>
  <div class="goods">
   
    <GoodsListItem v-for="(item,index) in goods" :key=index :GoodItems='item'>
      
    </GoodsListItem>
  </div>
</template>
 
<script>
import GoodsListItem from './GoodListItem'
export default {
  name: "GoodList",
  components: {
  GoodsListItem
  },
   props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
   return {}
  },
   methods:{}
}
</script>
 
<style lang="css" scoped>
.goods {
  display: flex;
  flex-wrap: wrap ;
  justify-content: space-around;
  padding: 2px;
}
</style>
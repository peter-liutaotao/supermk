<template>
  <div class="goods-item" @click='itemClick'>
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{GoodItems.title}}</p>
      <span class="price">{{GoodItems.price}}</span>
      <span class="collect">{{GoodItems.cfav}}</span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "GoodListItem",
  props: {
    GoodItems: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.GoodItems.img || this.GoodItems.image || this.GoodItems.show.img 
    }
  },
  data () {
   return {}
  },
   methods:{
   imageLoad(){
    this.$bus.$emit('itemImageLoad')
  },
  itemClick() {
    PubSub.publish('del', '11111')
    // this.$router.push('/detail/'+this.GoodItems.iid)
    this.$router.push({
      path: '/detail',
      query: {
        iid: this.GoodItems.iid
      }
    })
    
  }
   }
}
</script>
 
<style lang="css" scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

}
</style>
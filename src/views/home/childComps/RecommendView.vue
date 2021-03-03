<template>
  <div class="recommend">
    <div v-for='(item,index) in recommends' :key='index' class="recommenditems">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type:Array,
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
.recommend {
  width: 100%;
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommenditems {
  flex: 1;
}
.recommenditems img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
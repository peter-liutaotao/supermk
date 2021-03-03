<template>
  <div class="cate-content">
    <ContentList v-for="(item, index) in TabContent" 
    :key="index" :list='item'
    class="content-list"
    ></ContentList>
    <TabControl  :titles="['流行', '新款', '精选']"  @tabClick='goodClick'></TabControl>
    <GoodList :goods='tabbarInfo'></GoodList>
  </div>
</template>
 
<script>
import ContentList from './ContentList'
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodList from "components/content/goods/GoodList.vue";

export default {
  name: "CateContent",
  props: {
    TabContent: {
      type: Array,
      default() {
        return []
      }
    },
    tabbarInfo: {
      type: Array,
      default() {
        return []
      }
    },
   
  },
  
  components: {
    ContentList,
    TabControl,
    GoodList
  },
  data () {
   return {}
  },
   methods:{
     goodClick(index) {
       this.$emit('tabClick',index)
     }
   }
}
</script>
 
<style lang="css" scoped>


</style>
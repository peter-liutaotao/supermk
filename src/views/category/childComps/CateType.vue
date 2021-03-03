<template>
<Scroll class="cate-scroll" ref='scroll'>
  <div class="cate-list">
    <div class="cate-list-item" 
    v-for="(item, index) in typeList" :key='index'
    @click='itemClick(index,item.maitKey,item.miniWallkey)'
    :class="{currentAcitve: currentIndex == index}"
    >
    {{item.title}}
    </div>
  </div>
</Scroll>
</template>
 
<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CateType",
  props: {
    typeList: {
      type: Array,
      default() {
        return []
      }
    },
     scroll: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
  Scroll
  },
  data () {
   return {
     currentIndex:0
   }
  },
   methods:{
     itemClick(index,maitKey,miniWallkey) {
       this.currentIndex = index
       this.$emit('selectItem', maitKey,miniWallkey)
       this.scroll.refresh()
        this.scroll.scrollTo(0, 0,500);
     }
   }
}
</script>
 
<style lang="css" scoped>
.cate-scroll {
  height: 100%;
  width: 100px;
}
.cate-type {
  background-color: #f2f2f2;
}
.cate-list-item {
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}
.currentAcitve{
 font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
}
</style>
<template>
  <div class="content-list">
    <a :href="list.link" class="abc">
    <img :src="list.image" alt="" class="item-image" @load='imgload'>
    <span class="item-title">{{list.title}}</span>
    </a>
  </div>
</template>
 
<script>
export default {
  name: "ContentList",
  props: {
    list: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {

  },
  data () {
   return {}
  },
   methods:{
     imgload() {
       this.$bus.$emit('imgLoad')
     }
   }
}
</script>
 
<style lang="css" scoped>
.content-list {
  text-align: center;
  width: 33.3%;
  display: inline-block;
  padding: 10px 10px;
}

.abc {
  display: flex;
  flex-direction: column;
}
  .item-image {
    width: 80%;
    margin-left: 8px;
  }

  .item-title {
    font-size: 12px;
    margin-top: 15px;
  }
</style>
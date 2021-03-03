<template>
  <div class="toast" v-show='isShow'>
    {{message}}
  </div>
</template>
 
<script>
export default {
  name: "Toast",
  components: {

  },
  data () {
   return {
     message: '',
     isShow: false
   }
  },
   methods:{
     show(message='你好彭于晏', duration=2000) {
       this.message = message
       this.isShow = true
       setTimeout(() => {
         this.message = ''
       this.isShow = false
       },duration)

     }
   }
}
</script>
 
<style lang="css" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  padding: 8px 10px;
  background-color: rgba(0,0,0,.8);
  z-index: 999;
}
</style>
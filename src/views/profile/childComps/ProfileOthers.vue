<template>
  <div class="profile-other">
    <div class="other-info">
      <div class="service">
        <img src="~assets/img/profile/service.png" alt="">
        <div>客户服务</div>
      </div>
       <div class="reserve">
        <img src="~assets/img/profile/reserve.png" alt="">
        <div>我的预约</div>
      </div>
       <div class="question">
        <img src="~assets/img/profile/question.png" alt="">
        <div>我的建议</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "ProfileOthers",
  components: {

  },
  data () {
   return {}
  },
   methods:{}
}
</script>
 
<style lang="css" scoped>
.other-info {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.other-info>div {
  text-align: center;
  font-size: 10px;
}
.other-info>div img {
  margin: 12px 5px 10px 5px;
  width: 45px;
}
</style>
<template>
  <div class="profile-other">
    <div class="money">
      <div class="item">NaN</div>
      <div>优惠券</div>
    </div>
    <div class="red-paper">
      <div class="item">NaN</div>
      <div>红包</div>
    </div>
    <div class="pocket">
      <img src="~assets/img/profile/pocket.png" alt="">
      <div>全部资产</div>
      <div class="strange"></div>
      <div class="trangle"></div>
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
.profile-other {
  width: 100%;
  padding: 20px 20px;
  display: flex;
  text-align: center;
   border-bottom: 6px solid rgba(92, 56, 56, 0.07);
}
.money, .red-paper, .pocket  {
  flex: 1;
  font-size: 13px;
  line-height: 20px;
}
.item {
  margin-bottom: 5px;
  height: 30px;
}
.money {
  flex: 1;
}
.red-paper {
flex: 1;
}
.pocket {
  position: relative;
}
.pocket img{
width: 30px;
height: 30px;
}
.strange {
  position: absolute;
  left: 10px;
  top: 55%;
  transform:translate(-3px,-60%);
  width: 3px;
  height: 50px;
  background-color: rgba(0, 0, 0, .08);
}
.trangle {
  position: absolute;
   left: 10px;
  top: 50%;
  transform:translateY(-60%) ;
  width: 0;
  height: 0;
  border-width: 5px 30px 5px 5px;
  border-style: solid;
  border-color:transparent  transparent transparent rgba(0, 0, 0, .08);
}
</style>
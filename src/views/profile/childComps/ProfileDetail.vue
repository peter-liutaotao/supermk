<template>
  <div class="profile-detail">
    <div class="detail-item">
      <img src="~assets/img/profile/pay.png" alt="">
      <div>{{title[0]}}</div>
    </div>
    <div class="detail-item">
      <img src="~assets/img/profile/recive.png" alt="">
      <div>{{title[1]}}</div>
    </div>
    <div class="detail-item">
      <img src="~assets/img/profile/replace.png" alt="">
      <div>{{title[2]}}</div>
    </div>
    <div class="detail-item">
      <img src="~assets/img/profile/pay.png" alt="">
      <div>{{title[3]}}</div>
       <div class="strange"></div>
      <div class="trangle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileDetail",
  props: {
  
    
  },
  components: {},
  computed: {},
  data() {
    return {
        title: ["待付款", "待收货", "退还/售后", "全部订单"]
      
    };
  },
  methods: {}
};
</script>

<style lang="css" scoped>
.profile-detail {
  display: flex;
  padding: 10px 0;
  padding-bottom: 12px;
  border-bottom: 6px solid rgba(92, 56, 56, 0.07);
  
}
.detail-item {
  flex: 1;
  font-size: 13px;
  color: #262626;
  text-align: center;
}
.detail-item img{
  width: 35%;
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
.detail-item:last-child {
  position: relative;
}
</style>

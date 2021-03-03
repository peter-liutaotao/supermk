<template>
  <div class="ProfileInfo">
    <div class="user-info">
      <div class="user"></div>
      <div class="user-img"></div>
      <div class="appinfo">
        <div class="user-name">
          <span>大头熊二</span>
          <div class="vip"></div>
          <img src="~assets/img/profile/set.png" alt="" />
        </div>
        <div class="tip">
          <div class="level">V1</div>
          <div class="level-number">积分:NaN</div>
        </div>
      </div>
    </div>
    <div class="store">
      <div class="good-collect">
        <div>NaN</div>
        <span>商品收藏</span>
      </div>
      <div class="shop-collect">
        <div>NaN</div>
        <span>店铺收藏</span>
      </div>
      <div class="track">
        <div>NaN</div>
        <span>我的足迹</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfo",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" scoped>
.user-info {
  position: relative;
  width: 100%;
  padding-top: 20px;
  display: flex;
}
.user-img {
  width: 50px;
  height: 50px;
  margin-left: 30px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid #fff;
  border-radius: 60px;
  background: url("~assets/img/profile/mine.jpeg") 0 0;
  background-size: 50px 50px;
}
.appinfo {
  margin-left: 10px;
  color: #fff;
  flex: 1;
}
.vip {
  display: inline-block;
  margin: -5px 0 0 10px;
  background: url("~assets/img/profile/bz.png") no-repeat;
  background-position: 0 5px;
  background-size: 100px;
  width: 20px;
  height: 25px;
  vertical-align: middle;
}
.user-name img {
  display: inline-block;
  position: absolute;
  right: 15px;
  width: 20px;
  height: 20px;
}
.tip {
  float: left;
  margin-top: 10px;
}
.level {
  float: left;
  background: rgba(0, 0, 0, 0.16);
  max-width: 100px;
  height: 16px;
  line-height: 16px;
  padding: 0 8px;
  margin: 0 8px 0 0;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: JDZH-Regular;
}
.level-number {
  float: left;
  background: rgba(0, 0, 0, 0.16);
  max-width: 100px;
  height: 16px;
  line-height: 16px;
  padding: 0 8px;
  margin: 0 8px 0 0;
  border-radius: 10px;
  font-size: 10px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: JDZH-Regular;
}
.store {
  display: flex;
  justify-content: space-around;
  position: relative;
  top: 10px;
  color: #fff;
  text-align: center;
}
.good-collect {
  font-size: 12px;
  line-height: 24px;
  display: block;
}
.shop-collect {
  font-size: 12px;
  line-height: 24px;
  display: block;
}
.track {
  font-size: 12px;
  line-height: 24px;
  display: block;
}
</style>

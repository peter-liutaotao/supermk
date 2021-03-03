<template>
  <div class="profile-recomm">
    <div class="recomm-title">
      <span class="title-text">为你推荐</span>
    </div>
    <GoodList :goods=showGoods></GoodList>
  </div>
</template>

<script>
import GoodList from "components/content/goods/GoodList.vue";
export default {
  name: "ProfileRecommend",
  components: {
    GoodList
  },
  props: {
    showGoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style lang="css" scoped>
.recomm-title {
  background-color: rgba(92, 56, 56, 0.07);
  position: relative;
  margin: 20px 0px;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.recomm-title::after {
  content: "";
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background-color: #ccc;
  width: 100%;
  height: 1px;
  right: 0;
  top: 0;
  left: 0px;
  right: 0px;
  top: 50%;
}
.title-text {
  z-index: 2;
  position: relative;
  padding: 0 20px;
  background-color: #f7f7f7;
}
.title-text::after,
.title-text::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 2px;
  margin-top: -2px;
  width: 4px;
  height: 4px;
  background-color: #ccc;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.title-text::before {
  left: 0;
}
</style>

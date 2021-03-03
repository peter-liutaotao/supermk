<template>
  <NavBar class="nav-bar">
    <div slot="left" @click='backClick'><img src="~assets/img/common/back.svg" alt="" /></div>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        :key="index"
        class="title-item"
        :class="{ active: index == currentIndex }"
        @click="divClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div slot="right" class="right">.....</div>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    divClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="css" scoped>
.nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.nav-bar img {
  margin-top: 10px;
}
.title {
  padding: 0 15px;
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.right {
  margin-top: -3px;
  font-size: 20px ;
}
</style>

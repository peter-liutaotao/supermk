<template>
  <div class="profile-nav">
    <NavBar class="navbar">
      <h3 slot="center">我的闲转</h3>
      <span slot="right" class="more">....</span>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "ProfileNavbar",
  components: {
    NavBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" scoped>
.navbar {
  background: #e54346;
  color: #fff;
  font-size: 13px;
  height: 44px;
}
.more {
  font-size: 20px;
}
</style>

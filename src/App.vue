<template>
  <div id="app">
     <!-- exclude不包括哪几个组件-->
  
      <router-view/>
   
    <MainTabBar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";


export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>

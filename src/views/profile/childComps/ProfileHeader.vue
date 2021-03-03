<template>
  <div class="header">
    <ProfileInfo class=""></ProfileInfo>
  </div>
</template>
 
<script>
import ProfileInfo from './ProfileInfo'
export default {
  name: "ProfileHeader",
  components: {
    ProfileInfo
  },
  data () {
   return {}
  },
   methods:{}
}
</script>
 
<style lang="css" scoped>
.header {
  background: url('~assets/img/profile/profileBgc.png')  no-repeat scroll 0 0/cover;;
  height: 150px;
}
</style>
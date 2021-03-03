<template>
  <div class="profile-content">
    <ProfileDetail></ProfileDetail>
    <ProfileProperty></ProfileProperty>
    <ProfileOthers></ProfileOthers>
  </div>
</template>

<script>
import ProfileDetail from "./ProfileDetail";
import ProfileProperty from './ProfileProperty'
import ProfileOthers from './ProfileOthers'
export default {
  name: "ProfileContent",
  components: {
    ProfileDetail,
    ProfileProperty,
    ProfileOthers
  },
  props: {
   
    
  },
  data() {
    return {
    
    };
  },
  methods: {}
};
</script>

<style lang="css" scoped>
.profile-content {
  position: relative;
  margin-top: -10px;
  padding-top: 8px;
  background-color: #fff;
  border-radius: 12px;
}
</style>

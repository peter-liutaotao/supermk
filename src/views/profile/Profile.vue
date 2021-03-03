<template>
  <div class="profile">
    <ProfileNavbar></ProfileNavbar>
    <Scroll
      class="scroll"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadmore"
    >
      <ProfileHeader></ProfileHeader>
      <ProfileContent></ProfileContent>
      <ProfileRecommend :showGoods='showGoods'></ProfileRecommend>
    </Scroll>
    <BackTop @touch.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
//子组件
import ProfileNavbar from "./childComps/ProfileNavbar";
import ProfileHeader from "./childComps/ProfileHeader";
import ProfileContent from "./childComps/ProfileContent";
import ProfileRecommend from "./childComps/ProfileRecommend";
//公共
import Scroll from "components/common/scroll/Scroll.vue";
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils.js";
import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
export default {
  name: "Profile",
  components: {
    ProfileNavbar,
    ProfileHeader,
    ProfileContent,
    ProfileRecommend,
    Scroll
  },
  mixins: [ backTopMixin ],
  data() {
    return {
      goods: {
        new: { page: 2, list: [] }
      },
    };
  },
  computed: {
    showGoods() {
      return this.goods.new.list
    }
  },
  created() {
    this._getHomeGoods("new");
  },
  mouted() {
    //监听图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      this.$refs.scroll.refresh()
    });
  },
  methods: {
    _getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
    loadmore() {
      this._getHomeGoods("new");
      this.$refs.scroll.refresh()
    },
    contentScroll(position) {
       this.listenShowBackTop(position);
    }
  }
};
</script>

<style lang="css" scoped>
.profile {
  position: relative;
  background: var(--color-background);
  height: 100vh;
}
.scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>

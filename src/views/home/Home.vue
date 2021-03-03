<template>
  <div id="home">
    <NavBar class="home-nav"><h2 slot="center">闲转</h2></NavBar>
     <TabControl
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref='tabControl1'
        class="tab-control"
        v-show="isTabFixed"
      ></TabControl>
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp='loadMore'
    >
      <HomeSwiper :banners="banners" @SwiperImageLoad='SwiperImageLoad'></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <Feature></Feature>
       <TabControl
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref='tabControl2'
      ></TabControl>
      <GoodList :goods="showGoods"></GoodList>
    </Scroll>
    <!-- native修饰符，当需要监听组件的原生事件时必须加上native  -->
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
//子组件
import HomeSwiper from "views/home//childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView.vue";
import Feature from "./childComps/FeatureView.vue";
//公共
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodList from "components/content/goods/GoodList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
//方法引用
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import {debounce} from 'common/utils.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
//外部
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 593,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
  //已通过mixins进行路由之间的生命周期mounted的混入

  this.tabClick(0)
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //保存y值
    this.saveY = this.$refs.scroll.scrollY();
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    /*事件监听*/
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl2.currentactive = index;
      this.$refs.tabControl1.currentactive = index;
    },
    
    contentScroll(position) {
      //1.判断backtop显示
      this.listenShowBackTop(position)

      //2.判断tabcontrol是否吸顶（position: fixed）
      this.isTabFixed = -(position.y) > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    SwiperImageLoad() {
    //获取tabControl的offsetTop,所有组件都有一个属性$el，获取组件的元素
     this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /* 网络请求 */
    getHomeMultidata() {
      //  1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>

<style lang="css" scoped>
#home {
  position: relative;
  
  height: 100vh;
}
.home-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
   background: #e54346; 
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .content {
  height: calc(100% - 49px);
  overflow: hidden;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>

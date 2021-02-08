<template>
  <div class="home">
    <NavBar class="nav-bar"><div slot="center">购物街</div> </NavBar>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl1"
                class="tab-control"
                v-show="isTabFixed"></TabControl>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScoll"
            :pull-up-load="true"
            @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <HomefeatureView></HomefeatureView>
    <TabControl :titles="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabControl2"
                class="tab-control"></TabControl>
    <GoodsList :goods="showGoods"></GoodsList>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import scroll from "@/components/common/Scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import GoodsListItem from "@/components/content/goods/GoodsListItem";
import backTop from "@/components/content/backTop/backTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomefeatureView from "./childComps/HomefeatureView";

import {getHomeGoods,getHomeMutidata} from "@/network/home";
import {itemListenerMixin,backTopMixin} from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    scroll,
    TabControl,
    GoodsList,
    GoodsListItem,
    backTop,


    HomeSwiper,
    HomeRecommendView,
    HomefeatureView,
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      // result:null
    }
  },
  mixins:[itemListenerMixin,backTopMixin],
  //组件加载完运行，生命周期函数Dom
  created() {
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    getHomeMutidata().then(res=>{
      //轮播图数据请求
      this.banners=res.data.data.banner.list;
      //推荐图片的数据请求
      this.recommends=res.data.data.recommend.list;
    })
  },
  mounted() {
  },
  methods:{
    //商品的加载更多
    getHomeGoods(type){
      const  page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page+=1
        this.$refs.scroll.finishPullUp()
      })
    },
    //事件监听
    tabClick(index){
      switch (index){
        case 0:
          this.currentType='pop'
              break
        case 1:
          this.currentType='new'
              break
        case 2:
          this.currentType='sell'
              break
      }
      //三种类型的切换
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    //上拉加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    //轮播图的切换
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    },
    //切换板块时，回来保存当前的位置
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
      //判断当前哪个图片加载监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
  }
}
</script>

<style scoped>
.home{
  height: 100vh;
  position: relative;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  /*font-weight: 700;*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top:0;*/
  /*z-index: 9;*/
}
.content{
  left: 0;
  right: 0;
  top:44px;
  bottom: 49px;
  overflow: hidden;
  position: absolute;
}
/*.content{*/
/*  height:calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
.tab-control{
  position: relative;
  z-index: 24;
}
</style>

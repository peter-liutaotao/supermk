<template>
  <div id="detail">
    <DetailNavBar @titleClick="titleClick" ref="detailNavBar"></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goodsInfo"></DetailBaseInfo>
      <DetailShopInfo :shop="shopInfo"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></DetailGoodsInfo>
      <DetailParamsInfo
        :itemParams="itemParams"
        ref="params"
      ></DetailParamsInfo>
      <DetailCommentInfo
        :commentInfo="commentInfo"
        ref="comment"
      ></DetailCommentInfo>
      <GoodList :goods="recommends" ref="goodList"></GoodList>
    </Scroll>
     <!-- native修饰符，当需要监听组件的原生事件时必须加上native  -->
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <DetailBottomBar @addCart='addToCart'></DetailBottomBar>
   
  </div>
</template>

<script>
//子组件
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from './childComps/DetailBottomBar.vue'
//公共
import Scroll from "components/common/scroll/Scroll.vue";
import GoodList from "components/content/goods/GoodList.vue";
import { debounce } from "common/utils.js";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { mapActions } from 'vuex'
//请求相关
import { getDetail, getRecommend, Goods } from "network/detail.js";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: null,
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      debounceThemeTopYs: null,
      currentIndex: 0,
 
    };
  },
  created() {
    
    this.iid = this.$route.query.iid;
    // 1.请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //2.取出轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 3.创建商品对象
      this.goodsInfo = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //4。取出店铺信息
      this.shopInfo = data.shopInfo;
      //5. 取出详情数据
      this.detailInfo = data.detailInfo;
      //6.取出参数信息
      this.itemParams = data.itemParams;
      //7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    //在数据传入后对offsetTop计算进行防抖
    this.debounceThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goodList.$el.offsetTop);
    });
  },
  mounted() {
    //已通过mixins进行路由之间的生命周期mounted的混入
  },
  destoryed() {
    //取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad() {
      this.refresh();
      this.debounceThemeTopYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      const positonY = position.y;
      let length = this.themeTopYs.length;
      for(let i = 0; i < length; i++) {
        if(this.currentIndex  !== i && ((i < length - 1 && positonY <= -this.themeTopYs[i] &&
        positonY > -this.themeTopYs[i+1]) || (i === length - 1 && positonY <= -this.themeTopYs[i])
        )) {
          this.currentIndex = i;
          this.$refs.detailNavBar.currentIndex = i
        }
      }
      // if (positonY > -this.themeTopYs[1]) {
      //   this.$refs.detailNavBar.currentIndex = 0;
      // }
      // if (positonY <= -this.themeTopYs[1]) {
      //   this.$refs.detailNavBar.currentIndex = 1;
      // }
      // if (positonY <= -this.themeTopYs[2]) {
      //   this.$refs.detailNavBar.currentIndex = 2;
      // }
      // if (positonY <= -this.themeTopYs[3]) {
      //   this.$refs.detailNavBar.currentIndex = 3;
      // }
      
       //1.判断backtop显示
    this.listenShowBackTop(position)
    },
    addToCart() {
      //获取购物车所需信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid
      
      this.addCart(product).then(res => {
        this.$toast['show'](res); 
      })
    }
  },
};
</script>

<style lang="css" scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
/* .detail-nav{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
} */
.content {
  height: calc(100% - 96px);
  /* position: relative; */
}
</style>

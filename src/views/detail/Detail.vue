<template>
  <div id="detail" >
      <DetailNewBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
      <scroll class="content"
              ref="scroll"
              @scroll="totalScroll"
              :probe-type="3" >
        <DetailSwiper :top-images="topImages"/>
        <DetailBaseInfo :goods="goods"/>
        <DetailShopInfo :shop="shop" />
        <DetailGoodsInfo :detail-info="detailInfo" @detailImageload="detailImageload"/>
        <DetailParamInfo ref="params" :param-info="paramInfo"/>
        <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
        <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </scroll>
    <detail-bottom-bar class="bottom-nav" @addToCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNewBar from "@/views/detail/childComps/DetailNewBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import backTop from "@/components/content/backTop/backTop";
import GoodsList from "@/components/content/goods/GoodsList";
import scroll from "@/components/common/Scroll/Scroll";

import {itemListenerMixin,backTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";


export default {
  name: "Detail",
  components: {
    DetailNewBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    backTop,
    GoodsList,
    scroll,

  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex:0,

      message:'',
      show:false
    }
  },
  created() {
    //home主页传入iid
    this.iid = this.$route.params.iid
    //数据的展示
    getDetail(this.iid).then(res => {
      const data = res.data.result
      //轮播图的切换
      this.topImages = data.itemInfo.topImages
      //商品介绍
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //店铺名的展示
      this.shop = new Shop(data.shopInfo)
      //穿着展示
      this.detailInfo = data.detailInfo
      //商品推荐的展示
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      //导航栏点击切换
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 500)

    })
    //获取评论的数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list
    })
  },
  mounted() {
  },
  destroyed() {
    //无keep-live时activated无法使用
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    //上拉图片加载
    detailImageload() {
      this.itemImgListener()
      this.getThemeTopY()
    },
    //导航栏点击切换
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    //位置移动时导航栏跟着移动
    positionScroll(position) {
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]))
        {
          this .currentIndex=i;
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
    },
    //mixin混入回退顶部的按钮
    totalScroll(position){
      this.positionScroll(position)
      this.contentScoll(position)
    },
    //加入购物车
    addToCart(){
      //获取购物车需要展示的东西
       const product={}
        product.image=this.topImages[0];
        product.title=this.detailInfo.title;
        product.desc=this.detailInfo.desc;
        product.price=this.goods.nowPrice;
        product.iid=this.iid;
        this.$store.dispatch('addCart',product).then(res=>{
          this.$toast.show(res,2000)
        })
    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.content{
  height: calc(100% - 96px);
  position: relative;
}
</style>

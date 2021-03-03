<template>
  <div class="category">
    <NavBar class="category-nav"><h2 slot="center">商品分类</h2></NavBar>
    <div class="content">
      <CateType
      :scroll='scroll'
        :typeList="typeList"
        class="cate-type"
        @selectItem="selectItem"
      ></CateType>
      <div class="category-list">
        <Scroll
          class="contentScroll"
          ref="scroll"
          @scroll="contentScroll"
          :probeType="3"
        >
          <CateContent
            :TabContent="TabContent"
            :tabbarInfo="tabbarInfo"
            @tabClick="tabClick"
          ></CateContent>
        </Scroll>
        <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
      </div>
    </div>
  </div>
</template>

<script>
//子组件
import NavBar from "components/common/navbar/NavBar";
import CateType from "./childComps/CateType";
import CateContent from "./childComps/CateContent";
//公共
import Scroll from "components/common/scroll/Scroll.vue";
import { backTopMixin } from "common/mixin.js";

import { debounce } from "common/utils.js";
//请求
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category.js";
export default {
  name: "Category",
  components: {
    NavBar,
    CateType,
    CateContent,
    Scroll
  },
  mixins: [backTopMixin],
  data() {
    return {
      typeList: [],
      itemMaitKey: 3627,
      TabContent: [],
      type: "pop",
      miniWallkey: 10062603,
      tabbarInfo: [],
      scroll: null
    };
  },
  created() {
    //获取分类信息
    getCategory().then(res => {
      this.typeList = res.data.category.list;
    });
    //获取分类商品信息
    this._getSubcategory();

    //获取商品推荐信息
    this._getCategoryDetail();
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  mounted() {
    this.$bus.$on(
      "imgLoad",
      debounce(() => {
        this.$refs.scroll.refresh();
      })
    ),
      this.$bus.$on(
        "itemImageLoad",
        debounce(() => {
          this.$refs.scroll.refresh();
        },200)
      );
      this.scroll = this.$refs.scroll
  },
  methods: {
    selectItem(maitKey, miniWallkey) {
      this.itemMaitKey = maitKey;
      this.miniWallkey = miniWallkey;
      this._getSubcategory();
      this._getCategoryDetail();
    },
    _getSubcategory() {
      getSubcategory(this.itemMaitKey).then(res => {
        this.TabContent = res.data.list;
      });
    },
    _getCategoryDetail() {
      getCategoryDetail(this.miniWallkey, this.type).then(res => {
        this.tabbarInfo = res;
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.type = "pop";
          break;
        case 1:
          this.type = "new";
          break;
        case 2:
          this.type = "sell";
      }
      this._getCategoryDetail();
    },
    contentScroll(position) {
      this.listenShowBackTop(position);
    }
  }
};
</script>

<style lang="css" scoped>
.category {
  position: relative;
  height: 100vh;
}
.category-nav {
  font-size: 10px;
  background: #e54346;
  color: #fff;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 47px;
  overflow: hidden;
  display: flex;
}
.category-list {
  height: 100vh;
  position: relative;
  flex: 1;
}
.contentScroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 100px;
  overflow: hidden;
}
</style>

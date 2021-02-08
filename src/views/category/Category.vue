<template>
  <div id="category" >
    <NavBar class="nav-bar"><div slot="center">商品分类</div></NavBar>
    <div class="content">
    <TabMenu :categories="categories"
             @selectItem="selectItem">

    </TabMenu>
      <div id="home">
        <scroll id="tab-content"
                :data="[categoryData]"
                ref="scroll"
                :probe-type="3">
          <tab-content-category :subcategories="showSubcategory" ></tab-content-category>
          <tab-control
            :titles="['综合','新品','销量']"
            @tabClick="tabClick"
            ref="tabControl"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>

 import TabMenu from "@/views/category/childComps/TabMenu";
 import TabContentDetail from "@/views/category/childComps/TabContentDetail";
 import TabContentCategory from "@/views/category/childComps/TabContentCategory";


 import Scroll from "@/components/common/Scroll/Scroll";
 import NavBar from "@/components/common/navbar/NavBar";
 import TabControl from "@/components/content/tabControl/TabControl";

 import {getCategory, getSubcategory,getCategoryDetail} from "@/network/category";
 import {POP, SELL, NEW} from "@/common/const"
 import {tabControlMixin,itemListenerMixin} from "@/common/mixin";

 export default {
  name: "Category",
  components:{
    TabMenu,
    TabContentDetail,
    TabContentCategory,

    Scroll,
    NavBar,
    TabControl,
  },
   mixins:[tabControlMixin,itemListenerMixin],
  data(){
    return{
      categoryData:{
      },
      currentIndex:-1,
      categories:[],
      saveY:0,
    }
  },
  created() {
    this._getCategory()
  },
   computed:{
     showSubcategory() {
       //给小图片传值
       if (this.currentIndex === -1) return {}
       return this.categoryData[this.currentIndex].subcategories
     },
     showCategoryDetail() {
       //40张商品数据传值
       if (this.currentIndex === -1) return []
       return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
     },
   },
  methods:{
    _getCategory(){
      //获取三种类型商品的数据
      getCategory().then(res => {
        this.categories = res.data.data.category.list
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            //subcategories表示子类图片，小型图片 subclass+category
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        //默认情况下index=0
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index){

      this.currentIndex=index;

      const mailKey=this.categories[index].maitKey;

      getSubcategory(mailKey).then(res=>{
        //获取分类商品数据
        this.categoryData[index].subcategories=res.data.data
        //...表示多个参数
        this.categoryData={...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })

    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来，下面40个商品展示
        this.categoryData[this.currentIndex].categoryDetail[type] = res.data
        this.categoryData = {...this.categoryData}
      })
    },
    selectItem(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      //三种类型的切换
      this._getSubcategories(index)
    }
  },
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
</script>

<style scoped>
#category {
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  display: flex;
}

#home{
  height: 100vh;
  flex: 1;
  position: relative;
}

#tab-content {
  left: 0;
  right: 0;
  top:0;
  bottom: 49px;
  overflow: hidden;
  position: absolute;
}

.tab-control{
  z-index: 100;
  flex: 1;
  position: relative;

}

</style>

import { debounce } from "common/utils.js";
import BackTop from "components/content/backTop/BackTop.vue";
import {BACKTOP_DISTANCE} from 'common/const.js'
//进行路由之间的混入，相同的代码已放入这里
export const itemListenerMixin  = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh,200)
    //保存监听的回调函数
    this.itemImgListener = () => {
      this.refresh()
    }
    //监听图片加载完成  
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE
    }
  },
}
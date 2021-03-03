<template>
  <div class="wrapper" ref="wrap">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {BACKTOP_DISTANCE} from 'common/const.js'
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //1.创建BScroll对象 
    this.scroll = new BScroll(this.$refs.wrap, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    });
    // 2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }
    // 3.监听滚动到底部事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
    }
   
  },
  methods: {
    //设置默认值可以在参数后面加等于一个值 time=1000
    scrollTo(x, y, time = 1000) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollY() {
      return this.scroll && this.scroll.y;
    }
  }
};
</script>

<style lang="css" scoped></style>

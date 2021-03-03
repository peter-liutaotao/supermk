module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗宽度
      viewportHeight: 667,  //视窗高度
      unitPrecision: 5, //转换时小数位
      viewportUnit: 'vw', //转换的视窗单位，建议vw
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //制定不需要转化的类
      minPixelValue: 1, //小于1px单位的不转换
      mediaQuery: false //允许媒体查询中转化px
    },
  }
}
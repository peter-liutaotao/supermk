import Toast from './Toast'
const obj = {}
// 执行install时默认传入vue
obj.install = function(Vue) {
  // document.body.appendChild(Toast.$el)
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.再使用new方式根据组件构造器的extend对象创建出组件对象
  const toast = new toastConstructor()
  // 3。创建出组件对象后需要手动挂载到某元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el此时就有值，且对应的就是div
  document.body.appendChild(toast.$el)
 Vue.prototype.$toast = toast;
}
export default obj
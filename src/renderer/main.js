import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import paging from './components/paging.vue'; // 导入自己写的组件文件
import searchFrom from './components/searchForm.vue';
import App from './App'
import store from './store'
import router from './router'
// // import 'viewerjs/dist/viewer.css'
// import Viewer from 'v-viewer'
import '@/icons' // icon
import './permission' // permission control
import publicApi from "./utils/public";
import uploader from 'vue-simple-uploader'
import $ from 'jquery'

// import Router from 'vue-router'
// Vue.use($)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
// Vue.use(Viewer)
Vue.use(publicApi)
//配置项
// Viewer.setDefaults({
//   zIndexInline: 9999
// })
Vue.config.productionTip = false

// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
Vue.component('my-pagination', paging); //初始化组件
Vue.component('searchForm', searchFrom); //初始化组件
Vue.use(uploader)
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

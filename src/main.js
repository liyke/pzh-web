import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import JsonExcel from 'vue-json-excel'
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式

Vue.component('downloadExcel', JsonExcel)
Vue.config.productionTip = false
Vue.use(ElementUI);     //全局注入element

Vue.use(Antd)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

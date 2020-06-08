// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from "./store/store";
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })
new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  store: store
})

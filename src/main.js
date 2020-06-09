// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from "./store/store";
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import Axios from "axios";

Vue.config.productionTip = false
Vue.use(Element, {size: 'small', zIndex: 3000})
Vue.prototype.$axios = Axios;

Axios.defaults.baseURL = 'http://localhost:8089';

Axios.interceptors.response.use(function (response) {
  return response
}, function (err) {

  if (err.response.status === 401) {
    Element.Message.error("登录信息过期！请重新登录")
    store.dispatch("signOut")
    return Promise.reject(err)
  }

  return Promise.reject(err);
});

Axios.interceptors.request.use(config => {
    let jwt = store.state.jwt;

    if (jwt) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer:" + jwt;
    }
    return config
  }, error => Promise.reject(error)
)

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>',
  store: store
})

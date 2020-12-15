// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import VueRouter from 'vue-router';
Vue.use(ViewUI);
Vue.use(VueRouter);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import App from './App';
// import Routers from './router';
// import ViewUI from 'view-design';
// import 'view-design/dist/styles/iview.css';
//
// Vue.use(VueRouter);
// Vue.use(ViewUI);
//
// // The routing configuration
// const RouterConfig = {
//   routes: Routers
// };
// const router = new VueRouter(RouterConfig);
//
// new Vue({
//   el: '#app',
//   router: router,
//   render: h => h(App)
// });

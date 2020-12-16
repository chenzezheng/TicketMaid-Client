import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import B from  '@/components/B'
import VueRouter from "vue-router";
import MainPage from "@/components/MainPage";
import DetailPage from "../components/DetailPage";
Vue.use(Router)
Vue.use(VueRouter);
export default new Router({
  routes: [
    {
      path: '/hellword',
      // name: 'HelloWorld',
      name:'HelloWorld',
      component: HelloWorld,
      meta:{
        keepalive:false,
      }
    },
    {
      path:'/B',
      component: B,
      meta:{
        keepalive:false,
      }
    },
    {
      path:'/',
      name:'MainPage',
      component: MainPage,
      meta:{
        keepalive:true,
      }

    },
    {
      path:'/DetailPage',
      name:'DetailPage',
      component: DetailPage,
      meta:{
        keepalive:false,
      }
    }
  ]
})

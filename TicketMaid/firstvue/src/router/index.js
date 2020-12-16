import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import B from  '@/components/B'
import VueRouter from "vue-router";
import MainPage from "@/components/MainPage";
import DetailPage from "../components/DetailPage";
import OrderInfo from "../components/OrderInfo";
import OrderList1 from "../components/OrderList1";
import Location from "../components/Location";
import Mine from "../components/Mine";
import OrderList2 from "../components/OrderList2";
import MyFavorite from "../components/MyFavorite";
import UserNav from "../components/UserNav";
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
    },
    {
      path:'/UserNav',
      name:'UserNav',
      component:UserNav,
      children:[
        {
          path: 'OrderList1',
          name: 'OrderList1',
          component: OrderList1 ,
        },
        {
          path: '/UserNav/OrderInfo/:id',
          name:'OrderInfo',
          component: OrderInfo
        },
        {
          path: '/UserNav/Location',
          name: 'Location',
          component: Location ,
        },
        {
          path: '/UserNav/Mine',
          name: 'Mine',
          component:Mine,
        },
        {
          path: '/UserNav/OrderList2',
          name: 'OrderList2',
          component: OrderList2,
        },
        {
          path: '/UserNav/MyFavorite',
          name: 'MyFavorite',
          component: MyFavorite,
        }
      ],
    }
  ]
})

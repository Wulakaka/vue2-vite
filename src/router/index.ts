import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

Vue.use(VueRouter)

const appName = 'vue2-vite'

export default new VueRouter({
  base: qiankunWindow.__POWERED_BY_QIANKUN__ ? `/micro/${appName}/` : '/',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/image',
      name: 'image',
      component: () => import('../views/ImageView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView/index.vue'),
    },
    {
      path: '/list2',
      name: 'list2',
      component: () => import('../views/ListView2/index.vue'),
    },
    {
      path: '/drag',
      name: 'drag',
      component: () => import('../views/Drag/DragView.vue'),
    },
    {
      path: '/clip',
      name: 'clip',
      component: () => import('../views/ClipView.vue'),
    },
  ],
})

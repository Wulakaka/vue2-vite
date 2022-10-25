import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
// import router from './router'
import routes from './router/routes'
import VueRouter from 'vue-router'

import './assets/main.css'
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'
Vue.use(PiniaVuePlugin)
Vue.use(VueRouter)

let router = null
let instance: null | Vue = null

type Props = object & { container?: HTMLElement }

function render(props: Props = {}) {
  const { container } = props
  router = new VueRouter({
    base: qiankunWindow.__POWERED_BY_QIANKUN__ ? '/micro/vue2-vite/' : '/',
    mode: 'history',
    routes,
  })

  instance = new Vue({
    router,
    pinia: createPinia(),
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') || '#app' : '#app')
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props: Props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  if (instance) {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    router = null
  }
}

// some code
renderWithQiankun({
  mount,
  bootstrap,
  unmount,
  update() {
    console.log('update')
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}

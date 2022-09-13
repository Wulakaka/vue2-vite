// 从测试实用工具集中导入`mount()`方法
// 同时导入你要测试的组件
import { mount } from '@vue/test-utils'
import Counter from '../Counter'
import { describe, expect, it } from 'vitest'
import Vue from 'vue'

describe('Counter', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(Counter)

  it('should render the correct markup', function () {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  it('should has a button', function () {
    expect(wrapper.contains('button')).toBe(true)
  })

  // 模拟用户交互
  it('should increment the count when click the button', function () {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })

  // 检查dom是否更新需要使用async/await
  it('should increment the count text when click the button', async function () {
    expect(wrapper.text()).toContain('1')
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.text()).toContain('2')
  })

  it('will time out', function (done) {
    Vue.nextTick(() => {
      expect(true).toBe(false)
      done()
    })
  })

  // it('will catch the error using done', function (done) {
  //   // 将 Vue 的全局错误处理器设置为 done 回调
  //   Vue.config.errorHandler = done
  //   Vue.nextTick(() => {
  //     expect(true).toBe(false)
  //     done()
  //   })
  // })

  // 使用 promise
  // it('will catch the error using a promise', function () {
  //   return Vue.nextTick().then(function () {
  //     expect(true).toBe(false)
  //   })
  // })

  // 使用 async/await
  // it('will catch the error using async/await', async function () {
  //   await Vue.nextTick()
  //   expect(true).toBe(false)
  // })
})

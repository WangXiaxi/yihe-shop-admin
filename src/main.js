import Vue from 'vue'

import 'flex.css'
import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins

// 全局过滤器
import filters from '@/filters'

import './assets/icons' // icon
import './permission' // permission control
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from '@/utils/ruoyi'
// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from '@/components/Editor'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview'

// 头部标签组件
import VueMeta from 'vue-meta'
// 翻页组件
import AdminPagination from '@/components/AdminPagination'
// pltable
// import plTable from 'el-table'
// import 'el-table/themes/index.css'
// input cleave
import InputCleave from '@/components/AdminForm/InputCleave'
import InputCleaves from '@/components/AdminForm/InputCleaves'
// 图片裁剪
import VueCropper from 'vue-cropper'

// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('ImagePreview', ImagePreview)
Vue.component('AdminPagination', AdminPagination)
Vue.component('InputCleave', InputCleave)
Vue.component('InputCleaves', InputCleaves)
// Vue.use(plTable)
Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
Vue.use(filters)
Vue.use(VueCropper)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: 'small' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        name: 'Home',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/svg-html',
    component: () => import('@/views/error/svg-html'),
    hidden: true
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/free-mall/goods-list/page',
    component: Layout,
    hidden: true,
    permissions: ['admin:public'],
    children: [
      {
        path: 'add',
        component: () => import('@/views/free-mall/goods-list/add'),
        name: 'FreeMallGoodsAdd',
        meta: { title: '添加商品', activeMenu: '/free-mall/goods-list', activeMenuPath: 'FreeMall/FreeMallGoods' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/free-mall/goods-list/edit'),
        name: 'FreeMallGoodsEdit',
        meta: { title: '编辑商品', activeMenu: '/free-mall/goods-list', activeMenuPath: 'FreeMall/FreeMallGoods' }
      }
    ]
  },
  {
    path: '/free-mall/order-list/page',
    component: Layout,
    hidden: true,
    permissions: ['admin:public'],
    children: [
      {
        path: 'add',
        component: () => import('@/views/free-mall/order-list/add'),
        name: 'FreeMallOrderAdd',
        meta: { title: '添加订单', activeMenu: '/free-mall/order-list', activeMenuPath: 'FreeMall/FreeMallOrder' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/free-mall/order-list/edit'),
        name: 'FreeMallOrderEdit',
        meta: { title: '编辑订单', activeMenu: '/free-mall/order-list', activeMenuPath: 'FreeMall/FreeMallOrder' }
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/free-mall/order-list/detail'),
        name: 'FreeMallOrderDetail',
        meta: { title: '订单详情', activeMenu: '/free-mall/order-list', activeMenuPath: 'FreeMall/FreeMallOrder' }
      }
    ]
  },
  {
    path: '/dela-mall/goods-list/page',
    component: Layout,
    hidden: true,
    permissions: ['admin:public'],
    children: [
      {
        path: 'add',
        component: () => import('@/views/dela-mall/goods-list/add'),
        name: 'DelaMallGoodsAdd',
        meta: { title: '添加商品', activeMenu: '/dela-mall/goods-list', activeMenuPath: 'DelaMall/DelaMallGoods' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/dela-mall/goods-list/edit'),
        name: 'DelaMallGoodsEdit',
        meta: { title: '编辑商品', activeMenu: '/dela-mall/goods-list', activeMenuPath: 'DelaMall/DelaMallGoods' }
      }
    ]
  },
  {
    path: '/dela-mall/order-list/page',
    component: Layout,
    hidden: true,
    permissions: ['admin:public'],
    children: [
      {
        path: 'add',
        component: () => import('@/views/dela-mall/order-list/add'),
        name: 'DelaMallOrderAdd',
        meta: { title: '添加订单', activeMenu: '/dela-mall/order-list', activeMenuPath: 'DelaMall/DelaMallOrder' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/dela-mall/order-list/edit'),
        name: 'DelaMallOrderEdit',
        meta: { title: '编辑订单', activeMenu: '/dela-mall/order-list', activeMenuPath: 'DelaMall/DelaMallOrder' }
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/dela-mall/order-list/detail'),
        name: 'DelaMallOrderDetail',
        meta: { title: '订单详情', activeMenu: '/dela-mall/order-list', activeMenuPath: 'DelaMall/DelaMallOrder' }
      }
    ]
  },
  {
    path: '/user-center/user-list/page',
    component: Layout,
    hidden: true,
    permissions: ['admin:public'],
    children: [
      {
        path: 'add',
        component: () => import('@/views/user-center/user-list/add'),
        name: 'UserCenterUserAdd',
        meta: { title: '添加会员', activeMenu: '/user-center/user-list', activeMenuPath: 'UserCenter/UserCenterUser' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/views/user-center/user-list/edit'),
        name: 'UserCenterUserEdit',
        meta: { title: '编辑会员', activeMenu: '/user-center/user-list', activeMenuPath: 'UserCenter/UserCenterUser' }
      }
    ]
  },
  {
    path: '/sys-manage/spec-list/page',
    component: Layout,
    hidden: true,
    permissions: ['admin:public'],
    children: [
      {
        path: 'return',
        component: () => import('@/views/sys-manage/spec-list/return'),
        name: 'SysManageReturn',
        meta: { title: '回车站', activeMenu: '/sys-manage/spec-list', activeMenuPath: 'SysManage/SysManageSpec' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default {
  msg: '操作成功',
  code: 200,
  data: [
    {
      path: '/free-mall',
      name: 'FreeMall',
      hidden: false,
      component: 'Layout',
      alwaysShow: false,
      meta: {
        title: '免费商城',
        noCache: false,
        link: null,
        icon: 'el-icon-menu'
      },
      children: [
        {
          name: 'FreeMallGoods',
          path: 'goods-list',
          hidden: false,
          component: 'free-mall/goods-list/index',
          meta: {
            title: '商品列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'FreeMallOrder',
          path: 'order-list',
          hidden: false,
          component: 'free-mall/order-list/index',
          meta: {
            title: '订单列表',
            noCache: false,
            link: null
          }
        }
      ]
    },
    {
      path: '/sele-mall',
      name: 'SeleMall',
      hidden: false,
      component: 'Layout',
      alwaysShow: false,
      meta: {
        title: '优选商城',
        noCache: false,
        link: null,
        icon: 'el-icon-menu'
      },
      children: [
        {
          name: 'SeleMallGoods',
          path: 'goods-list',
          hidden: false,
          component: 'sele-mall/goods-list/index',
          meta: {
            title: '商品列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'SeleMallOrder',
          path: 'order-list',
          hidden: false,
          component: 'sele-mall/order-list/index',
          meta: {
            title: '订单列表',
            noCache: false,
            link: null
          }
        }
      ]
    },
    {
      path: '/dela-mall',
      name: 'DelaMall',
      hidden: false,
      component: 'Layout',
      alwaysShow: false,
      meta: {
        title: '代理商城',
        noCache: false,
        link: null,
        icon: 'el-icon-menu'
      },
      children: [
        {
          name: 'DelaMallGoods',
          path: 'goods-list',
          hidden: false,
          component: 'dela-mall/goods-list/index',
          meta: {
            title: '商品列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'DelaMallOrder',
          path: 'order-list',
          hidden: false,
          component: 'dela-mall/order-list/index',
          meta: {
            title: '订单列表',
            noCache: false,
            link: null
          }
        }
      ]
    },

    {
      path: '/user-center',
      name: 'UserCenter',
      hidden: false,
      component: 'Layout',
      alwaysShow: false,
      meta: {
        title: '会员中心',
        noCache: false,
        link: null,
        icon: 'el-icon-user-solid'
      },
      children: [
        {
          name: 'UserCenterUser',
          path: 'user-list',
          hidden: false,
          component: 'user-center/user-list/index',
          meta: {
            title: '会员列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'UserCenterWithdrawalRecord',
          path: 'withdrawal-record',
          hidden: false,
          component: 'user-center/withdrawal-record/index',
          meta: {
            title: '提现管理',
            noCache: false,
            link: null
          }
        },

        {
          name: 'UserCenterBalance',
          path: 'balance-list',
          hidden: false,
          component: 'user-center/balance-list/index',
          meta: {
            title: '余额变动日志',
            noCache: false,
            link: null
          }
        },
        {
          name: 'UserCenterBtq',
          path: 'btq-list',
          hidden: false,
          component: 'user-center/btq-list/index',
          meta: {
            title: '版通券列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'UserCenterCard',
          path: 'card-list',
          hidden: false,
          component: 'user-center/card-list/index',
          meta: {
            title: '用户银行卡列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'UserCenterReturn',
          path: 'return-list',
          hidden: false,
          component: 'user-center/return-list/index',
          meta: {
            title: '用户重消积分列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'UserCenterAward',
          path: 'award-list',
          hidden: false,
          component: 'user-center/award-list/index',
          meta: {
            title: '用户奖励列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'UserCenterBtpoint',
          path: 'btpoint-list',
          hidden: false,
          component: 'user-center/btpoint-list/index',
          meta: {
            title: '版通积分列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'UserCenterXjq',
          path: 'xjq-list',
          hidden: false,
          component: 'user-center/xjq-list/index',
          meta: {
            title: '现金券列表',
            noCache: false,
            link: null
          }
        }
      ]
    }, {
      path: '/sys-manage',
      name: 'SysManage',
      redirect: 'goods-list',

      hidden: false,
      component: 'Layout',
      alwaysShow: false,
      meta: {
        title: '后台管理',
        noCache: false,
        link: null,
        icon: 'el-icon-s-platform'
      },
      children: [
        {
          name: 'SysManageUser',
          path: 'user-list',
          hidden: false,
          component: 'sys-manage/user-list/index',
          meta: {
            title: '用户列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'SysManageSpec',
          path: 'spec-list',
          hidden: false,
          component: 'sys-manage/spec-list/index',
          meta: {
            title: '规格列表',
            noCache: false,
            link: null
          }
        },
        {
          name: 'SysManageBanner',
          path: 'banner-list',
          hidden: false,
          component: 'sys-manage/banner-list/index',
          meta: {
            title: '广告图配置',
            noCache: false,
            link: null
          }
        },
        {
          name: 'SysManageNotice',
          path: 'notice-list',
          hidden: false,
          component: 'sys-manage/notice-list/index',
          meta: {
            title: '消息通知',
            noCache: false,
            link: null
          }
        },
        {
          name: 'SysManageClass',
          path: 'class-list',
          hidden: false,
          component: 'sys-manage/class-list/index',
          meta: {
            title: '商品分类',
            noCache: false,
            link: null
          }
        }
      ]
    }
    // {
    //   path: '/menu-manage',
    //   name: 'MenuManage',
    //   hidden: false,
    //   component: 'Layout',
    //   alwaysShow: false,
    //   meta: {
    //     title: '菜单管理',
    //     noCache: false,
    //     link: null,
    //     icon: 'el-icon-menu'
    //   },
    //   children: [
    //     {
    //       name: 'MenuManageRoles',
    //       path: 'roles-list',
    //       hidden: false,
    //       component: 'menu-manage/roles-list/index',
    //       meta: {
    //         title: '角色列表',
    //         noCache: false,
    //         link: null
    //       }
    //     },
    //     {
    //       name: 'MenuManageResource',
    //       path: 'resource-list',
    //       hidden: false,
    //       component: 'menu-manage/resource-list/index',
    //       meta: {
    //         title: '菜单资源',
    //         noCache: false,
    //         link: null
    //       }
    //     }
    //   ]
    // }

  ]
}

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' ||
              !item.path ||
              index == levelList.length - 1
          "
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <span v-else>{{ item.meta.title }}</span>
        <!--  @click.prevent="handleLink(item)" -->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      // const first = matched[0]
      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/index', meta: { title: '首页' }}].concat(matched)
      // }
      const last = matched[matched.length - 1]
      if (last.meta && last.meta.activeMenuPath) {
        const activeMenuPath = last.meta.activeMenuPath.split('/')
        const routes = this.$store.getters.permission_routes
        const levelList = []
        activeMenuPath.map((c, i) => {
          const children = i === 0 ? routes : levelList[i - 1].children
          const cur = cloneDeep(children.find((j) => j.name === c) || {})
          cur.path = (i === 0 ? '' : levelList[i - 1].path) + cur.path
          levelList.push(cur)
        })
        levelList.push(last)
        this.levelList = levelList
      } else {
        this.levelList = matched.filter(
          (item) =>
            item.meta && item.meta.title && item.meta.breadcrumb !== false
        )
      }
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim() === 'Index'
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

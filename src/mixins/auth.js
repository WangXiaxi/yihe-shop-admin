import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('admin/user', ['permissions'])
  },
  methods: {
    // 按钮权限
    permission(val) {
      // 生产环境才执行
      return process.env.VUE_APP_PERMISSION === 'true' ? this.permissions[val] : true
    }
  }
}

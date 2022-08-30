/**
 * 表格分页操作方法 mixin
 * @authors wangxiaoxing
 * @date    2018-10-16 10:14:48
 */
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'

export default {
  data() {
    return {
      isSpread: false, // 是否搜索展开
      agLoading: false, // 列表加载 loading
      firstLoading: true, // 判断首次进入页面是否请求
      needAddQuery: true, // 是否需要assign router参数
      tableHeight: 0, // el-table 所需要高度
      total: 0, // 列表条数
      gridList: [], // 列表承载集合
      selectRowData: [], // 选中集合
      listQuery: { // 公用查询
        pageIndex: 1,
        pageSize: 20
      }
    }
  },
  mounted() {
    this.mixinInit()
  },
  activated() {
    this.computedTableHeight()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHanlder)
  },
  computed: {
    // 编辑/删除/详情按钮过滤
    disabled() {
      return !(this.selectRowData.length >= 1)
    },
    ...mapGetters('admin/user', ['permissions'])
  },
  methods: {
    mixinInit() {
      // 合并下带参数查询
      if (this.needAddQuery) Object.assign(this.listQuery, (this.$route || {}).query)
      // 查询操作
      if (this.firstLoading) this.getList()
      this.tableHeghtInit()
    },
      // 计算高度
    tableHeghtInit() {
      this.$nextTick(this.computedTableHeight)
      this.__resizeHanlder = debounce(this.computedTableHeight, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    // 计算高度
    computedTableHeight() {
      if (this.$refs.gridList && this.$refs.gridList.clientHeight) {
        this.tableHeight = this.$refs.gridList.clientHeight
      }
    },
    onSortChanged(row) { // 排序操作
    },
    // 行选择或取消选择
    onRowSelected(row) {
      this.selectRowData = row
    },
    // 每页显示条数
    handleSizeChange(val) {
      if (this.listQuery.pageSize === val) {
        return
      }
      this.listQuery.pageSize = val
      this.handleFilter()
    },
    // 分页
    handlePageChange(val) {
      Object.assign(this.listQuery, val)
      this.getList()
    },
    // 查询
    handleFilter() {
      this.listQuery.pageIndex = 1
      this.getList()
    },
    // 复制
    handleSelect(info) {
      const oInput = document.createElement('input')
      oInput.value = info
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      oInput.remove()
    },
    getList() {
    },
    handleSpread() {
      this.isSpread = !this.isSpread
      this.$nextTick(this.computedTableHeight)
    }
  }
}

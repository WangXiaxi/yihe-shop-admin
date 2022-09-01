<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top" style="height: 500px;padding:0;">
      <div ref="gridList" flex-box="1" class="grid-list">
        <el-table
          ref="multipleTable"
          class="grid-table"
          border
          stripe
          default-expand-all
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :data="gridList"
          :height="tableHeight"
          :row-height="55"
          tooltip-effect="dark"
          @select="onRowSelected"
          v-loading="agLoading"
        >
          <el-table-column
            v-for="(item, index) in tableListText"
            :key="index"
            :prop="item.name"
            :label="item.text"
            :show-overflow-tooltip="true"
            :min-width="item.width"
            :width="item.realWidth"
          >
            <template slot-scope="{ row }">
              <span>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="35"
            fixed="right"
          ></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/menu-manage/resource-list'

export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      agLoading: false,
      tableListText: [
        { name: 'name', text: '名称', width: '200' },
        { name: 'typeDesc', text: '类型', width: '100' },
        { name: 'right', text: '资源码', width: '150' },
        { name: 'description', text: '描述', width: '150' }
      ],
      selectRowData: [],
      tableHeight: 500,
      gridList: [],
      btnLoading: false
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getTreeItem(id, list) {
      let cur
      const cal = (li) => {
        for (let i = 0; i < li.length; i++) {
          if (li[i].id === id) {
            cur = li[i]
          } else {
            li[i].children && cal(li[i].children)
          }
        }
      }
      cal(list)
      return cur
    },
    selectAction() {
     const rights = this.info.data.rights ? this.info.data.rights.split(',') : []
     const selectRowData = []
      rights.map(c => {
        const cur = this.getTreeItem(c, this.gridList)
        if (cur) {
          selectRowData.push(cur)
          this.$refs.multipleTable.toggleRowSelection(cur)
        }
      })
      this.selectRowData = selectRowData
    },
    onRowSelected(row, item) {
      const isAdd = row.length > this.selectRowData.length
      this.selectRowData = row
      const calle = (cur) => {
        if (cur.children) {
          this.$nextTick(() => {
            cur.children.map(c => {
              this.$refs.multipleTable.toggleRowSelection(c, isAdd)
              const index = this.selectRowData.findIndex(j => j.id === c.id)
              if (isAdd && index === -1) {
                this.selectRowData.push(c)
              }
              if (!isAdd && index > -1) {
                this.selectRowData.splice(index, 1)
              }
              calle(c)
            })
          })
        }
      }
      calle(item)
    },
    handleData(item) {
      item.btnLoading = false
      item.label = item.name
      item.typeDesc = { 0: '菜单', 1: '按钮' }[item.type]
      item.children?.map(this.handleData)
      return item
    },
    getList() {
      this.agLoading = true
      const sendData = {}
      list(sendData)
        .then((res) => {
          this.agLoading = false
          Object.assign(this, {
            selectRowData: [],
            gridList: (res || []).map((c) => {
              c.btnLoading = false
              return this.handleData(c)
            })
          })
          this.$nextTick(this.selectAction)
        })
        .catch(() => {
          this.agLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input--small .el-input__inner {
  height: 30px;
  line-height: 30px;
}
::v-deep {
  .el-table-column--selection {
    .cell {
      padding: 0 10px;
    }
  }
  th .el-checkbox {
    display: none;
  }
}
</style>

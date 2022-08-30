<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="button-operation">
        <!-- admin-mt-10 -->
        <el-button type="primary" plain @click="handleAdd">添加顶级资源</el-button>
      </div>
      <div ref="gridList" flex-box="1" class="grid-list admin-mt-10">
        <el-table
          class="grid-table"
          border
          stripe
          default-expand-all
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          :data="gridList"
          :height="tableHeight"
          :row-height="55"
          tooltip-effect="dark"
          @selection-change="onRowSelected"
          v-loading="agLoading"
        >
          <el-table-column type="selection" width="35" fixed></el-table-column>
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
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  icon="el-icon-plus"
                  type="text"
                  :loading="row.btnLoading"
                  v-if="row.type === '0'"
                  @click="handleAdd(row)"
                >添加</el-button>
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                >编辑</el-button>
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleDele(row, 'single')"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <add-dialog
      :info="addDialog"
      @update="handleUpdate"
      :options="gridList"
    ></add-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { list, dele } from '@/api/menu-manage/resource-list'
import pagination from '@/mixins/pagination'

import AddDialog from './components/add-dialog.vue'

const baseQuery = {}

export default {
  name: 'MenuManageResource',
  components: { AddDialog },
  mixins: [pagination],
  props: {},
  data() {
    return {
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'name', text: '名称', width: '200' },
        { name: 'typeDesc', text: '类型', width: '100' },
        { name: 'right', text: '资源码', width: '150' },
        { name: 'description', text: '描述', width: '150' }
      ],
      btnLoading: false,
      addDialog: {
        visible: false
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleDele(item, type = 'more') {
      const ids = (type === 'single' ? [item] : this.selectRowData)
        .map((c) => c.id)
        .join(',')
      const baseObj = { more: this, single: item }[type]
      const content = '确定删除当前后台权限资源吗？'
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          baseObj.btnLoading = true
          dele({ id: ids })
            .then((res) => {
              baseObj.btnLoading = false
              this.$message({
                showClose: true,
                message: `删除成功！`,
                type: 'success'
              })
              this.handleFilter()
            })
            .catch(() => {
              baseObj.btnLoading = false
            })
        })
        .catch(() => {})
    },
    handleReturn() {},
    handleEdit(data) {
      Object.assign(this.addDialog, {
        visible: true,
        isEdit: 1,
        data
      })
    },
    handleUpdate(isEdit) {
      isEdit ? this.getList() : this.handleFilter()
    },
    handleAdd(item = { id: '0' }) {
      Object.assign(this.addDialog, {
        visible: true,
        isEdit: 0,
        data: item
      })
    },
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
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
</style>

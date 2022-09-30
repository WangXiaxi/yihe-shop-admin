<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="button-operation">
        <!-- admin-mt-10 -->
        <el-button
          v-if="permission('MenuManageRoles_add')"

          type="primary"
          plain
          @click="handleAdd"
        >添加角色</el-button>

      </div>
      <div ref="gridList" flex-box="1" class="grid-list admin-mt-10">
        <el-table
          class="grid-table"
          border
          stripe
          :data="gridList"
          :height="tableHeight"
          :row-height="55"
          tooltip-effect="dark"
          @selection-change="onRowSelected"
          v-loading="agLoading"
        >
          <!-- <el-table-column
            type="selection"
            width="35"
            fixed
          ></el-table-column> -->
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
            v-if="permission('MenuManageRoles_auth') || permission('MenuManageRoles_edit')"

            label="操作"
            fixed="right"
            width="200"
          >
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  v-if="permission('MenuManageRoles_auth')"

                  icon="el-icon-s-grid"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleAuth(row)"
                >分配资源</el-button>
                <el-button
                  v-if="permission('MenuManageRoles_edit')"

                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                >编辑</el-button>
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleDele(row,'single')"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <admin-pagination
        slot="footer"
        class="footer-page"
        :page="listQuery.pageIndex"
        :limit="listQuery.pageSize"
        :total="total"
        @change="handlePageChange"
      />
    </div>
    <edit-dialog :info="editDialog" @update="handleUpdate"></edit-dialog>
    <add-dialog :info="addDialog" @update="handleUpdate"></add-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { list, dele } from '@/api/menu-manage/roles-list'
import pagination from '@/mixins/pagination'

import AddDialog from './components/add-dialog.vue'
import EditDialog from './components/edit-dialog.vue'
import auth from '@/mixins/auth'

const baseQuery = {}

export default {
  name: 'MenuManageRoles',
  components: { AddDialog, EditDialog },
  mixins: [pagination, auth],
  props: {},
  data() {
    return {
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'name', text: '名称', width: '100' }
      ],
      btnLoading: false,
      addDialog: {
        visible: false
      },
      editDialog: {
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
      const content = '确定删除当前后台用户吗？'
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
    handleAuth(data) {
      Object.assign(this.addDialog, {
        visible: true,
        isEdit: 1,
        data
      })
    },
    handleEdit(data) {
      Object.assign(this.editDialog, {
        visible: true,
        isEdit: 1,
        data
      })
    },
    handleUpdate(isEdit) {
      console.log(isEdit)
      isEdit ? this.getList() : this.handleFilter()
    },
    handleAdd() {
      Object.assign(this.editDialog, {
        visible: true,
        isEdit: 0
      })
    },
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
    },

    handleData(item) {
      item.btnLoading = false
      return item
    },
    getList() {
      this.agLoading = true
      const { pageSize, pageIndex } = this.listQuery
      const sendData = {
        page: pageIndex,
        limit: pageSize,
        paging: true
      }
      list(sendData)
        .then((res) => {
          this.agLoading = false
          const { data, total } = res
          Object.assign(this, {
            selectRowData: [],
            gridList: (data || []).map((c) => {
              c.btnLoading = false
              return this.handleData(c)
            }),
            total: total
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

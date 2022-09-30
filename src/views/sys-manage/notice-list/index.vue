<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <!-- <div class="search">
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.name"
            placeholder="请输入规格名称"
            clearable
          />
        </div>

        <el-button
          class="inp"
          type="primary"
          :loading="agLoading"
          @click="handleFilter"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          class="inp"
          :loading="agLoading"
          @click="handleReset"
          icon="el-icon-refresh"
        >清空</el-button>
      </div> -->
      <div class="button-operation">
        <el-button
          v-if="permission('SysManageNotice_add')"
          type="primary"
          plain
          @click="handleAdd"
        >添加</el-button>
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
          <!-- <el-table-column type="selection" width="35" fixed></el-table-column> -->
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
              <div v-if="item.name === 'img'" class="goods-td">
                <el-image
                  class="goods-td-image"
                  style="height: auto"
                  :src="row.img"
                  fit="contain"
                  :preview-src-list="[row.img]"
                ></el-image>
              </div>
              <span v-else>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="permission('SysManageNotice_edit') || permission('SysManageNotice_dele')"
            label="操作"
            fixed="right"
            width="120"
          >
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  v-if="permission('SysManageNotice_edit')"

                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                >编辑</el-button>
                <el-button
                  v-if="permission('SysManageNotice_dele')"

                  :loading="row.btnLoading"
                  icon="el-icon-delete"
                  type="text"
                  @click="handleDele(row, 'single')"
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
    <add-dialog :info="addDialog" @update="handleUpdate"></add-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import pagination from '@/mixins/pagination'
import { list, dele } from '@/api/sys-manage/notice-list'
import AddDialog from './components/add-dialog.vue'
import auth from '@/mixins/auth'

const baseQuery = {
  name: ''
}

export default {
  name: 'SysManageNotice',
  components: { AddDialog },
  mixins: [pagination, auth],
  props: {},
  data() {
    return {
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'title', text: '标题', width: '120' },
        { name: 'type', text: '类型', width: '120' },
        { name: 'content', text: '内容', width: '250' },
        { name: 'time', text: '创建时间', width: '120' }
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
      console.log(ids)
      const baseObj = { more: this, single: item }[type]
      const content = '确定删除当前选中消息吗？'
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
    handleAdd() {
      Object.assign(this.addDialog, {
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
      const { name, pageSize, pageIndex } = this.listQuery
      const sendData = {
        name,
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

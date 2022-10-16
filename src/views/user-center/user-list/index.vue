<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
        <el-tag
          closable
          size="default"
          v-if="tag.name"
          @close="handleCloseTag"
          style="
            vertical-align: top;
            height: 30px;
            line-height: 28px;
            font-size: 13px;
          "
        >
          {{ tag.name }}
        </el-tag>

        <div class="search-form-item">
          <el-select
            class="inp select-types"
            style="width: 110px"
            v-model="listQuery.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
          <el-input
            class="inp inp-types"
            v-model="listQuery.content"
            :placeholder="`请输入${
              typeOptions.find((c) => c.key === listQuery.type).label
            }`"
            clearable
          />
        </div>

        <el-button
          class="inp"
          type="primary"
          :loading="agLoading"
          @click="handleFilter"
          icon="el-icon-search"
          >查询</el-button
        >
        <el-button
          class="inp"
          :loading="agLoading"
          @click="handleReset"
          icon="el-icon-refresh"
          >清空</el-button
        >
      </div>
      <div class="button-operation admin-mt-10">
        <el-button
          v-if="permission('UserCenterUser_add')"
          type="primary"
          plain
          @click="handleAdd"
          >添加会员</el-button
        >

        <download-excel
        v-if="permission('UserCenterUser_export')"

          class="export"
          style="float: right"
          :fields="json_fields"
          worksheet="My Worksheet"
          :fetch="handleExport"
          name="会员列表"
        >
          <el-button type="primary" class="export" plain>导出</el-button>
        </download-excel>
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
              <el-link
                v-if="item.name === 'username'"
                type="primary"
                @click="handleChild(row)"
                >{{ row[item.name] | fill }}</el-link
              >

              <span v-else>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="
              permission('UserCenterUser_edit') ||
              permission('UserCenterUser_pack') ||
              permission('UserCenterUser_handle') ||
              permission('UserCenterUser_dele')
            "
            label="操作"
            fixed="right"
            width="250"
          >
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  v-if="permission('UserCenterUser_edit')"
                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit(row)"
                  >编辑</el-button
                >

                <el-button
                  v-if="permission('UserCenterUser_pack')"
                  icon="el-icon-circle-plus-outline"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handlePack(row)"
                  >添加礼包</el-button
                >

                <el-button
                  v-if="permission('UserCenterUser_handle')"
                  icon="el-icon-menu"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleAction(row)"
                  >操作</el-button
                >

                <el-button
                  v-if="permission('UserCenterUser_dele')"
                  icon="el-icon-delete"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleDele(row, 'single')"
                  >删除</el-button
                >
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
    <ActionDialog :info="actionDialog" @update="handleUpdate"></ActionDialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import {
  list,
  dele,
  handleSpecialUserOrder,
  reportSystemUserList
} from '@/api/user-center/user-list.js'
import pagination from '@/mixins/pagination'
import auth from '@/mixins/auth'

import ActionDialog from './components/action-dialog.vue'

const baseQuery = {
  type: 'username',
  content: ''
}

export default {
  name: 'UserCenterUser',
  components: {
    ActionDialog
  },
  mixins: [pagination, auth],
  props: {},
  data() {
    return {
      copy: {},
      tag: { name: '' },
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'username', text: '用户名', width: '100' },
        { name: 'true_name', text: '姓名', width: '100' },
        { name: 'identity_text', text: '身份', width: '100' },
        { name: 'qualification_text', text: '资格', width: '100' },
        { name: 'parent_name', text: '邀请人', width: '100' },
        { name: 'sexDesc', text: '性别', width: '100' },
        { name: 'balance', text: '预存款', width: '100' },
        { name: 'point', text: '版通券', width: '100' },
        { name: 'btpoint', text: '版通积分', width: '100' },
        { name: 'xjq', text: '现金券', width: '100' },
        { name: 'sur_plus', text: '筹备金', width: '100' },
        { name: 'package_plus', text: '复消券', width: '100' },
        { name: 'statusDesc', text: '状态', width: '100' },
        { name: 'time', text: '注册日期', width: '100' },
        { name: 'mobile', text: '手机', width: '100' }
      ],
      btnLoading: false,
      addDialog: {
        visible: false
      },
      sexOptions: [
        {
          key: '1',
          label: '男'
        },
        {
          key: '2',
          label: '女'
        }
      ],
      statusOptions: [
        {
          key: '1',
          label: '正常'
        },
        {
          key: '2',
          label: '删除'
        },
        {
          key: '3',
          label: '锁定'
        }
      ],
      typeOptions: [
        { label: '用户名', key: 'username' },
        { label: '姓名', key: 'true_name' },
        { label: '手机号', key: 'mobile' }
      ],
      actionDialog: {
        visible: false
      }
    }
  },
  computed: {
    json_fields() {
      const cur = {
        用户名: 'username',
        姓名: 'true_name',
        手机号: 'mobile',
        注册时间: 'time',
        身份: 'identity_text',
        资格: 'qualification_text',
        邀请人: 'parent_name',
        销售额: 'performance',
        余额: 'balance',
        版通券: 'point',
        奖励: 'income',
        版通积分: 'btpoint',
        筹备金: 'sur_plus',
        购物金: 'shop_plus',
        复消券: 'package_plus'
      }
      //  this.tableListText.map((c) => {
      //     cur[c.text] = c.name
      //   })
      return cur
    }
  },
  mounted() {},
  created() {
    this.$bus.on('UserCenterUserUpdate', this.handleFilter)
  },
  beforeDestroy() {
    this.$bus.off('UserCenterUserUpdate')
  },
  methods: {
    async handleExport() {
      const res = await reportSystemUserList(this.copy)
      return res.data.map(this.handleData)
    },
    handleCloseTag() {
      this.tag = { name: '' }
      this.handleFilter()
    },
    handleChild(item) {
      Object.assign(this.tag, item, {
        name: item.username
      })
      this.handleReset()
    },
    handleAction(item) {
      Object.assign(this.actionDialog, {
        visible: true,
        data: item,
        isEdit: 1
      })
    },
    async handlePack(item) {
      const content = '确定为当前用户添加礼包吗（无奖励）？'
      await this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      this.btnLoading = true
      try {
        await handleSpecialUserOrder({ user_id: item.user_id })
        this.btnLoading = false

        this.$message({
          showClose: true,
          message: `操作成功！`,
          type: 'success'
        })
        this.handleFilter()
      } catch (e) {
        this.btnLoading = false
      }
    },
    handleDele(item, type = 'more') {
      const ids = (type === 'single' ? [item] : this.selectRowData)
        .map((c) => c.user_id)
        .join(',')
      const baseObj = { more: this, single: item }[type]
      const content = '确定删除当前后用户吗？'
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
      this.$router.push(`/user-center/user-list/page/edit/${data.user_id}`)
    },
    handleUpdate(isEdit) {
      isEdit ? this.getList() : this.handleFilter()
    },
    handleAdd() {
      this.$router.push('/user-center/user-list/page/add')
    },
    handleReset() {
      Object.assign(this.listQuery, cloneDeep(baseQuery))
      this.handleFilter()
    },

    handleData(item) {
      item.sexDesc = this.sexOptions.find((c) => c.key === item.sex)?.label
      item.statusDesc = this.statusOptions.find(
        (c) => c.key === item.status
      )?.label
      Object.assign(item, item.agent_text || {})
      return item
    },
    getList() {
      this.agLoading = true
      const {
        type,
        content,

        pageSize,
        pageIndex
      } = this.listQuery
      const sendData = {
        search: type,
        keywords: content,

        page: pageIndex,
        limit: pageSize,
        paging: true
      }
      if (this.tag.user_id) sendData.parent_id = this.tag.user_id
      list(sendData)
        .then((res) => {
          this.copy = cloneDeep(sendData)
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

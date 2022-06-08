<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.carNumber"
            placeholder="请输入用户名"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.carNumber"
            placeholder="请输入姓名"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.carNumber"
            placeholder="请输入手机号"
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
      </div>
      <div class="button-operation admin-mt-10">
        <el-button type="primary" plain @click="handleAdd">添加会员</el-button>
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
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="row.btnLoading"
                  @click="handleEdit([row])"
                >编辑</el-button>
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  @click="handleEdit([row])"
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
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { list } from '@/api/login'
import pagination from '@/mixins/pagination'

const baseQuery = {

}

export default {
  name: 'UserCenterUser',
  components: { },
  mixins: [pagination],
  props: {},
  data() {
    return {
      gridList: [{ id: '23434535', name: ' shop美体小铺护肤系列 茶树洁面胶 保湿洗面奶 250ml', src: 'http://shop.aircheng.com/pic/thumb/img/deX4B3sbb823FbkaL2z1Iaw3MfTdc8vdMeD7U6v6M3DcY3v0NcT8dalbOaG8I714MDluNjMzMGJjNzQuanBnL3cvNzAvaC83MAO0O0OO0O0O' }],
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'id', text: 'id', width: '60' },
        { name: 'goods', text: '规格名称', width: '200' },
        { name: 'driverName', text: '规格数据', width: '100' }
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
    handleEdit(data) {
      this.$router.push(`/user-center/user-list/page/edit/${data.id}`)
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
      return item
    },
    getList() {
      // this.agLoading = true
      const { carNumber, taskCode, pageSize, pageIndex } = this.listQuery
      const sendData = {
        carNumber,
        taskCode,
        pageIndex,
        pageSize
      }
      list(sendData)
        .then((res) => {
          this.agLoading = false
          const { records, total } = res.data
          Object.assign(this, {
            selectRowData: [],
            gridList: (records || []).map((c) => {
              c.btnLoading = false
              return this.handleData(c)
            }),
            total
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

<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.carNumber"
            placeholder="请输入商品货号"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.carNumber"
            placeholder="请输入商品名称"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.taskCode"
            placeholder="请输入任务单号"
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
        <el-button type="primary" plain @click="handleAdd">新增</el-button>
        <el-button type="primary" plain @click="handleAdd">批量删除</el-button>
        <el-button type="primary" plain @click="handleAdd">修改状态</el-button>
        <el-button type="primary" plain @click="handleAdd">回收站</el-button>
        <el-button type="primary" class="export" plain @click="handleAdd">导入</el-button>
        <el-button type="primary" class="export" plain @click="handleAdd">导出</el-button>

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
              <div v-if="item.name === 'goods'" class="goods-td">
                <el-image
                  class="goods-td-image"
                  :src="row.src"
                  fit="contain"
                ></el-image>
                <div class="goods-td-info">
                  <div class="goods-td-name">{{ row.name }}</div>
                </div>
              </div>

              <div v-else-if="item.name === 'status'">
                <el-select v-model="item.status" placeholder="请选择">
                  <el-option
                    v-for="items in statusOptions"
                    :key="items.key"
                    :label="items.label"
                    :value="items.key"
                  >
                  </el-option>
                </el-select>
              </div>

              <div v-else-if="item.name === 'sort'">
                <input-cleave v-model="item.sort" placeholder="排序"></input-cleave>
              </div>

              <span v-else>{{ row[item.name] | fill }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="70">
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="true"
                  @click="handleEdit([row])"
                >编辑</el-button>
                <el-button
                  style="margin-left: 0;"
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
import enum_hwError_obj from '@/enumeration/hw-error'
import { cloneDeep } from 'lodash'
import { list } from '@/api/hw-error'
import pagination from '@/mixins/pagination'

const baseQuery = {
  carNumber: '', // 车牌号
  taskCode: '' // 任务单号
}

export default {
  name: 'FreeMallGoods',
  components: {},
  mixins: [pagination],
  props: {},
  data() {
    return {
      gridList: [{ id: '23434535', name: ' shop美体小铺护肤系列 茶树洁面胶 保湿洗面奶 250ml', src: 'http://shop.aircheng.com/pic/thumb/img/deX4B3sbb823FbkaL2z1Iaw3MfTdc8vdMeD7U6v6M3DcY3v0NcT8dalbOaG8I714MDluNjMzMGJjNzQuanBnL3cvNzAvaC83MAO0O0OO0O0O' }],
      ...cloneDeep(enum_hwError_obj),
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'id', text: 'id', width: '60' },
        { name: 'goods', text: '商品名称', width: '200' },
        { name: 'driverName', text: '销售价', width: '100' },
        { name: 'phoneNumber', text: '库存', width: '120' },
        { name: 'status', text: '状态', realWidth: '100' },
        { name: 'sort', text: '排序', realWidth: '100' }
      ],
      btnLoading: false,
      statusOptions: [
        { label: '待审', key: 0 },
        { label: '上架', key: 1 },
        { label: '下架', key: 2 }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleAdd() {
      this.$router.push('/free-mall/goods-list/page/add')
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

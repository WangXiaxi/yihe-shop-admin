<template>
  <div class="grid-table">
    <div class="grid-body" flex="dir:top">
      <div class="search">
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.param1"
            placeholder="请输入订单号"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.param2"
            placeholder="请输入收件人姓名"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-input
            class="inp"
            v-model="listQuery.param3"
            placeholder="请输入收件人电话"
            clearable
          />
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-input
            class="inp"
            v-model="listQuery.param4"
            placeholder="请输入收件人电话"
            clearable
          />
        </div>
        <div class="search-form-item">
          <el-select
            class="inp"
            style="width: 170px"
            v-model="listQuery.param5"
            placeholder="请选择订单状态"
            filterable
            clearable
          >
            <el-option
              v-for="item in param5Options"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-form-item">
          <el-select
            class="inp"
            style="width: 170px"
            v-model="listQuery.param7"
            placeholder="请选择发货状态"
            filterable
            clearable
          >
            <el-option
              v-for="item in param7Options"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <div class="search-form-item" v-if="isSpread">
          <el-select
            class="inp"
            style="width: 170px"
            v-model="listQuery.param6"
            placeholder="请选择支付状态"
            filterable
            clearable
          >
            <el-option
              v-for="item in param6Options"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-input
            style="width: 120px"
            class="inp"
            v-model="listQuery.param8"
            placeholder="订单总额下限"
            clearable
          />
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-input
            style="width: 120px"
            class="inp"
            v-model="listQuery.param9"
            placeholder="订单总额上限"
            clearable
          />
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-date-picker
            v-model="listQuery.date"
            class="inp"
            style="width: auto"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="订单生成开始时间"
            end-placeholder="订单生成结束时间"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-date-picker
            v-model="listQuery.date"
            class="inp"
            style="width: auto"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="订单发货开始时间"
            end-placeholder="订单发货结束时间"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>

        <div class="search-form-item" v-if="isSpread">
          <el-date-picker
            v-model="listQuery.date"
            class="inp"
            style="width: auto"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="订单完成开始时间"
            end-placeholder="订单完成结束时间"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
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

        <i
          @click="handleSpread"
          class="expand"
          :class="`el-icon-arrow-${isSpread ? 'up' : 'down'}`"
        ></i>
      </div>
      <div class="button-operation admin-mt-10">
        <el-button type="primary" plain @click="handleAdd">添加订单</el-button>
        <el-button type="primary" plain @click="handleAdd">批量删除</el-button>
        <el-button type="primary" plain @click="handleAdd">批量发货</el-button>
        <el-button type="primary" plain @click="handleAdd">回收站</el-button>
        <el-button
          type="primary"
          class="export"
          plain
          @click="handleAdd"
        >导出</el-button>
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
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="{ row }">
              <div class="grid-handle-list">
                <el-button
                  icon="el-icon-view"
                  type="text"
                  @click="handleDetail(row)"
                >查看</el-button>
                <el-button
                  icon="el-icon-edit"
                  type="text"
                  :loading="true"
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
import enum_hwError_obj from '@/enumeration/hw-error'
import { cloneDeep } from 'lodash'
import { list } from '@/api/login'
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
      gridList: [
        {
          id: '23434535',
          name: ' shop美体小铺护肤系列 茶树洁面胶 保湿洗面奶 250ml',
          src: 'http://shop.aircheng.com/pic/thumb/img/deX4B3sbb823FbkaL2z1Iaw3MfTdc8vdMeD7U6v6M3DcY3v0NcT8dalbOaG8I714MDluNjMzMGJjNzQuanBnL3cvNzAvaC83MAO0O0OO0O0O'
        }
      ],
      ...cloneDeep(enum_hwError_obj),
      listQuery: cloneDeep(baseQuery),
      tableListText: [
        { name: 'id', text: '订单号', width: '120' },
        { name: 'goods', text: '收货人', width: '120' },
        { name: 'driverName', text: '支付状态', width: '100' },
        { name: 'phoneNumber', text: '发货状态', width: '100' },
        { name: 'status', text: '订单状态', realWidth: '100' },
        { name: 'sort', text: '支付方式', realWidth: '100' },
        { name: 'sort', text: '用户名', realWidth: '120' },
        { name: 'sort', text: '下单时间', realWidth: '180' }
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
      this.$router.push('/free-mall/order-list/page/add')
    },
    handleDetail(item) {
      this.$router.push(`/free-mall/order-list/page/detail/${item.id}`)
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

<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="textMap[info.isEdit]"
    v-el-drag-dialog
    width="600px"
  >
    <el-form
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="110px"
      ref="dataForm"
      v-loading="pageLoading"
    >
      <el-form-item label="规格名称" prop="areaName">
        <el-input
          :maxlength="20"
          v-model="temp.areaName"
          placeholder="请输入规格名称"
        />
      </el-form-item>
      <el-form-item label="排序" prop="areaName">
        <el-input
          :maxlength="20"
          v-model="temp.areaName"
          placeholder="请输入排序"
        />
      </el-form-item>
      <el-form-item label="说明" prop="areaName">
        <el-input
          :maxlength="20"
          v-model="temp.areaName"
          placeholder="请输入说明"
        />
      </el-form-item>
      <el-form-item label="规格值" style="margin-bottom: 0;">
        <el-table
          class="form-table"
          :data="temp.products"
          style="width: 100%"
          id="sysSpecAddTable"
        >
          <el-table-column label="规格">
            <template slot-scope="{ row }">
              <el-form-item label="" prop="name1">
                <el-input v-model="row.name1" clearable></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="70">
            <template slot-scope="{ row, $index }">
              <div>
                <el-popover
                  placement="top"
                  width="120"
                  v-model="row.visible"
                  :key="row.__ob__.dep.id"
                >
                  <div>确认删除当前行吗？</div>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="cancelItem(row)"
                    >取消</el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="deleteItem($index, row)"
                    >确定</el-button>
                  </div>
                  <span class="el-icon-delete link-type" slot="reference"></span>
                </el-popover>

                <span
                  class="el-icon-rank ml10 link-type"
                  title="长按拖拽排序"
                ></span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogClose">取 消</el-button>
      <el-button
        :loading="btnLoading"
        type="primary"
        @click.native="handleSure"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Sortable from 'sortablejs'
import { cloneDeep } from 'lodash'
const fields = {
  products: [{ name: '123' }, {}],
  remark: '' // 备注
}
export default {
  components: {
  },
  props: {
    info: {
      // 传入对象 方便父子组件传值
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      pageLoading: false,
      btnLoading: false,
      temp: cloneDeep(fields),
      textMap: ['新增', '编辑'],

      rules: {
        areaCode: [
          { required: true, message: '请输入区域编号', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        areaLeader: [
          { required: true, message: '请选择区域负责人', trigger: 'change' }
        ],
        companyIds: [
          { required: true, message: '请选择与关联公司', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'info.visible'(n) {
      // 用监听变化 来控制是获取数据还是清除 比用方法触发更加集中化
      if (n) {
        this.getdetail()
      } else {
        setTimeout(this.cleared, 300)
      }
    }
  },
  methods: {
    rowDrop() {
      const tbody = document.querySelector(
        '#sysSpecAddTable .el-table__body-wrapper tbody'
      )
      const _this = this
      Sortable.create(tbody, {
        animation: 150,
        handle: '.el-icon-rank',
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.temp.products.splice(oldIndex, 1)[0]
          _this.temp.products.splice(newIndex, 0, currRow)
        }
      })
    },
    cancelItem() {},
    deleteItem() {},
    handleClose(tag, index) {
    },
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
      })
    },
    getdetail() {
      this.$nextTick(this.rowDrop)
    },

    // 关闭窗口
    dialogClose() {
      this.info.visible = false // 关闭
    },
    // 清楚数据
    cleared() {
      this.temp = JSON.parse(JSON.stringify(fields))
      setTimeout(() => {
        this.$refs.dataForm.clearValidate()
      }, 50)
      this.btnLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item--small .el-form-item__content {
  line-height: 0;
}
.form-table ::v-deep {
  .has-gutter {
    th {
      height: 32px;
      padding: 0;
    }
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
}
</style>

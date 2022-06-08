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
      <el-form-item label="规格名称" prop="name">
        <el-input
          :maxlength="20"
          v-model="temp.name"
          placeholder="请输入规格名称"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <input-cleave
          :maxlength="3"
          :is-decimal="0"
          v-model="temp.sort"
          placeholder="请输入排序"
        />
      </el-form-item>
      <el-form-item label="说明" prop="note">
        <el-input
          :maxlength="500"
          v-model="temp.note"
          placeholder="请输入说明"
        />
      </el-form-item>
      <el-form-item label="规格值" style="margin-bottom: 0">
        <el-table
          class="form-table"
          :data="temp.values"
          style="width: 100%"
          id="sysSpecAddTable"
        >
          <el-table-column label="规格">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :rules="rules.val"
                :prop="`values[${$index}].val`"
                label=""
              >
                <el-input
                  v-model="row.val"
                  placeholder="请输入规格值"
                  :maxlength="20"
                  clearable
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="70">
            <template slot-scope="{ row, $index }">
              <div>
                <el-popover
                  v-if="temp.values.length > 1"
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
                  <span
                    class="el-icon-delete link-type"
                    slot="reference"
                  ></span>
                </el-popover>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          style="margin: 10px auto; width: 100%"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >添加一行</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="handleClose">取 消</el-button>
      <el-button
        :loading="btnLoading"
        type="primary"
        @click.native="handleSure"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import { edit } from '@/api/sys-manage/spec-list'

const fields = {
  name: '', // 名称
  sort: '', // 排序
  values: [{ val: '' }],
  note: '' // 备注
}
export default {
  components: {},
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
        name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
        val: [{ required: true, message: '请输入规格值', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
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
    handleAdd() {
      this.temp.values.push({ val: '' })
    },
    cancelItem() {},
    deleteItem(index) {
      this.temp.values.splice(index, 1)
    },
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { id, sort, name, note, values } = this.temp
        const value = {}
        values.map((c) => {
          value[c.val] = ''
        })
        const sendData = {
          id,
          sort,
          name,
          note,
          value: JSON.stringify(value)
        }

        this.btnLoading = true
        edit(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message({
              showClose: true,
              message: `${this.textMap[this.info.isEdit]}成功！`,
              type: 'success'
            })
            this.$emit('update', this.info.isEdit)
            this.handleClose()
          })
          .catch(() => {
            this.btnLoading = false
          })
      })
    },
    getdetail() {
      const { isEdit, data } = this.info
      if (isEdit) {
        const { id, sort, name, note, value } = data
        Object.assign(this.temp, {
          id,
          sort,
          name,
          note,
          values: Object.keys(JSON.parse(value)).map((val) => {
            return { val }
          })
        })
      }
    },

    // 关闭窗口
    handleClose() {
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
  .el-form-item__error {
    position: relative;
  }
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
}
</style>

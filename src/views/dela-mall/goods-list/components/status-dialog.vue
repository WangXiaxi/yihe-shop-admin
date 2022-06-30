<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="`批量修改状态`"
    v-el-drag-dialog
    width="400px"
  >
    <el-form
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="80px"
      ref="dataForm"
      v-loading="pageLoading"
    >
      <el-form-item label="商品编码" prop="goodsNos">
        <span style="line-height:32px;">{{ goodsNos }}</span>
      </el-form-item>
      <el-form-item label="商品状态" prop="is_del">
        <el-select style="width: 100%;" v-model="temp.is_del" placeholder="请选择">
          <el-option
            v-for="items in statusOptions"
            :key="items.key"
            :label="items.label"
            :value="items.key"
          >
          </el-option>
        </el-select>
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
import { editGoodsStatus } from '@/api/free-mall/goods-list'

const fields = {
  is_del: ''
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
      goodsNos: '',
      temp: cloneDeep(fields),
      statusOptions: [
        { label: '正常', key: '0' },
        { label: '下架', key: '2' }
      ],
      rules: {
        is_del: [{ required: true, message: '请选择状态', trigger: 'change' }]
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
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { is_del } = this.temp
        const ids = this.info.data.map((c) => c.id)
        const sendData = {
          id: ids,
          type: { 0: 'up', 2: 'down' }[is_del]
        }
        this.btnLoading = true
        editGoodsStatus(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message({
              showClose: true,
              message: `批量修改状态成功！`,
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
      this.goodsNos = this.info.data
        .map((c) => c.goods_no.split('-')[0])
        .join(',')
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
</style>

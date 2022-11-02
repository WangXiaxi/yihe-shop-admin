<template>
  <div>
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
        <el-form-item label="活动商品">
          <div v-if="temp.goods_id" class="goods-td">
            <el-image
              class="goods-td-image"
              :src="temp.img"
              fit="contain"
              :preview-src-list="[temp.img]"
            ></el-image>
            <div class="goods-td-info">
              <div class="goods-td-name">{{ temp.goodsName }}</div>
            </div>
          </div>

          <el-button type="primary" plain @click="handleChoose">{{
            temp.goods_id ? "重新选择" : "选择商品"
          }}</el-button>
        </el-form-item>
        <!-- <el-form-item label="活动名称" prop="name">
        <el-input
          :maxlength="200"
          v-model="temp.name"
          placeholder="请输入名称"
        />
      </el-form-item> -->

        <el-form-item label="活动积分" prop="point_point">
          <input-cleave
            :is-decimal="2"
            v-model="temp.point_point"
            clearable
          ></input-cleave>
        </el-form-item>

        <!-- <el-form-item label="是否关闭" prop="is_close">
          <el-radio-group
            v-model="temp.is_close"
            style="display: flex; align-items: center; height: 32px"
          >
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleClose">取 消</el-button>
        <el-button
          :loading="btnLoading"
          type="primary"
          @click.native="handleSure"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <goods-dialog :info="goodsDialog" @update="goodsUpdate"></goods-dialog>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { edit } from '@/api/sys-manage/active-list'
import GoodsDialog from './goods-dialog.vue'

const fields = {
  goodsName: '',
  goods_id: '',
  img: '',
  name: '', // 名称
  point_point: '',
  is_close: 0
}
export default {
  components: {
    GoodsDialog
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
        point_point: [
          { required: true, message: '请输入活动积分', trigger: 'blur' }
        ]
      },
      goodsDialog: {
        visible: false
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
    goodsUpdate([{ goods_id, img, goodsName }]) {
      Object.assign(this.temp, { goods_id, img, goodsName })
    },
    handleChoose() {
      Object.assign(this.goodsDialog, {
        visible: true
      })
    },
    handleAdd() {
      this.temp.values.push({ val: '' })
    },
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { id, goods_id, point_point, name, is_close } = this.temp
        const sendData = { id, goods_id, point_point, name, is_close }

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
        const { id, sort, name, type, url, img } = data
        Object.assign(this.temp, {
          id,
          sort,
          name,
          url,
          type,

          imageList: [{ url: img }]
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
.goods-td {
  margin-bottom: 12px;
}
</style>

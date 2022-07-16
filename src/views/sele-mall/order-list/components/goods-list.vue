<template>
  <div>
    <div class="button-operation">
      <el-button type="primary" plain @click="handleAdd">添加商品</el-button>
    </div>

    <el-form ref="form" :model="form" :rules="rules" label-width="0px">
      <el-table
        class="grid-table admin-mt-10"
        :data="form.products"
        style="width: 100%"
        empty-text="请先添加商品"
      >
        <el-table-column label="商品名称" prop="name" min-width="200">
          <template slot-scope="{ row }">
            <div class="goods-td">
              <el-image
                class="goods-td-image"
                :src="row.img"
                fit="contain"
                :preview-src-list="[row.img]"
              ></el-image>
              <div class="goods-td-info">
                <div class="goods-td-name">{{ row.goodsName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" prop="sell_price" min-width="100"></el-table-column>
        <el-table-column label="商品数量" prop="num" min-width="100">
          <template slot-scope="{ row, $index }">
            <el-form-item
              class="table-form-item"
              label=""
              :rules="rules.num"
              :prop="`products.${$index}.num`"
            >
              <input-cleave
                :is-decimal="0"
                v-model="row.num"
                clearable
              ></input-cleave>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="70">
          <template slot-scope="{ $index }">
            <div class="grid-handle-list">
              <el-button
                style="margin-left: 0"
                icon="el-icon-delete"
                type="text"
                @click="handleDele($index)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <goods-dialog
      type="multiple"
      :info="goodsDialog"
      @update="goodsUpdate"
    ></goods-dialog>
  </div>
</template>

<script>
import GoodsDialog from './goods-dialog.vue'
import { cloneDeep } from 'lodash'

export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    GoodsDialog
  },
  computed: {},
  data() {
    return {
      goodsDialog: {
        visible: false,
        list: []
      },
      rules: {
        num: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    validate(callback) {
      if (!this.form.products.length) {
        this.$message.error('请选择商品！')
        return callback(false)
      }
      this.$refs.form.validate(callback)
    },
    // 选择合同完成
    goodsUpdate(list) {
      this.form.products.push(
        ...cloneDeep(list).map((c) => {
          return Object.assign(c, {
            num: 1
          })
        })
      )
    },
    handleDele(index) {
      this.form.products.splice(index, 1)
    },
    handleAdd() {
      Object.assign(this.goodsDialog, {
        visible: true,
        list: cloneDeep(this.form.products)
      })
    }
  }
}
</script>
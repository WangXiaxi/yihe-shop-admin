<template>
  <div>
    <div class="button-operation">
      <el-button type="primary" plain @click="handleAdd">添加商品</el-button>
    </div>

    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-table
        class="grid-table admin-mt-10"
        :data="form.goodsList"
        style="width: 100%"
      >
        <el-table-column label="商品名称" prop="name">
          <template slot-scope="{ row }">
            <div class="goods-td">
              <el-image
                class="goods-td-image"
                :src="row.src"
                fit="contain"
              ></el-image>
              <div class="goods-td-info">
                <div class="goods-td-name">{{ row.name }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" prop="name"></el-table-column>
        <el-table-column label="商品数量" prop="name">
          <template slot-scope="{ row, $index }">
            <el-form-item
              class="table-form-item"
              label=""
              :rules="rules.name"
              :prop="`goodsList[${$index}].name`"
            >
              <el-input v-model="row.name" clearable></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="70">
          <template slot-scope="{ row }">
            <div class="grid-handle-list">
              <el-button
                style="margin-left: 0"
                icon="el-icon-delete"
                type="text"
                @click="handleEdit([row])"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <goods-dialog type="multiple" :info="goodsDialog" @update="goodsUpdate"></goods-dialog>
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
        name: [{ required: true }]
      }
    }
  },
  methods: {
        // 选择合同完成
    goodsUpdate(list) {
      this.temp.products.push(
        ...list.map((c) => {
          return Object.assign(
            c
          )
        })
      )
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
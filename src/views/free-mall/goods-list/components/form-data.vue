<template>
  <div class="detail-container" v-loading="pageLoading">
    <div class="detail-top-container">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="baseInfo">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>

            <el-form-item label="是否上架">
              <el-radio-group v-model="form.is_del">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否免运费">
              <el-radio-group v-model="form.is_delivery_fee">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="选择分类" prop="_goods_category">
              <admin-tree-select
                :is-choose-last="true"
                :options="options"
                v-model="form._goods_category"
              ></admin-tree-select>
            </el-form-item>

            <el-form-item label="附属数据">
              <el-table class="form-table" :data="[{}]" style="width: 100%">
                <el-table-column label="排序">
                  <template slot-scope="{}">
                    <el-form-item label="" prop="sort">
                      <el-input v-model="form.sort" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="计件单位显示">
                  <template slot-scope="{}">
                    <el-form-item label="" prop="unit">
                      <el-input v-model="form.unit" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="购买成功增加版通券">
                  <template slot-scope="{}">
                    <el-form-item label="" prop="point">
                      <input-cleave
                        :is-decimal="0"
                        v-model="form.point"
                        clearable
                      ></input-cleave>
                    </el-form-item>
                  </template>
                </el-table-column>

                <!-- <el-table-column label="购买成功增加经验">
                  <template slot-scope="{}">
                    <el-form-item label="" prop="exp">
                      <input-cleave
                        :is-decimal="0"
                        v-model="form.exp"
                        clearable
                      ></input-cleave>
                    </el-form-item>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-form-item>

            <el-form-item label="商品数据">
              <el-table
                stripe
                border
                class="form-table"
                :data="form.products"
                style="width: 100%"
              >
                <el-table-column label="商品货号">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label=""
                      :rules="rules._goods_no"
                      :prop="`products.${$index}._goods_no`"
                    >
                      <el-input disabled v-model="row._goods_no"></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column
                  v-for="(item, index) in form.specList"
                  :key="index"
                  :label="item.specName"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row[item.id] }}</span>
                  </template>
                </el-table-column>

                <el-table-column key="key_store_nums" label="库存">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label=""
                      :rules="rules._store_nums"
                      :prop="`products.${$index}._store_nums`"
                    >
                      <input-cleave
                        v-model="row._store_nums"
                        clearable
                      ></input-cleave>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column key="key_market_price" label="市场价格">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label=""
                      :rules="rules._market_price"
                      :prop="`products.${$index}._market_price`"
                    >
                      <input-cleave
                        :is-decimal="2"
                        v-model="row._market_price"
                        clearable
                      ></input-cleave>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column key="key_sell_price" label="销售价格">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label=""
                      :rules="rules._sell_price"
                      :prop="`products.${$index}._sell_price`"
                    >
                      <input-cleave
                        :is-decimal="2"
                        v-model="row._sell_price"
                        clearable
                      ></input-cleave>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column key="key_cost_price" label="成本价格">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label=""
                      :rules="rules._cost_price"
                      :prop="`products.${$index}._cost_price`"
                    >
                      <input-cleave
                        :is-decimal="2"
                        v-model="row._cost_price"
                        clearable
                      ></input-cleave>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column key="key_weight" label="重量(克)">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      label=""
                      :rules="rules._weight"
                      :prop="`products.${$index}._weight`"
                    >
                      <input-cleave
                        :is-decimal="2"
                        v-model="row._weight"
                        clearable
                      ></input-cleave>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column
                  v-if="form.specList.length > 0"
                  label="操作"
                  fixed="right"
                  width="70"
                >
                  <template slot-scope="{ row, $index }">
                    <div class="grid-handle-list">
                      <el-button
                        icon="el-icon-delete"
                        type="text"
                        @click="handleDeleSpec(row, $index)"
                      >删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <div class="specs-box">
              <el-form-item label="规格">
                <el-select
                  v-model="form.spec"
                  @change="handleSpecChange"
                  placeholder="请选择规格"
                  filterable
                  :loading="specLoading"
                >
                  <el-option
                    v-for="item in specOptions"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" label-width="10px">
                <el-select
                  v-model="form.specValue"
                  placeholder="请选择规格值"
                  @change="handleSpecVal"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in specValueOptions"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-button
                v-if="permission('SysManageSpec_add')"

                @click="handleCreateSpec"
                type="primary"
                class="ml10"
              >新建规格</el-button>
              <el-button
                @click="getSpecList"
                type="primary"
                class="ml10"
                plain
              >刷新</el-button>
            </div>

            <el-form-item label="产品相册" prop="images">
              <div class="image-list">
                <div
                  class="image-item"
                  v-for="(item, index) in form.images"
                  :key="index"
                  :class="{ main: item.url === form.mainImage }"
                  v-loading="item.url.indexOf('blob:') > -1"
                >
                  <el-image
                    :src="item.url"
                    :ref="`image_${index}`"
                    :preview-src-list="previewList"
                  >
                  </el-image>
                  <div class="btns-hover">
                    <i
                      class="el-icon-zoom-in"
                      @click="handleShowImage(index)"
                    ></i>
                    <i
                      class="el-icon-delete"
                      @click="handleDeleImage(index)"
                    ></i>
                  </div>
                  <div class="btns" v-if="item.url.indexOf('blob:') === -1">
                    <i
                      v-if="index !== 0"
                      @click="handleImageSort(index, 'left')"
                      class="el-icon-arrow-left"
                    ></i>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="设为主图"
                      placement="top"
                    >
                      <i
                        @click="handleSetMain(item.url)"
                        class="el-icon-finished"
                      ></i>
                    </el-tooltip>
                    <i
                      v-if="index !== form.images.length - 1"
                      @click="handleImageSort(index, 'right')"
                      class="el-icon-arrow-right"
                    ></i>
                  </div>
                </div>
                <admin-upload
                  class="admin-upload"
                  :image-list="form.images"
                  :show-file-list="false"
                  img-u-r-l="/service/uploadGoodsPic"
                  :limit="20"
                  :size-limit="10"
                ></admin-upload>
              </div>
              <span
                class="avatar-uploader-tip"
              >允许上传图片类型（jpg、png、jpeg），单个最大不能超过10M，最多20张</span>
            </el-form-item>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="产品描述" name="baseInfo">
          <admin-tinymce
            ref="editor"
            :height="300"
            v-model="form.content"
          ></admin-tinymce>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="detail-btn-container">
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="handleSave"
      >保存</el-button>
      <el-button type="primary" plain @click="handleClose">关闭</el-button>
    </div>
    <add-dialog :info="addDialog" @update="getSpecList"></add-dialog>
  </div>
</template>
<script>
import AdminUpload from '@/components/admin-upload'
import AdminTinymce from '@/components/admin-tinymce'
import { list } from '@/api/sys-manage/spec-list'
import {
  getRandomGoodsNo,
  editGoodsInfo,
  getDetail
} from '@/api/free-mall/goods-list'
import AddDialog from '../../../sys-manage/spec-list/components/add-dialog.vue'
import { getCategoryList } from '@/api/sys-manage/class-list'
import AdminTreeSelect from '@/components/admin-tree-select'
import auth from '@/mixins/auth'

import { cloneDeep } from 'lodash'
const fields = {
  name: '', // 名称
  is_del: 0, // 是否上架 0 正常 2下架
  is_delivery_fee: 1, // 是否免费 1免费 0 不免费
  point: '', // 积分
  sort: 99, // 排序
  unit: '',
  exp: '', // 经验
  content: '',
  mainImage: '', // 主图
  images: [],
  _goods_category: '',
  products: [
    {
      _goods_no: '',
      _store_nums: 100,
      _market_price: '',
      _sell_price: '',
      _cost_price: '',
      _weight: ''
    }
  ],
  // spec特殊等字段
  specList: [],
  spec: '',
  specValue: ''
}
export default {
  mixins: [auth],

  components: {
    AdminUpload,
    AdminTinymce,
    AddDialog,
    AdminTreeSelect
  },
  props: {
    isEdit: {
      type: [Boolean, Number],
      default: 0
    }
  },
  watch: {
    'form.images'() {
      this.$refs.form.validateField('images')
    }
  },
  data() {
    return {
      pageLoading: false,
      btnLoading: false,
      activeNames: ['baseInfo'],
      specOptions: [],
      options: [],
      specLoading: false,
      specValueOptions: [],
      form: cloneDeep(fields),
      goodsNo: '',
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        images: [
          { required: true, message: '请上传商品图片', trigger: 'change' }
        ],

        _store_nums: [{ required: true, message: '请输入', trigger: 'blur' }],
        _market_price: [{ required: true, message: '请输入', trigger: 'blur' }],
        _sell_price: [{ required: true, message: '请输入', trigger: 'blur' }],
        _cost_price: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      addDialog: {
        visible: false
      }
    }
  },
  created() {
    this.getSpecList()
    this.getCategoryList()
    console.log(this.isEdit)
    if (!this.isEdit) {
      this.getRandomGoodsNo()
    } else {
      this.getDetails()
    }
  },
  computed: {
    previewList() {
      return this.form.images.map((c) => c.url)
    }
  },
  methods: {
    handleData(item) {
      item.btnLoading = false
      item.label = item.name
      item.children?.map(this.handleData)
      return item
    },
    getCategoryList() {
      const sendData = {}
      getCategoryList(sendData).then((res) => {
        Object.assign(this, {
          options: (res || []).map((c) => {
            return this.handleData(c)
          })
        })
      })
    },
    getDetails() {
      const id = this.$route.params.id
      this.pageLoading = true
      getDetail({ id })
        .then((res) => {
          const { form, goods_photo, product, goods_category } = res
          this.pageLoading = false
          const {
            id,
            name,
            is_del,
            is_delivery_fee,
            point,
            sort,
            unit,
            exp,
            img,
            content,
            goods_no

          } = form
          this.goodsNo = goods_no.split('-')[0]
          const _imgList = (goods_photo || [])
            .filter((c) => c.img)
            .map((c) => {
              return { url: c.img }
            })
          const specList = []

          let products = [
            {
              _goods_no: form.goods_no,
              _store_nums: form.store_nums,
              _market_price: form.market_price,
              _sell_price: form.sell_price,
              _cost_price: form.cost_price,
              _weight: form.weight
            }
          ]
          if (product && product.length) {
            products = product.map((c) => {
              const proItem = {
                id: c.id,
                _goods_no: c.products_no,
                _store_nums: c.store_nums,
                _market_price: c.market_price,
                _sell_price: c.sell_price,
                _cost_price: c.cost_price,
                _weight: c.weight
              }
              JSON.parse(c.spec_array).map((c) => {
                proItem[c.id] = c.value
                // 补充specList
                const cur = specList.find((j) => j.id === c.id)
                if (cur) {
                  if (!cur.value.find((j) => j === c.value)) {
                    cur.value.push(c.value)
                  }
                } else {
                  specList.push({
                    id: c.id,
                    specName: c.name,
                    value: [c.value]
                  })
                }
              })

              return proItem
            })
          }

          console.log(product, specList)

          Object.assign(this.form, {
            id,
            name,
            is_del: Number(is_del),
            is_delivery_fee: Number(is_delivery_fee),
            point,
            sort,
            unit,
            exp,
            mainImage: img,
            images: _imgList,
            content,
            specList,
            products,
            _goods_category: goods_category && goods_category[0]
          })
        })
        .catch(() => {
          this.pageLoading = false
        })
    },
    handleSave() {
      this.$refs.form.validate((v) => {
        if (!v) return
        const {
          id,
          name,
          is_del,
          is_delivery_fee,
          point,
          sort,
          unit,
          exp,
          mainImage,
          images,
          products,
          content,
          specList,
          _goods_category
        } = this.form
        const sendData = {
          id,
          name,
          is_del,
          is_delivery_fee,
          point,
          sort,
          unit,
          exp,
          img: mainImage,
          _imgList: images
            .map((c) => {
              return c.url
            })
            .join(','),
          content,
          _goods_category: _goods_category && [_goods_category],
          type: 'free'
        }
        const _goods_no = []
        const _store_nums = []
        const _market_price = []
        const _sell_price = []
        const _cost_price = []
        const _weight = []
        const _spec_array = []
        products.map((c) => {
          _goods_no.push(c._goods_no)
          _store_nums.push(c._store_nums)
          _market_price.push(c._market_price)
          _sell_price.push(c._sell_price)
          _cost_price.push(c._cost_price)
          _weight.push(c._weight)

          _spec_array.push(
            specList.map((j) => {
              return JSON.stringify({
                id: j.id,
                name: j.specName,
                value: c[j.id]
              })
            })
          )
        })

        console.log(sendData)
        Object.assign(sendData, {
          _goods_no,
          _store_nums,
          _market_price,
          _sell_price,
          _cost_price,
          _weight,
          _spec_array
        })
        if (!_spec_array[0] || !_spec_array[0][0]) {
          delete sendData._spec_array
        }
        this.btnLoading = true
        editGoodsInfo(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message.success(`${this.isEdit ? '编辑' : '新增'}商品成功！`)
            this.handleClose(true)
          })
          .catch(() => {
            this.btnLoading = false
          })
      })
    },
    handleClose(refresh = false) {
      this.$tab.closeOpenPage({ name: 'FreeMallGoods' })
      if (refresh) {
        this.$bus.emit('FreeMallGoodsUpdate')
      }
    },
    async getRandomGoodsNo() {
      const data = await getRandomGoodsNo()
      this.form.products[0]._goods_no = data
      this.goodsNo = data
      this.$forceUpdate()
    },
    handleShowImage(index) {
      this.$refs[`image_${index}`][0].clickHandler()
    },
    handleDeleImage(index) {
      this.form.images.splice(index, 1)
    },
    handleImageSort(index, type) {
      const { images } = this.form
      const cur = images[index]
      switch (type) {
        case 'right': {
          const next = images[index + 1]
          images[index] = next
          images[index + 1] = cur
          break
        }
        case 'left': {
          const pre = images[index - 1]
          images[index] = pre
          images[index - 1] = cur
          break
        }
      }
      this.$forceUpdate()
    },
    handleSetMain(url) {
      this.form.mainImage = url
    },
    handleSpecChange(val) {
      const { value } = this.specOptions.find((c) => c.key === val)
      this.form.specValue = ''
      this.specValueOptions = Object.keys(JSON.parse(value)).map((c) => {
        return {
          key: c,
          label: c
        }
      })
    },
    handleSpecVal(val) {
      if (!val) return
      const { spec, products, specList } = this.form
      const lastChildProduct = cloneDeep(products[products.length - 1])
      const cur = specList.find((c) => c.id === spec)
      if (cur) {
        if (cur.value.indexOf(val) > -1) {
          return this.$message.error('规格重复！')
        }
        // 存在该规格
        cur.value.push(val)
        // 获取需要添加商品
        const otherSpecs = cloneDeep(specList.filter((c) => c.id !== spec))
        if (otherSpecs.length === 0) {
          console.log(lastChildProduct)
          lastChildProduct[spec] = val
          products.push(lastChildProduct)
        } else {
          const newProducts = this.getMakeGoods(otherSpecs, lastChildProduct)
          newProducts.map((c) => {
            c[spec] = val
          })
          products.push(...newProducts)
        }
      } else {
        specList.push({
          id: spec,
          specName: this.specOptions.find((c) => c.id === spec).name,
          value: [val]
        })
        products.map((c) => {
          c[spec] = val
        })
      }
      this.handleProductsGoodsNo()
      this.$forceUpdate()
    },
    handleProductsGoodsNo() {
      const { products } = this.form
      if (products.length === 1) {
        products[0]._goods_no = this.goodsNo
      } else {
        products.map((c, i) => {
          c._goods_no = this.goodsNo + '-' + (i + 1)
        })
      }
    },
    handleDeleSpec(row, index) {
      this.$confirm('确定删除当前规格商品', '提示', {
        showClose: false,
        type: 'warning',
        callback: () => {
          this.form.products.splice(index, 1)
          this.handleResetSpec()
        }
      })
    },
    handleResetSpec() {
      const { specList, products } = this.form
      if (products.length === 0) {
        this.form.specList = []
        products.push({
          _goods_no: this.goodsNo,
          _store_nums: 100,
          _market_price: '',
          _sell_price: '',
          _cost_price: '',
          _weight: ''
        })
        return
      }
      specList.map((c, ci) => {
        c.value.map((j, ji) => {
          const isE = products.find((k) => k[c.id] === j)
          if (!isE) {
            // 不存在
            c.value.splice(ji, 1)
            if (c.value.length === 0) {
              specList.splice(ci, 1, false)
            }
          }
        })
      })
      this.form.specList = specList.filter((c) => !!c)
    },
    // 获取组合数量
    getMakeGoods(specs, copyChild) {
      const list = []
      const callee = (path, index) => {
        const values = specs[index]
        values.value.map((c) => {
          const newPath = cloneDeep(path)
          newPath[values.id] = c
          if (index === specs.length - 1) {
            list.push(Object.assign(cloneDeep(copyChild), newPath))
          } else {
            callee(newPath, index + 1)
          }
        })
      }
      callee({}, 0)
      return list
    },
    handleCreateSpec() {
      Object.assign(this.addDialog, {
        visible: true,
        isEdit: 0
      })
    },
    getSpecList() {
      this.specLoading = true
      list({
        page: 1,
        limit: 100000,
        paging: true
      })
        .then((res) => {
          this.specLoading = false
          const { data } = res
          this.specOptions = data?.map((c) => {
            return {
              ...c,
              label: c.name,
              key: c.id
            }
          })
        })
        .catch(() => {
          this.specLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item--small .el-form-item__content {
  line-height: 0;
  .el-radio-group {
    display: flex;
    align-items: center;
    height: 32px;
  }
}
.el-collapse {
  border-top: none;
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
  .el-form-item__error {
    position: relative;
  }
}
.specs-box {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.image-list {
  font-size: 0;
  line-height: 0;
  .image-item {
    position: relative;
    vertical-align: top;
    display: inline-block;
    width: 148px;
    height: 148px;
    margin-right: 10px;
    margin-bottom: 40px;
    border-radius: 6px;
    &.main {
      border: 4px solid rgb(64, 158, 255);
    }
    .el-image {
      width: 100%;
      height: 100%;
    }

    .btns-hover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 148px;
      padding: 0 30px;
      font-size: 20px;
      color: #ffffff;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.3);
      transition: opacity 0.2s;
      opacity: 0;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
  .btns {
    position: absolute;

    left: 0;
    right: 0;
    bottom: -30px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 30px;

    padding: 0 30px;
    font-size: 20px;

    i {
      color: #999;

      transition: color 0.2s;

      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
  .admin-upload {
    vertical-align: top;
    display: inline-block;
    width: 148px;
    height: 148px;
  }
}
</style>
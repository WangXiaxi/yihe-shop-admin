<template>
  <div class="detail-container">
    <div class="detail-top-container">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="baseInfo">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" clearable></el-input>
            </el-form-item>

            <el-form-item label="是否上架">
              <el-radio-group v-model="form.resource">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否免运费">
              <el-radio-group v-model="form.resource">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="附属数据">
              <el-table class="form-table" :data="[{}]" style="width: 100%">
                <el-table-column label="排序">
                  <template slot-scope="{}">
                    <el-form-item label="" prop="name1">
                      <el-input v-model="form.name1" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="计件单位显示">
                  <template slot-scope="{}">
                    <el-form-item label="" prop="name">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="购买成功增加">
                  <template slot-scope="{}">
                    <el-form-item label="" prop="name">
                      <el-input v-model="form.name" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <el-form-item label="商品数据">
              <el-table
                class="form-table"
                :data="form.products"
                style="width: 100%"
              >
                <el-table-column label="商品货号">
                  <template slot-scope="{ row }">
                    <el-form-item label="" prop="name1">
                      <el-input v-model="row.name1" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="库存">
                  <template slot-scope="{ row }">
                    <el-form-item label="" prop="name">
                      <el-input v-model="row.name" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="市场价格">
                  <template slot-scope="{ row }">
                    <el-form-item label="" prop="name">
                      <el-input v-model="row.name" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column label="销售价格">
                  <template slot-scope="{ row }">
                    <el-form-item label="" prop="name">
                      <el-input v-model="row.name" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>

                <el-table-column label="成本价格">
                  <template slot-scope="{ row }">
                    <el-form-item label="" prop="name">
                      <el-input v-model="row.name" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="重量">
                  <template slot-scope="{ row }">
                    <el-form-item label="" prop="name">
                      <el-input v-model="row.name" clearable></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>

            <div class="specs-box">
              <el-form-item label="规格">
                <el-select
                  v-model="form.param1"
                  placeholder="请选择规格属性"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in param1Options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" label-width="10px">
                <el-select
                  v-model="form.param1"
                  placeholder="请选择规格值"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in param1Options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-button type="primary" class="ml10">新建规格</el-button>
            </div>

            <el-form-item label="产品相册">
              <div class="image-list">
                <div
                  class="image-item"
                  v-for="(item, index) in previewList"
                  :key="index"
                >
                  <el-image :src="item" :preview-src-list="previewList">
                  </el-image>
                  <div class="btns-hover">
                    <i class="el-icon-zoom-in"></i>
                    <i class="el-icon-delete"></i>
                  </div>
                  <div class="btns">
                    <i class="el-icon-arrow-left"></i>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
                <admin-upload
                  class="admin-upload"
                  :image-list="form.images"
                  :show-file-list="false"
                ></admin-upload>
              </div>
            </el-form-item>
          </el-form>
        </el-collapse-item>

        <el-collapse-item title="产品描述" name="baseInfo">
          <admin-tinymce
            ref="editor"
            :height="300"
            v-model="form.description"
          ></admin-tinymce>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="detail-btn-container">
      <el-button type="primary">保存</el-button>
      <el-button type="primary" plain>关闭</el-button>
    </div>
  </div>
</template>
<script>
import AdminUpload from '@/components/admin-upload'
import AdminTinymce from '@/components/admin-tinymce'

export default {
  components: {
    AdminUpload,
    AdminTinymce
  },
  data() {
    return {
      activeNames: ['baseInfo'],
      form: {
        name1: '',
        images: [
          {
            url: 'http://shop.aircheng.com/pic/thumb/img/deX4B3sbb823FbkaL2z1Iaw3MfTdc8vdMeD7U6v6M3DcY3v0NcT8hahbNaD8A754MzFuZjMyZTg0MDYuanBnL3cvNzAvaC83MAO0O0OO0O0O'
          },
          {
            url: 'http://shop.aircheng.com/pic/thumb/img/deX4B3sbb823FbkaL2z1Iaw3MfTdc8vdMeD7U6v6M3DcY3v0NcT8haibMa28R7i4OTBuMDljZjFkMjcuanBnL3cvNzAvaC83MAO0O0OO0O0O'
          }
        ],
        products: [{}, {}],
        description: ''
      },
      rules: {
        name1: []
      }
    }
  },
  created() {},
  computed: {
    previewList() {
      return this.form.images.map((c) => c.url)
    }
  },
  methods: {
    getDetails() {}
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
.detail-container {
  position: relative;
  height: calc(100vh - 84px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  .detail-top-container {
    position: relative;
    flex: 1;
    width: 100%;
    padding: 0 20px;
    height: 0;
    background: #ffffff;
    overflow: auto;
  }
  .detail-btn-container {
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
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
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    .el-image {
      width: 148px;
      height: 148px;
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
      .btns-hover {
        opacity: 1;
      }
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
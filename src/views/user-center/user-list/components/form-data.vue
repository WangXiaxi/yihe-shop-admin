<template>
  <div class="detail-container">
    <div class="detail-top-container">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基础信息" name="baseInfo">
          <el-form
            style="width: 500px"
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" clearable></el-input>
            </el-form-item>

            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="姓名" prop="true_name">
              <el-input v-model="form.true_name" clearable></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <el-input v-model="form.repassword" clearable></el-input>
            </el-form-item>

            <el-form-item label="手机" prop="mobile">
              <el-input v-model="form.mobile" clearable></el-input>
            </el-form-item>
            <el-form-item label="积分" prop="point">
              <input-cleave
                :is-decimal="2"
                v-model="form.point"
                clearable
              ></input-cleave>
            </el-form-item>
            <el-form-item label="经验值" prop="exp">
              <input-cleave
                :is-decimal="2"
                v-model="form.exp"
                clearable
              ></input-cleave>
            </el-form-item>

            <el-form-item label="状态">
              <el-select
                v-model="form.status"
                placeholder="请选择状态"
                filterable
                clearable
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="specs-box">
              <el-form-item label="收货地址">
                <el-select
                  v-model="form.province"
                  placeholder="请选择"
                  filterable
                  @change="provinceChange"
                >
                  <el-option
                    v-for="(item, index) in provinceOptions"
                    :key="index"
                    :label="item.label"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" label-width="10px">
                <el-select
                  v-model="form.city"
                  placeholder="请选择"
                  filterable
                  @change="cityChange"
                >
                  <el-option
                    v-for="(item, index) in cityOptions"
                    :key="index"
                    :label="item.label"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" label-width="10px">
                <el-select
                  v-model="form.area"
                  placeholder="请选择"
                  filterable
                  @change="areaChange"
                >
                  <el-option
                    v-for="(item, index) in areaOptions"
                    :key="index"
                    :label="item.label"
                    :value="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>

            <el-form-item label="地址" prop="contact_addr">
              <el-input v-model="form.contact_addr" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="detail-btn-container">
      <el-button
        type="primary"
        :loading="btnLoading"
        @click="handleSure"
      >保存</el-button>
      <el-button type="primary" @click="handleClose" plain>关闭</el-button>
    </div>
  </div>
</template>

<script>
import { getAreas } from '@/api/free-mall/order-list'
import { getDetail, edit } from '@/api/user-center/user-list.js'

export default {
  props: {
    isEdit: {
      type: [Boolean, Number],
      default: 0
    }
  },
  data() {
    return {
      btnLoading: false,
      activeNames: ['baseInfo'],
      statusOptions: [
        {
          key: '1',
          label: '正常'
        },
        {
          key: '2',
          label: '删除'
        },
        {
          key: '3',
          label: '锁定'
        }
      ],
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      adressObj: {},
      form: {
        username: '',
        sex: '1',
        true_name: '',
        email: '',
        password: '',
        repassword: '',
        point: '',
        exp: '',
        mobile: '',
        status: '1',
        province: '',
        city: '',
        area: '',
        contact_addr: ''
      },
      rules: {},
      pageLoading: false
    }
  },
  created() {
    this.getAreas()
    if (this.isEdit) {
      const { params } = this.$route
      this.id = params.id
      this.getDetails()
    }
  },
  methods: {
    handleSure() {
      this.$refs.form.validate((v) => {
        if (!v) return
        const { province, city, area, ...other } = this.form
        const { provinceOptions, areaOptions, cityOptions } = this
        const sendData = {
          ...other,
          province:
            province || province === 0 ? provinceOptions[province].value : '',
          area: area || area === 0 ? areaOptions[area].value : '',
          city: city || city === 0 ? cityOptions[city].value : ''
        }
        this.btnLoading = true
        edit(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message.success(`${this.isEdit ? '编辑' : '新增'}会员成功！`)
            this.handleClose(true)
          })
          .catch(() => {
            this.btnLoading = false
          })
      })
    },
    async getDetails() {
      this.pageLoading = true
      const res = await getDetail({ uid: this.id })
      delete res.password
      this.pageLoading = false
      const areas = res.area.split(',').filter((c) => !!c)
      Object.assign(this.form, res, {
        province: areas[0] || '',
        city: areas[1] || '',
        area: areas[2] || ''
      })
      this.handleAdressData()
    },
    handleAdressData() {
      const { province, city, area } = this.form

      if (!this.provinceOptions.length || !province) return
      const pIndex = this.provinceOptions.findIndex((c) => c.value === province)
      this.form.province = pIndex
      this.cityOptions = this.adressObj.citys[pIndex]
      if (!city) return
      const cIndex = this.cityOptions.findIndex((c) => c.value === city)
      this.form.city = cIndex
      this.areaOptions = this.adressObj.areas[pIndex][cIndex]
      if (!area) return
      this.form.area = this.areaOptions.findIndex((c) => c.value === area)
    },
    async getAreas() {
      const adressObj = await getAreas()
      this.provinceOptions = adressObj.province
      this.adressObj = adressObj
      this.handleAdressData()
    },
    provinceChange(e) {
      this.cityOptions = this.adressObj.citys[e]
      this.form.city = ''
    },
    cityChange(e) {
      this.areaOptions = this.adressObj.areas[this.form.province][e]
      this.form.area = ''
    },
    areaChange(e) {},
    handleClose(refresh = false) {
      this.$tab.closeOpenPage({ name: 'UserCenterUser' })
      if (refresh) {
        this.$bus.emit('UserCenterUserUpdate')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.specs-box {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
::v-deep .el-collapse-item__wrap {
  border: none;
}
</style>

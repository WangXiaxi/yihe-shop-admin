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
      <div style="height: 0; width: 0; overflow: hidden;">
        <el-input
          type="password"
        />
      </div>
      <el-form-item label="用户名" prop="admin_name">

        <el-input
          :maxlength="50"
          v-model="temp.admin_name"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          :maxlength="50"
          v-model="temp.email"
          placeholder="请输入邮箱"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          :maxlength="32"
          v-model="temp.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input
          type="password"
          :maxlength="32"
          v-model="temp.repassword"
          placeholder="请输入确认密码"
        />
      </el-form-item>

      <el-form-item label="选择角色" prop="roles">
        <el-select v-model="temp.roles" multiple placeholder="请选择" style="width: 100%;">
          <el-option
            v-for="item in rolesOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
import { edit } from '@/api/sys-manage/user-list'
import { list } from '@/api/menu-manage/roles-list'

const fields = {
  admin_name: '',
  email: '',
  password: '',
  repassword: '',
  roles: []
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
        admin_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        repassword: [{ required: true, message: '请确认密码', trigger: 'blur' }]
      },
      rolesOptions: []
    }
  },
  watch: {
    'info.visible'(n) {
      // 用监听变化 来控制是获取数据还是清除 比用方法触发更加集中化
      if (n) {
        this.getdetail()
        this.getRoles()
      } else {
        setTimeout(this.cleared, 300)
      }
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    async getRoles() {
      const res = await list()
      console.log(res)
      this.rolesOptions = res
    },
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { id, admin_name, email, password, repassword, roles } = this.temp
        const sendData = {
          id,
          admin_name,
          email,
          password,
          repassword,
          role_id: roles.join(',')
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
        const { id, admin_name, email, role_id: roles } = data
        Object.assign(this.temp, {
          id,
          admin_name,
          email,
          roles: roles && roles.split(',')
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

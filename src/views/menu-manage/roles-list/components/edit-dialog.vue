<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog"
    :title="textMap[info.isEdit]"
    v-el-drag-dialog
    width="500px"
  >
    <el-form
      :model="temp"
      label-position="right"
      label-width="110px"
      ref="dataForm"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          :maxlength="20"
          v-model="temp.name"
          placeholder="角色名称"
        />
      </el-form-item>
      <!-- <el-form-item label="角色描述" prop="description">
        <el-input
          :maxlength="100"
          placeholder="角色描述"
          type="textarea"
          v-model="temp.description"
        ></el-input>
      </el-form-item> -->
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
import { edit } from '@/api/menu-manage/roles-list'
const fields = {
  name: '' // 角色名称
}
export default {
  props: {
    info: {
      // 传入对象 方便父子组件传值
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      btnLoading: false,
      textMap: { 0: '添加角色', 1: '编辑角色' },
      temp: JSON.parse(JSON.stringify(fields)),
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
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
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { name, id, description } = this.temp
        const sendData = {
          name,
          description
        }
        if (id) sendData.id = id
        this.btnLoading = true
        edit(sendData)
          .then((res) => {
            this.btnLoading = false
            this.$message.success(`${this.textMap[this.info.isEdit]}操作成功！`)
            this.$emit('update', this.info.isEdit)
            this.dialogClose()
          })
          .catch(() => {
            this.btnLoading = false
          })
      })
    },
    getdetail() {
      const { isEdit, data } = this.info
      if (!isEdit) return
      const { name, id, description } = data
      Object.assign(this.temp, {
        name,
        id,
        description
      })
    },
    // 关闭窗口
    dialogClose() {
      this.info.visible = false // 关闭
    },
    // 清楚数据
    cleared() {
      this.temp = JSON.parse(JSON.stringify(fields))
      this.btnLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

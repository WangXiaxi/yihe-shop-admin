<template>
  <el-dialog
    :close-on-click-modal="false"
    v-el-drag-dialog
    :title="textMap"
    width="500px"
    class="setting-dialog"
    :visible.sync="info.visible"
  >
    <el-form
      :rules="rules"
      ref="dataForm"
      :model="temp"
      label-position="right"
      label-width="100px"
      style="padding-right: 20px"
    >
      <el-form-item label="资源类型" prop="type">
        <el-radio-group v-model="temp.type">
          <el-radio label="0">菜单</el-radio>
          <el-radio label="1">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="temp.name" placeholder="资源名称"></el-input>
      </el-form-item>
      <el-form-item label="资源码" prop="right">
        <el-input v-model="temp.right" placeholder="资源码">></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="temp.description" placeholder="描述" type="textarea">></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click.native="handleSave">保存</el-button>
      <el-button @click.native="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {
    edit
  } from '@/api/menu-manage/resource-list'

  const fields = {
    id: '',
    name: '',
    right: '',
    parent_id: '',
    description: '',
    type: '0'
  }
  export default {
    components: {},
    props: {
      info: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        loading: false,
        textMap: '添加',
        rules: {
          type: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          right: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        },
        temp: JSON.parse(JSON.stringify(fields))
      }
    },
    watch: {
      'info.visible'(n) {
        if (n) {
          this.getDetails()
        } else {
          setTimeout(this.cleared, 300)
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      handleClose() {
        // 关闭
        this.info.visible = false
      },
      handleSave() {
        // 保存
        this.$refs.dataForm.validate((r) => {
          if (!r) return
          this.loading = true

          const data = JSON.parse(JSON.stringify(this.temp))
          edit(data)
            .then((res) => {
              this.loading = false
              this.handleClose()
              this.$message.success('添加成功！')
              this.$emit('update')
            })
            .catch(() => {
              this.loading = false
            })
        })
      },
      getDetails() {
        // 获取详情
        const isEdit = this.info.isEdit
        if (isEdit) {
          // 编辑
          const {
            id,
            name,
            right,
            parent_id,
            description,
            type
          } = this.info.data
          Object.assign(this.temp, {
            id,
            name,
            right,
            parent_id,
            description,
            type
          })
        } else {
          // 新增
          const {
            id
          } = this.info.data
          Object.assign(this.temp, {
            parent_id: id
          })
        }
      },
      cleared() {
        this.$refs.dataForm.resetFields()
        this.temp = JSON.parse(JSON.stringify(fields))
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>

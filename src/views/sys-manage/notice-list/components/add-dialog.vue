<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="info.visible"
    append-to-body
    class="setting-dialog app-main"
    :title="textMap[info.isEdit]"
    v-el-drag-dialog
    width="1000px"
  >
    <el-form
      :model="temp"
      :rules="rules"
      label-position="right"
      label-width="60px"
      ref="dataForm"
      v-loading="pageLoading"
    >
      <el-form-item label="名称" prop="title">
        <el-input
          :maxlength="200"
          v-model="temp.title"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input
          :maxlength="200"
          v-model="temp.type"
          placeholder="请输入类型"
        />
        <span
          class="avatar-uploader-tip"
        >首页滚动文字：home;其他消息：notice;用户协议：agreement;隐私政策：privacy;</span>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <el-input
          v-if="temp.type === 'home'"
          type="textarea"
          :maxlength="200"
          v-model="temp.content"
          placeholder="请输入内容"
        />

        <admin-tinymce
          v-if="temp.type !== 'home' && info.visible"
          ref="editor"
          :height="300"
          v-model="temp.content"
        ></admin-tinymce>
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
import { edit } from '@/api/sys-manage/notice-list'
import AdminTinymce from '@/components/admin-tinymce'

const fields = {
  title: '', // 名称
  content: '', // url
  type: ''
}
export default {
  components: {
    AdminTinymce
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
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
        url: [{ required: true, message: '请输入url', trigger: 'blur' }],
        imageList: [
          { required: true, message: '请上传图片', trigger: 'change' }
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
    handleAdd() {
      this.temp.values.push({ val: '' })
    },
    handleSure() {
      this.$refs.dataForm.validate((v) => {
        if (!v) return
        const { id, title, type, content } = this.temp
        const sendData = {
          id,
          title,
          type,
          content
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
        const { id, title, type, content } = data
        Object.assign(this.temp, {
          id,
          title,
          type,
          content
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

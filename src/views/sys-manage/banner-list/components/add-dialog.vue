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
      <el-form-item label="名称" prop="name">
        <el-input
          :maxlength="20"
          v-model="temp.name"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="跳转链接" prop="url">
        <el-input
          :maxlength="20"
          v-model="temp.url"
          placeholder="请输入跳转链接"
        />
      </el-form-item>
      <el-form-item label="图片" prop="imageList">
        <admin-upload
          :image-list="temp.imageList"
          :limit="1"
          img-u-r-l="/service/uploadBannerPic"
          :size-limit="10"
        ></admin-upload>
        <span
          class="avatar-uploader-tip"
        >允许上传图片类型（jpg、png、jpeg），单个最大不能超过10M</span>
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <input-cleave
          :maxlength="3"
          :is-decimal="0"
          v-model="temp.sort"
          placeholder="请输入排序"
        />
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
import { edit } from '@/api/sys-manage/banner-list'
import AdminUpload from '@/components/admin-upload'

const fields = {
  name: '', // 名称
  sort: '', // 排序
  url: '', // url
  imageList: []
}
export default {
  components: { AdminUpload },
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
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        url: [{ required: true, message: '请输入url', trigger: 'blur' }],
        imageList: [{ required: true, message: '请上传图片', trigger: 'change' }]
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
        const { id, sort, name, url, imageList } = this.temp
        const sendData = {
          id,
          sort,
          name,
          url,
          img: imageList[0].url
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
        const { id,
          sort,
          name,
          url, img } = data
        Object.assign(this.temp, {
          id,
          sort, name,
          url,
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
</style>

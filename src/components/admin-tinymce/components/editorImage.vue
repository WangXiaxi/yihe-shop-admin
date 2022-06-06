<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible=true">上传图片
    </el-button>
    <el-dialog title="图片上传" class="setting-dialog" :visible.sync="dialogVisible" append-to-body>
      <upload-img :image-list="imageList" :limit="50" :size-limit="10"></upload-img>
      <span class="avatar-uploader-tip">允许上传图片类型（jpg、png、jpeg），单个最大不能超过10M，最多50张</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadImg from '../../admin-upload'

export default {
  name: 'EditorSlideUpload',
  components: {
    uploadImg
  },
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      imageList: []
    }
  },
  methods: {
    checkAllSuccess() {
    },
    handleSubmit() {
      const arr = this.imageList.map(c => ({ url: c.url }))
      if (arr.find(c => c.url.slice(0, 6) !== '/group')) {
        return this.$message.error('图片上传未完成，请稍候！') // 上传图片前校验图片
      }
      this.$emit('successCBK', arr)
      this.imageList = []
      this.dialogVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

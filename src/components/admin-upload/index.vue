<!--
  图片上传
-->
<template>
  <div>
    <el-upload
      ref="elUpload"
      :multiple="multiple"
      :file-list="imageList"
      :show-file-list="showFileList"
      :on-remove="handleRemoves"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      :headers="myHeaders"
      :on-preview="handlePictureCardPreview"
      :on-exceed="handleExceed"
      class="avatar-uploader"
      :action="url"
      :limit="limit"
      accept=".png,.jpg,.jpeg"
      list-type="picture-card"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'UploadImg', // 命名规范
  props: {
    limit: { // 限制
      type: Number,
      default: null
    },
    multiple: { // 多选
      type: Boolean,
      default: true
    },
    showFileList: { // 显示列表
      type: Boolean,
      default: true
    },
    imageList: {
      type: Array,
      default: () => {
        return []
      }
    },
    sizeLimit: { // 图片限制
      type: Number,
      default: 5
    },
    validExtensions: {
      type: Array,
      default: () => {
        return ['png', 'jpg', 'jpeg']
      }
    },
    imgURL: {
      type: String,
      default: '/service/uploadGoodsPic'
    }
  },
  components: {
  },
  data() {
    return {
      url: '',
      images: [], // 图片显示集合
      index: null, // 显示下标
      myHeaders: { token: this.$store.getters.token }, // 请求头携带参数
      dialogImageUrl: '', // 图片预览
      dialogVisible: false // 图片预览
    }
  },
  created() {
  },
  computed: {
    showImage() {
      return this.images[this.index]
    },
    srcList() {
      return this.images
    }
  },
  mounted() {
  },
  methods: {
    handleExceed(files, fileList) { // 限制
      this.$message.error(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleRemoves(file) {
      if (!(file && file.status === 'success')) return // vue 2.5 bug beforeUpload不通过 会触发 on-remove
      this.handleRemove(file)
    },
    handleRemove(file) { // 删除操作
      const uid = file.uid
      const imageList = this.imageList
      const deleList = imageList.splice(imageList.findIndex(v => uid === v.uid), 1) // 删除图片
      this.$emit('handleRemove', deleList) // 分发移除事件
    },
    handleSuccess(response, file) { // 成功操作
    console.log(response)
      if (response.status !== 'success') {
        this.$message.error('图片上传失败！')
        setTimeout(() => { this.handleRemove(file) }, 200)
        return
      }
      let cur = null
      this.imageList.forEach(c => {
        if (c.uid === file.uid) {
          c.url = response.data.img
          cur = c
          delete c.response
        }
      }) // 将base64图片变为url
      this.$emit('onSuccess', cur)
    },
    handleError(e, file) { // 失败回传
      setTimeout(() => { this.handleRemove(file) }, 200)
      this.$emit('onError')
    },
    beforeUpload(file) {
      this.url = this.imgURL + '?time=' + new Date().getTime()
      const ext = file.name.split('.').pop().toLowerCase()
      const isLt2M = file.size / 1024 / 1024 < this.sizeLimit
      if (!this.validExtensions.includes(ext)) {
        this.$message.error('照片只能是 ' + this.validExtensions.join(', ') + ' 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error(`照片大小不能超过 ${this.sizeLimit}MB!`)
        return false
      }
      this.$emit('beforeUpload') // 分发beforeUpload
      const _URL = window.URL || window.webkitURL
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = () => {
          this.imageList.push({ uid: file.uid, name: file.name, url: img.src }) // 先填充图片 防止留白
          resolve(true)
        }
        img.onerror = () => {
          this.$message.error('上传图片无法解析，请重新选择!')
          reject(false)
        }
      })
    },
    handlePictureCardPreview(file) { // 显示大图
      this.images = this.imageList.map((c, i) => {
        if (file.uid === c.uid) this.index = i
        return c.url
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

<template>
  <div class="avatar-container">
    <el-dialog
      title="更换头像"
      size="100%"
      fullscreen
      custom-class="avatar-dialog"
      :visible.sync="info.visible"
      :show-close="false"
      :modal="false"
    >
      <span
        class="el-image-viewer__btn el-image-viewer__close"
      ><i class="el-icon-close" @click="handleClose"></i></span>
      <span
        class="el-image-viewer__btn el-image-viewer__close avatar-save"
      ><i class="el-icon-upload" @click="handleSave"></i></span>
      <vue-cropper
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :output-type="option.outputType"
        :info="true"
        :full="option.full"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :fixed="option.fixed"
        :fixed-number="option.fixedNumber"
        :center-box="option.centerBox"
        :info-true="option.infoTrue"
        :fixed-box="option.fixedBox"
      ></vue-cropper>
    </el-dialog>

    <el-upload
      style="visibility: hidden"
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeUpload"
      accept=".png,.jpg,.jpeg"
    >
      <div ref="uploadBtn"></div>
    </el-upload>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      info: {
        visible: false
      },
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: true, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      }
    }
  },
  methods: {
    ...mapActions(['SaveAvatar']),

    handleSave() {
      this.btnLoading = true
      this.$refs.cropper.getCropData((data) => {
        this.btnLoading = false
        this.$message.success('头像本地保存成功！')
        this.SaveAvatar(data)
        this.handleClose()
      })
    },
    changeUpload(file) {
      this.option.img = window.URL.createObjectURL(file.raw)
      Object.assign(this.info, {
        visible: true
      })
    },
    chooseImg() {
      this.$refs.uploadBtn.click()
    },
    handleClose() {
      // 关闭
      this.info.visible = false
    },
    getDetails() {},
    cleared() {}
  },
  watch: {
    'info.visible'(n) {
      if (n) {
        this.getDetails()
      } else {
        setTimeout(this.cleared, 300)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-save {
  top: 100px;
}
</style>
<style lang="scss">
.avatar-dialog {
  background: transparent;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
    height: 100vh;
    .vue-cropper {
      background: none;
    }
  }
}
</style>
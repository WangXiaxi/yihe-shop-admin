<template>
  <div class="svg-container">
    <div class="svg-item" v-for="(item, index) in svgList" :key="index">
      <svg-icon :icon-class="item" class-name="el-theme-color" />
      <div class="icon-name el-theme-color">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SvgHtml',
  data() {
    return {
      svgList: []
    }
  },
  computed: {},
  created() {
    const req = require.context('../../assets/icons/svg', false, /\.svg$/)
    this.svgList = req.keys().map((c) => {
      return c.replaceAll('./', '').replaceAll('.svg', '')
    })
  }
}
</script>

<style lang="scss" scoped>
.svg-container {
  padding: 10px;
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;
  overflow: hidden;
  .svg-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    float: left;
    width: 16.66666%;
    text-align: center;
    height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      border-top: 1px solid #eee;
    }
    &:nth-of-type(6n + 1) {
      border-left: 1px solid #eee;
    }
    .svg-icon {
      font-size: 32px;
    }
    .icon-name {
      line-height: 30px;
    }
  }
}
</style>

<template>
  <div class="home-container">
    <div class="pub-title">后台统计</div>
    <div class="home-list">
      <div class="item">
        <i class=""></i>
        <div>会员数量</div>
      </div>
      <div class="item">
        <i class=""></i>
        <div>今日订单</div>
      </div>
      <div class="item">
        <i class=""></i>
        <div>待发货</div>
      </div>
      <div class="item">
        <i class=""></i>
        <div>免费商品</div>
      </div>
      <div class="item">
        <i class=""></i>
        <div>代理商品</div>
      </div>
    </div>
    <div class="pub-title">最近待处理订单（10条）</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data() {
    return {

   todoList: {}
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 跳转
    goUrl(name, query) {
      this.$router.push({ name, query })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bottom-part {
  padding: 10px 6px 8px;
  background: #fff;
}
.panel-title {
  position: relative;
  font-size: 16px;
  line-height: 30px;
  color: #0078d3;
  padding-left: 10px;
  &:before {
    content: ' ';
    width: 2px;
    background: #2b63b8;
    height: 18px;
    position: absolute;
    top: 6px;
    left: 0;
  }
}
</style>

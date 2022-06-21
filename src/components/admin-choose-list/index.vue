<template>
  <div v-if="dragList.length !== 0" class="checkd">
    <div class="checkd_box">
      <!-- <draggable
        v-model="dragList"
        v-bind="dragOptions"
        @update="dragUpdate"
        @start="dragStart"
        @end="dragEnd"
        :disabled="disabled"
      > -->
      <template v-for="(item, index) in dragList">
        <el-tag
          :key="index"
          @close="deleteItem(index, item)"
          :closable="!item.disabled"
          :style="{ opacity: drag === index ? '0' : '1' }"
        >
          {{ item.name }}
        </el-tag>
      </template>
      <!-- </draggable> -->
    </div>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'

export default {
  components: {
    // draggable
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    list: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      drag: null,
      dragList: this.list
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        forceFallback: true
      }
    }
  },
  watch: {
    list(newVal, oldVal) {
      this.dragList = newVal
    }
  },
  mounted() {},
  methods: {
    deleteItem(index, item) {
      this.list.splice(index, 1)
      this.$emit('deleteItem', item)
    },
    // 拖动更新
    dragUpdate(evt) {
      this.$emit('update:list', this.dragList)
    },
    // 拖动开始
    dragStart(e) {
      this.drag = e.oldIndex
    },
    // 拖动结束
    dragEnd(e) {
      this.drag = null
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.checkd_box {
  max-height: 150px;
  overflow: auto;
}
.checkd {
  margin-top: 7px;
  &_box {
    min-height: 70px;
    padding: 5px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    overflow-y: auto;
    box-sizing: border-box;
    line-height: 20px;
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 2px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #dbe3ed;
    }
  }
  .el-tag {
    margin: 4px;
    cursor: move;
  }
}
</style>


<template>
  <!--  选择器选项以树形控件展示  -->
  <el-select style="width: 100%;" v-model="value" placeholder="请选择" ref="selectTree">
    <el-option :key="value" :value="value" :label="label" hidden />
    <el-tree
      :data="options"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      accordion
      highlight-current
      @node-click="handleNodeClick"
    />
  </el-select>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
      defaultProps: {
        type: Object,
        default: () => {
          return {
        children: 'children',
        label: 'label'
      }
        }
      }

  },
  computed: {
    label() {
      const options = this.options
      const val = this.value
      let lab = ' '
      const callee = (opts) => {
        for (let i = 0; i < opts.length; i++) {
          if (opts[i].id === val) {
            lab = opts[i].label
            return
          } else {
            callee(opts[i].children || [])
          }
        }
      }
      callee(options)
      return lab
    }
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    handleNodeClick (data) {
      this.$refs.selectTree.blur()
      this.$emit('input', data.id)
    }
  }
}
</script>


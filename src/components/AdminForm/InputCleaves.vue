<template>
  <div class="el-input el-input--small">
    <input
      type="text"
      ref="input"
      :readonly="disabled"
      :disabled="disabled"
      :value="value"
      :maxlength="isMaxLength"
      :placeholder="isPlaceholder"
      @keyup="onKeyup"
      @blur="onBlur"
      @keydown="onKeydown($event)"
      @input="onInput($event)"
      :class="[{ 'el-input__inner': isDefaultCss }, isCss]"
      style="ime-mode: disabled"
      onpaste="return true"
      ondrop="return false"
      ondragenter="return false"
      ondragstart="return false"
    />
  </div>
</template>

<script>
export default {
  name: 'CleaveAll',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    isPlaceholder: {
      type: String,
      default: ''
    },
    // 设置class
    isCss: {
      type: String,
      default: ''
    },
    // 启用默认class
    isDefaultCss: {
      type: Boolean,
      default: true
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 小数位，默认五位
    isDecimal: {
      type: Number,
      default: 5
    },
    isMaxLength: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      initValue: this.value
    }
  },
  computed: {
    platforms: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onKeyup() {
      this.$emit('keyup', this.value)
    },
    onBlur() {
      // 失焦验证
      const value =
        this.value === '-' || this.value === '' ? '' : Number(this.value)
      this.$emit('input', value)
      const prop = this.$parent.prop
      if (prop) this.$parent.form.validateField(prop)
      this.$el.querySelector('input').value = this.value
      this.$emit('blur', this.value)
    },
    onKeydown(e) {
      const isFullStop = (key) => {
        return (key === 190 || key === 110) && this.isDecimal !== 0
      }
      const isNumber = (key) => {
        return (
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105) ||
          key === 189 ||
          key === 109
        )
      }
      const key = window.event ? e.keyCode : e.which
      const obj = e.target || e.srcElement
      const value = obj.value.toString()
      // 过滤非数字字符
      if (
        !(key === 17 || key === 86 || key === 90 || key === 67) &&
        !isNumber(key) &&
        !e.shiftKey &&
        !isFullStop(key) &&
        key !== 9 &&
        key !== 8 &&
        key !== 46 &&
        key !== 37 &&
        key !== 39
      ) {
        e.preventDefault()
      }
      // 防止第一位输入小数点
      if (!value) {
        if (isFullStop(key)) e.preventDefault()
      }
      // 防止输入多个0
      if (
        value.length !== 0 &&
        Number(value) === 0 &&
        value.indexOf('.') === -1 &&
        (key === 48 || key === 96)
      ) {
        e.preventDefault()
      }
    },
    onInput(e) {
      const obj = e.target || e.srcElement
      const value = obj.value.toString()
      const first = value[0] === '-' ? '-' : ''
      let val = value
        .replace(/[^\d.]/g, '')
        .replace(/\./g, '.')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(
          new RegExp('^(\\-)*(\\d+)\\.(\\d{' + this.isDecimal + '}).*$', ''),
          '$1$2.$3'
        )
      if (val.charAt(0) === '.') {
        val = parseFloat(val) || ''
      }
      obj.value = first + val

      this.$emit('input', obj.value)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
input[type='text']:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>

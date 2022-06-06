const filters = {
  fill: (val, de) => {
    const cur = de
    return val || val === 0 ? val : (de ? cur : '--')
  },
  parseTime: (time, cFormat, de = '--') => {
    if (!time) return de
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      date = new Date(time.replace(/-/g, '/'))
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }
}

export default {
  install: function (Vue) {
    Object.keys(filters).forEach(name => {
      Vue.filter(name, filters[name])
    })
  }
}

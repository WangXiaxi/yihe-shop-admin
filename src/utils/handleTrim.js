/**
 *
 * @name    handleTrim 用于接口处理所有参数去首位空格
 * @authors wangxx
 * @date    2019-10-25 17:05:11
 */
import qs from 'qs'

/* 判断字符串是否为json数据*/
function isJSON(str) {
  try {
    if (JSON.parse(str) && typeof JSON.parse(str) === 'object') return true
  } catch (e) {
    return false
  }
}

/* 判断是否qs转译 */
function isQs(str) {
  if (typeof str !== 'string') return false
  try {
    const cur = qs.parse(str)
    if (cur && typeof cur === 'object') return cur
  } catch (e) {
    return false
  }
}

/* 判断是否是表单格式数据 */
function isFormData(v) {
  return Object.prototype.toString.call(v) === '[object FormData]'
}

function deepHandle(source) { // 处理
  const type = typeof source
  const typeTime = source instanceof Date

  if (typeTime || !source || type === 'boolean' || type === 'number') return source // null undefined 0 false true 返回自身

  if (type === 'string' && !isJSON(source)) return source.trim() // 字符串类型并且不是json

  if (type !== 'object') return source // 保险判断

  const sourceObj = type === 'string' ? JSON.parse(source) : source

  const targetObj = sourceObj.constructor === Array ? [] : {}
  for (const keys in sourceObj) {
    if (sourceObj.hasOwnProperty(keys)) {
      targetObj[keys] = deepHandle(sourceObj[keys])
    }
  }
  return type === 'string' ? JSON.stringify(targetObj) : targetObj
}

export function handleTrim(config) {
  const { data, params } = config
  if (data && !isFormData(data)) {
    const qsData = isQs(data)
    if (qsData) {
      config.data = qs.stringify(deepHandle(qsData))
    } else {
      config.data = deepHandle(data)
    }
  }
  if (params) config.params = deepHandle(params)
}

import request from '@/utils/request'
// 获取商品列表
export function list(data) {
  return request({
    url: '/service/getGoodsList',
    method: 'POST',
    data
  })
}

// 操作商品上下架
export function editGoodsStatus(data) {
  return request({
    url: '/service/editGoodsStatus',
    method: 'POST',
    data
  })
}

// 删除商品
export function dele(data) {
  return request({
    url: '/service/delGoodsByID',
    method: 'POST',
    data
  })
}

// 商品详情
export function getDetail(params) {
  return request({
    url: '/service/getEditGoodsInfo',
    method: 'get',
    params
  })
}

// 更新商品价格
export function editGoodsSortByID(data) {
  return request({
    url: '/service/editGoodsSortByID',
    method: 'POST',
    data
  })
}
// 更新商品价格
export function editGoodsPrice(data) {
  return request({
    url: '/service/editGoodsPrice',
    method: 'POST',
    data
  })
}
// 更新商品库存
export function editGoodsStoreNumber(data) {
  return request({
    url: '/service/editGoodsStoreNumber',
    method: 'POST',
    data
  })
}
// 编辑商品
export function editGoodsInfo(data) {
  return request({
    url: '/service/editGoodsInfo',
    method: 'POST',
    data
  })
}

// 获取随便单号
export function getRandomGoodsNo(params) {
  return request({
    url: '/service/getRandomGoodsNo',
    method: 'get',
    params
  })
}

// 获取商品列表
export function getGoodsSearchList(data) {
  return request({
    url: '/service/getGoodsSearchList',
    method: 'POST',
    data
  })
}
import request from '@/utils/request'
// 获取商品列表
export function list() {
  return request({
    url: '/service/getGoodsList',
    method: 'get'
  })
}

// 操作商品上下架
export function editGoodsStatus() {
  return request({
    url: '/service/editGoodsStatus',
    method: 'POST'
  })
}

// 删除商品
export function dele() {
  return request({
    url: '/service/delGoodsByID',
    method: 'POST'
  })
}

// 商品详情
export function getDetail() {
  return request({
    url: '/service/getGoodsDataByID',
    method: 'get'
  })
}

// 更新商品价格
export function editGoodsPrice() {
  return request({
    url: '/service/editGoodsPrice',
    method: 'POST'
  })
}
// 更新商品库存
export function editGoodsStoreNumber() {
  return request({
    url: '/service/editGoodsStoreNumber',
    method: 'POST'
  })
}
// 编辑商品
export function editGoodsInfo() {
  return request({
    url: '/service/editGoodsInfo',
    method: 'POST'
  })
}
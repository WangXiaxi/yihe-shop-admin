// 枚举字段
export default {
  deliveryStateOptions: [
    { label: '待接收', key: 15 },
    { label: '待运输', key: 20 },
    { label: '已装车', key: 30 },
    { label: '已发车', key: 35 },
    { label: '卸货', key: 45 },
    { label: '已删除', key: 7 }
  ],
  businessTypeOptions: [
    { label: '内部投递-仓储', key: 1 },
    { label: '内部投递-分拣', key: 2 },
    { label: '成品运输', key: 3 },
    { label: 'mulkRun业务', key: 4 }
  ],
  carrierCodeOptions: [
    { label: '大板', key: 'DZB' },
    { label: '小板', key: 'XZB' },
    { label: '箱', key: 'XZ' }
  ],
  itemCategoryOptions: [
    { label: '是', key: 'Y' },
    { label: '否', key: 'N' }
  ],
  isUrgencyOptions: [
    { label: '是', key: 'Y' },
    { label: '否', key: 'N' }
  ],
  payTypeOptions: [
    { label: '资源全包', key: 'PAY_TYPE_1' },
    { label: '流量全包', key: 'PAY_TYPE_2' }
  ],
  synStatusOptions: [
    { label: '未同步', key: 0 },
    { label: '已同步', key: 1 },
    { label: '取消', key: 2 }
  ]
}

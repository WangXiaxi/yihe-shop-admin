// 高德转百度
export const gd_convert_bd = (coordinate) => {
  const pi = Math.PI * 3000.0 / 180.0
  const x = coordinate[0]
  const y = coordinate[1]
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi)
  const bd_lng = z * Math.cos(theta) + 0.0065
  const bd_lat = z * Math.sin(theta) + 0.006
  return [bd_lng.toFixed(6), bd_lat.toFixed(6)]
}

// 百度转高德
export const bd_convert_gd = (coordinate) => {
  const bd_lng = coordinate[0]
  const bd_lat = coordinate[1]
  const pi = Math.PI * 3000.0 / 180.0
  const x = bd_lng - 0.0065
  const y = bd_lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi)
  const gd_lng = z * Math.cos(theta)
  const gd_lat = z * Math.sin(theta)
  return [gd_lng, gd_lat]
}

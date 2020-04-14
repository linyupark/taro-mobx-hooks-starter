import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

/** 必要条件算出现价（保留多少小数） */
function CurrentPrice({ lastPrice, yesterdayClosePrice, stockType }) {
  const typeNumber = Number(stockType)
  const precision = ~[16640, 12560, 16672, 12576, 12544, 12560].indexOf(
    typeNumber,
  )
    ? 3
    : 2
  
  // 保留小数点
  let v = ((lastPrice || yesterdayClosePrice) / 1000)
  if (Number.isNaN(v)) v = '--'
  else v = v.toFixed(precision)

  // 颜色
  const colorClassName = () => {
    if (yesterdayClosePrice === lastPrice) return ''
    return yesterdayClosePrice > lastPrice ? 'down-green' : 'up-red'
  }

  return (
    <View>
      <Text className={colorClassName()}>{v}</Text>
    </View>
  )
}

CurrentPrice.options = {
  addGlobalClass: true
}

export default CurrentPrice

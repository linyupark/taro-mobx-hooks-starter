import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import currency from 'currency.js'

/** 必要条件算涨跌幅 */
function ChangePercent({ lastPrice, yesterdayClosePrice, wrappClass }) {
  let status = ''
  const priceChange = lastPrice - yesterdayClosePrice
  if (priceChange === 0) {
    status = '0.00%'
  } else {
    status = `${priceChange > 0 ? '+' : '-'}${currency(
      (Math.abs(priceChange) / yesterdayClosePrice) * 100,
    )}%`
  }

  const colorClassName = () => {
    if (yesterdayClosePrice === lastPrice) return ''
    return yesterdayClosePrice > lastPrice ? 'down-green' : 'up-red'
  }

  return (
    <View className={wrappClass}>
      <Text className={colorClassName()}>{status}</Text>
    </View>
  )
}

ChangePercent.options = {
  addGlobalClass: true
}

export default ChangePercent

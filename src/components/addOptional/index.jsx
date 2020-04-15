import Taro, { useState, useContext, useCallback, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { UserContext } from '@/store/user'

/** 添加删除自选按钮
 * data: { stockId, stockType, marketType}
 * showText: 是否显示 加自选 / 已经添加 / 取消自选
 * canRemove: 能取消自选
 */
function AddOptional({ data, showText, canRemove }) {

  // 全局已订阅数据
  const { subStockList, subStock, unsubStock } = useContext(UserContext)

  // 查看是否已经添加
  const isAdded = useCallback(() => {
    if (!data) return false
    return subStockList.findIndex(
      item => item.stockId == data.stockId && item.stockType == data.stockType,
    ) !== -1
  }, [data, subStockList])

  // 添加状态控制
  const [added, setAdded] = useState(isAdded())

  // 状态code 0 可添加自选；1 已添加自选（打勾）；2 删除自选
  const statusCode = () => {
    if (!added) return 0
    if (added && canRemove) return 2
    return 1
  }

  // 处理点击
  const onToggle = (e) => {
    e.stopPropagation()
    // 通知其他组件点击了切换自选状态
    Taro.eventCenter.trigger('stk.toggleOptional', data)
    if (added) {
      if (!canRemove) return
      console.log('删除自选', data)
      return unsubStock(data)
    }
    subStock(data)
    Taro.showToast({ title: '已添加自选', icon: 'none' })
    console.log('添加自选', data)
  }

  useEffect(() => {
    setAdded(isAdded())
  }, [isAdded, subStockList])

  return <View onClick={onToggle}>
    <View className={`stkm icon-jiazixuan${statusCode()}`}></View>
    {showText && <Text>{statusCode === 0 ? '加自选' : '取消自选'}</Text>}
  </View>
}

AddOptional.options = {
  addGlobalClass: true,
}

export default observer(AddOptional)

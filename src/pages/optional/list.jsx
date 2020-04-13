import Taro, { useContext, useEffect, useState, useMemo } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { UserContext } from '@/store/user'
import { observer } from '@tarojs/mobx'
import httpStockService from '@/service/httpStock'
import pbSocketService from '@/service/pbSocket'

// 缓存上一次订阅列表
let prevStockKeys = []

function OptionalList() {
  // 获取用户订阅股票列表
  const { subStockList, subSnapshotList } = useContext(UserContext)
  const [subStockDetailList, setSubStockDetailList] = useState([])
  
  // 订阅以及快照需要的参数
  const stockKeys = useMemo(() => {
    return subStockDetailList.map(stk => {
      return {
        marketType: Number(stk.marketType),
        stockId: stk.stockId,
        stockType: stk.stockType
      }
    })
  }, [subStockDetailList])

  // 完整数据
  const mergedSnapshotList = useMemo(() => {
    return subStockDetailList.map((stk, i) => {
      return {
        ...stk,
        ...subSnapshotList[i]
      }
    })
  }, [subSnapshotList, subStockDetailList])

  // 自选列表发生变化重新获取
  useEffect(() => {
    ;(async () => {
      const resp = await httpStockService.getBaseInfo('', subStockList)
      setSubStockDetailList(resp)
    })()
  }, [setSubStockDetailList, subStockList])

  // 重新订阅
  useEffect(() => {
    // 先取消之前的
    if (prevStockKeys.length > 0) {
      pbSocketService.DO_STOCK_UNSUB(prevStockKeys)
    }
    // 订阅新的
    if (subStockDetailList.length > 0) {
      pbSocketService.DO_STOCK_SUB(stockKeys)
      pbSocketService.DO_STOCK_SNAPSHOT(stockKeys)
      prevStockKeys = stockKeys
    }

  }, [stockKeys, subStockDetailList])

  return (
    <View>
      <Text>{JSON.stringify(mergedSnapshotList)}</Text>
    </View>
  )
}

export default observer(OptionalList)

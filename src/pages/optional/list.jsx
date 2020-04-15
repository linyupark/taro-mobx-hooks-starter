import Taro, { useContext, useEffect, useState, useMemo } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { UserContext } from '@/store/user'
import { observer } from '@tarojs/mobx'
import httpStockService from '@/service/httpStock'
import pbSocketService from '@/service/pbSocket'
import CurrentPrice from './currentPrice'
import ChangePercent from './changePercent'

// 缓存上一次订阅列表
let prevStockKeys = []

/** 自选列表 */
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
        stockType: stk.stockType,
        bizType: [1],
      }
    })
  }, [subStockDetailList])

  // 完整数据
  const mergedSnapshotList = useMemo(() => {
    return subStockDetailList.map((stk, i) => {
      return {
        ...stk,
        ...subSnapshotList.slice()[i], // mbox array不能直接指定index获取先slice转换成普通数组
      }
    })
  }, [subSnapshotList, subStockDetailList])

  // 自选列表发生变化重新获取
  useEffect(() => {
    console.log('subStockList 改变', subStockList.slice())
    ;(async () => {
      const resp = await httpStockService.getBaseInfo('', subStockList)
      setSubStockDetailList(resp)
    })()
  }, [setSubStockDetailList, subStockList])

  // 订阅
  useEffect(() => {
    pbSocketService.DO_STOCK_UNSUB(prevStockKeys)
    if (subStockDetailList.length > 0) {
      pbSocketService.DO_STOCK_SUB(stockKeys)
      pbSocketService.DO_STOCK_SNAPSHOT(stockKeys)
      prevStockKeys = stockKeys
    }
  }, [stockKeys, subStockDetailList])

  // 销毁组件
  useEffect(() => {
    return () => {
      pbSocketService.DO_STOCK_UNSUB(prevStockKeys)
    }
  }, [])

  return (
    <View>
      {mergedSnapshotList.map(item => {
        return (
          <View
            className='stkListItem at-row at-row__justify--between at-row__align--center'
            key={`${item.stockId}_${item.stockType}`}
          >
            <View className='baseInfo'>
              <Text>{item.cnName}</Text>
              <Text className='code'>{item.stockId}</Text>
            </View>
            <CurrentPrice
              lastPrice={item.lastPrice}
              yesterdayClosePrice={item.yesterdayClosePrice}
              stockType={item.stockType}
            />
            <ChangePercent
              lastPrice={item.lastPrice || item.yesterdayClosePrice}
              yesterdayClosePrice={item.yesterdayClosePrice}
              wrappClass='optional-wrap'
            />
          </View>
        )
      })}
    </View>
  )
}

OptionalList.options = {
  addGlobalClass: true,
}

export default observer(OptionalList)

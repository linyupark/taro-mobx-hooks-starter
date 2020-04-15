import Taro, { useContext } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import AddOptional from '@/components/addOptional'
import { UserContext } from '@/store/user'

/** 关键字查询跟历史记录公用结果列表 */
function HistorySearchResult({ data }) {

  const { addStockHistory } = useContext(UserContext)

  // 处理点击结果项（添加到历史记录，跳转到详情）
  const onClickItem = ({ stockId, marketType, stockType }) => {
    addStockHistory({ stockId, marketType, stockType })
  }

  return (
    <View>
      {(data || []).map(item => {
        return (
          <View
            className='stkListItem at-row at-row__justify--between at-row__align--center'
            key={`${item.stockId}_${item.stockType}`}
            onClick={onClickItem.bind(null, item)}
          >
            <View className='baseInfo'>
              <Text>{item.cnName}</Text>
              <Text className='code'>{item.stockId}</Text>
            </View>
            <AddOptional
              data={{
                stockId: item.stockId,
                stockType: item.stockType,
                marketType: item.marketType,
              }}
              canRemove
            />
          </View>
        )
      })}
    </View>
  )
}

HistorySearchResult.options = {
  addGlobalClass: true,
}

export default observer(HistorySearchResult)

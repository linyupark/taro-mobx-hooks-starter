import Taro, { useEffect, useState, useMemo, useCallback, useContext } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import httpStockService from '@/service/httpStock'
import { UserContext } from '@/store/user'
import { observer } from '@tarojs/mobx'
import ResultList from './historySearchResult'

const styleClassName = 'columns at-row at-row__justify--between at-row__align--center'

/** 搜索历史记录 */
function SearchHistory() {

  const { stockHistory, removeStockHistory } = useContext(UserContext)

  // 搜索的关键字
  const [keyword, setKeyword] = useState('')

  // 最后展示结果记录（搜索或历史查询结果）
  const [resultList, setResultList] = useState([])

  // 触发搜索
  const onSearch = useCallback(async newKeyword => {
    const searchResult = await httpStockService.getBaseInfo(newKeyword)
    setResultList(searchResult)
    if (searchResult.length === 0) {
      Taro.showToast({
        title: '没有相关信息，试试别的关键字吧',
        icon: 'none'
      })
    }
  }, [])

  // 触发历史记录查询
  const onHistory = useCallback(async () => {
    console.log('查询历史', stockHistory.slice())
    setResultList(await httpStockService.getBaseInfo('', stockHistory))
  }, [stockHistory])

  // 根据有没有关键字来判断是显示搜索结果还是历史记录
  const showSearch = useMemo(() => {
    return keyword && keyword !== ''
  }, [keyword])

  // 清除历史记录
  const onRemoveHistory = () => {
    // 通知其他组件点击了清除历史记录
    Taro.eventCenter.trigger('stk.removeHistory')
    removeStockHistory()
    setResultList([])
  }

  useEffect(() => {
    Taro.eventCenter.off('stk.search')
    Taro.eventCenter.on('stk.search', newKeyword => {
      setKeyword(newKeyword)
      // 清除搜索，展示历史记录
      if (!newKeyword || newKeyword.length === 0) {
        return onHistory()
      }
      // 执行关键字搜索
      onSearch(newKeyword)
    })
  }, [onHistory, onSearch])

  return (
    <View>
      {stockHistory.length > 0 && !showSearch && (
        <View className={styleClassName}>
          <View>历史记录</View>
          <View onClick={onRemoveHistory}>清除</View>
        </View>
      )}
      {showSearch && (
        <View className={styleClassName}>
          <View>搜索结果</View>
        </View>
      )}
      <ScrollView className='stkList' scrollY>
        <ResultList data={resultList} />
      </ScrollView>
    </View>
  )
}

SearchHistory.options = {
  addGlobalClass: true,
}

export default observer(SearchHistory)

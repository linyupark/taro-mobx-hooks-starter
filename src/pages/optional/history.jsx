import Taro, { useEffect, useState, useMemo, useCallback } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import DICT from '@/constant/dict'
import httpStockService from '@/service/httpStock'

/** 搜索历史记录 */
function SearchHistory() {
  // 搜索的关键字
  const [keyword, setKeyword] = useState('')

  // 历史记录列表
  const [history, setHistory] = useState(
    JSON.parse(Taro.getStorageSync(DICT.STK_SEARCH_HISTORY) || '[]'),
  )

  // 最后展示结果记录（搜索或历史查询结果）
  const [resultList, setResultList] = useState([])

  // 触发搜索
  const onSearch = async newKeyword => {
    setResultList(await httpStockService.getBaseInfo(newKeyword))
  }

  // 触发历史记录查询
  const onHistory = useCallback(async () => {
    setResultList(await httpStockService.getBaseInfo('', history))
  }, [history])

  // 根据有没有关键字来判断是显示搜索结果还是历史记录
  const showSearch = useMemo(() => {
    return keyword && keyword !== ''
  }, [keyword])

  useEffect(() => {
    Taro.eventCenter.on('stk.search', newKeyword => {
      setKeyword(newKeyword)
      // 清除搜索，展示历史记录
      if (!newKeyword || newKeyword.length === 0) {
        return onHistory()
      }
      // 执行关键字搜索
      onSearch(newKeyword)
    })
  }, [onHistory])

  return (
    <View>
      {history.length > 0 && !showSearch && (
        <View className='columns at-row at-row__justify--between at-row__align--center'>
          <View>历史记录</View>
          <View>清除</View>
        </View>
      )}
      {showSearch && (
        <View className='columns at-row at-row__justify--between at-row__align--center'>
          <View>搜索结果</View>
        </View>
      )}
      <ScrollView className='stkList' scrollY>
        {JSON.stringify(resultList)}
      </ScrollView>
    </View>
  )
}

SearchHistory.options = {
  addGlobalClass: true,
}

export default SearchHistory

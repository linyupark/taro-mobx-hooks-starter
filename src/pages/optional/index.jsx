import Taro, { useState, useMemo, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtSearchBar } from 'taro-ui'
import OptionalList from './list'
import SearchHistory from './history'

/** 自选股页面 */
function OptionalPage() {

  const [keyword, setKeyword] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)

  // 关键字改变
  const onKeywordChange = newKeyword => {
    setKeyword(newKeyword)
    if (newKeyword === '') {
      console.log('清除关键字')
      Taro.eventCenter.trigger('stk.search', '')
    }
  }

  // 查找关键字
  const onKeywordSearch = () => {
    console.log('搜索关键字', keyword)
    Taro.eventCenter.trigger('stk.search', keyword)
  }

  // 搜索框聚焦触发
  const onSearchBarFocus = () => {
    setSearchFocus(true)
    Taro.eventCenter.trigger('stk.search', '')
  }
  const onSearchBarBlur = () => {
    setSearchFocus(false)
  }

  // 显示自选列表的条件
  const showOptionalList = useMemo(() => {
    return keyword === '' && !searchFocus
  }, [keyword, searchFocus])

  useEffect(() => {
    Taro.eventCenter.on('stk.removeHistory', () => {
      setSearchFocus(true)
    })
    Taro.eventCenter.on('stk.toggleOptional', () => {
      setSearchFocus(true)
    })
    return () => {
      Taro.eventCenter.off('stk.removeHistory')
      Taro.eventCenter.off('stk.toggleOptional')
    }
  }, [])

  return (
    <View>
      {/* 搜索框 */}
      <AtSearchBar
        placeholder='股票代码/名称/首字母'
        actionName='查找'
        value={keyword}
        onChange={onKeywordChange}
        onActionClick={onKeywordSearch}
        onFocus={onSearchBarFocus}
        onBlur={onSearchBarBlur}
        focus={searchFocus}
      />
      {/* 自选列表 */}
      <View
        style={{
          display: showOptionalList ? 'block' : 'none',
        }}
      >
        <View className='columns at-row at-row__justify--between at-row__align--center'>
          <View className='name'>名称</View>
          <View>现价</View>
          <View>涨跌幅</View>
        </View>
        <ScrollView className='stkList' scrollY>
          <OptionalList />
        </ScrollView>
      </View>

      {/* 历史记录 */}
      <View
        style={{
          display: showOptionalList ? 'none' : 'block',
        }}
      >
        <SearchHistory keyword={keyword} />
      </View>
    </View>
  )
}

OptionalPage.config = {
  navigationBarTitleText: '自选',
}

OptionalPage.options = {
  addGlobalClass: true,
}

export default observer(OptionalPage)

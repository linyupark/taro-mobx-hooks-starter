import Taro, { useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtSearchBar } from 'taro-ui'
import OptionalList from './list'

/** 自选股页面 */
function OptionalPage() {

  const [keyword, setKeyword] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)

  // 关键字改变
  const onKeywordChange = (newKeyword) => {
    console.log('onKeywordChange', newKeyword)
    setKeyword(newKeyword)
  }

  // 查找关键字
  const onKeywordSearch = (ev) => {
    console.log('onKeywordSearch', ev)
  }

  // 搜索框聚焦触发
  const onSearchBarFocus = () => {
    setSearchFocus(true)
  }

  return (
    <View className='optional'>
      {/* 搜索框 */}
      <AtSearchBar
        actionName='查找'
        value={keyword}
        onChange={onKeywordChange}
        onActionClick={onKeywordSearch}
        onFocus={onSearchBarFocus}
      />
      {searchFocus ? '' : <OptionalList />}
    </View>
  )
}

OptionalPage.config = {
  navigationBarTitleText: '自选',
}

export default observer(OptionalPage)

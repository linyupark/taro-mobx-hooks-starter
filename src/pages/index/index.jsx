import Taro, { useEffect, useContext } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import GetUserInfo from '@/components/weapp/getUserInfo'
import { observer } from '@tarojs/mobx'
import Auth from '@/store/auth'
import './index.scss'

function Index() {
  const { weapp } = useContext(Auth)

  useEffect(() => {}, [])

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      {JSON.stringify(weapp)}
      <GetUserInfo btnText='获取个人信息' />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}

export default observer(Index)

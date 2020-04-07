import Taro, { useEffect, useContext } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import GetUserInfo from '@/components/weapp/getUserInfo'
import { observer } from '@tarojs/mobx'
import Auth from '@/store/auth'
import STKMSocket from '@/store/stkm/ws'
import './index.scss'

function Index() {
  const { weapp } = useContext(Auth)
  const { task, connected, createTask } = useContext(STKMSocket)

  useEffect(() => {
    createTask('ws://139.224.20.42:1234/gopush/ws')
  }, [createTask])

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      {JSON.stringify(weapp)}
      <GetUserInfo btnText='获取个人信息' />
      <Button onClick={() => { task.close() }}>socket: {connected ? '连接' : '断开'}</Button>
      {connected ? <Button onClick={() => { task.send({ data: 'hello' }) }}>发消息</Button> : ''}
      {JSON.stringify(task)}
      <Text>
        {JSON.stringify(connected)}
      </Text>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '首页',
}

export default observer(Index)

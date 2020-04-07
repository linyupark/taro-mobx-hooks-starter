import Taro, { useState, useEffect, useContext, useCallback } from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { Button } from '@tarojs/components'
import Auth from '@/store/auth'

function GetUserInfo({ btnText, afterGotUserInfo }) {
  // 默认人为是已经授权
  const [authState, setAuthState] = useState(true)
  const [retry, setRetry] = useState(false)
  const { weappGetUserInfo } = useContext(Auth)

  // 授权处理
  const onGotUserInfo = (res) => {
    if (res.detail.userInfo) {
      // 授权成功
      setAuthState(true)
      getUserInfo()
    }
    else {
      Taro.showModal({
        title: '温馨提示',
        content: '简单的信任，是故事的开始',
        showCancel: false
      }).then(modal => {
        if (modal.confirm) {
          setRetry(true)
        }
      })
    }
  }

  // 获取用户信息
  const getUserInfo = useCallback(() => {
    // 用户允许授权获取用户信息(静默获取)
    weappGetUserInfo().then(userInfo => {
      console.log('用户信息', userInfo);
      if (typeof afterGotUserInfo === 'function') {
        afterGotUserInfo(userInfo)
      }
    }).catch(err => {
      console.error(err)
    })
  }, [afterGotUserInfo, weappGetUserInfo])

  // 初始化处理
  useEffect(() => {
    console.log('weappGetUserInfo, authState')
    Taro.getSetting().then(res => {
      if (JSON.stringify(res.authSetting).search('scope.userInfo') === -1) {
        console.log('用户无授权信息', res.authSetting)
        // 按钮授权获取
        setAuthState(false)
      } else {
        getUserInfo()
      }
    })
  }, [getUserInfo])

  return authState ? (
    ''
  ) : (
    <Button
      className='login-btn'
      openType='getUserInfo'
      onGetUserInfo={onGotUserInfo}
    >
      {retry ? '重新': ''}{btnText}
    </Button>
  )
}

export default observer(GetUserInfo)

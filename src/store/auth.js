import Taro, { createContext } from '@tarojs/taro'
import { observable, decorate, action } from 'mobx'
import weappService from '@/service/weapp'

// 身份认证相关
class Auth {

  // 微信小程序
  weapp = {}

  // 登录
  async weappLogin() {
    const { code } = await new Promise(resolve => Taro.login({
      success(res) {
        console.log('weapp login', res)
        resolve(res)
      },
      fail() {
        console.error('weapp login failed')
      }
    }))
    return code
  }

  // 获取用户信息
  async weappGetUserInfo() {
    if (!this.weapp.loginCode) {
      this.weapp.loginCode = await this.weappLogin()
    }
    const { encryptedData, iv } = await new Promise(resolve => Taro.getUserInfo({
      success(res) {
        console.log('weapp getUserInfo', res)
        resolve(res)
      },
      fail() {
        console.error('weapp getUserInfo failed')
      }
    }))

    //  获取通过接口破解获取 openid
    const userInfo = await weappService.getUserInfo({
      code: this.weapp.loginCode,
      encryptedData, iv
    })

    this.weapp = {
      ...this.weapp,
      ...userInfo
    }

    return userInfo;
  }

}

decorate(Auth, {
  weapp: observable,
  weappLogin: action.bound,
  weappGetUserInfo: action.bound,
})

export default createContext(new Auth())



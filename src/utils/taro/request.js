import Taro from "@tarojs/taro"

/**
 * Taro 项目使用的请求封装
 */
class Request {

  // 接口基础地址
  baseURL = 'http://localhost:3005/api'

  // 头部信息
  // header = {
  //   'content-type': 'application/json'
  // }

  // 发送请求
  send(method, url, data = {}, config = {}) {

    // 附带 openid
    if (config.withOpenID) {
      data = {
        ...data,
        ...this[`get${Taro.getEnv()}Openid`]()
      }
    }

    return new Promise((resolve) => {
      Taro.request({
        url: config.absURL ? url : `${this.baseURL}${url}`,
        data,
        method,
        // header: this.header,
        ...config
      }).then(res => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(res.data)
        }
      })
    })
  }
}

export default new Request()


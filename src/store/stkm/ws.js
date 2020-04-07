import Taro, { createContext } from '@tarojs/taro'
import { observable, decorate, action, runInAction, observe } from 'mobx'

// 长连接状态管理
class STKMSocket {

  // 连接中
  connected = false

  // 连接任务
  task = null

  // 重连任务
  reconnectTimer = null

  // 连接地址
  url = ''

  constructor() {
    // 对连接状态改变做响应
    observe(this, 'connected', change => {
      if (change.oldValue === true && !this.reconnectTimer) {
        this.reconnectTimer = setInterval(() => {
          this.createTask();
        }, 5000)
      }
    })
  }

  onErrorClose() {
    this.connected = false
    this.task = null
    console.log(`socket 断开5秒后重连`)
  }

  onOpen() {
    clearInterval(this.reconnectTimer)
    this.connected = true
    console.log('socket onopen')
  }

  onMessage(msg) {
    console.log('socket message:', msg)
  }

  // 新建一个连接
  async createTask(url) {
    if (url) {
      this.url = url
    }
    if (!this.task || this.task.readyState !== this.task.OPEN) {
      this.task = await Taro.connectSocket({
        url: this.url,
        success() {
          console.log('新 socket 创建成功')
        },
        fail(err) {
          console.error('新 socket 创建失败', err)
        }
      }).catch(err => {
        throw new Error(err.message)
      })

      // 异常
      this.task.onClose(this.onErrorClose)
      this.task.onError(this.onErrorClose)

      // 连接成功
      this.task.onOpen(this.onOpen)
      
      // 处理消息
      this.task.onMessage(this.onMessage)
    }

    return this.task
  }

}

decorate(STKMSocket, {
  connected: observable,
  onErrorClose: action.bound,
  onOpen: action.bound,
  onMessage: action.bound,
  createTask: action.bound
})

export default createContext(new STKMSocket())



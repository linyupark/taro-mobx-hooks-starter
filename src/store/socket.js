import Taro, { createContext } from '@tarojs/taro'
import { observable, decorate, action, observe } from 'mobx'
import { onRes } from '@/service/pbDataTrans'
import { blob2buffer } from '@/utils/transform'
import pbSocketService from '@/service/pbSocket'
import { NAME_ID as CMD } from '@/constant/cmd'

const CMD_NAME_LIST = Object.keys(CMD)

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
          this.createTask()
        }, 5000)
      }
    })
  }

  onErrorClose() {
    this.connected = false
    this.task = null
    Taro.showToast({ title: '服务器开小差中', icon: 'none' })
    console.log(`socket 断开5秒后重连`)
  }

  onOpen() {
    clearInterval(this.reconnectTimer)
    this.connected = true
    console.log('socket onopen')
  }

  async onMessage(msg) {
    // 过滤不打印的指令
    const filterCMD = [1001, 1002];
    let data = msg.data
    // 小程序会自动 blob 转成 buffer，其他的需要自己转
    if (Taro.getEnv() !== 'WEAPP') {
      data = await blob2buffer(data)
    }
    let res = onRes(data)
    CMD_NAME_LIST.forEach(name => {
      const eventName = `ON_${name}`
      const handler = pbSocketService[eventName]
      if (res.command === CMD[name] && filterCMD.indexOf(res.command) === -1) {
        console.log(`${eventName}(${res.command})`, res.result)
      }
      if (handler && res.command === CMD[name]) {
        // 有针对指令响应处理函数的直接调用
        handler(res)
      }
    })
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
        },
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
  createTask: action.bound,
})

const SocketModel = new STKMSocket()

export const SocketContext = createContext(SocketModel)

export default SocketModel
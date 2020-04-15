import Taro, { createContext } from '@tarojs/taro'
import { observable, decorate, action } from 'mobx'
import DICT from '@/constant/dict'
import pbSocketService from '@/service/pbSocket'

// 用户信息相关
class User {
  /** 用户基础信息 */
  baseInfo = JSON.parse(Taro.getStorageSync(DICT.USER_STORE_BASEINFO) || '{}')

  /** 用户订阅的股票列表信息 */
  subStockList = JSON.parse(
    Taro.getStorageSync(DICT.USER_STORE_SUB_STOCKS) ||
      JSON.stringify(DICT.DEFAULT_SUB_STOCK_LIST),
  )

  /** 订阅的最新快照 */
  subSnapshotList = []

  /** 历史记录 */
  stockHistory = JSON.parse(Taro.getStorageSync(DICT.STK_SEARCH_HISTORY) || '[]')

  /**
   * 添加历史记录
   * @param {Object} stkData { stockId, marketType, stockType }
   */
  addStockHistory(stkData) {
    this.stockHistory = this.stockHistory.concat(stkData)
    Taro.setStorageSync(
      DICT.STK_SEARCH_HISTORY,
      JSON.stringify(this.stockHistory),
    )
  }

  /** 清除历史记录 */
  removeStockHistory() {
    this.stockHistory = []
    Taro.setStorageSync(
      DICT.STK_SEARCH_HISTORY,
      JSON.stringify(this.stockHistory),
    )
  }

  /**
   * 绑定用户，先看看本地存储的用户还能不能绑定的上
   */
  bind(data) {
    // 去掉通用协议信息
    delete data.commonRs
    if (!this.baseInfo.userId) {
      // 没有数据则将本次连接获取到的临时用户存储到本地并绑定上
      Taro.setStorageSync(DICT.USER_STORE_BASEINFO, JSON.stringify(data))
      this.baseInfo = {
        ...this.baseInfo,
        ...data,
      }
    }

    // 执行绑定
    pbSocketService.DO_BIND_USER({ ...this.baseInfo })
  }

  subStock(stkData) {
    this.subStockList = this.subStockList.concat(stkData)
    Taro.setStorageSync(
      DICT.USER_STORE_SUB_STOCKS,
      JSON.stringify(this.subStockList),
    )
  }

  /** 取消订阅 */
  unsubStock(stkData) {
    this.subStockList.splice(
      this.subStockList.findIndex(
        item =>
          item.stockId == stkData.stockId &&
          item.marketType == stkData.marketType,
      ),
      1,
    )
    this.subStockList = [...this.subStockList]
    Taro.setStorageSync(
      DICT.USER_STORE_SUB_STOCKS,
      JSON.stringify(this.subStockList),
    )
  }
}

decorate(User, {
  baseInfo: observable,
  subStockList: observable,
  subSnapshotList: observable,
  stockHistory: observable,
  bind: action.bound,
  subStock: action.bound,
  unsubStock: action.bound,
  addStockHistory: action.bound,
  removeStockHistory: action.bound
})

const UserModel = new User()

export default UserModel

export const UserContext = createContext(UserModel)

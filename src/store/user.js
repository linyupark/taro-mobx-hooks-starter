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

  /**
   * 恢复订阅
   */
  resubStock() {
    const subStockDataList = this.subStockList.map(stk => {
      return {
        marketType: Number(stk.marketType),
        stockId: stk.stockId,
        stockType: stk.stockType,
        bizType: stk.bizType,
      }
    })
    console.log('恢复订阅', subStockDataList)
    if (subStockDataList.length > 0) {
      // WSModel.DO_STOCK_SUB(subStockDataList)
      
    }
  }
}

decorate(User, {
  baseInfo: observable,
  subStockList: observable,
  bind: action.bound,
})

const UserModel = new User()

export default UserModel

export const UserContext = createContext(UserModel)

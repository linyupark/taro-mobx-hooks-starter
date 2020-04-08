import Taro, { createContext } from '@tarojs/taro'
import { observable, decorate, action } from 'mobx'
import DICT from '@/constant/dict'
import pbSocketService from '@/service/pbSocket'

// 股市相关数据
class Stk {

  /** 缓存时间 */
  cacheDate = Taro.getStorageSync(DICT.STK_ALL_BASE_INFO_LAST_UPDATE) || null

  /** 用户基础信息 */
  baseInfo = JSON.parse(Taro.getStorageSync(DICT.USER_STORE_BASEINFO) || '{}')

  /** 更新所有股票基础数据 */
  updateAllStkBaseInfo() {
    DICT.CACHE_STKS.map(param => {
      pbSocketService.DO_STOCK_BASE_INFO(param.marketType, param.stockType)
    })
  }
}

decorate(Stk, {
  baseInfo: observable,
  updateAllStkBaseInfo: action.bound
})

const StkModel = new Stk()

export default StkModel

export const StkContext = createContext(StkModel)

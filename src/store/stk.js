import Taro, { createContext } from '@tarojs/taro'
import { observable, decorate, action } from 'mobx'
import DICT from '@/constant/dict'
import pbSocketService from '@/service/pbSocket'
import dayjs from 'dayjs'

// 股市相关数据
class Stk {
  /** 缓存时间 */
  cacheDate = Taro.getStorageSync(DICT.STK_ALL_CACHE_UPDATE) || null

  /** 缓存数据（全量股票数据） */
  cacheData = JSON.parse(Taro.getStorageSync(DICT.STK_ALL_CACHE) || '{}')

  /** 用户基础信息 */
  baseInfo = JSON.parse(Taro.getStorageSync(DICT.USER_STORE_BASEINFO) || '{}')

  /** 更新所有股票基础数据 */
  updateAllStkBaseInfo() {
    // 检查缓存时间
    const todayStr = dayjs().format('YYYYMMDD')

    if (todayStr === this.cacheDate) {
      return
    }
    this.cacheData = {}
    Taro.setStorageSync(DICT.STK_ALL_CACHE, '{}')

    DICT.CACHE_STKS.map(param => {
      pbSocketService.DO_STOCK_BASE_INFO(param.marketType, param.stockType)
    })
    this.cacheDate = todayStr
    Taro.setStorageSync(DICT.STK_ALL_CACHE_UPDATE, todayStr)
  }

  /** 保存到缓存 */
  saveAllStkBaseInfo({ stockBaseInfos }) {
    stockBaseInfos.map(stk => {
      this.cacheData[`${stk.marketType}|${stk.stockType}|${stk.stockId}|${stk.cnName}`] = stk
    })
    Taro.setStorage({
      key: DICT.STK_ALL_CACHE,
      data: JSON.stringify({ ...this.cacheData })
    })
  }
}

decorate(Stk, {
  baseInfo: observable,
  updateAllStkBaseInfo: action.bound,
})

const StkModel = new Stk()

export default StkModel

export const StkContext = createContext(StkModel)

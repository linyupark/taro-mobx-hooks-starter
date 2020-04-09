import Taro, { createContext } from '@tarojs/taro'
import { observable, decorate, action, intercept } from 'mobx'
import DICT from '@/constant/dict'
import pbSocketService from '@/service/pbSocket'
import dayjs from 'dayjs'

// 股市相关数据
class Stk {
  /** 缓存时间 */
  cacheDate = Taro.getStorageSync(DICT.STK_ALL_CACHE_UPDATE) || null

  /** 缓存数据（全量股票数据） */
  cacheData = JSON.parse(Taro.getStorageSync(DICT.STK_ALL_CACHE) || '{}')

  /** 缓存进度队列 */
  cacheSeq = 0

  /** 使用过程中动态缓存基础数据 */
  baseInfoMapByUsage = JSON.parse(Taro.getStorageSync(DICT.STK_BASEINFO) || '{}')

  constructor() {
    intercept(this, 'cacheSeq', change => {
      console.log('change', change.newValue)
      if (change.newValue > 0) {
        Taro.showLoading({
          title: `初始化 ${(
            ((DICT.CACHE_STKS.length - change.newValue) /
              DICT.CACHE_STKS.length) *
            100
          ).toFixed(0)}%`,
        })
      }
      if (change.newValue === 0) {
        Taro.hideLoading()
      }
      return change
    })
  }

  /** 更新所有股票基础数据 */
  updateAllStkBaseInfo() {
    // 检查缓存时间
    const todayStr = dayjs().format('YYYYMMDD')

    if (todayStr === this.cacheDate) {
      return
    }
    Taro.setStorageSync(DICT.STK_ALL_CACHE, '{}')

    // 排队更新队列
    this.cacheSeq = DICT.CACHE_STKS.length
    console.log('updateAllStkBaseInfo', this.cacheSeq, DICT.CACHE_STKS.length)
    DICT.CACHE_STKS.map(param => {
      pbSocketService.DO_STOCK_BASE_INFO(param.marketType, param.stockType)
    })
    this.cacheDate = todayStr
    Taro.setStorageSync(DICT.STK_ALL_CACHE_UPDATE, todayStr)
  }

  /** 保存到缓存 */
  saveAllStkBaseInfo({ stockBaseInfos }) {
    stockBaseInfos.map(stk => {
      this.cacheData[
        `${stk.marketType}|${stk.stockType}|${stk.stockId}|${stk.cnName}`
      ] = stk
    })
    Taro.setStorage({
      key: DICT.STK_ALL_CACHE,
      data: JSON.stringify({ ...this.cacheData }),
      success: () => {
        this.cacheSeq -= 1
      },
      fail() {
        throw new Error('缓存市场数据失败')
      },
    })
  }
}

decorate(Stk, {
  cacheSeq: observable,
  updateAllStkBaseInfo: action.bound,
  saveAllStkBaseInfo: action.bound,
})

const StkModel = new Stk()

export default StkModel

export const StkContext = createContext(StkModel)

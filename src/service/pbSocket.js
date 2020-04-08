import { NAME_ID as CMD } from '@/constant/cmd'
import User from '@/store/user'
import Socket from '@/store/socket'
import Stk from '@/store/stk'
import { doReq, doReqList, doPush } from '@/service/pbDataTrans'

/** 当连接成功 */
const ON_CONNECT_SUCCESS = res => {
  // 尝试绑定
  User.bind(res.result)
}

/** 绑定用户 */
const DO_BIND_USER = userData => {
  const buffer = doPush(CMD.BIND_USER, doReq(userData, 'CommonReq'))
  Socket.task.send(buffer)
}

/** 绑定成功后 */
const ON_BIND_USER = () => {
  Stk.updateAllStkBaseInfo()
}

/** 股票基本信息（全量） */
const DO_STOCK_BASE_INFO = (marketType, stockType) => {
  const pushData = doReqList([
    {
      key: 'commonReq',
      data: { ...User.baseInfo },
      lookup: 'CommonReq',
    },
    {
      key: 'marketType',
      data: marketType,
    },
    {
      key: 'stockType',
      data: stockType,
    },
  ])
  Socket.task.send(
    doPush(CMD.STOCK_BASE_INFO, doReq(pushData, 'StockBaseInfoReq')),
  )
}

/** 缓存数据 */
const ON_STOCK_BASE_INFO = res => {
  console.log(res)
}

export default {
  ON_CONNECT_SUCCESS,
  DO_BIND_USER,
  ON_BIND_USER,
  DO_STOCK_BASE_INFO,
  ON_STOCK_BASE_INFO,
}

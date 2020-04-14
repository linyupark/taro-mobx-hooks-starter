import { NAME_ID as CMD } from '@/constant/cmd'
import User from '@/store/user'
import Socket from '@/store/socket'
import Stk from '@/store/stk'
import { runInAction } from 'mobx'
import { doReq, doReqList, doPush } from '@/service/pbDataTrans'

/** 当连接成功 */
const ON_CONNECT_SUCCESS = res => {
  // 尝试绑定
  User.bind(res.result)
}

const ON_STOCK_SNAPSHOT = res => {
  runInAction(() => {
    User.subSnapshotList = res.result.snapshots
  })
}

/** 订阅推送的快照信息 */
const ON_PUSH_SNAPSHOT = res => {
  // 更新快照列表里对应股票的信息，如果没有则插入
  if (!User.subSnapshotList) return
  const index = User.subSnapshotList.findIndex(snapshot => {
    return (
      snapshot.stockId == res.result.stockId &&
      snapshot.marketType == res.result.marketType
    )
  })
  runInAction(() => {
    if (~index) {
      User.subSnapshotList[index] = res.result
      User.subSnapshotList = [...User.subSnapshotList]
    } else {
      User.subSnapshotList.push(res.result)
    }
  })
}

/** 股票实时快照 */
const DO_STOCK_SNAPSHOT = (stockKeys, sequenceId) => {
  const pushData = doReqList([
    {
      key: 'commonReq',
      data: { ...User.baseInfo },
      lookup: 'CommonReq',
    },
    {
      key: 'stockKeys',
      data: stockKeys,
      lookup: 'StockKey',
    },
  ])
  Socket.task.send(
    doPush(
      CMD.STOCK_SNAPSHOT,
      doReq(pushData, 'StockSnapshotReq'),
      // sequenceId
    ),
  )
}

/** 取消订阅股票 */
const DO_STOCK_UNSUB = subDataList => {
  const pushData = doReqList([
    {
      key: 'commonReq',
      data: { ...User.baseInfo },
      lookup: 'CommonReq',
    },
    {
      key: 'subStocks',
      data: subDataList,
      lookup: 'SubStockInfo',
    },
  ])
  Socket.task.send(doPush(CMD.STOCK_UNSUB, doReq(pushData, 'SubReq')))
}

/** 行情订阅 */
const DO_STOCK_SUB = subDataList => {
  const pushData = doReqList([
    {
      key: 'commonReq',
      data: { ...User.baseInfo },
      lookup: 'CommonReq',
    },
    {
      key: 'subStocks',
      data: subDataList,
      lookup: 'SubStockInfo',
    },
  ])
  Socket.task.send(doPush(CMD.STOCK_SUB, doReq(pushData, 'SubReq')))
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
const ON_STOCK_BASE_INFO = ({ result }) => {
  Stk.saveAllStkBaseInfo(result)
}

export default {
  ON_CONNECT_SUCCESS,
  DO_BIND_USER,
  ON_BIND_USER,
  DO_STOCK_BASE_INFO,
  ON_STOCK_BASE_INFO,
  DO_STOCK_SUB,
  DO_STOCK_UNSUB,
  DO_STOCK_SNAPSHOT,
  ON_STOCK_SNAPSHOT,
  ON_PUSH_SNAPSHOT,
}

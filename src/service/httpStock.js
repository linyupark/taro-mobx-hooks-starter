import request from '@/utils/taro/request'
import User from '@/store/user'
import { doReq, doReqList, PB } from '@/service/pbDataTrans'


// eslint-disable-next-line no-undef
request.baseURL = API_URL.replace(/\"/g, '')

/** 通过 StockBriefReq 模糊匹配股票基本信息 */
async function getBaseInfo(keyword = '', stockKeys = []) {
  let sendData = doReq(
    doReqList([
      {
        key: 'commonReq',
        data: { ...User.baseInfo },
        lookup: 'CommonReq',
      },
      // {
      //   key: 'stockKeys',
      //   data: stockKeys,
      //   lookup: 'StockKey',
      // },
      {
        key: 'wordKeys',
        data: keyword,
      },
    ]),
    'StockBriefReq',
  )

  // sendData = new Blob([sendData], {type: 'buffer'})

  const resp = await request.send('post', '/getstockbaseInfos', sendData, {
    header: {
      'Content-Type': 'application/x-protobuf',
    },
    // dataType: 'buffer',
    responseType: 'arraybuffer',
  })

  return (PB.decode(resp, 'model.StockBriefRs').stockBaseInfoBrief || []).map(
    item => {
      return item.stockBaseInfo
    },
  )
}

export default { getBaseInfo }

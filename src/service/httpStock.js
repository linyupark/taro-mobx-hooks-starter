import request from '@/utils/taro/request'
import User from '@/store/user'
// import { doReq, doReqList, PB } from '@/service/pbDataTrans'


// eslint-disable-next-line no-undef
request.baseURL = API_URL.replace(/\"/g, '')

/** 通过 StockBriefReq 模糊匹配股票基本信息 */
async function getBaseInfo(keyword = '', stockKeys = []) {

  // 通过第三方代码转发请求（等接口支持json格式可更换地址）
  return await request.send('post', 'http://linyu.dynv6.net:10010/wechat/pb/getstockbaseInfos', {
    commonReq: { ...User.baseInfo },
    keyword,
    stockKeys
  }, {
    absURL: true,
  })

  // 因为小程序的pb ajax请求有异常下面代码暂时无法通用

  // let sendData = doReq(
  //   doReqList([
  //     {
  //       key: 'commonReq',
  //       data: { ...User.baseInfo },
  //       lookup: 'CommonReq',
  //     },
  //     // {
  //     //   key: 'stockKeys',
  //     //   data: stockKeys,
  //     //   lookup: 'StockKey',
  //     // },
  //     {
  //       key: 'wordKeys',
  //       data: keyword,
  //     },
  //   ]),
  //   'StockBriefReq',
  // )

  // // sendData = new Blob([sendData], {type: 'buffer'})

  // const resp = await request.send('post', '/getstockbaseInfos', sendData, {
  //   header: {
  //     'Content-Type': 'application/protobuf',
  //   },
  //   // dataType: 'byte',
  //   responseType: 'arraybuffer',
  // })

  // return (PB.decode(resp, 'model.StockBriefRs').stockBaseInfoBrief || []).map(
  //   item => {
  //     return item.stockBaseInfo
  //   },
  // )
}

export default { getBaseInfo }

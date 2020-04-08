import Taro from '@tarojs/taro'
import parser from '@/utils/protocolBuffers'
import useTypeof from '@/utils/asserts/typeof'
import protoRoot from '@/proto/proto'
import { ID_MAP } from '@/constant/cmd'
import wechatPb from '@/utils/wechatPb/protobuf'

let pbRoot = protoRoot

// PB兼容小程序
if (Taro.getEnv() === 'WEAPP') {
  pbRoot = wechatPb.Root.fromJSON(pbRoot)
}
export const PB = parser(pbRoot)

/**
 * 根据指令id获得协议名
 * @param {Number} id
 */
export const lookupById = id => {
  if (!ID_MAP[id]) throw `指令ID[${id}]不存在`

  /**
   * @param {String} type 请求 req | 返回 res
   * @param {String} pkg 包
   */
  return (type, pkg = 'model') => {
    let lookupName = ID_MAP[id][{ req: 0, res: 1 }[type]] || ''
    if (lookupName !== '') return `${pkg}.${lookupName}`
    throw `没有找到指令ID[${id}]下${type}类型的协议`
  }
}

/**
 * 当获取反馈消息根据id分配对应处理
 * @param {Object} data
 */
export const onRes = data => {
  let commonRs = PB.decode(data, 'model.WsPushInfo')
  let result = PB.decode(
    commonRs.obj.value,
    lookupById(commonRs.command)('res'),
  )
  // 如果反馈出错
  if (result.commonRs && !result.commonRs.success) {
    throw commonRs.desc
  }
  // 把指令id追加到最终返回的数据方便进行下一步逻辑的判断
  return {
    result,
    command: commonRs.command,
    // sequenceId: commonRs.sequenceId || 0
  }
}

/**
 * 发出请求
 * @param {Object} data
 */
export const doPush = (command, data) => {
  // 打印入参是否正确
  console.log(
    ID_MAP[command][0],
    PB.decode(data, `model.${ID_MAP[command][0]}`),
  )
  return {
    data: doReq(
      {
        command,
        obj: {
          value: data,
        },
        // sequenceId
      },
      'WsPushInfo',
    )
  }
}

/** 单个协议数据 */
export const doReq = (data, lookup, finish) => {
  return PB.encode(data, `model.${lookup}`, finish)
}

/** 发送数据列 */
export const doReqList = (reqList = []) => {
  let listObj = {}
  reqList.forEach(req => {
    if (!req.lookup) {
      listObj[req.key] = req.data
    } else {
      if (useTypeof(req.data) === 'array') {
        listObj[req.key] = req.data.map(item => {
          return doReq(item, req.lookup, false)
        })
      } else listObj[req.key] = doReq(req.data, req.lookup, false)
    }
  })
  return listObj
}

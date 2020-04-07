import request from '@/utils/taro/request'

/** 微信用户信息破解获取 */
async function getUserInfo({ code, encryptedData, iv }) {
  const result = await request.send('get', 'http://linyu.dynv6.net:10010/wechat/login', {
    code, encryptedData, iv
  }, {
    absURL: true,
  })
  return result
}

export default { getUserInfo }
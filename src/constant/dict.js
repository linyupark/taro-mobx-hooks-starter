export default {
  STK_HISTORY_STORE_NAME: '_STOCK_SEARCH_HISTORY_',
  STK_ALL_BASE_INFO_LAST_UPDATE: '_STK_LAST_UPDATE_',
  USER_STORE_BASEINFO: '_USER_INF_',
  USER_STORE_SUB_STOCKS: '_USER_SUB_STOCKS_',
  BIZ_TYPE_NAME: {
    1: '实时快照',
    2: '盘口',
    3: '成交明细',
    4: '逐笔成交level2',
    5: '逐笔委托level2',
    6: '经济通队列(港股使用)',
  },
  BIZ_TYPE_CODE: {
    SNAPSHOT: 1,
  },
  MARKET_TYPES: {
    1: '上海市场',
    2: '深圳市场',
    3: '港股通沪',
    4: '港股通深',
    5: '上海个股期权',
    6: '深圳个股期权',
    7: '港股',
    8: '美股-纳斯达克',
    9: '美股-纽交所',
    10: '美股-美交所',
    11: '外汇市场',
    12: '期货-郑商所',
    13: '期货-大商所',
    14: '期货-中金所',
    15: '期货-上期所',
    16: '期货-上海黄金交易所',
    17: '期货-上海能源',
  },
  STOCK_TYPES: {
    4352: '指数',
    8448: '普通股票',
    8464: '中小板股票',
    8480: '创业板股票',
    8496: '科创板股票',
    8497: '科创板 CDR',
    8512: 'CDR',
    8704: 'B 股',
    12544: '基金',
    12560: 'ETF 基金',
    12576: 'LOF 基金',
    16640: '债券',
    16656: '国债',
    16672: '国债逆回购',
    16688: '可转债',
  },
  CACHE_STKS: [
    // 指数
    // { marketType: 1, stockType: 4352 },
    // { marketType: 2, stockType: 4352 },
    // 上海普通
    { marketType: 1, stockType: 8448 },
    // // 深证普通
    // { marketType: 2, stockType: 8448 },
    // // 创业板股票
    // { marketType: 2, stockType: 8480 },
    // // 科创板股票
    // { marketType: 1, stockType: 8496 },
    // // B 股
    // { marketType: 1, stockType: 8704 },
    // // 基金
    // { marketType: 1, stockType: 12544 },
    // // ETF 基金
    // { marketType: 1, stockType: 12560 },
    // // LOF 基金
    // { marketType: 1, stockType: 12576 },
    // // 债券
    // { marketType: 1, stockType: 16640 },
    // // 国债
    // { marketType: 1, stockType: 16656 },
    // // 国债逆回购
    // { marketType: 1, stockType: 16672 },
    // // 可转债
    // { marketType: 1, stockType: 16688 },
  ],
  DEFAULT_SUB_STOCK_LIST: [
    {
      stockId: '000001',
      stockType: 4352,
    },
    {
      stockId: '399001',
      stockType: 4352,
    },
    {
      stockId: '600000',
      stockType: 8448,
    },
    {
      stockId: '000600',
      stockType: 8448,
    },
    {
      stockId: '512510',
      stockType: 12560,
    },
  ],
}

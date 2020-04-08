/** 功能 -> cmd id */

export const NAME_ID = {
  HEATBEAT: 1,
  BIND_USER: 700,
  UNBIND_USER: 701,
  SUPPORT_MARKET_CMD: 2000,
  MARKET_OVERVIEW: 2001,
  STOCK_BASE_INFO: 2002,
  STOCK_SNAPSHOT: 2003,
  STOCK_BID: 2004,
  STOCK_TREND: 2005,
  STOCK_K_LINE: 2006,
  STOCK_TRANSACTION: 2007,
  STOCK_PLATE: 2008,
  MARKET_SORT: 2009,
  STOCK_QUOTA: 2010,
  STOCK_SUB: 101,
  STOCK_UNSUB: 103,
  ABNORMAL_SUB: 105,
  INIT_MARKET: 1000,
  PUSH_MARKET_TIME: 1001,
  PUSH_SNAPSHOT: 1002,
  PUSH_BID: 1003,
  PUSH_TRANSACTION: 1004,
  PUSH_ABNORMAL: 1005,
  CONNECT_SUCCESS: 601,
  PROTOINFO: 600,
}

/**
 * 指令集合
 * update 19-09-27
 */
export const ID_MAP = {
  // 心跳
  1: ['', ''],
  // 行情订阅 同步返回
  101: ['SubReq', 'SubRs'],
  // 行情退订 同步返回
  103: ['UnSubReq', 'CommonRs'],
  // 异动订阅 同步返回
  105: ['SubReq', 'SubRs'],
  // 协议信息
  600: ['CommonReq', 'ProtoInfoRs'],
  // 连接成功
  601: ['', 'InitUserRs'],
  // 绑定用户
  700: ['CommonReq', 'CommonRs'],
  // 解绑用户
  701: ['CommonReq', 'CommonRs'],
  // 市场初始化
  1000: ['', 'PushMarketInitInfo'],
  // 市场时间推送
  1001: ['', 'MarketOverview'],
  // 个股主推
  1002: ['', 'StockSnapshot'],
  // 盘口主推
  1003: ['', 'Bid'],
  // 成交明细主推
  1004: ['', 'TransactionPushInfo'],
  // 个股异动主推
  1005: ['', 'PushAbnormalInfo'],
  // 支持市场 同步返回
  2000: ['CommonReq', 'SupportMarketRs'],
  // 市场概要 同步返回
  2001: ['MarketOverviewReq', 'MarketOverviewRs'],
  // 股票基本信息 同步返回
  2002: ['StockBaseInfoReq', 'StockBaseInfoRs'],
  // 股票实时快照 同步返回
  2003: ['StockSnapshotReq', 'StockSnapshotRs'],
  // 个股盘口 同步返回
  2004: ['StockBidReq', 'StockBidRs'],
  // 股票分时 异步返回
  2005: ['StockTrendReq', 'StockTrendRs'],
  // 股票 K 线 异步返回
  2006: ['StockKLineReq', 'StockKLineRs'],
  // 股票成交明细 异步返回
  2007: ['StockTransactionReq', 'StockTransactionRs'],
  // 股票板块 异步返回
  2008: ['StockPlateReq', 'StockPlateRs'],
  // 市场排序 异步返回
  2009: ['MarketSortReq', 'MarketSortRs'],
  // 股票指标 异步返回
  2010: ['StockQuotaReq', 'StockQuotaRs'],
}

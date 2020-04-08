/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/light";

const $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  model: {
    nested: {
      Bid: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockId: {
            type: "string",
            id: 2
          },
          happenTime: {
            type: "uint32",
            id: 3
          },
          gearPrices: {
            rule: "repeated",
            type: "GearPrice",
            id: 4
          }
        }
      },
      GearPrice: {
        fields: {
          buyPrice: {
            type: "uint32",
            id: 1
          },
          salePrice: {
            type: "uint32",
            id: 2
          },
          buyAmount: {
            type: "uint64",
            id: 3
          },
          saleAmount: {
            type: "uint64",
            id: 4
          }
        }
      },
      CandleRatio: {
        fields: {
          marketDate: {
            type: "uint32",
            id: 1
          },
          ratio: {
            type: "int32",
            id: 2
          },
          desc: {
            type: "string",
            id: 3
          },
          forwardRatio: {
            type: "int64",
            id: 4
          },
          backRatio: {
            type: "int64",
            id: 5
          },
          forwardConst: {
            type: "int64",
            id: 6
          },
          backConst: {
            type: "int64",
            id: 7
          }
        }
      },
      CommonReq: {
        fields: {
          userId: {
            type: "uint64",
            id: 1
          },
          token: {
            type: "string",
            id: 2
          },
          termType: {
            type: "int32",
            id: 3
          },
          deviceNo: {
            type: "string",
            id: 4
          }
        }
      },
      CommonRs: {
        fields: {
          success: {
            type: "bool",
            id: 1
          },
          resultCode: {
            type: "int32",
            id: 2
          },
          desc: {
            type: "string",
            id: 3
          },
          view: {
            type: "string",
            id: 4
          },
          alert: {
            type: "bool",
            id: 5
          }
        }
      },
      InitUserRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          userId: {
            type: "uint64",
            id: 2
          }
        }
      },
      KLineItem: {
        fields: {
          marketDate: {
            type: "uint32",
            id: 1
          },
          lowestPrice: {
            type: "uint32",
            id: 2
          },
          highestPrice: {
            type: "uint32",
            id: 3
          },
          openPrice: {
            type: "uint32",
            id: 4
          },
          closePrice: {
            type: "uint32",
            id: 5
          },
          tradeAmount: {
            type: "uint64",
            id: 6
          },
          tradeVal: {
            type: "uint64",
            id: 7
          },
          exchangeRatio: {
            type: "uint32",
            id: 8
          },
          position: {
            type: "uint32",
            id: 9
          },
          changePosition: {
            type: "uint32",
            id: 10
          },
          settlePrice: {
            type: "uint32",
            id: 11
          },
          ext: {
            type: "bytes",
            id: 12
          }
        }
      },
      MarketOverview: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          marketDate: {
            type: "uint32",
            id: 2
          },
          marketTime: {
            type: "uint32",
            id: 3
          },
          lineNo: {
            type: "int32",
            id: 4
          },
          marketStatus: {
            type: "uint32",
            id: 5
          },
          typeProperty: {
            rule: "repeated",
            type: "StockTypeProperty",
            id: 6
          }
        }
      },
      StockTypeProperty: {
        fields: {
          type: {
            type: "uint32",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          amountPerHand: {
            type: "uint32",
            id: 3
          },
          decimal: {
            type: "uint32",
            id: 4
          },
          totalMins: {
            type: "uint32",
            id: 5
          },
          offsetMins: {
            type: "uint32",
            id: 6
          },
          tradeTimeSection: {
            rule: "repeated",
            type: "TimeSection",
            id: 7
          },
          auctionTimeSection: {
            rule: "repeated",
            type: "TimeSection",
            id: 8
          },
          contractUnit: {
            type: "uint32",
            id: 9
          }
        }
      },
      TimeSection: {
        fields: {
          beginTime: {
            type: "uint32",
            id: 1
          },
          endTime: {
            type: "uint32",
            id: 2
          }
        }
      },
      MarketOverviewReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          marketType: {
            type: "int32",
            id: 2
          }
        }
      },
      MarketOverviewRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          marketBaseInfo: {
            type: "MarketOverview",
            id: 2
          }
        }
      },
      MarketSortReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          marketType: {
            type: "uint32",
            id: 2
          },
          stockType: {
            type: "uint32",
            id: 3
          },
          ascOrDesc: {
            type: "bool",
            id: 4
          },
          sortFieldId: {
            type: "int64",
            id: 5
          },
          startSerialNum: {
            type: "int32",
            id: 6
          },
          offSet: {
            type: "int32",
            id: 7
          }
        }
      },
      MarketSortRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          totalSize: {
            type: "uint32",
            id: 2
          },
          marketType: {
            type: "uint32",
            id: 3
          },
          stockType: {
            type: "uint32",
            id: 4
          },
          sortFieldId: {
            type: "int64",
            id: 5
          },
          sortStockInfos: {
            rule: "repeated",
            type: "SortStockInfo",
            id: 6
          }
        }
      },
      SortStockInfo: {
        fields: {
          serialNo: {
            type: "int32",
            id: 1
          },
          marketType: {
            type: "uint32",
            id: 2
          },
          stockId: {
            type: "string",
            id: 3
          },
          tradeState: {
            type: "int32",
            id: 4
          },
          lastPrice: {
            type: "uint32",
            id: 5
          },
          yesterdayClosePrice: {
            type: "uint32",
            id: 6
          },
          sortFieldValue: {
            type: "int64",
            id: 7
          }
        }
      },
      PlateInfo: {
        fields: {
          plateId: {
            type: "string",
            id: 1
          },
          plateName: {
            type: "string",
            id: 2
          },
          riseRate: {
            type: "int32",
            id: 3
          }
        }
      },
      ProtoInfoRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          command: {
            type: "uint32",
            id: 2
          },
          msgMap: {
            keyType: "uint32",
            type: "string",
            id: 3
          }
        }
      },
      PushAbnormalInfo: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockId: {
            type: "string",
            id: 2
          },
          time: {
            type: "uint32",
            id: 3
          },
          type: {
            type: "uint32",
            id: 4
          },
          riseOrFall: {
            type: "uint32",
            id: 5
          },
          timeDiff: {
            type: "uint32",
            id: 6
          },
          marginVal: {
            type: "uint64",
            id: 7
          }
        }
      },
      PushMarketInitInfo: {
        fields: {
          initType: {
            type: "uint32",
            id: 1
          },
          marketType: {
            type: "uint32",
            id: 2
          },
          stockType: {
            type: "uint32",
            id: 3
          }
        }
      },
      PushTransactionInfo: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockId: {
            type: "string",
            id: 2
          },
          transactions: {
            rule: "repeated",
            type: "TransactionInfo",
            id: 3
          }
        }
      },
      TransactionInfo: {
        fields: {
          marketDate: {
            type: "uint32",
            id: 1
          },
          marketTime: {
            type: "uint32",
            id: 2
          },
          lastPrice: {
            type: "uint32",
            id: 3
          },
          amount: {
            type: "uint64",
            id: 4
          },
          serialNo: {
            type: "int32",
            id: 5
          },
          buyOrSale: {
            type: "bool",
            id: 6
          }
        }
      },
      QuotaInfo: {
        fields: {
          serialNo: {
            type: "int32",
            id: 1
          },
          marketDate: {
            type: "uint32",
            id: 2
          },
          indexOne: {
            type: "int32",
            id: 3
          },
          indexTwo: {
            type: "int32",
            id: 4
          },
          indexThree: {
            type: "int32",
            id: 5
          },
          indexFour: {
            type: "int32",
            id: 6
          },
          macdEma12: {
            type: "int32",
            id: 7
          },
          macdEma26: {
            type: "int32",
            id: 8
          }
        }
      },
      StockBaseInfo: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockType: {
            type: "uint32",
            id: 2
          },
          stockId: {
            type: "string",
            id: 3
          },
          cnName: {
            type: "string",
            id: 4
          },
          enName: {
            type: "string",
            id: 5
          },
          pyName: {
            rule: "repeated",
            type: "string",
            id: 6
          },
          priceDownLimit: {
            type: "uint32",
            id: 7
          },
          priceUpLimit: {
            type: "uint32",
            id: 8
          },
          yesterdayClosePrice: {
            type: "uint32",
            id: 9
          },
          issuePrice: {
            type: "uint32",
            id: 10
          },
          issueDate: {
            type: "uint32",
            id: 11
          },
          marginFlag: {
            type: "uint32",
            id: 12
          },
          totalMins: {
            type: "uint32",
            id: 13
          },
          ratios: {
            rule: "repeated",
            type: "CandleRatio",
            id: 14
          },
          hasProfit: {
            type: "bool",
            id: 15
          },
          hasDiffVote: {
            type: "bool",
            id: 16
          },
          totalShare: {
            type: "uint64",
            id: 17
          },
          flowShare: {
            type: "uint64",
            id: 18
          },
          yesterdayCloseIOPV: {
            type: "int32",
            id: 19
          },
          yesterdaySettlePrice: {
            type: "uint32",
            id: 20
          },
          yesterdayPosition: {
            type: "uint32",
            id: 21
          },
          futuresType: {
            type: "uint32",
            id: 22
          },
          fallOrRise: {
            type: "uint32",
            id: 23
          },
          deliveryDate: {
            type: "uint32",
            id: 24
          },
          expireDate: {
            type: "uint32",
            id: 25
          },
          execDate: {
            type: "uint32",
            id: 26
          },
          execPrice: {
            type: "uint32",
            id: 27
          },
          baseStock: {
            type: "string",
            id: 28
          }
        }
      },
      StockBaseInfoBrief: {
        fields: {
          stockBaseInfo: {
            type: "StockBaseInfo",
            id: 1
          },
          stockTypeProperty: {
            type: "StockTypeProperty",
            id: 2
          }
        }
      },
      StockBaseInfoReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          marketType: {
            type: "uint32",
            id: 2
          },
          stockType: {
            type: "uint32",
            id: 3
          }
        }
      },
      StockBaseInfoRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          stockBaseInfos: {
            rule: "repeated",
            type: "StockBaseInfo",
            id: 2
          }
        }
      },
      StockBidReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          stockKeys: {
            rule: "repeated",
            type: "StockKey",
            id: 2
          }
        }
      },
      StockKey: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockId: {
            type: "string",
            id: 2
          },
          lineNo: {
            type: "int32",
            id: 3
          }
        }
      },
      StockBidRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          bids: {
            rule: "repeated",
            type: "Bid",
            id: 2
          }
        }
      },
      StockBriefReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          stockKeys: {
            rule: "repeated",
            type: "StockKey",
            id: 2
          },
          wordKeys: {
            type: "string",
            id: 3
          }
        }
      },
      StockBriefRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          stockBaseInfoBrief: {
            rule: "repeated",
            type: "StockBaseInfoBrief",
            id: 2
          }
        }
      },
      StockKLineReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          stockKey: {
            type: "StockKey",
            id: 2
          },
          startDay: {
            type: "uint32",
            id: 3
          },
          offSetDay: {
            type: "int32",
            id: 4
          },
          candleType: {
            type: "uint32",
            id: 5
          },
          kLineType: {
            type: "uint32",
            id: 6
          }
        }
      },
      StockKLineRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          marketType: {
            type: "uint32",
            id: 2
          },
          stockId: {
            type: "string",
            id: 3
          },
          kLines: {
            rule: "repeated",
            type: "KLineItem",
            id: 4
          }
        }
      },
      StockPlateReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          plateType: {
            type: "int32",
            id: 2
          },
          pageSize: {
            type: "int32",
            id: 3
          }
        }
      },
      StockPlateRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          tradeTime: {
            type: "uint32",
            id: 2
          },
          plateType: {
            type: "int32",
            id: 3
          },
          plates: {
            rule: "repeated",
            type: "PlateInfo",
            id: 4
          }
        }
      },
      StockQuotaReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          stockKeys: {
            type: "StockKey",
            id: 2
          },
          serialNo: {
            type: "int32",
            id: 3
          },
          offSet: {
            type: "int32",
            id: 4
          },
          candleType: {
            type: "uint32",
            id: 5
          },
          kLineType: {
            type: "uint32",
            id: 6
          },
          quotaType: {
            type: "uint32",
            id: 7
          },
          quotaParam: {
            type: "string",
            id: 8
          }
        }
      },
      StockQuotaRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          stockKeys: {
            type: "StockKey",
            id: 2
          },
          decimal: {
            type: "uint32",
            id: 3
          },
          candleType: {
            type: "uint32",
            id: 4
          },
          kLineType: {
            type: "uint32",
            id: 5
          },
          quotaType: {
            type: "uint32",
            id: 6
          },
          quotas: {
            rule: "repeated",
            type: "QuotaInfo",
            id: 7
          }
        }
      },
      StockSnapshot: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockId: {
            type: "string",
            id: 2
          },
          tradeTime: {
            type: "uint32",
            id: 3
          },
          totalMins: {
            type: "uint32",
            id: 4
          },
          currDisplayPrice: {
            type: "uint32",
            id: 5
          },
          currCollectPrice: {
            type: "uint32",
            id: 6
          },
          yesterdayClosePrice: {
            type: "uint32",
            id: 7
          },
          lowestPrice: {
            type: "uint32",
            id: 8
          },
          lastPrice: {
            type: "uint32",
            id: 9
          },
          openPrice: {
            type: "uint32",
            id: 10
          },
          closePrice: {
            type: "uint32",
            id: 11
          },
          highestPrice: {
            type: "uint32",
            id: 12
          },
          tradeVal: {
            type: "uint64",
            id: 13
          },
          tradeAmount: {
            type: "uint64",
            id: 14
          },
          tradeStatus: {
            type: "int32",
            id: 15
          },
          totalValue: {
            type: "uint64",
            id: 16
          },
          lineNo: {
            type: "int32",
            id: 17
          },
          exchangeRatio: {
            type: "uint32",
            id: 18
          },
          tradeNum: {
            type: "uint32",
            id: 19
          },
          yesterdayCloseIOPV: {
            type: "int32",
            id: 20
          },
          iopv: {
            type: "int32",
            id: 21
          },
          dynPERate: {
            type: "int32",
            id: 22
          },
          peRate: {
            type: "int32",
            id: 23
          },
          peTTM: {
            type: "int32",
            id: 24
          },
          pbRate: {
            type: "int32",
            id: 25
          },
          riseCount: {
            type: "uint32",
            id: 26
          },
          fallCount: {
            type: "uint32",
            id: 27
          },
          unchangeCount: {
            type: "uint32",
            id: 28
          },
          avgPrice: {
            type: "uint32",
            id: 29
          },
          inPlate: {
            type: "uint32",
            id: 30
          },
          outPlate: {
            type: "uint32",
            id: 31
          },
          entrustRate: {
            type: "int32",
            id: 32
          },
          amountRate: {
            type: "uint32",
            id: 33
          },
          afterTradeDate: {
            type: "uint32",
            id: 34
          },
          afterTradeTime: {
            type: "uint32",
            id: 35
          },
          afterTradeAmount: {
            type: "uint32",
            id: 36
          },
          afterTradeVal: {
            type: "uint32",
            id: 37
          },
          yesterdaySettlePrice: {
            type: "uint32",
            id: 38
          },
          yesterdayPosition: {
            type: "uint32",
            id: 39
          },
          settlePrice: {
            type: "uint32",
            id: 40
          },
          position: {
            type: "uint32",
            id: 41
          },
          totalEntrustBuyAmount: {
            type: "uint64",
            id: 42
          },
          totalEntrustSaleAmount: {
            type: "uint64",
            id: 43
          },
          weightAvgBuyPrice: {
            type: "uint32",
            id: 44
          },
          weightAvgSalePrice: {
            type: "uint32",
            id: 45
          }
        }
      },
      StockSnapshotReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          stockKeys: {
            rule: "repeated",
            type: "StockKey",
            id: 2
          }
        }
      },
      StockSnapshotRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          snapshots: {
            rule: "repeated",
            type: "StockSnapshot",
            id: 2
          }
        }
      },
      StockTransactionReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          stockKey: {
            type: "StockKey",
            id: 2
          },
          startSerial: {
            type: "int32",
            id: 3
          },
          offSet: {
            type: "int32",
            id: 4
          }
        }
      },
      StockTransactionRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          totalSize: {
            type: "uint32",
            id: 2
          },
          marketType: {
            type: "uint32",
            id: 3
          },
          stockId: {
            type: "string",
            id: 4
          },
          transactions: {
            rule: "repeated",
            type: "TransactionInfo",
            id: 5
          }
        }
      },
      StockTrendReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          startDay: {
            type: "uint32",
            id: 2
          },
          offSetDay: {
            type: "int32",
            id: 3
          },
          stockKeys: {
            rule: "repeated",
            type: "StockKey",
            id: 4
          }
        }
      },
      StockTrendRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          betweenToday: {
            type: "int32",
            id: 2
          },
          trends: {
            rule: "repeated",
            type: "Trend",
            id: 3
          }
        }
      },
      Trend: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockId: {
            type: "string",
            id: 2
          },
          marketDate: {
            type: "uint32",
            id: 3
          },
          list: {
            rule: "repeated",
            type: "TrendItem",
            id: 4
          }
        }
      },
      TrendItem: {
        fields: {
          lineNo: {
            type: "int32",
            id: 1
          },
          marketTime: {
            type: "uint32",
            id: 2
          },
          tradeAmount: {
            type: "uint64",
            id: 3
          },
          tradeVal: {
            type: "uint64",
            id: 4
          },
          lastPrice: {
            type: "uint32",
            id: 5
          },
          avgPrice: {
            type: "uint32",
            id: 6
          },
          position: {
            type: "uint32",
            id: 7
          }
        }
      },
      SubBizInfo: {
        fields: {
          bizType: {
            type: "uint32",
            id: 1
          },
          fieldId: {
            rule: "repeated",
            type: "bytes",
            id: 2
          }
        }
      },
      SubMarketInfo: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          bizType: {
            rule: "repeated",
            type: "uint32",
            id: 2
          }
        }
      },
      SubReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          subMarkets: {
            rule: "repeated",
            type: "SubMarketInfo",
            id: 2
          },
          subStocks: {
            rule: "repeated",
            type: "SubStockInfo",
            id: 3
          }
        }
      },
      SubStockInfo: {
        fields: {
          marketType: {
            type: "uint32",
            id: 1
          },
          stockId: {
            type: "string",
            id: 2
          },
          bizType: {
            rule: "repeated",
            type: "uint32",
            id: 3
          }
        }
      },
      SubRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          subId: {
            type: "uint32",
            id: 2
          }
        }
      },
      SupportMarketRs: {
        fields: {
          commonRs: {
            type: "CommonRs",
            id: 1
          },
          marketTypes: {
            rule: "repeated",
            type: "int32",
            id: 2
          }
        }
      },
      TransactionPushInfo: {
        fields: {
          stockKey: {
            type: "StockKey",
            id: 1
          },
          transactionInfo: {
            rule: "repeated",
            type: "TransactionInfo",
            id: 2
          }
        }
      },
      UnSubReq: {
        fields: {
          commonReq: {
            type: "CommonReq",
            id: 1
          },
          subMarkets: {
            rule: "repeated",
            type: "SubMarketInfo",
            id: 2
          },
          subStocks: {
            rule: "repeated",
            type: "SubStockInfo",
            id: 3
          }
        }
      },
      WsPushInfo: {
        fields: {
          length: {
            type: "uint32",
            id: 1
          },
          command: {
            type: "uint32",
            id: 2
          },
          sequenceId: {
            type: "uint32",
            id: 3
          },
          obj: {
            type: "google.protobuf.Any",
            id: 4
          }
        }
      }
    }
  },
  google: {
    nested: {
      protobuf: {
        nested: {
          Any: {
            fields: {
              type_url: {
                type: "string",
                id: 1
              },
              value: {
                type: "bytes",
                id: 2
              }
            }
          }
        }
      }
    }
  }
});

export { $root as default };

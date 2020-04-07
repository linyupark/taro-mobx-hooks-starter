(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["common"],{

/***/ "./src/service/weapp.js":
/*!******************************!*\
  !*** ./src/service/weapp.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

/** 微信用户信息破解获取 */
var getUserInfo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var code = _ref.code,
        encryptedData = _ref.encryptedData,
        iv = _ref.iv;
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _request2.default.send('get', 'http://linyu.dynv6.net:10010/wechat/login', {
              code: code, encryptedData: encryptedData, iv: iv
            }, {
              absURL: true
            });

          case 2:
            result = _context.sent;
            return _context.abrupt('return', result);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getUserInfo(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _request = __webpack_require__(/*! ../utils/taro/request */ "./src/utils/taro/request.js");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getUserInfo: getUserInfo };

/***/ }),

/***/ "./src/store/auth.js":
/*!***************************!*\
  !*** ./src/store/auth.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "./node_modules/babel-runtime/regenerator/index.js");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _mobx = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");

var _weapp = __webpack_require__(/*! ../service/weapp */ "./src/service/weapp.js");

var _weapp2 = _interopRequireDefault(_weapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 身份认证相关
var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);

    this.weapp = {};
  }

  // 微信小程序


  _createClass(Auth, [{
    key: "weappLogin",


    // 登录
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _ref2, code;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Promise(function (resolve) {
                  return _taroWeapp2.default.login({
                    success: function success(res) {
                      console.log('weapp login', res);
                      resolve(res);
                    },
                    fail: function fail() {
                      console.error('weapp login failed');
                    }
                  });
                });

              case 2:
                _ref2 = _context.sent;
                code = _ref2.code;
                return _context.abrupt("return", code);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function weappLogin() {
        return _ref.apply(this, arguments);
      }

      return weappLogin;
    }()

    // 获取用户信息

  }, {
    key: "weappGetUserInfo",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var _ref4, encryptedData, iv, userInfo;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.weapp.loginCode) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return this.weappLogin();

              case 3:
                this.weapp.loginCode = _context2.sent;

              case 4:
                _context2.next = 6;
                return new Promise(function (resolve) {
                  return _taroWeapp2.default.getUserInfo({
                    success: function success(res) {
                      console.log('weapp getUserInfo', res);
                      resolve(res);
                    },
                    fail: function fail() {
                      console.error('weapp getUserInfo failed');
                    }
                  });
                });

              case 6:
                _ref4 = _context2.sent;
                encryptedData = _ref4.encryptedData;
                iv = _ref4.iv;
                _context2.next = 11;
                return _weapp2.default.getUserInfo({
                  code: this.weapp.loginCode,
                  encryptedData: encryptedData, iv: iv
                });

              case 11:
                userInfo = _context2.sent;


                this.weapp = _extends({}, this.weapp, userInfo);

                return _context2.abrupt("return", userInfo);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function weappGetUserInfo() {
        return _ref3.apply(this, arguments);
      }

      return weappGetUserInfo;
    }()
  }]);

  return Auth;
}();

(0, _mobx.decorate)(Auth, {
  weapp: _mobx.observable,
  weappLogin: _mobx.action.bound,
  weappGetUserInfo: _mobx.action.bound
});

exports.default = (0, _taroWeapp.createContext)(new Auth());

/***/ }),

/***/ "./src/utils/taro/request.js":
/*!***********************************!*\
  !*** ./src/utils/taro/request.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Taro 项目使用的请求封装
 */
var Request = function () {
  function Request() {
    _classCallCheck(this, Request);

    this.baseURL = 'http://localhost:3005/api';
    this.header = {
      'content-type': 'application/json'

      // 发送请求
    };
  }

  // 接口基础地址


  // 头部信息


  _createClass(Request, [{
    key: 'send',
    value: function send(method, url) {
      var _this = this;

      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


      // 附带 openid
      if (config.withOpenID) {
        data = _extends({}, data, this['get' + _taroWeapp2.default.getEnv() + 'Openid']());
      }

      return new Promise(function (resolve) {
        _taroWeapp2.default.request(_extends({
          url: config.absURL ? url : '' + _this.baseURL + url,
          data: data,
          method: method,
          header: _this.header
        }, config)).then(function (res) {
          if (res.statusCode === 200 || res.statusCode === 201) {
            resolve(res.data);
          }
        });
      });
    }
  }]);

  return Request;
}();

exports.default = new Request();

/***/ })

}]);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.signOut = signOut;
exports.default = exports.Provider = exports.useSession = exports.getSession = void 0;

var _react = require("react");

var _logger = _interopRequireDefault(require("../lib/logger"));

var _parseUrl = _interopRequireDefault(require("../lib/parse-url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __NEXTAUTH = {
  baseUrl: (0, _parseUrl.default)(process.env.NEXTAUTH_URL || process.env.VERCEL_URL).baseUrl,
  basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).basePath,
  keepAlive: 0,
  clientMaxAge: 0,
  _clientLastSync: 0,
  _clientSyncTimer: null,
  _eventListenersAdded: false,
  _clientSession: undefined,
  _clientId: Math.random().toString(36).substring(2) + Date.now().toString(36),
  _getSession: () => {}
};

if (typeof window !== 'undefined') {
  if (__NEXTAUTH._eventListenersAdded === false) {
    __NEXTAUTH._eventListenersAdded = true;
    window.addEventListener('storage', function () {
      var _ref = _asyncToGenerator(function* (event) {
        if (event.key === 'nextauth.message') {
          var message = JSON.parse(event.newValue);

          if ((message === null || message === void 0 ? void 0 : message.event) === 'session' && message.data) {
            if (__NEXTAUTH._clientId === message.clientId) {
              return;
            }

            yield __NEXTAUTH._getSession({
              event: 'storage'
            });
          }
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    var hidden, visibilityChange;

    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    var handleVisibilityChange = () => !document[hidden] && __NEXTAUTH._getSession({
      event: visibilityChange
    });

    document.addEventListener('visibilitychange', handleVisibilityChange, false);
  }
}

var setOptions = function setOptions() {
  var {
    baseUrl,
    basePath,
    clientMaxAge,
    keepAlive
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (baseUrl) {
    __NEXTAUTH.baseUrl = baseUrl;
  }

  if (basePath) {
    __NEXTAUTH.basePath = basePath;
  }

  if (clientMaxAge) {
    __NEXTAUTH.clientMaxAge = clientMaxAge;
  }

  if (keepAlive) {
    __NEXTAUTH.keepAlive = keepAlive;

    if (typeof window !== 'undefined' && keepAlive > 0) {
      if (__NEXTAUTH._clientSyncTimer !== null) {
        clearTimeout(__NEXTAUTH._clientSyncTimer);
      }

      __NEXTAUTH._clientSyncTimer = setTimeout(_asyncToGenerator(function* () {
        if (__NEXTAUTH._clientSession) {
          yield __NEXTAUTH._getSession({
            event: 'timer'
          });
        }
      }), keepAlive * 1000);
    }
  }
};

var getSession = function () {
  var _ref3 = _asyncToGenerator(function* () {
    var {
      req,
      ctx,
      triggerEvent = true
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!req && ctx && ctx.req) {
      req = ctx.req;
    }

    var baseUrl = _apiBaseUrl();

    var fetchOptions = req ? {
      headers: {
        cookie: req.headers.cookie
      }
    } : {};
    var session = yield _fetchData("".concat(baseUrl, "/session"), fetchOptions);

    if (triggerEvent) {
      _sendMessage({
        event: 'session',
        data: {
          trigger: 'getSession'
        }
      });
    }

    return session;
  });

  return function getSession() {
    return _ref3.apply(this, arguments);
  };
}();

exports.getSession = getSession;

var getCsrfToken = function () {
  var _ref4 = _asyncToGenerator(function* () {
    var {
      req,
      ctx
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!req && ctx && ctx.req) {
      req = ctx.req;
    }

    var baseUrl = _apiBaseUrl();

    var fetchOptions = req ? {
      headers: {
        cookie: req.headers.cookie
      }
    } : {};
    var data = yield _fetchData("".concat(baseUrl, "/csrf"), fetchOptions);
    return data && data.csrfToken ? data.csrfToken : null;
  });

  return function getCsrfToken() {
    return _ref4.apply(this, arguments);
  };
}();

var getProviders = function () {
  var _ref5 = _asyncToGenerator(function* () {
    var baseUrl = _apiBaseUrl();

    return _fetchData("".concat(baseUrl, "/providers"));
  });

  return function getProviders() {
    return _ref5.apply(this, arguments);
  };
}();

var SessionContext = (0, _react.createContext)();

var useSession = session => {
  var value = (0, _react.useContext)(SessionContext);

  if (value === undefined) {
    return _useSessionHook(session);
  }

  return value;
};

exports.useSession = useSession;

var _useSessionHook = session => {
  var [data, setData] = (0, _react.useState)(session);
  var [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    var _getSession = function () {
      var _ref6 = _asyncToGenerator(function* () {
        var {
          event = null
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        try {
          var triggredByEvent = event !== null;
          var triggeredByStorageEvent = !!(event && event === 'storage');
          var clientMaxAge = __NEXTAUTH.clientMaxAge;
          var clientLastSync = parseInt(__NEXTAUTH._clientLastSync);
          var currentTime = Math.floor(new Date().getTime() / 1000);
          var clientSession = __NEXTAUTH._clientSession;

          if (triggeredByStorageEvent === false && clientSession !== undefined) {
            if (clientMaxAge === 0 && triggredByEvent !== true) {
              return;
            } else if (clientMaxAge > 0 && clientSession === null) {
              return;
            } else if (clientMaxAge > 0 && currentTime < clientLastSync + clientMaxAge) {
              return;
            }
          }

          if (clientSession === undefined) {
            __NEXTAUTH._clientSession = null;
          }

          __NEXTAUTH._clientLastSync = Math.floor(new Date().getTime() / 1000);
          var triggerEvent = triggeredByStorageEvent === false;
          var newClientSessionData = yield getSession({
            triggerEvent
          });
          __NEXTAUTH._clientSession = newClientSessionData;
          setData(newClientSessionData);
          setLoading(false);
        } catch (error) {
          _logger.default.error('CLIENT_USE_SESSION_ERROR', error);
        }
      });

      return function _getSession() {
        return _ref6.apply(this, arguments);
      };
    }();

    __NEXTAUTH._getSession = _getSession;

    _getSession();
  });
  return [data, loading];
};

function signIn(_x2) {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = _asyncToGenerator(function* (provider) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var authorizationParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var {
      callbackUrl = window.location,
      redirect = true
    } = options;

    var baseUrl = _apiBaseUrl();

    var providers = yield getProviders();

    if (!(provider in providers)) {
      window.location = "".concat(baseUrl, "/signin?callbackUrl=").concat(encodeURIComponent(callbackUrl));
      return;
    }

    var isCredentials = providers[provider].type === 'credentials';
    var signInUrl = isCredentials ? "".concat(baseUrl, "/callback/").concat(provider) : "".concat(baseUrl, "/signin/").concat(provider);
    var fetchOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(_objectSpread(_objectSpread({}, options), {}, {
        csrfToken: yield getCsrfToken(),
        callbackUrl,
        json: true
      }))
    };

    var _signInUrl = "".concat(signInUrl, "?").concat(new URLSearchParams(authorizationParams));

    var res = yield fetch(_signInUrl, fetchOptions);
    var data = yield res.json();

    if (redirect || !isCredentials) {
      var _data$url;

      window.location = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
      return;
    }

    var error = new URL(data.url).searchParams.get('error');
    return {
      error,
      status: res.status,
      ok: res.ok
    };
  });
  return _signIn.apply(this, arguments);
}

function signOut() {
  return _signOut.apply(this, arguments);
}

function _signOut() {
  _signOut = _asyncToGenerator(function* () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var {
      callbackUrl = window.location,
      redirect = true
    } = options;

    var baseUrl = _apiBaseUrl();

    var fetchOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        csrfToken: yield getCsrfToken(),
        callbackUrl,
        json: true
      })
    };
    var res = yield fetch("".concat(baseUrl, "/signout"), fetchOptions);
    var data = yield res.json();

    _sendMessage({
      event: 'session',
      data: {
        trigger: 'signout'
      }
    });

    if (redirect) {
      var _data$url2;

      window.location = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
      return;
    }

    return data;
  });
  return _signOut.apply(this, arguments);
}

var Provider = (_ref7) => {
  var {
    children,
    session,
    options
  } = _ref7;
  setOptions(options);
  return (0, _react.createElement)(SessionContext.Provider, {
    value: useSession(session)
  }, children);
};

exports.Provider = Provider;

var _fetchData = function () {
  var _ref8 = _asyncToGenerator(function* (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
      var res = yield fetch(url, options);
      var data = yield res.json();
      return Promise.resolve(Object.keys(data).length > 0 ? data : null);
    } catch (error) {
      _logger.default.error('CLIENT_FETCH_ERROR', url, error);

      return Promise.resolve(null);
    }
  });

  return function _fetchData(_x3) {
    return _ref8.apply(this, arguments);
  };
}();

var _apiBaseUrl = () => {
  if (typeof window === 'undefined') {
    if (!process.env.NEXTAUTH_URL) {
      _logger.default.warn('NEXTAUTH_URL', 'NEXTAUTH_URL environment variable not set');
    }

    return "".concat(__NEXTAUTH.baseUrl).concat(__NEXTAUTH.basePath);
  } else {
    return __NEXTAUTH.basePath;
  }
};

var _sendMessage = message => {
  if (typeof localStorage !== 'undefined') {
    var timestamp = Math.floor(new Date().getTime() / 1000);
    localStorage.setItem('nextauth.message', JSON.stringify(_objectSpread(_objectSpread({}, message), {}, {
      clientId: __NEXTAUTH._clientId,
      timestamp
    })));
  }
};

var _default = {
  getSession,
  getCsrfToken,
  getProviders,
  useSession,
  signIn,
  signOut,
  Provider,
  setOptions,
  options: setOptions,
  session: getSession,
  providers: getProviders,
  csrfToken: getCsrfToken,
  signin: signIn,
  signout: signOut
};
exports.default = _default;
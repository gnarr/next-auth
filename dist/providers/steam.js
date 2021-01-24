"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = options => {
  var {
    apiKey
  } = options;
  return _objectSpread({
    id: 'steam',
    name: 'Steam',
    type: 'openid',
    authenticationUrl: 'https://steamcommunity.com/openid',
    realm: null,
    stateless: true,
    strict: false,
    extensions: [],

    mapIdentifierToProfile(identifier) {
      return _asyncToGenerator(function* () {
        var [steamID] = identifier.split('/').slice(-1);
        var response = yield (0, _nodeFetch.default)("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=".concat(apiKey, "&steamids=").concat(steamID, "&format=json"));

        if (!response.ok) {
          throw new Error("Unable to fetch Steam Profile. Status: ".concat(response.status));
        }

        var json = yield response.json();
        var [{
          steamid: id,
          personaname: name,
          avatarfull: image
        }] = json.response.players;
        return {
          id,
          name,
          image
        };
      })();
    }

  }, options);
};

exports.default = _default;
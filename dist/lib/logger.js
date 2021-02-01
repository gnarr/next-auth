"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var logger = {
  error(code) {
    for (var _len = arguments.length, message = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      message[_key - 1] = arguments[_key];
    }

    console.error("[next-auth][error][".concat(code.toLowerCase(), "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), ...message);
  },

  warn(code) {
    for (var _len2 = arguments.length, message = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      message[_key2 - 1] = arguments[_key2];
    }

    console.warn("[next-auth][warn][".concat(code.toLowerCase(), "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()), ...message);
  },

  debug(code) {
    var _process, _process$env;

    if (!((_process = process) !== null && _process !== void 0 && (_process$env = _process.env) !== null && _process$env !== void 0 && _process$env._NEXTAUTH_DEBUG)) return;

    for (var _len3 = arguments.length, message = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      message[_key3 - 1] = arguments[_key3];
    }

    console.log("[next-auth][debug][".concat(code.toLowerCase(), "]"), ...message);
  }

};
var _default = logger;
exports.default = _default;
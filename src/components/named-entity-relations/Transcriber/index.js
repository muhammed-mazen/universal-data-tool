import _regeneratorRuntime from "@babel/runtime/regenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from "react";
import EditableDocument from "../EditableDocument";
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

export default (function(_ref) {
  var initialTranscriptionText = _ref.initialTranscriptionText,
    onChange = _ref.onChange,
    audio = _ref.audio,
    lowerCaseMode = _ref.lowerCaseMode,
    phraseBankParam = _ref.phraseBank,
    validator = _ref.validator;

  var _useState = useState(
      window.localStorage.NLP_ANNOTATOR_AUTOPLAY === "true"
    ),
    _useState2 = _slicedToArray(_useState, 2),
    autoPlayStatus = _useState2[0],
    changeAutoPlayStatus = _useState2[1]; // TODO create hook for usePhraseBank

  var _useState3 = useState(undefined),
    _useState4 = _slicedToArray(_useState3, 2),
    phraseBank = _useState4[0],
    changePhraseBank = _useState4[1];

  useEffect(
    function() {
      function loadPhraseBank() {
        return _loadPhraseBank.apply(this, arguments);
      }

      function _loadPhraseBank() {
        _loadPhraseBank = _asyncToGenerator(
          /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
            var fullPhraseBank,
              _iterator,
              _step,
              url,
              found,
              saveName,
              _fullPhraseBank,
              _fullPhraseBank2,
              urlPhrases;

            return _regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      if (typeof phraseBankParam === "string") {
                        phraseBankParam = [phraseBankParam];
                      }

                      if (
                        !(
                          Array.isArray(phraseBankParam) &&
                          phraseBankParam.every(function(p) {
                            return (
                              p.startsWith("http") &&
                              (p.endsWith(".txt") || p.endsWith(".csv"))
                            );
                          })
                        )
                      ) {
                        _context.next = 31;
                        break;
                      }

                      fullPhraseBank = [];
                      _iterator = _createForOfIteratorHelper(phraseBankParam);
                      _context.prev = 4;

                      _iterator.s();

                    case 6:
                      if ((_step = _iterator.n()).done) {
                        _context.next = 19;
                        break;
                      }

                      url = _step.value;
                      found = void 0;
                      saveName = "NLP_ANNOTATOR_PHRASE_BANK_".concat(url);

                      if (window.localStorage[saveName]) {
                        try {
                          (_fullPhraseBank = fullPhraseBank).push.apply(
                            _fullPhraseBank,
                            _toConsumableArray(
                              JSON.parse(window.localStorage[saveName])
                            )
                          );

                          found = true;
                        } catch (e) {}
                      }

                      if (found) {
                        _context.next = 17;
                        break;
                      }

                      _context.next = 14;
                      return fetch(url).then(function(res) {
                        return res.text();
                      });

                    case 14:
                      urlPhrases = _context.sent.split("\n");
                      window.localStorage[saveName] = JSON.stringify(
                        urlPhrases
                      );

                      (_fullPhraseBank2 = fullPhraseBank).push.apply(
                        _fullPhraseBank2,
                        _toConsumableArray(urlPhrases)
                      );

                    case 17:
                      _context.next = 6;
                      break;

                    case 19:
                      _context.next = 24;
                      break;

                    case 21:
                      _context.prev = 21;
                      _context.t0 = _context["catch"](4);

                      _iterator.e(_context.t0);

                    case 24:
                      _context.prev = 24;

                      _iterator.f();

                      return _context.finish(24);

                    case 27:
                      if (lowerCaseMode) {
                        fullPhraseBank = fullPhraseBank.map(function(a) {
                          return a.toLowerCase();
                        });
                      }

                      changePhraseBank(fullPhraseBank);
                      _context.next = 32;
                      break;

                    case 31:
                      if (Array.isArray(phraseBankParam)) {
                        changePhraseBank(phraseBankParam);
                      }

                    case 32:
                    case "end":
                      return _context.stop();
                  }
                }
              },
              _callee,
              null,
              [[4, 21, 24, 27]]
            );
          })
        );
        return _loadPhraseBank.apply(this, arguments);
      }

      loadPhraseBank();
      return function() {};
    },
    [phraseBankParam]
  );
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          textAlign: "center",
          padding: 10,
        },
      },
      /*#__PURE__*/ React.createElement(
        "audio",
        {
          autoPlay: autoPlayStatus,
          loop: true,
          controlsList: "nodownload",
          controls: true,
        },
        /*#__PURE__*/ React.createElement("source", {
          src: audio,
        })
      ),
      /*#__PURE__*/ React.createElement(
        "span",
        {
          style: {
            fontSize: 12,
          },
        },
        "Autoplay:",
        " ",
        /*#__PURE__*/ React.createElement("input", {
          checked: autoPlayStatus,
          type: "checkbox",
          onChange: function onChange() {
            window.localStorage.NLP_ANNOTATOR_AUTOPLAY = JSON.stringify(
              window.localStorage.NLP_ANNOTATOR_AUTOPLAY !== "true"
            );
            changeAutoPlayStatus(
              JSON.parse(window.localStorage.NLP_ANNOTATOR_AUTOPLAY)
            );
          },
        })
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          padding: 10,
        },
      },
      /*#__PURE__*/ React.createElement(EditableDocument, {
        phraseBank: phraseBank,
        validator: validator,
        onChange: onChange,
        initialText: initialTranscriptionText,
      })
    )
  );
});

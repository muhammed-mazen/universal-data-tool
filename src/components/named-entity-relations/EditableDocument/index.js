import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import React, { useState } from "react";
import CreatableSelect from "react-select/async-creatable";
import Spelling from "spelling";
import enDictionary from "spelling/dictionaries/en_US";
import chroma from "chroma-js";
import { green, yellow, red } from "@material-ui/core/colors";
var spellChecker = new Spelling(enDictionary);
var components = {};

var createOption = function createOption(label, color) {
  return {
    label: label,
    value: label + Math.random().toString(),
    color: color
  };
};

var colourStyles = {
  control: function control(styles) {
    return _objectSpread({}, styles, {
      backgroundColor: "white"
    });
  },
  option: function option(styles, _ref) {
    var data = _ref.data,
        isDisabled = _ref.isDisabled,
        isFocused = _ref.isFocused,
        isSelected = _ref.isSelected;
    var color = chroma(data.color || yellow[700]);
    return _objectSpread({}, styles, {
      backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : color.alpha(0.05).css(),
      color: isDisabled ? "#ccc" : isSelected ? chroma.contrast(color, "white") > 2 ? "white" : "black" : color.darken().darken().css(),
      cursor: isDisabled ? "not-allowed" : "default"
    });
  },
  multiValue: function multiValue(styles, _ref2) {
    var data = _ref2.data;
    var color = chroma(data.color);
    return _objectSpread({}, styles, {
      backgroundColor: color.alpha(0.1).css()
    });
  },
  multiValueLabel: function multiValueLabel(styles, _ref3) {
    var data = _ref3.data;
    return _objectSpread({}, styles, {
      color: chroma(data.color).darken().darken().css()
    });
  },
  multiValueRemove: function multiValueRemove(styles, _ref4) {
    var data = _ref4.data;
    return _objectSpread({}, styles, {
      color: chroma(data.color).darken().darken().css(),
      ":hover": {
        backgroundColor: data.color,
        color: "white"
      }
    });
  }
};
export default function EditableDocument(_ref5) {
  var _ref5$initialText = _ref5.initialText,
      initialText = _ref5$initialText === void 0 ? "" : _ref5$initialText,
      onChange = _ref5.onChange,
      _ref5$lowerCaseMode = _ref5.lowerCaseMode,
      lowerCaseMode = _ref5$lowerCaseMode === void 0 ? false : _ref5$lowerCaseMode,
      _ref5$phraseBank = _ref5.phraseBank,
      phraseBank = _ref5$phraseBank === void 0 ? [] : _ref5$phraseBank,
      _ref5$validator = _ref5.validator,
      validator = _ref5$validator === void 0 ? function () {
    return [];
  } : _ref5$validator;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      changeInputValue = _useState2[1];

  var _useState3 = useState(initialText ? [{
    value: initialText,
    label: initialText,
    color: green[500]
  }] : []),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      changeValue = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      validationErrors = _useState6[0],
      changeValidationErrors = _useState6[1];

  var handleChange = function handleChange(v) {
    if (!v) v = [];
    changeValue(v);
    var result = v.map(function (l) {
      return l.label.trim();
    }).join(" ").trim();

    try {
      changeValidationErrors(validator(result));
    } catch (e) {
      changeValidationErrors(["Error: Validator had error: " + e.toString()]);
    }

    onChange(result);
  };

  var isInDictionary = function isInDictionary(text) {
    if (lowerCaseMode) text = text.trim().toLowerCase();
    var scRes = spellChecker.lookup(text);
    if (scRes.found || phraseBank.includes(text)) return true;
    return false;
  };

  var handleInputChange = function handleInputChange(v) {
    return changeInputValue(v);
  };

  var handleKeyDown = function handleKeyDown(_ref6) {
    var key = _ref6.key;
    if (!inputValue) return;

    if (key === "Enter" || key === "Tab") {
      changeValue([].concat(_toConsumableArray(value || []), [createOption(inputValue.trim(), yellow[700])]));
      changeInputValue("");
    } else if (key === " " && isInDictionary(inputValue.trim())) {
      changeValue([].concat(_toConsumableArray(value || []), [createOption(inputValue.trim(), green[500])]));
      changeInputValue("");
    } else if (key === " " && isInDictionary(inputValue.split(" ").slice(-1)[0])) {
      changeValue([].concat(_toConsumableArray(value || []), [createOption(inputValue.split(" ").slice(0, -1).join(" ").trim(), yellow[700]), createOption(inputValue.split(" ").slice(-1)[0], green[700])]));
      changeInputValue("");
    }
  };

  var loadOptions = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(text) {
      var bestOption, scRes, possiblePhrases;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (lowerCaseMode) text = text.toLowerCase();
              scRes = spellChecker.lookup(text);

              if (!(scRes.found || phraseBank.includes(text))) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", [createOption(text, green[500])]);

            case 4:
              possiblePhrases = phraseBank.filter(function (p) {
                return p.startsWith(text);
              });
              return _context.abrupt("return", [bestOption || createOption(text, yellow[700])].concat(possiblePhrases.filter(function (p) {
                return p !== text;
              }).map(function (p) {
                return createOption(p, green[500]);
              })).concat(scRes.suggestions.slice(0, 6).map(function (_ref8) {
                var word = _ref8.word;
                return createOption(word, green[500]);
              })));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function loadOptions(_x) {
      return _ref7.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18
    }
  }, /*#__PURE__*/React.createElement(CreatableSelect, {
    components: components,
    inputValue: inputValue,
    isClearable: true,
    isMulti: true,
    onChange: handleChange,
    onInputChange: handleInputChange,
    onKeyDown: handleKeyDown,
    placeholder: "Begin writing...",
    loadOptions: loadOptions,
    value: value,
    styles: colourStyles
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      height: 100,
      marginTop: 8,
      borderRadius: 2,
      padding: 8
    }
  }, validationErrors.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        color: v.toLowerCase().includes("error:") ? red[800] : yellow[800]
      }
    }, v);
  })));
}
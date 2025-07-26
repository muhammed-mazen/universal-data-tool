import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

import React, { useState, useEffect, useMemo } from "react";
import LabelButton from "../LabelButton";
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

var findRouteFromParents = function findRouteFromParents(labelId, labels) {
  if (!labelId) return [];
  var label =
    labels.find(function(l) {
      return (l.id || "root") === labelId;
    }) || {};

  if (label) {
    return findRouteFromParents(label.parent, labels).concat([labelId]);
  }

  return [labelId];
};

export default (function(_ref) {
  var labels = _ref.labels,
    onSelectLabel = _ref.onSelectLabel,
    _ref$hotkeysEnabled = _ref.hotkeysEnabled,
    hotkeysEnabled =
      _ref$hotkeysEnabled === void 0 ? false : _ref$hotkeysEnabled;

  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    parents = _useState2[0],
    changeParents = _useState2[1];

  var currentParent =
    parents.length > 0 ? parents[parents.length - 1] : undefined;
  var hotkeyLabelMap = {
    r: "root",
  };
  var labelHotkeyMap = {
    root: "r",
  };

  for (var i = 0; i < labels.length; i++) {
    var label = labels[i];
    var letters = (label.displayName ).toLowerCase().split("");

    var _iterator = _createForOfIteratorHelper(letters),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var letter = _step.value;

        if (!hotkeyLabelMap[letter]) {
          hotkeyLabelMap[letter] = label.id;
          labelHotkeyMap[label.id] = letter;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  useEffect(
    function() {
      if (!hotkeysEnabled) return;

      var eventFunc = function eventFunc(e) {
        if (hotkeyLabelMap[e.key]) {
          var labelId = hotkeyLabelMap[e.key];
          if (
            !labels.some(function(l2) {
              return l2.parent === labelId;
            })
          ) {
            if (labelId === "root") {
              changeParents([]);
            } else {
              onSelectLabel(labelId);
            }
          } else {
            changeParents(findRouteFromParents(labelId, labels));
          }
        }
      };

      window.addEventListener("keydown", eventFunc);
      return function() {
        window.removeEventListener("keydown", eventFunc);
      };
    },
    [changeParents, onSelectLabel, hotkeysEnabled]
  );
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    labels.some(function(l) {
      return l.parent;
    }) &&
      /*#__PURE__*/ React.createElement(
        "div",
        {
          style: {
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
          },
        },
        /*#__PURE__*/ React.createElement(LabelButton, {
          small: true,
          color: parents.length > 0 ? "#333" : "#ccc",
          displayName: "Root (r)",
          id: "",
          onClick: function onClick() {
            return changeParents([]);
          },
        }),
        parents
          .map(function(p) {
            return labels.find(function(l) {
              return l.id === p;
            });
          })
          .filter(Boolean)
          .map(function(l) {
            return _objectSpread({}, l, {
              hasChildren: labels.some(function(l2) {
                return l2.parent === l.id;
              }),
            });
          })
          .map(function(l, i) {
            return /*#__PURE__*/ React.createElement(
              LabelButton,
              Object.assign(
                {
                  small: true,
                },
                l,
                {
                  hotkey: labelHotkeyMap[l.id],
                  onClick: function onClick() {
                    changeParents(parents.slice(0, parents.indexOf(l.id) + 1));
                  },
                }
              )
            );
          })
      ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        },
      },
      labels
        .filter(function(l) {
          return l.parent === currentParent;
        })
        .map(function(l) {
          return _objectSpread({}, l, {
            hasChildren: labels.some(function(l2) {
              return l2.parent === l.id;
            }),
          });
        })
        .map(function(l, i) {
          return /*#__PURE__*/ React.createElement(
            LabelButton,
            Object.assign(
              {
                key: l.id,
              },
              l,
              {
                hotkey: hotkeysEnabled ? labelHotkeyMap[l.id] : null,
                onClick: !l.hasChildren
                  ? onSelectLabel
                  : function() {
                      changeParents(parents.concat([l.id]));
                    },
              }
            )
          );
        })
    )
  );
});

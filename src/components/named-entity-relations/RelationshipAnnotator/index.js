import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

import React, { useState, useMemo } from "react";
import Document from "../Document";
import LabelSelector from "../LabelSelector";
import stringToSequence from "../string-to-sequence.js";
import mergeSequence from "../merge-sequence.js";
import colors from "../colors";
import { styled } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Box from "@material-ui/core/Box";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import TextFormatIcon from "@material-ui/icons/TextFormat";

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

var withId = function withId(entity) {
  return entity.textId
    ? entity
    : _objectSpread({}, entity, {
        textId: Math.random()
          .toString(36)
          .slice(-8),
      });
};

var LabelSelectorContainer = styled("div")({
  display: "flex",
});
export default function RelationshipAnnotator(props) {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    highlightedItems = _useState2[0],
    changeHighlightedItems = _useState2[1];

  var _useState3 = useState(props.initialRelationships || []),
    _useState4 = _slicedToArray(_useState3, 2),
    relationships = _useState4[0],
    setRelationships = _useState4[1];

  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    activePair = _useState6[0],
    setActivePair = _useState6[1];

  var _useState7 = useState(true),
    _useState8 = _slicedToArray(_useState7, 2),
    creatingRelationships = _useState8[0],
    setCreatingRelationships = _useState8[1];

  var _useState9 = useState(function() {
      var textIdsInRelationship = new Set(
        relationships.flatMap(function(_ref) {
          var to = _ref.to,
            from = _ref.from;
          return [to, from];
        })
      );
      return props.initialSequence
        ? props.initialSequence.flatMap(function(entity) {
            return entity.label ||
              (entity.textId && textIdsInRelationship.has(entity.textId))
              ? [withId(entity)]
              : stringToSequence(entity.text, props.separatorRegex).map(withId);
          })
        : stringToSequence(props.document).map(withId);
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    sequence = _useState10[0],
    changeSequence = _useState10[1];

  var labels = creatingRelationships
    ? props.relationshipLabels
    : props.entityLabels;

  var colorLabelMap = useMemo(
    function() {
      return (props.entityLabels || [])
        .concat(props.relationshipLabels)
        .reduce(function(acc, l, i) {
          return (acc[l.id] = l.color || colors[i % colors.length]), acc;
        }, {});
    },
    [props.entityLabels, props.relationshipLabels]
  );
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      LabelSelectorContainer,
      null,
      /*#__PURE__*/ React.createElement(LabelSelector, {
        hotkeysEnabled: props.hotkeysEnabled,
        labels: labels,
        onSelectLabel: function onSelectLabel(label) {
          if (!creatingRelationships) {
            if (highlightedItems.length === 0) return;
            var buildText = "";
            var newSequence = _toConsumableArray(sequence);

            var _iterator = _createForOfIteratorHelper(highlightedItems),
              _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                var itemIndex = _step.value;
                var item = sequence[itemIndex];
                buildText += item.text;
                newSequence[itemIndex] = null;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            newSequence[highlightedItems[0]] = {
              text: buildText,
              textId: sequence[highlightedItems[0]].textId,
              color: colorLabelMap[label],
              label: label,
            };
            newSequence = newSequence.filter(Boolean);
            changeSequence(newSequence);
            props.onChange({
              sequence: mergeSequence(newSequence),
              relationships: relationships,
            });
            changeHighlightedItems([]);
          } else {
            setActivePair(null);

            var labelName = labels.find((x) => x.id == label).displayName;
            var newRelationships = relationships.concat([
              _objectSpread({}, activePair, {
                label: labelName,
                color: colorLabelMap[label],
              }),
            ]);
            setRelationships(newRelationships);
            props.onChange({
              sequence: sequence,
              relationships: newRelationships,
            });
          }
        },
      }),
      /*#__PURE__*/ React.createElement(Box, {
        flexGrow: 1,
      }),
      /*#__PURE__*/ React.createElement(
        ToggleButtonGroup,
        {
          value: creatingRelationships ? "relationships" : "entities",
          exclusive: true,
          onChange: function onChange(e, newAlignment) {
            if (newAlignment === "relationships") {
              setCreatingRelationships(true);
            } else {
              setCreatingRelationships(false);
            }
          },
        },
        /*#__PURE__*/ React.createElement(
          ToggleButton,
          {
            value: "relationships",
          },
          /*#__PURE__*/ React.createElement(LowPriorityIcon, {
            style: {
              transform: "rotate(90deg)",
            },
          })
        ),
        props.entityLabels &&
          /*#__PURE__*/ React.createElement(
            ToggleButton,
            {
              value: "entities",
            },
            /*#__PURE__*/ React.createElement(TextFormatIcon, null)
          )
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: {
          borderTop: "1px solid #ccc",
          marginTop: 8,
          paddingTop: 5,
        },
      },
      /*#__PURE__*/ React.createElement(Document, {
        colorLabelMap: colorLabelMap,
        nothingHighlighted: highlightedItems.length === 0,
        onCreateEmptyRelationship: function onCreateEmptyRelationship(_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
            first = _ref3[0],
            second = _ref3[1];

          setActivePair({
            from: first,
            to: second,
            label: "???",
            color: "#f00",
          });
        },
        onRelationshipsChange: function onRelationshipsChange(relationships) {
          return setRelationships(relationships);
        },
        onHighlightedChanged: function onHighlightedChanged(highlightedItems) {
          return changeHighlightedItems(highlightedItems);
        },
        onSequenceChange: function onSequenceChange(sequence) {
          changeSequence(sequence);
          var allTextIds = new Set(
            sequence.map(function(item) {
              return item.textId;
            })
          );
          props.onChange({
            sequence: mergeSequence(sequence),
            relationships: relationships.filter(function(r) {
              return allTextIds.has(r.from) && allTextIds.has(r.to);
            }),
          });
        },
        sequence: sequence,
        relationships: relationships.concat(
          activePair !== null && creatingRelationships ? [activePair] : []
        ),
        createRelationshipsMode: creatingRelationships,
      })
    )
  );
}

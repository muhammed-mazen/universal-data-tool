import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useRef, useEffect } from "react";
import { styled } from "@material-ui/styles";
import stringToSequence from "../string-to-sequence.js";
import Tooltip from "@material-ui/core/Tooltip";
import RelationshipArrows from "../RelationshipArrows";
import colors from "../colors";
import ArrowToMouse from "../ArrowToMouse";
import { useTimeout, useWindowSize } from "react-use";
import classNames from "classnames";
import { iconMapping } from "../icon-mapping";

var defaultNameIconMapping = iconMapping;

var getIcon = function getIcon(name, customIconMapping) {
  var Icon =
    defaultNameIconMapping[name.toLowerCase()] || defaultNameIconMapping.help;
  return /*#__PURE__*/ React.createElement(Icon, null);
};
var IconContainer = styled("div")({
  marginLeft: 4,
});
var Container = styled("div")(function(_ref) {
  var relationshipson = _ref.relationshipsOn;
  return {
    lineHeight: 1.5,
    marginTop: relationshipson ? 64 : 0,
    flexWrap: "wrap",
    direction: _ref.rtl ? "rtl" : "ltr",
  };
});
var SequenceItem = styled("span")(function(_ref2) {
  var color = _ref2.color,
    relationshipson = _ref2.relationshipsOn;
  return {
    display: "inline-flex",
    cursor: "pointer",
    backgroundColor: color,
    color: "#fff",
    padding: 4,
    margin: 4,
    marginBottom: relationshipson ? 64 : 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    userSelect: "none",
    boxSizing: "border-box",
    "&.unlabeled": {
      color: "#333",
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 2,
      paddingRight: 2,
      ".notSpace:hover": {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 0,
        paddingRight: 0,
        border: "2px dashed #ccc",
      },
    },
  };
});
var LabeledText = styled("div")({
  display: "inline-flex",
  cursor: "pointer",
  alignSelf: "center",
  fontSize: 11,
  width: 18,
  height: 18,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 4,
  borderRadius: 9,
  color: "#fff",
  backgroundColor: "rgba(0,0,0,0.2)",
});
export default function Document(_ref3) {
  var sequence = _ref3.sequence,
    relationships = _ref3.relationships,
    _ref3$onHighlightedCh = _ref3.onHighlightedChanged,
    onHighlightedChanged =
      _ref3$onHighlightedCh === void 0
        ? function() {
            return null;
          }
        : _ref3$onHighlightedCh,
    _ref3$onCreateEmptyRe = _ref3.onCreateEmptyRelationship,
    onCreateEmptyRelationship =
      _ref3$onCreateEmptyRe === void 0
        ? function() {
            return null;
          }
        : _ref3$onCreateEmptyRe,
    _ref3$onSequenceChang = _ref3.onSequenceChange,
    onSequenceChange =
      _ref3$onSequenceChang === void 0
        ? function() {
            return null;
          }
        : _ref3$onSequenceChang,
    _ref3$onRelationships = _ref3.onRelationshipsChange,
    onRelationshipsChange =
      _ref3$onRelationships === void 0
        ? function() {
            return null;
          }
        : _ref3$onRelationships,
    _ref3$nothingHighligh = _ref3.nothingHighlighted,
    nothingHighlighted =
      _ref3$nothingHighligh === void 0 ? false : _ref3$nothingHighligh,
    _ref3$createRelations = _ref3.createRelationshipsMode,
    createRelationshipsMode =
      _ref3$createRelations === void 0 ? false : _ref3$createRelations,
    _ref3$colorLabelMap = _ref3.colorLabelMap,
    colorLabelMap = _ref3$colorLabelMap === void 0 ? {} : _ref3$colorLabelMap,
    iconLabelMap = _ref3.iconLabelMap === void 0 ? {} : _ref3.iconLabelMap;

  var sequenceItemPositionsRef = useRef({});

  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    mouseDown = _useState2[0],
    changeMouseDown = _useState2[1];

  var _useTimeout = useTimeout(30),
    _useTimeout2 = _slicedToArray(_useTimeout, 3),
    timeoutCalled = _useTimeout2[0],
    cancelTimeout = _useTimeout2[1],
    resetTimeout = _useTimeout2[2]; // Force rerender after mounting

  var windowSize = useWindowSize();
  useEffect(
    function() {
      resetTimeout();
    },
    [windowSize]
  );

  var _useState3 = useState([null, null]),
    _useState4 = _slicedToArray(_useState3, 2),
    _useState4$ = _slicedToArray(_useState4[0], 2),
    firstSelected = _useState4$[0],
    lastSelected = _useState4$[1],
    changeHighlightedRangeState = _useState4[1];

  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    firstSequenceItem = _useState6[0],
    setFirstSequenceItem = _useState6[1];

  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    secondSequenceItem = _useState8[0],
    setSecondSequenceItem = _useState8[1];

  useEffect(
    function() {
      setFirstSequenceItem(null);
      setSecondSequenceItem(null);
      changeHighlightedRangeState([null, null]);
      changeMouseDown(false);
    },
    [createRelationshipsMode]
  );

  var changeHighlightedRange = function changeHighlightedRange(_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      first = _ref5[0],
      last = _ref5[1];

    if (createRelationshipsMode) return;
    changeHighlightedRangeState([first, last]);
    var highlightedItems = [];

    for (var i = Math.min(first, last); i <= Math.max(first, last); i++) {
      highlightedItems.push(i);
    }

    onHighlightedChanged(highlightedItems);
  };

  var highlightedItems = [];

  if (!nothingHighlighted && firstSelected !== null && lastSelected !== null) {
    for (
      var i = Math.min(firstSelected, lastSelected);
      i <= Math.max(firstSelected, lastSelected);
      i++
    ) {
      highlightedItems.push(i);
    }
  }

  return /*#__PURE__*/ React.createElement(
    Container,
    {
      relationshipson: Boolean(relationships),
      rtl: _ref3.rtl,
      currentSampleIndex: _ref3.currentSampleIndex,
      onMouseDown: function onMouseDown() {
        return changeMouseDown(true);
      },
      onMouseUp: function onMouseUp() {
        if (createRelationshipsMode && firstSequenceItem) {
          setFirstSequenceItem(null);

          if (secondSequenceItem) {
            setSecondSequenceItem(null);
          }
        }

        changeMouseDown(false);
      },
    },
    sequence.map(function(seq, i) {
      return /*#__PURE__*/ React.createElement(
        SequenceItem,
        _defineProperty(
          {
            key: seq.textId || i,
            ref: function ref(elm) {
              if (!elm) return;
              sequenceItemPositionsRef.current[seq.textId] = {
                offset: {
                  left: elm.offsetLeft,
                  top: elm.offsetTop,
                  width: elm.offsetWidth,
                  height: elm.offsetHeight,
                },
              };
            },
            relationshipson: Boolean(relationships),
            onMouseUp: function onMouseUp(e) {
              if (!createRelationshipsMode) return;

              if (!secondSequenceItem) {
                setFirstSequenceItem(null);
                setSecondSequenceItem(null);
                onCreateEmptyRelationship([firstSequenceItem, seq.textId]);
              } else {
                setFirstSequenceItem(null);
                setSecondSequenceItem(null);
              }
            },
            onMouseDown: function onMouseDown() {
              if (createRelationshipsMode) {
                if (!firstSequenceItem) {
                  setFirstSequenceItem(seq.textId);
                }
              } else {
                if (seq.label) return;
                changeHighlightedRange([i, i]);
              }
            },
            onMouseMove: function onMouseMove() {
              if (!mouseDown) return;

              if (!createRelationshipsMode) {
                if (seq.label) return;

                if (i !== lastSelected) {
                  changeHighlightedRange([
                    firstSelected === null ? i : firstSelected,
                    i,
                  ]);
                }
              }
            },
            className: classNames(
              seq.label ? "label" : "unlabeled",
              seq.text.trim().length > 0 && "notSpace"
            ),
            color: seq.label
              ? seq.color || colorLabelMap[seq.label] || "#333"
              : !createRelationshipsMode &&
                seq.text !== " " &&
                highlightedItems.includes(i)
              ? "#ccc"
              : "inherit",
          },
          "key",
          i
        ),
        seq.label &&
          iconLabelMap[seq.label] &&
          !createRelationshipsMode &&
          /*#__PURE__*/ React.createElement(
            IconContainer,
            null,
            getIcon(iconLabelMap[seq.label], null)
          ),
        seq.label
          ? /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                title: seq.label,
                placement: "bottom",
              },
              /*#__PURE__*/ React.createElement("div", null, seq.text)
            )
          : /*#__PURE__*/ React.createElement("div", null, seq.text),

        seq.label &&
          !createRelationshipsMode &&
          /*#__PURE__*/ React.createElement(
            LabeledText,
            {
              onClick: function onClick(e) {
                e.stopPropagation();
                onSequenceChange(
                  sequence
                    .flatMap(function(s) {
                      return s !== seq ? s : stringToSequence(s.text);
                    })
                    .filter(function(s) {
                      return s.text.length > 0;
                    })
                );
              },
            },

            /*#__PURE__*/ React.createElement("span", null, "✕")
          )
      );
    }),
    firstSequenceItem &&
      !secondSequenceItem &&
      /*#__PURE__*/ React.createElement(ArrowToMouse, {
        startAt: (
          (sequenceItemPositionsRef.current || {})[firstSequenceItem] || {}
        ).offset,
      }),
    relationships &&
      /*#__PURE__*/ React.createElement(RelationshipArrows, {
        onClickArrow: function onClickArrow(_ref6) {
          var label = _ref6.label,
            from = _ref6.from,
            to = _ref6.to;
          onRelationshipsChange(
            relationships.filter(function(r) {
              return !(r.from === from && r.to === to && r.label === label);
            })
          );
        },
        positions: sequenceItemPositionsRef.current,
        arrows: relationships.map(function(a, i) {
          return _objectSpread({}, a, {
            color: a.color || colors[i % colors.length],
          });
        }),
      })
  );
}

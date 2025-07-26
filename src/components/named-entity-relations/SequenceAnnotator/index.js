import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useMemo } from "react";
import Document from "../Document";
import LabelSelector from "../LabelSelector";
import stringToSequence from "../string-to-sequence.js";
import mergeSequence from "../merge-sequence.js";
import colors from "../colors";
import { iconMapping } from "../icon-mapping";

var defaultNameIconMapping = iconMapping;

export default function SequenceAnnotator(props) {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    highlightedItems = _useState2[0],
    changeHighlightedItems = _useState2[1];
  var _useState3 = useState(function() {
      return props.initialSequence
        ? props.initialSequence.flatMap(function(entity) {
            return entity.label
              ? [entity]
              : stringToSequence(entity.text, props.separatorRegex);
          })
        : stringToSequence(props.document);
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    sequence = _useState4[0],
    changeSequence = _useState4[1];

  var colorLabelMap = useMemo(
    function() {
      return props.labels.reduce(function(acc, l, i) {
        return (acc[l.id] = colors[i % colors.length]), acc;
      }, {});
    },
    [props.labels]
  );
  var iconLabelMap = useMemo(
    function() {
      return props.labels.reduce(function(acc, l, i) {
        return (acc[l.id] = l.icon), acc;
      }, {});
    },
    [props.labels]
  );
  //console.log("sequence", props);
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement(LabelSelector, {
        hotkeysEnabled: props.hotkeysEnabled,
        labels: props.labels,
        onSelectLabel: function onSelectLabel(label) {
          var _ref =
              props.labels.find(function(_ref2) {
                var id = _ref2.id;
                return label === id;
              }) || {},
            color = _ref.color;

          var buildText = "";
          var newSequence = [];

          for (var itemIndex = 0; itemIndex < sequence.length; itemIndex++) {
            var item = sequence[itemIndex];

            if (!highlightedItems.includes(itemIndex) || item.label) {
              if (buildText.length > 0) {
                newSequence.push({
                  text: buildText,
                  color: color,
                  label: label,
                });
                buildText = "";
              }

              newSequence.push(item);
            } else {
              buildText += item.text;
            }
          }

          if (buildText.length > 0) {
            newSequence.push({
              text: buildText,
              color: color,
              label: label,
            });
          }

          changeSequence(newSequence);
          props.onChange(mergeSequence(newSequence));
          changeHighlightedItems([]);
        },
      })
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
        iconLabelMap: iconLabelMap,
        rtl: props.rtl,
        currentSampleIndex: props.currentSampleIndex,
        nothingHighlighted: highlightedItems.length === 0,
        onHighlightedChanged: function onHighlightedChanged(highlightedItems) {
          return changeHighlightedItems(highlightedItems);
        },
        onSequenceChange: function onSequenceChange(sequence) {
          changeSequence(sequence);
          props.onChange(mergeSequence(sequence));
        },
        sequence: sequence,
      })
    )
  );
}

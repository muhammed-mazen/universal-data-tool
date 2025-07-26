import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useMemo } from "react";
import Document from "../Document";
import LabelSelector from "../LabelSelector";
import stringToSequence from "../string-to-sequence.js";
import LabelButton from "../LabelButton";
export default function DocumentLabeler(props) {
  var _useState = useState(props.initialLabels || (props.initialLabel ? [props.initialLabel] : [])),
      _useState2 = _slicedToArray(_useState, 2),
      selectedLabels = _useState2[0],
      changeSelectedLabels = _useState2[1];

  var sequence = useMemo(function () {
    return stringToSequence(props.document);
  }, [props.document]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LabelSelector, {
    hotkeysEnabled: props.hotkeysEnabled,
    labels: props.labels,
    onSelectLabel: function onSelectLabel(labelId) {
      if (props.multipleLabels) {
        changeSelectedLabels(selectedLabels.concat([labelId]));
        props.onChange(selectedLabels.concat([labelId]));
      } else {
        props.onChange(labelId);
        changeSelectedLabels([labelId]);
      }
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid #ccc",
      marginTop: 8,
      paddingTop: 5
    }
  }, /*#__PURE__*/React.createElement("div", null, selectedLabels.map(function (labelId) {
    var label = props.labels.find(function (l) {
      return l.id === labelId;
    });
    if (!label) return;
    return /*#__PURE__*/React.createElement(LabelButton, Object.assign({
      key: labelId
    }, label, {
      small: true,
      deletable: true,
      onClick: function onClick(labelId) {
        var newSelectedLabels = selectedLabels.filter(function (l) {
          return l !== labelId;
        });
        changeSelectedLabels(newSelectedLabels);

        if (props.multipleLabels) {
          props.onChange(newSelectedLabels);
        } else {
          props.onChange(null);
        }
      }
    }));
  })), /*#__PURE__*/React.createElement(Document, {
    nothingHighlighted: true,
    sequence: sequence
  })));
}
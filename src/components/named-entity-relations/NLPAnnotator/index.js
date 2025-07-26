import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import React, { useState, useEffect, useMemo } from "react";
import SequenceAnnotator from "../SequenceAnnotator";
import DocumentLabeler from "../DocumentLabeler";
import RelationshipAnnotator from "../RelationshipAnnotator";
import Transcriber from "../Transcriber";
import colors from "../colors";
import Container from "../Container";
import useEventCallback from "use-event-callback";

var defaultValidator = function defaultValidator() {
  return [];
};

var addColors = function addColors(inputLabels) {
  return (inputLabels || []).map(function(label, i) {
    return label.color
      ? label
      : _objectSpread({}, label, {
          color: colors[i % colors.length],
        });
  });
};

export default function NLPAnnotator(props) {
  var validator = props.validator || defaultValidator;
  const { t } = props;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    output = _useState2[0],
    changeOutput = _useState2[1];

  if (output === null && props.type === "transcribe") {
    output = props.initialTranscriptionText;
  }

  if (output === null && props.type === "label-sequence") {
    output = props.initialSequence || [
      {
        text: props.document,
      },
    ];
  }

  if (output === null && props.type === "label-document") {
    output = props.initialLabel || props.initialLabels;
  }

  if (output === null && props.type === "label-relationships") {
    output = {
      sequence: props.initialSequence,
      relationships: props.initialRelationships,
    };
  }

  useEffect(
    function() {
      if (!props.hotkeysEnabled) return;

      var eventFunc = function eventFunc(e) {
        if (e.key === "Enter") {
          if (props.onNext) {
            props.onNext(output);
          } else if (props.onFinish) {
            props.onFinish(output);
          }
        }
      };

      window.addEventListener("keydown", eventFunc);
      return function() {
        window.removeEventListener("keydown", eventFunc);
      };
    },
    [props.onFinish, output]
  );

  var onChange = function onChange(newOutput) {
    if (props.onChange) props.onChange(newOutput);
    changeOutput(newOutput);
  };

  var labels = useMemo(
    function() {
      return addColors(props.labels);
    },
    [props.labels]
  );
  var entityLabels = useMemo(
    function() {
      return addColors(props.entityLabels);
    },
    [props.entityLabels]
  );
  var relationshipLabels = useMemo(
    function() {
      return addColors(props.relationshipLabels);
    },
    [props.relationshipLabels]
  );
  var isPassingValidation = !validator(output).some(function(msg) {
    return msg.toLowerCase().includes("error");
  });
  var onNext = useEventCallback(function() {
    return props.onNext(output);
  });
  var onPrev = useEventCallback(function() {
    return props.onPrev(output);
  });
  var onLogout = useEventCallback(function() {
    return props.onLogout(output);
  });
  var onFinish = useEventCallback(function() {
    if (!isPassingValidation) return;
    props.onFinish(output);
  });
  var onClickHeaderItem = useEventCallback(function(_ref) {
    var name = _ref.name;

    switch (name) {
      case "Done":
      case "Save":
        onFinish(output);
        return;

      default:
        return;
    }
  });
  var annotator;

  switch (props.type) {
    case "label-sequence":
      annotator = /*#__PURE__*/ React.createElement(
        SequenceAnnotator,
        Object.assign({}, props, {
          labels: labels,
          currentSampleIndex: props.currentSampleIndex,
          onChange: onChange,
        })
      );
      break;

    case "label-document":
      annotator = /*#__PURE__*/ React.createElement(
        DocumentLabeler,
        Object.assign({}, props, {
          labels: labels,
          onChange: onChange,
        })
      );
      break;

    case "transcribe":
      annotator = /*#__PURE__*/ React.createElement(
        Transcriber,
        Object.assign({}, props, {
          onChange: onChange,
        })
      );
      break;

    case "label-relationships":
      annotator = /*#__PURE__*/ React.createElement(
        RelationshipAnnotator,
        Object.assign({}, props, {
          entityLabels: entityLabels,
          relationshipLabels: relationshipLabels,
          onChange: onChange,
        })
      );
      break;

    default:
      annotator = null;
  }

  return /*#__PURE__*/ React.createElement(
    Container,
    {
      titleContent: props.titleContent,
      t: t,
      rtl: props.rtl,
      sampleIndex: props.sampleIndex,
      sampleCount: props.sampleCount,
      instructions: props.instructions,
      onPageChange: props.onPageChange,
      onNext: props.onNext ? onNext : null,
      onPrev: props.onPrev ? onPrev : null,
      onLogout: props.onLogout ? onLogout : null,
      onClickHeaderItem: onClickHeaderItem,
    },
    /*#__PURE__*/ React.createElement("div", null, annotator)
  );
}

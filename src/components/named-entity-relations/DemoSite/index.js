import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Editor, { examples } from "./Editor";
import NLPAnnotator from "../NLPAnnotator";
import ErrorBoundaryDialog from "./ErrorBoundaryDialog.js";
import { parse as queryString } from "query-string";
import { Base64 } from "js-base64";

function getInitialAnnotatorProps() {
  var _ref = queryString(window.location.search) || {},
      load = _ref.load;

  if (load) {
    try {
      return JSON.parse(Base64.decode(load));
    } catch (e) {
      console.error("Problem loading from load get parameter. Error parsing.");
    }
  }

  return examples["Custom"]();
}

export default (function () {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      annotatorOpen = _useState2[0],
      changeAnnotatorOpen = _useState2[1];

  var _useState3 = useState(getInitialAnnotatorProps()),
      _useState4 = _slicedToArray(_useState3, 2),
      annotatorProps = _useState4[0],
      changeAnnotatorProps = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      lastOutput = _useState6[0],
      changeLastOutput = _useState6[1];

  return /*#__PURE__*/React.createElement("div", null, annotatorOpen ? /*#__PURE__*/React.createElement(ErrorBoundaryDialog, {
    onClose: function onClose() {
      changeAnnotatorOpen(false);
    }
  }, /*#__PURE__*/React.createElement(NLPAnnotator, Object.assign({}, annotatorProps, {
    onFinish: function onFinish(output) {
      changeLastOutput(output);
      changeAnnotatorOpen(false);
    }
  }))) : /*#__PURE__*/React.createElement(Editor, {
    initialAnnotatorProps: annotatorProps,
    lastOutput: lastOutput,
    onOpenAnnotator: function onOpenAnnotator(props) {
      // window.history.pushState(
      //   window.document.title,
      //   window.document.title,
      //   window.location.origin +
      //     window.location.pathname +
      //     "?load=" +
      //     Base64.encode(JSON.stringify(props, null, "  "))
      // )
      changeAnnotatorProps(props);
      changeAnnotatorOpen(true);
    }
  }));
});
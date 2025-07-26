import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Select from "react-select";
import Code from "react-syntax-highlighter";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import MonacoEditor from "react-monaco-editor";
var useStyles = makeStyles({
  editBar: {
    padding: 10,
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    display: "flex",
    alignItems: "center",
    "& .button": {
      margin: 5
    }
  },
  select: {
    width: 240,
    fontSize: 14
  },
  contentArea: {
    padding: 10
  },
  specificationArea: {
    padding: 10
  }
});

var loadSavedInput = function loadSavedInput() {
  try {
    return JSON.parse(window.localStorage.getItem("nlpCustomInput") || "{}");
  } catch (e) {
    return {};
  }
};

export var examples = {
  SimpleLabelSequence: function SimpleLabelSequence() {
    return {
      type: "label-sequence",
      document: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra ipsum tristique ligula venenatis placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce mollis velit nec tellus sollicitudin aliquam. In velit erat, iaculis id consectetur et, tincidunt sit amet mauris. Quisque ultricies, purus eleifend congue malesuada, ipsum erat molestie dolor, in pellentesque lacus purus vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sed vestibulum magna. Quisque ut lorem imperdiet, aliquam velit nec, dictum felis.",
      labels: [{
        id: "noun",
        displayName: "Noun"
      }, {
        id: "proper-noun",
        displayName: "Proper Noun"
      }]
    };
  },
  SimpleLabelDocument: function SimpleLabelDocument() {
    return {
      type: "label-document",
      document: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra ipsum tristique ligula venenatis placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce mollis velit nec tellus sollicitudin aliquam. In velit erat, iaculis id consectetur et, tincidunt sit amet mauris. Quisque ultricies, purus eleifend congue malesuada, ipsum erat molestie dolor, in pellentesque lacus purus vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sed vestibulum magna. Quisque ut lorem imperdiet, aliquam velit nec, dictum felis.",
      labels: [{
        id: "latin",
        displayName: "Latin"
      }, {
        id: "english",
        displayName: "English"
      }, {
        id: "german",
        displayName: "German"
      }]
    };
  },
  Custom: function Custom() {
    return loadSavedInput();
  }
};

var Editor = function Editor(_ref) {
  var initialAnnotatorProps = _ref.initialAnnotatorProps,
      onOpenAnnotator = _ref.onOpenAnnotator,
      lastOutput = _ref.lastOutput;
  var c = useStyles();

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      currentError = _useState2[0],
      changeCurrentError = _useState2[1];

  var _useState3 = useState(window.localStorage.getItem("nlpCustomInput") ? "Custom" : "SimpleLabelSequence"),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedExample = _useState4[0],
      changeSelectedExample = _useState4[1];

  var _useState5 = useState(lastOutput),
      _useState6 = _slicedToArray(_useState5, 2),
      outputDialogOpen = _useState6[0],
      changeOutputOpen = _useState6[1];

  var _useState7 = useState(initialAnnotatorProps ? JSON.stringify(initialAnnotatorProps, null, "  ") : JSON.stringify(examples[selectedExample](), null, "  ")),
      _useState8 = _slicedToArray(_useState7, 2),
      currentJSONValue = _useState8[0],
      changeCurrentJSONValue = _useState8[1];

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: c.editBar
  }, /*#__PURE__*/React.createElement("h3", null, "React NLP Annotate"), /*#__PURE__*/React.createElement("div", {
    style: {
      flexGrow: 1
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    className: c.select,
    value: {
      label: selectedExample,
      value: selectedExample
    },
    options: Object.keys(examples).map(function (s) {
      return {
        label: s,
        value: s
      };
    }),
    onChange: function onChange(selectedOption) {
      changeSelectedExample(selectedOption.value);
      changeCurrentJSONValue(JSON.stringify(selectedOption.value === "Custom" ? loadSavedInput() : examples[selectedOption.value](), null, "  "));
    }
  })), /*#__PURE__*/React.createElement(Button, {
    className: "button",
    disabled: !lastOutput,
    onClick: function onClick() {
      return changeOutputOpen(true);
    }
  }, "View Output"), /*#__PURE__*/React.createElement(Button, {
    className: "button",
    variant: "outlined",
    disabled: Boolean(currentError),
    onClick: function onClick() {
      return onOpenAnnotator(selectedExample === "Custom" ? JSON.parse(currentJSONValue) : examples[selectedExample]());
    }
  }, "Open Annotator"))), /*#__PURE__*/React.createElement("div", {
    className: c.contentArea,
    style: currentError ? {
      border: "2px solid #f00"
    } : {
      border: "2px solid #fff"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MonacoEditor, {
    value: currentJSONValue,
    language: "javascript",
    onChange: function onChange(code) {
      try {
        window.localStorage.setItem("nlpCustomInput", JSON.stringify(JSON.parse(code)));
        changeCurrentError(null);
      } catch (e) {
        changeCurrentError(e.toString());
      }

      changeCurrentJSONValue(code);
    },
    width: "100%",
    height: "550px"
  }))), /*#__PURE__*/React.createElement("div", {
    className: c.specificationArea
  }, /*#__PURE__*/React.createElement("h2", null, "React NLP Annotate Format"), /*#__PURE__*/React.createElement(Code, {
    language: "javascript"
  }, "\n// There are several types of annotators you can use...\n\nexport type LabelDocumentProps = {\n  type: \"label-document\",\n  labels: Array<Label>,\n  multipleLabels?: boolean,\n  initialLabels?: Array<string>,\n  document: string,\n  onChange: (Array<string> | string | null) => any\n}\n\nexport type SequenceAnnotatorProps = {\n  type: \"label-sequence\",\n  labels: Array<Label>,\n  initialSequence?: Array<SequenceItem>,\n  document: string,\n  onChange: (sequence: Array<SequenceItem>) => any\n}\n\nexport type TranscriberProps = {\n  type: \"transcribe\",\n  audio: string,\n  phraseBank?: Array<string>,\n  validator?: string => Array<string>,\n  initialTranscriptionText?: string,\n  onChange: string => any\n}\n\nexport type NLPAnnotatorProps = {\n  ...\n    | $Exact<SequenceAnnotatorProps>\n    | $Exact<LabelDocumentProps>\n    | $Exact<TranscriberProps>,\n  onFinish?: string,\n  onChange?: string\n}\n")), /*#__PURE__*/React.createElement(Dialog, {
    fullScreen: true,
    open: outputDialogOpen
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "React NLP Annotate Output"), /*#__PURE__*/React.createElement(DialogContent, {
    style: {
      minWidth: 400
    }
  }, /*#__PURE__*/React.createElement(MonacoEditor, {
    value: JSON.stringify(lastOutput, null, "  "),
    language: "javascript",
    width: "100%",
    height: "550px"
  })), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      return changeOutputOpen(false);
    }
  }, "Close"))));
};

export default Editor;
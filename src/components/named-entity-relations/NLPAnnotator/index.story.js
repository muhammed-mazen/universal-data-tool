import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import colors from "../../colors";
import NLPAnnotator from "./";
storiesOf("NLPAnnotator", module).add("Sequence Labeler", function () {
  return /*#__PURE__*/React.createElement(NLPAnnotator, {
    hotkeysEnabled: true,
    onChange: action("onChange"),
    onFinish: action("onFinish"),
    onNext: action("onNext"),
    onPrev: action("onPrev"),
    type: "label-sequence",
    document: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra ipsum tristique ligula venenatis placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce mollis velit nec tellus sollicitudin aliquam. In velit erat, iaculis id consectetur et, tincidunt sit amet mauris. Quisque ultricies, purus eleifend congue malesuada, ipsum erat molestie dolor, in pellentesque lacus purus vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sed vestibulum magna. Quisque ut lorem imperdiet, aliquam velit nec, dictum felis.",
    labels: [{
      color: colors[0],
      id: "noun",
      displayName: "Noun"
    }, {
      color: colors[1],
      id: "proper-noun",
      displayName: "Proper Noun"
    }]
  });
}).add("Document Labeler", function () {
  return /*#__PURE__*/React.createElement(NLPAnnotator, {
    hotkeysEnabled: true,
    onChange: action("onChange"),
    onFinish: action("onFinish"),
    type: "label-document",
    document: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra ipsum tristique ligula venenatis placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce mollis velit nec tellus sollicitudin aliquam. In velit erat, iaculis id consectetur et, tincidunt sit amet mauris. Quisque ultricies, purus eleifend congue malesuada, ipsum erat molestie dolor, in pellentesque lacus purus vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sed vestibulum magna. Quisque ut lorem imperdiet, aliquam velit nec, dictum felis.",
    initialLabel: "noun",
    labels: [{
      color: colors[0],
      id: "noun",
      displayName: "Noun"
    }, {
      color: colors[1],
      id: "proper-noun",
      displayName: "Proper Noun"
    }]
  });
}).add("Transcriber", function () {
  return /*#__PURE__*/React.createElement(NLPAnnotator, {
    hotkeysEnabled: true,
    onChange: action("onChange"),
    onFinish: action("onFinish"),
    type: "transcribe",
    audio: "https://html5tutorial.info/media/vincent.mp3",
    document: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra ipsum tristique ligula venenatis placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce mollis velit nec tellus sollicitudin aliquam. In velit erat, iaculis id consectetur et, tincidunt sit amet mauris. Quisque ultricies, purus eleifend congue malesuada, ipsum erat molestie dolor, in pellentesque lacus purus vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sed vestibulum magna. Quisque ut lorem imperdiet, aliquam velit nec, dictum felis.",
    initialTranscriptionText: "Starry starry knight."
  });
}).add("Transcriber with Finish Handler", function () {
  return /*#__PURE__*/React.createElement(NLPAnnotator, {
    hotkeysEnabled: true,
    type: "transcribe",
    audio: "https://html5tutorial.info/media/vincent.mp3",
    document: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra ipsum tristique ligula venenatis placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce mollis velit nec tellus sollicitudin aliquam. In velit erat, iaculis id consectetur et, tincidunt sit amet mauris. Quisque ultricies, purus eleifend congue malesuada, ipsum erat molestie dolor, in pellentesque lacus purus vel nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sed vestibulum magna. Quisque ut lorem imperdiet, aliquam velit nec, dictum felis.",
    initialTranscriptionText: "Starry starry knight.",
    validator: function validator() {
      var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return t.length === 0 ? ["Error: Must be some text"] : [];
    },
    onChange: action("onChange"),
    onFinish: action("onFinish")
  });
}).add("Relationship Labeler", function () {
  return /*#__PURE__*/React.createElement(NLPAnnotator, {
    hotkeysEnabled: true,
    onChange: action("onChange"),
    onFinish: action("onFinish"),
    onNext: action("onNext"),
    onPrev: action("onPrev"),
    type: "label-relationships",
    document: "Lorem ipsum dolor sit amet.",
    entityLabels: [{
      id: "noun",
      displayName: "Noun"
    }, {
      id: "proper-noun",
      displayName: "Proper Noun"
    }],
    relationshipLabels: [{
      id: "eaten by",
      displayName: "Eaten By"
    }, {
      id: "lives in",
      displayName: "Lives In"
    }]
  });
});
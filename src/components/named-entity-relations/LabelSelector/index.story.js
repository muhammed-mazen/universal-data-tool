import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import colors from "../../colors";
import LabelSelector from "./";
storiesOf("LabelSelector", module).add("Basic", function () {
  return /*#__PURE__*/React.createElement(LabelSelector, {
    hotkeysEnabled: true,
    labels: [{
      displayName: "Label One",
      id: "label_one",
      description: "The first label",
      color: colors[0]
    }, {
      displayName: "Label Two",
      id: "label_two",
      description: "The second label",
      color: colors[1]
    }],
    onSelectLabel: action("onSelectLabel")
  });
}).add("Hotkeys Off", function () {
  return /*#__PURE__*/React.createElement(LabelSelector, {
    hotkeysEnabled: false,
    labels: [{
      displayName: "Label One",
      id: "label_one",
      description: "The first label",
      color: colors[0]
    }, {
      displayName: "Label Two",
      id: "label_two",
      description: "The second label",
      color: colors[1]
    }],
    onSelectLabel: action("onSelectLabel")
  });
});